"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const uploadFileWithProgress = async (file, headers, onProgress) => {
  // 1. Request presigned URL from server using JSON request (which falls back to presigned URL generation)
  const presignedRes = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type || "audio/mpeg",
    }),
  });

  if (!presignedRes.ok) {
    let errMsg = `Server returned status ${presignedRes.status}`;
    try {
      const errData = await presignedRes.json();
      errMsg = errData.error || errMsg;
    } catch (_) {}
    throw new Error(errMsg);
  }

  const { uploadUrl, publicUrl } = await presignedRes.json();

  // 2. Perform direct upload to Cloudflare R2 via XMLHTTPRequest to monitor progress
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type || "audio/mpeg");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ publicUrl, success: true });
      } else {
        reject(
          new Error(
            `R2 upload failed with status ${xhr.status}. Please make sure you have allowed PUT requests in your Cloudflare R2 CORS settings.`
          )
        );
      }
    };

    xhr.onerror = () => {
      reject(
        new Error(
          "Network error during direct R2 upload. This is highly likely a CORS blocking issue. Please verify and update your Cloudflare R2 Bucket CORS configuration in Settings."
        )
      );
    };

    xhr.send(file);
  });
};


function FrequencyEditor({ freqs, onChange, musicFiles = [], r2KeyId = "", r2Secret = "", onUploadSuccess }) {
  // Parse freqs if it's a string
  let list = [];
  try {
    list = typeof freqs === "string" ? JSON.parse(freqs) : freqs;
    if (!Array.isArray(list)) list = [];
  } catch (e) {
    list = [];
  }

  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const updateRow = (index, key, value) => {
    const newList = [...list];
    newList[index] = { ...newList[index], [key]: value };
    onChange(JSON.stringify(newList, null, 2));
  };

  const deleteRow = (index) => {
    const newList = list.filter((_, i) => i !== index);
    onChange(JSON.stringify(newList, null, 2));
  };

  const addRow = () => {
    const newList = [...list, { hz: 432, label: "Phase " + (list.length + 1), role: "Support", duration: 10, effect: "", audio_url: "" }];
    onChange(JSON.stringify(newList, null, 2));
  };

  const handleUploadPhaseAudio = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingIdx(index);
    setUploadProgress(0);

    try {
      const headers = {
        ...(r2KeyId ? { "x-r2-access-key-id": r2KeyId } : {}),
        ...(r2Secret ? { "x-r2-secret-access-key": r2Secret } : {}),
      };
      
      const uploadData = await uploadFileWithProgress(file, headers, (percent) => {
        setUploadProgress(percent);
      });

      updateRow(index, "audio_url", uploadData.publicUrl);
      
      if (typeof onUploadSuccess === "function") {
        await onUploadSuccess();
      }
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploadingIdx(null);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-xs text-white/50 uppercase font-extrabold tracking-wider">
          Phases & Frequencies List
        </label>
        <button
          type="button"
          onClick={addRow}
          className="px-3 py-1.5 bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-[#c4b5fd] rounded-xl text-[11px] font-bold hover:bg-[#8B5CF6]/35 transition-all"
        >
          + Add Phase
        </button>
      </div>

      {list.length === 0 ? (
        <p className="text-xs text-white/30 italic">No phases added yet.</p>
      ) : (
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
          {list.map((item, idx) => (
            <div key={idx} className="space-y-2.5 p-3.5 bg-black/45 border border-white/5 rounded-2xl relative group">
              <div className="flex flex-col md:flex-row gap-2.5 items-end">
                <div className="w-28">
                  <label className="block text-[9px] text-white/30 uppercase font-bold mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label || ""}
                    onChange={(e) => updateRow(idx, "label", e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-2 py-1 text-white text-xs outline-none focus:border-[#8B5CF6]"
                    placeholder="e.g. Phase 1"
                    required
                  />
                </div>
                <div className="w-16">
                  <label className="block text-[9px] text-white/30 uppercase font-bold mb-1">Hz</label>
                  <input
                    type="number"
                    value={item.hz || ""}
                    onChange={(e) => updateRow(idx, "hz", parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-1.5 py-1 text-white text-xs font-mono outline-none focus:border-[#8B5CF6]"
                    placeholder="Hz"
                    required
                  />
                </div>
                <div className="w-16">
                  <label className="block text-[9px] text-white/30 uppercase font-bold mb-1">Min</label>
                  <input
                    type="number"
                    value={item.duration || ""}
                    onChange={(e) => updateRow(idx, "duration", parseInt(e.target.value) || 0)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-1.5 py-1 text-white text-xs font-mono outline-none focus:border-[#8B5CF6]"
                    placeholder="Min"
                    required
                  />
                </div>
                <div className="w-32">
                  <label className="block text-[9px] text-white/30 uppercase font-bold mb-1">Role</label>
                  <select
                    value={item.role || "Support"}
                    onChange={(e) => updateRow(idx, "role", e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-2 py-1 text-white text-xs outline-none focus:border-[#8B5CF6] h-[26px]"
                  >
                    <option value="Primary">Primary</option>
                    <option value="Support">Support</option>
                    <option value="Sub-harmonic">Sub-harmonic</option>
                    <option value="Gamma">Gamma</option>
                    <option value="Alpha">Alpha</option>
                    <option value="Beta">Beta</option>
                    <option value="Delta">Delta</option>
                    <option value="Theta">Theta</option>
                    <option value="Schumann">Schumann</option>
                    <option value="Pineal">Pineal</option>
                    <option value="Release">Release</option>
                  </select>
                </div>
                <div className="flex-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => deleteRow(idx)}
                    className="p-1 text-red-400/60 hover:text-[#ff4a4a] transition-colors"
                    title="Remove Row"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-[9px] text-white/30 uppercase font-bold mb-1">Effect / Description</label>
                  <input
                    type="text"
                    value={item.effect || ""}
                    onChange={(e) => updateRow(idx, "effect", e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-2 py-1 text-white text-xs outline-none focus:border-[#8B5CF6]"
                    placeholder="e.g. Grounding, calming"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[9px] text-white/30 uppercase font-bold mb-1">Phase Sound Track</label>
                  <div className="flex gap-2">
                    <select
                      value={item.audio_url || ""}
                      onChange={(e) => updateRow(idx, "audio_url", e.target.value)}
                      className="flex-1 bg-[#121212] border border-white/10 rounded-lg px-2 py-1 text-white text-xs outline-none focus:border-[#8B5CF6] h-[26px] min-w-0"
                    >
                      <option value="">-- Condition Default --</option>
                      {musicFiles.map((file) => (
                        <option key={file.publicUrl} value={file.publicUrl}>
                          {file.filename}
                        </option>
                      ))}
                    </select>

                    <label className={`cursor-pointer px-3 py-1 bg-[#00D1FF]/10 hover:bg-[#00D1FF]/20 border border-[#00D1FF]/30 text-[#00D1FF] rounded-lg text-[10px] font-bold transition-all flex items-center justify-center shrink-0 h-[26px] ${
                      uploadingIdx === idx ? "opacity-50 pointer-events-none" : ""
                    }`}>
                      {uploadingIdx === idx ? `⏳ ${uploadProgress}%` : "📤 Upload"}
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleUploadPhaseAudio(e, idx)}
                        className="hidden"
                        disabled={uploadingIdx === idx}
                      />
                    </label>
                  </div>
                  <input
                    type="url"
                    value={item.audio_url || ""}
                    onChange={(e) => updateRow(idx, "audio_url", e.target.value)}
                    className="w-full mt-1.5 bg-[#121212]/60 border border-white/5 rounded-lg px-2 py-1 text-white/70 text-[10px] font-mono outline-none focus:border-[#8B5CF6]"
                    placeholder="Or paste audio direct URL"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const STATIC_SUBCATS = {
  Mental: ["Nervous system", "Limbic system", "Pineal gland", "Prefrontal cortex", "Hippocampus"],
  Physical: ["Nociceptors", "Immune system", "Hippocampus", "Basal ganglia", "Trigeminovascular system", "Lungs", "Skin microbiome", "Enteric nervous system"],
  Chronic: ["Synovial joints", "Pancreas", "Immune system dysregulation"],
  Endocrine: ["Thyroid gland", "Ovaries"],
  Emotional: ["Heart", "Reward pathways", "Default mode network"],
  "Cardiovascular Disease": ["Daily maintenance", "Blood pressure reduction", "Evening cortisol reset", "Safety-first baseline", "Vascular restoration"]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard", "conditions", "solfeggio", "users", "r2"
  const [selectedAdminCat, setSelectedAdminCat] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [conditions, setConditions] = useState([]);

  const getCategoriesList = () => {
    const defaultCats = ["Mental", "Physical", "Chronic", "Endocrine", "Emotional", "Cardiovascular Disease"];
    const dbCats = new Set(defaultCats);
    conditions.forEach((c) => {
      if (c.cat) dbCats.add(c.cat);
    });
    return Array.from(dbCats).sort();
  };

  const getSubcategoriesForCategory = (catName) => {
    const list = new Set(STATIC_SUBCATS[catName] || []);
    conditions.forEach((c) => {
      if (c.cat === catName && c.sub) {
        const subCat = c.sub.split("·")[0]?.trim();
        if (subCat) list.add(subCat);
      }
    });
    return Array.from(list).sort();
  };

  const CAT_MAP = {
    Mental: { name: "Mental Health", emoji: "🧠", color: "#8B5CF6", desc: "Mind therapy, anxiety release, focus & peak cognition" },
    Physical: { name: "Physical Healing", emoji: "⚡", color: "#00D1FF", desc: "Body restoration, chronic pain relief & cellular repair" },
    Chronic: { name: "Chronic Care", emoji: "🦴", color: "#F5B041", desc: "Joint support, structural integrity & somatic release" },
    Endocrine: { name: "Endocrine Harmony", emoji: "🦋", color: "#06b6d4", desc: "Hormonal balance, thyroid field & master endocrine glands" },
    Emotional: { name: "Emotional Release", emoji: "💙", color: "#3b82f6", desc: "Grief processing, heart chakra & self-esteem repair" },
    "Cardiovascular Disease": { name: "Cardiovascular Disease", emoji: "❤️", color: "#ec4899", desc: "Arterial calming and autonomic system balance" }
  };

  const [categoryMeta, setCategoryMeta] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const getCatDetails = (catName) => {
    const metaRow = categoryMeta.find(r => r.cat === catName);
    if (metaRow) {
      return {
        name: metaRow.title || catName,
        emoji: metaRow.emoji || "✨",
        color: metaRow.color || "#ec4899",
        desc: metaRow.science || "Custom sound targets"
      };
    }
    return CAT_MAP[catName] || { name: catName, emoji: "✨", color: "#ec4899", desc: "Custom sound targets" };
  };
  const [solfeggio, setSolfeggio] = useState([]);
  const [brainwaves, setBrainwaves] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [creatingItem, setCreatingItem] = useState(null);
  const [selectedPolicyTab, setSelectedPolicyTab] = useState("privacy_policy");
  const [policyForm, setPolicyForm] = useState({
    title: "",
    content: "",
    titleHi: "",
    contentHi: ""
  });
  const [contactForm, setContactForm] = useState({
    email: "support@mantrapuja.com",
    phone: "",
    website: ""
  });

  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setAdminUser(session.user);
        }
      } catch (err) {
        console.warn("Auth check error:", err.message);
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setAdminUser(session.user);
      } else {
        setAdminUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail.trim(),
        password: adminPassword,
      });
      if (error) throw error;
      setAdminUser(data.user);
    } catch (err) {
      setLoginError(err.message || "Invalid login credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await supabase.auth.signOut();
      setAdminUser(null);
    } catch (err) {
      console.warn("Logout error:", err.message);
    }
  };
  const [activeLocale, setActiveLocale] = useState("en");
  const [translating, setTranslating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingUser, setSavingUser] = useState(false);
  const [toast, setToast] = useState(null);

  // R2 credentials stored in localStorage
  const [r2KeyId, setR2KeyId] = useState("");
  const [r2Secret, setR2Secret] = useState("");
  const [r2CredentialsMissing, setR2CredentialsMissing] = useState(false);

  // File upload state variables
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Music library states
  const [musicFiles, setMusicFiles] = useState([]);
  const [loadingMusic, setLoadingMusic] = useState(false);
  const [generalUploading, setGeneralUploading] = useState(false);
  const [generalProgress, setGeneralProgress] = useState(0);

  // Selected configuration of home screen sections visibility
  const [sectionsConfig, setSectionsConfig] = useState({ suggested: true, featured: true, recents: true });

  // Local state for membership plans
  const [localPlans, setLocalPlans] = useState([]);
  const [localCurrency, setLocalCurrency] = useState("USDT");

  // Sync sectionsConfig and plans Config whenever categoryMeta changes or is fetched
  useEffect(() => {
    const row = categoryMeta.find(c => c.id === "category_meta:home_sections");
    if (row && row.translations && row.translations.sections) {
      setSectionsConfig(row.translations.sections);
    }
    const plansRow = categoryMeta.find(c => c.id === "category_meta:plans");
    if (plansRow && plansRow.translations) {
      if (plansRow.translations.plans) {
        setLocalPlans(plansRow.translations.plans);
      }
      if (plansRow.translations.currency) {
        setLocalCurrency(plansRow.translations.currency);
      }
    }
  }, [categoryMeta]);

  // Sync policy inputs when selected tab or categoryMeta changes
  useEffect(() => {
    if (selectedPolicyTab === "get_in_touch") return;
    const policyId = `category_meta:${selectedPolicyTab}`;
    const policyRow = categoryMeta.find(c => c.id === policyId);
    if (policyRow) {
      setPolicyForm({
        title: policyRow.title || "",
        content: policyRow.science || "",
        titleHi: policyRow.translations?.hi?.title || "",
        contentHi: policyRow.translations?.hi?.science || ""
      });
    } else {
      const defaultTitles = {
        privacy_policy: "Privacy Policy",
        terms_of_service: "Terms of Service",
        refund_policy: "Refund Policy"
      };
      setPolicyForm({
        title: defaultTitles[selectedPolicyTab] || "",
        content: "",
        titleHi: "",
        contentHi: ""
      });
    }
  }, [selectedPolicyTab, categoryMeta]);

  // Sync contactForm when categoryMeta changes
  useEffect(() => {
    const touchRow = categoryMeta.find(c => c.id === "category_meta:get_in_touch");
    if (touchRow) {
      setContactForm({
        email: touchRow.translations?.email || "support@mantrapuja.com",
        phone: touchRow.translations?.phone || "",
        website: touchRow.translations?.website || ""
      });
    }
  }, [categoryMeta]);

  // Save Get in Touch contact settings to database
  const handleSaveContactInfo = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const submitData = {
        id: "category_meta:get_in_touch",
        cat: "Metadata",
        sub: "Category · Metadata",
        emoji: "📞",
        color: "#F5B041",
        title: "Get in Touch",
        science: "Contact configuration",
        translations: {
          email: contactForm.email,
          phone: contactForm.phone,
          website: contactForm.website
        }
      };

      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "conditions",
          action: "upsert",
          data: submitData
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to save contact info.");

      showToast(`Contact information updated successfully!`);
      fetchData();
    } catch (error) {
      showToast(`Error saving contact info: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save policy settings to database
  const handleSavePolicy = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const emojiMap = {
        privacy_policy: "🛡️",
        terms_of_service: "📄",
        refund_policy: "🔄"
      };
      const colorMap = {
        privacy_policy: "#8B5CF6",
        terms_of_service: "#00D1FF",
        refund_policy: "#F5B041"
      };
      const titleMap = {
        privacy_policy: "Privacy Policy",
        terms_of_service: "Terms of Service",
        refund_policy: "Refund Policy"
      };

      let submitData = {
        id: `category_meta:${selectedPolicyTab}`,
        cat: "Metadata",
        sub: "Category · Metadata",
        emoji: emojiMap[selectedPolicyTab],
        color: colorMap[selectedPolicyTab],
        title: policyForm.title || titleMap[selectedPolicyTab],
        science: policyForm.content,
        translations: {
          hi: {
            title: policyForm.titleHi,
            science: policyForm.contentHi
          },
          en: {
            title: policyForm.title,
            science: policyForm.content
          }
        }
      };

      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "conditions",
          action: "upsert",
          data: submitData
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to save policy.");

      showToast(`Policy updated successfully!`);
      fetchData();
    } catch (error) {
      showToast(`Error saving policy: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save updated membership plans to database
  const handleSavePlans = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "conditions",
          action: "upsert",
          data: {
            id: "category_meta:plans",
            cat: "Metadata",
            title: "Membership Plans Configuration",
            sub: "Category · Metadata",
            emoji: "💎",
            color: "#8b5cf6",
            science: "Membership tiers editable config",
            freqs: [],
            translations: { plans: localPlans, currency: localCurrency }
          }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to save plans.");

      showToast("Membership pricing plans saved and updated successfully!");
      fetchData();
    } catch (error) {
      showToast(`Error saving plans: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Fetch all data from Supabase
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch conditions & solfeggio using parallel promises
      const [condsRes, solfsRes] = await Promise.all([
        supabase
          .from("conditions")
          .select("*")
          .order("title"),
        supabase
          .from("solfeggio")
          .select("*")
          .order("hz")
      ]);

      const { data: conds, error: condsErr } = condsRes;
      const { data: solfs, error: solfsErr } = solfsRes;

      if (condsErr) throw condsErr;
      if (solfsErr) throw solfsErr;

      // Resiliently fetch brainwaves from Supabase in the background
      try {
        const { data: bws, error: bwsErr } = await supabase
          .from("brainwaves")
          .select("*")
          .order("name");
        if (bwsErr) throw bwsErr;
        setBrainwaves(bws || []);
      } catch (bwErr) {
        console.warn("Failed to fetch brainwaves (table might not exist yet):", bwErr.message);
      }

      // 2. Fetch profiles with auth metadata from our new server API route
      let mergedProfiles = [];
      try {
        const profsRes = await fetch("/api/users");
        if (profsRes.ok) {
          const profsData = await profsRes.json();
          mergedProfiles = profsData.users || [];
        } else {
          // Fallback to anonymous client if route fails or isn't built yet
          const { data: profs, error: profsErr } = await supabase
            .from("profiles")
            .select("*")
            .order("email");
          if (profsErr) throw profsErr;
          mergedProfiles = profs || [];
        }
      } catch (err) {
        console.warn("Profiles server-route load error (falling back):", err);
        const { data: profs, error: profsErr } = await supabase
          .from("profiles")
          .select("*")
          .order("email");
        if (profsErr) throw profsErr;
        mergedProfiles = profs || [];
      }

      const rawConditions = (conds || []).filter(c => !c.id.startsWith("category_meta:"));
      const rawMeta = (conds || []).filter(c => c.id.startsWith("category_meta:"));
      setConditions(rawConditions);
      setCategoryMeta(rawMeta);
      setSolfeggio(solfs || []);
      setProfiles(mergedProfiles);
    } catch (error) {
      showToast(`Error fetching data: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Load R2 keys from localStorage on mount
    const key = localStorage.getItem("r2_access_key_id") || "";
    const secret = localStorage.getItem("r2_secret_access_key") || "";
    setR2KeyId(key);
    setR2Secret(secret);
    
    // Fetch music files right away for dropdown select list usage
    const fetchMusicFilesOnMount = async (kid, sec) => {
      try {
        const headers = {
          ...(kid ? { "x-r2-access-key-id": kid } : {}),
          ...(sec ? { "x-r2-secret-access-key": sec } : {}),
        };
        const res = await fetch("/api/music", {
          method: "GET",
          headers,
        });
        if (res.status === 200) {
          const data = await res.json();
          setMusicFiles(data.files || []);
          setR2CredentialsMissing(false);
        } else if (res.status === 401) {
          setR2CredentialsMissing(true);
        }
      } catch (_) {
        // Silent catch
      }
    };
    fetchMusicFilesOnMount(key, secret);
  }, []);

  useEffect(() => {
    if (activeTab === "music") {
      fetchMusicFiles();
    }
  }, [activeTab, r2KeyId, r2Secret]);

  const saveR2Settings = (e) => {
    e.preventDefault();
    localStorage.setItem("r2_access_key_id", r2KeyId);
    localStorage.setItem("r2_secret_access_key", r2Secret);
    setR2CredentialsMissing(false);
    showToast("Cloudflare R2 credentials saved locally!");
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Upload music file to Cloudflare R2
  const handleUploadFile = async (e, targetObject, setTargetObject) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const headers = {
        ...(r2KeyId ? { "x-r2-access-key-id": r2KeyId } : {}),
        ...(r2Secret ? { "x-r2-secret-access-key": r2Secret } : {}),
      };

      const uploadData = await uploadFileWithProgress(file, headers, (percent) => {
        setUploadProgress(percent);
      });

      setR2CredentialsMissing(false);
      showToast("Audio track uploaded to R2 successfully!");

      // Update local edit form state with R2 URL
      setTargetObject({
        ...targetObject,
        audio_url: uploadData.publicUrl,
      });
    } catch (err) {
      if (err.message.includes("401")) {
        setR2CredentialsMissing(true);
      }
      showToast(`Upload failed: ${err.message}`, "error");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Create new condition
  const handleCreateCondition = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const parsedFreqs = typeof creatingItem.freqs === "string" 
        ? JSON.parse(creatingItem.freqs) 
        : creatingItem.freqs;

      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "conditions",
          action: "insert",
          data: {
            id: creatingItem.id.trim().toLowerCase(),
            title: creatingItem.title,
            sub: creatingItem.sub,
            cat: creatingItem.cat,
            emoji: creatingItem.emoji,
            free: creatingItem.free,
            duration: parseInt(creatingItem.duration) || 30,
            color: creatingItem.color,
            binaural: parseFloat(creatingItem.binaural) || 10,
            instruments: creatingItem.instruments,
            protocol: creatingItem.protocol,
            tip: creatingItem.tip,
            science: creatingItem.science,
            audio_url: creatingItem.audio_url,
            freqs: parsedFreqs,
            translations: creatingItem.translations || null,
          }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to create condition.");

      showToast("New condition created!");
      setCreatingItem(null);
      fetchData();
    } catch (error) {
      showToast(`Error creating condition: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save modified condition
  const handleSaveCondition = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const parsedFreqs = typeof editingItem.freqs === "string" 
        ? JSON.parse(editingItem.freqs) 
        : editingItem.freqs;

      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "conditions",
          action: "update",
          query: { id: editingItem.id },
          data: {
            title: editingItem.title,
            sub: editingItem.sub,
            cat: editingItem.cat,
            emoji: editingItem.emoji,
            free: editingItem.free,
            duration: parseInt(editingItem.duration),
            color: editingItem.color,
            binaural: parseFloat(editingItem.binaural),
            instruments: editingItem.instruments,
            protocol: editingItem.protocol,
            tip: editingItem.tip,
            science: editingItem.science,
            audio_url: editingItem.audio_url,
            freqs: parsedFreqs,
            translations: editingItem.translations || null,
          }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to update condition.");

      showToast("Condition updated successfully!");
      setEditingItem(null);
      setActiveLocale("en");
      fetchData();
    } catch (error) {
      showToast(`Error saving: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Trigger enterprise auto-translation for all 5 target languages
  const handleAutoTranslateAll = async () => {
    if (!editingItem) return;
    setTranslating(true);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingItem.title || "",
          subCategory: editingItem._subCategory || editingItem.sub?.split("·")[0]?.trim() || "",
          subDetail: editingItem._subDetail || editingItem.sub?.split("·").slice(1).join("·").trim() || "",
          protocol: editingItem.protocol || "",
          tip: editingItem.tip || "",
          science: editingItem.science || "",
          freqs: typeof editingItem.freqs === "string" ? JSON.parse(editingItem.freqs) : (editingItem.freqs || [])
        })
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || "Failed to auto-translate");

      setEditingItem({
        ...editingItem,
        translations: resData.translations
      });
      showToast("All languages auto-translated successfully!");
    } catch (err) {
      showToast(`Translation failed: ${err.message}`, "error");
    } finally {
      setTranslating(false);
    }
  };

  const updateTranslationField = (lang, field, value) => {
    const translations = editingItem?.translations ? { ...editingItem.translations } : {};
    if (!translations[lang]) {
      translations[lang] = {};
    }
    translations[lang][field] = value;
    setEditingItem({
      ...editingItem,
      translations
    });
  };

  const updateTranslationPhaseField = (lang, index, key, value) => {
    const translations = editingItem?.translations ? { ...editingItem.translations } : {};
    if (!translations[lang]) {
      translations[lang] = {};
    }
    if (!Array.isArray(translations[lang].freqs)) {
      let standardFreqs = [];
      try {
        standardFreqs = typeof editingItem.freqs === "string" ? JSON.parse(editingItem.freqs) : (editingItem.freqs || []);
      } catch (e) {}
      translations[lang].freqs = standardFreqs.map(f => ({ ...f }));
    }
    if (translations[lang].freqs[index]) {
      translations[lang].freqs[index] = {
        ...translations[lang].freqs[index],
        [key]: value
      };
    }
    setEditingItem({
      ...editingItem,
      translations
    });
  };

  // Save modified category configurations
  const handleSaveCategoryMeta = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const rowId = `category_meta:${editingCategory.cat}`;
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "conditions",
          action: "upsert",
          data: {
            id: rowId,
            cat: editingCategory.cat,
            title: editingCategory.name,
            emoji: editingCategory.emoji,
            color: editingCategory.color,
            science: editingCategory.desc,
            sub: "Category · Metadata"
          }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to update category details.");

      showToast(`Category "${editingCategory.name}" details updated successfully!`);
      setEditingCategory(null);
      fetchData();
    } catch (error) {
      showToast(`Error updating category: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Delete condition
  const handleDeleteCondition = async (id) => {
    if (!window.confirm("Are you sure you want to delete this condition permanently?")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "conditions",
          action: "delete",
          query: { id }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to delete condition.");

      showToast("Condition deleted.");
      setEditingItem(null);
      fetchData();
    } catch (error) {
      showToast(`Error deleting: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save modified or new solfeggio frequency
  const handleSaveSolfeggio = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isNew = editingItem._isNew === true;
      const hzVal = parseInt(editingItem.hz);
      if (isNaN(hzVal) || hzVal <= 0) {
        throw new Error("Please enter a valid frequency (Hz).");
      }

      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "solfeggio",
          action: isNew ? "insert" : "update",
          ...(!isNew ? { query: { hz: hzVal } } : {}),
          data: {
            hz: hzVal,
            note: editingItem.note,
            name: editingItem.name,
            action: editingItem.action,
            color: editingItem.color,
            audio_url: editingItem.audio_url,
          }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || `Failed to ${isNew ? "insert" : "update"} Solfeggio.`);

      showToast(isNew ? "New Solfeggio frequency added!" : "Solfeggio scale frequency updated!");
      setEditingItem(null);
      fetchData();
    } catch (error) {
      showToast(`Error saving: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Delete solfeggio frequency
  const handleDeleteSolfeggio = async (hz) => {
    if (!window.confirm(`Are you sure you want to delete the ${hz}Hz frequency scale?`)) return;
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "solfeggio",
          action: "delete",
          query: { hz: hz }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to delete Solfeggio frequency.");

      showToast("Solfeggio frequency deleted successfully!");
      fetchData();
    } catch (error) {
      showToast(`Error deleting Solfeggio: ${error.message}`, "error");
    }
  };

  // Save or Update Brainwave configuration
  const handleSaveBrainwave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isNew = editingItem._isNew === true;
      if (!editingItem.name || !editingItem.name.trim()) {
        throw new Error("Brainwave name is required.");
      }

      // Convert shape from comma-separated string to numerical array
      let shapeArray = [0.5, 0.8, 0.5, 0.8, 0.5, 0.8, 0.5, 0.8]; // default
      if (editingItem.shapeStr) {
        try {
          shapeArray = editingItem.shapeStr.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
          if (shapeArray.length === 0) throw new Error();
        } catch (_) {
          throw new Error("Invalid shape format. Please enter 8 comma-separated numbers (e.g. 0.2, 0.8, 0.2, 0.9, 0.1, 0.7, 0.3, 0.8).");
        }
      } else if (Array.isArray(editingItem.shape)) {
        shapeArray = editingItem.shape;
      }

      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "brainwaves",
          action: isNew ? "insert" : "update",
          ...(!isNew ? { query: { name: editingItem.name.trim() } } : {}),
          data: {
            name: editingItem.name.trim(),
            range: editingItem.range,
            state: editingItem.state,
            color: editingItem.color,
            shape: shapeArray,
            translations: editingItem.translations || {}
          }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to save brainwave configuration.");

      showToast(isNew ? "Brainwave created successfully!" : "Brainwave updated successfully!");
      setEditingItem(null);
      fetchData();
    } catch (error) {
      showToast(`Error saving brainwave: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Delete Brainwave configuration
  const handleDeleteBrainwave = async (name) => {
    if (!window.confirm(`Are you sure you want to delete the ${name} brainwave configuration?`)) return;
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "brainwaves",
          action: "delete",
          query: { name: name }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to delete brainwave.");

      showToast("Brainwave deleted successfully!");
      fetchData();
    } catch (error) {
      showToast(`Error deleting brainwave: ${error.message}`, "error");
    }
  };

  // Update a user's subscription plan manually from database
  const handleUpdateUserPlan = async (userId, newPlan) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          userId,
          data: {
            plan: newPlan
          }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to update user plan.");

      showToast(`User membership plan updated to ${newPlan.toUpperCase()}!`);
      fetchData();
    } catch (error) {
      showToast(`Error updating plan: ${error.message}`, "error");
    }
  };

  // Save modified home screen sections configuration to Supabase metadata row
  const handleSaveHomeSections = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "conditions",
          action: "upsert",
          data: {
            id: "category_meta:home_sections",
            cat: "System",
            title: "Home Sections Config",
            emoji: "⚙️",
            color: "#8B5CF6",
            science: "System configurations for mobile layout sections visibility.",
            sub: "System · Metadata",
            translations: { sections: sectionsConfig }
          }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to update home sections configuration.");

      showToast("Home screen sections layout updated successfully!");
      fetchData();
    } catch (error) {
      showToast(`Error saving configuration: ${error.message}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Verify / Confirm user email manually
  const handleVerifyUser = async (userId) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          userId
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to verify user.");

      showToast("User account verified successfully!");
      if (editingUser) {
        setEditingUser({ ...editingUser, is_verified: true, email_confirmed_at: new Date().toISOString() });
      }
      fetchData();
    } catch (error) {
      showToast(`Error verifying user: ${error.message}`, "error");
    }
  };

  // Save detailed modifications to user profile (streak, plan, email, etc.)
  const handleSaveUserProfile = async (e) => {
    e.preventDefault();
    setSavingUser(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          userId: editingUser.id,
          data: {
            plan: editingUser.plan,
            streak: parseInt(editingUser.streak) || 0,
            sessions: parseInt(editingUser.sessions) || 0,
            email: editingUser.email,
            phone: editingUser.phone
          }
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to update user profile.");

      showToast("User profile updated successfully!");
      setEditingUser(null);
      fetchData();
    } catch (error) {
      showToast(`Error saving profile: ${error.message}`, "error");
    } finally {
      setSavingUser(false);
    }
  };

  // Delete user permanently from auth and database
  const handleDeleteUser = async (userId, userEmail) => {
    if (!window.confirm(`⚠️ WARNING: Are you absolutely sure you want to permanently delete user "${userEmail || 'unknown'}"?\n\nThis will destroy both their Auth account and database profile. This cannot be undone!`)) return;
    
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          userId
        })
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to delete user.");

      showToast("User permanently deleted.");
      setEditingUser(null);
      fetchData();
    } catch (error) {
      showToast(`Error deleting user: ${error.message}`, "error");
    }
  };

  // Fetch all R2 music files
  const fetchMusicFiles = async () => {
    setLoadingMusic(true);
    try {
      const headers = {
        ...(r2KeyId ? { "x-r2-access-key-id": r2KeyId } : {}),
        ...(r2Secret ? { "x-r2-secret-access-key": r2Secret } : {}),
      };
      const res = await fetch("/api/music", {
        method: "GET",
        headers,
      });
      if (res.status === 401) {
        setR2CredentialsMissing(true);
        throw new Error("R2 credentials not configured");
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch music files");
      setR2CredentialsMissing(false);
      setMusicFiles(data.files || []);
    } catch (error) {
      showToast(`Error fetching music: ${error.message}`, "error");
    } finally {
      setLoadingMusic(false);
    }
  };

  // Delete an audio track from R2
  const handleDeleteMusicFile = async (fileKey) => {
    if (!window.confirm("Are you sure you want to delete this audio track from Cloudflare R2? This cannot be undone and will break any sessions using this link!")) return;
    try {
      const headers = {
        ...(r2KeyId ? { "x-r2-access-key-id": r2KeyId } : {}),
        ...(r2Secret ? { "x-r2-secret-access-key": r2Secret } : {}),
      };
      const res = await fetch(`/api/music?key=${encodeURIComponent(fileKey)}`, {
        method: "DELETE",
        headers,
      });
      if (res.status === 401) {
        setR2CredentialsMissing(true);
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete file");
      setR2CredentialsMissing(false);
      showToast("Audio track deleted from Cloudflare R2!");
      fetchMusicFiles();
    } catch (error) {
      showToast(`Error deleting music: ${error.message}`, "error");
    }
  };

  // Upload an audio track to R2
  const handleGeneralUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setGeneralUploading(true);
    setGeneralProgress(0);

    try {
      const headers = {
        ...(r2KeyId ? { "x-r2-access-key-id": r2KeyId } : {}),
        ...(r2Secret ? { "x-r2-secret-access-key": r2Secret } : {}),
      };

      const uploadData = await uploadFileWithProgress(file, headers, (percent) => {
        setGeneralProgress(percent);
      });

      setR2CredentialsMissing(false);
      showToast(`"${file.name}" uploaded successfully!`);
      fetchMusicFiles();
    } catch (err) {
      if (err.message.includes("401")) {
        setR2CredentialsMissing(true);
      }
      showToast(`Upload failed: ${err.message}`, "error");
    } finally {
      setGeneralUploading(false);
      setTimeout(() => setGeneralProgress(0), 1000);
    }
  };

  // Init empty fields for new condition form
  const initNewCondition = () => {
    setCreatingItem({
      id: "",
      title: "",
      sub: "General · Baseline",
      _subCategory: "General",
      _subDetail: "Baseline",
      cat: "Mental",
      emoji: "🧠",
      free: false,
      duration: 30,
      color: "#8B5CF6",
      binaural: 10.0,
      instruments: "Singing bowls · Drone",
      protocol: "Listen for 20-30 minutes daily with headphones.",
      tip: "Close your eyes and breathe deeply.",
      science: "Frequencies sync neural oscillations to target state.",
      audio_url: "",
      freqs: JSON.stringify([
        { hz: 432, label: "432 Hz", role: "Primary", effect: "Grounding and calming" },
        { hz: 528, label: "528 Hz", role: "Support", effect: "Cellular renewal" }
      ], null, 2)
    });
  };

  const initNewSubcategoryForCategory = (catKey) => {
    const details = getCatDetails(catKey);
    setCreatingItem({
      id: "",
      title: "",
      sub: "",
      _subCategory: "",
      _subDetail: "",
      _isNewSub: true,
      cat: catKey,
      emoji: details.emoji || "✨",
      free: false,
      duration: 30,
      color: details.color || "#8B5CF6",
      binaural: 10.0,
      instruments: "Singing bowls · Drone",
      protocol: "Listen for 20-30 minutes daily with headphones.",
      tip: "Close your eyes and breathe deeply.",
      science: "Frequencies sync neural oscillations to target state.",
      audio_url: "",
      freqs: JSON.stringify([
        { hz: 432, label: "432 Hz", role: "Primary", effect: "Grounding and calming" },
        { hz: 528, label: "528 Hz", role: "Support", effect: "Cellular renewal" }
      ], null, 2)
    });
  };

  // Calculated widgets data
  const totalFreeConditions = conditions.filter(c => c.free).length;
  const totalProConditions = conditions.filter(c => !c.free).length;
  const conditionsWithAudio = conditions.filter(c => c.audio_url).length;
  const solfeggioWithAudio = solfeggio.filter(s => s.audio_url).length;
  const audioCompletenessPct = conditions.length > 0 
    ? Math.round((conditionsWithAudio / conditions.length) * 100) 
    : 0;

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#070707] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#8B5CF6] border-t-transparent animate-spin" />
        <p className="text-white/40 text-xs tracking-widest font-bold uppercase">Verifying Admin Session...</p>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-[#070707] text-white font-sans flex flex-col justify-center items-center relative overflow-hidden px-4">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[70%] rounded-full bg-radial from-[#8B5CF6]/15 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[75%] rounded-full bg-radial from-[#00D1FF]/12 via-transparent to-transparent pointer-events-none z-0" />

        <div className="w-full max-w-md bg-[#0B0B0B]/85 border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_0_80px_rgba(139,92,246,0.12)] backdrop-blur-xl relative z-10 flex flex-col items-center">
          <span className="text-5xl filter drop-shadow-[0_0_12px_rgba(139,92,246,0.5)] mb-4">🧘</span>
          <h1 className="text-2xl font-extrabold tracking-widest text-white uppercase mb-1 text-center">
            MANTRA<span className="text-[#8B5CF6]">HILLING</span>
          </h1>
          <p className="text-[10px] text-white/40 tracking-widest font-bold uppercase mb-8">Admin Portal Access</p>

          <form onSubmit={handleAdminLogin} className="w-full space-y-6">
            <div>
              <label className="block text-xs text-white/50 mb-2 uppercase font-extrabold tracking-wider">Admin Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:border-[#00D1FF] outline-none text-sm font-mono h-[48px]"
                placeholder="email@domain.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-2 uppercase font-extrabold tracking-wider">Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:border-[#8B5CF6] outline-none text-sm font-mono h-[48px]"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError ? (
              <p className="text-xs text-red-400 font-bold bg-red-950/20 border border-red-500/20 rounded-xl p-3.5 text-center leading-relaxed">
                ⚠️ {loginError}
              </p>
            ) : null}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-[#00D1FF] to-[#8B5CF6] text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-lg shadow-[#8B5CF6]/15 hover:opacity-95 transition-all flex items-center justify-center gap-2 h-[48px]"
              >
                {loginLoading ? (
                  <div className="w-4 h-4 rounded-full border border-white border-t-transparent animate-spin" />
                ) : (
                  "ENTER SANCTUARY CONTROL ⚡"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-[#E5E5E5] font-sans antialiased relative overflow-hidden flex flex-col lg:flex-row">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-15%] w-[40%] h-[55%] rounded-full bg-radial from-[#8B5CF6]/12 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-radial from-[#00D1FF]/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* Backdrop overlay for mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-35 lg:hidden transition-opacity duration-300 animate-fade-in"
        />
      )}

      {/* Premium Cinematic Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 bg-[#0B0B0B] border-r border-white/5 flex flex-col justify-between p-7 z-40 shrink-0 select-none shadow-[10px_0_40px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out lg:static lg:translate-x-0 lg:bg-[#0B0B0B]/85 lg:backdrop-blur-xl ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-10">
          {/* Brand Header */}
          <div className="flex items-center justify-between py-2 border-b border-white/5 lg:border-0 pb-4 lg:pb-0">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl filter drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]">🧘</span>
              <div>
                <h1 className="text-xl font-extrabold tracking-widest text-white uppercase font-sans">
                  MANTRA<span className="text-[#8B5CF6]">HILLING</span>
                </h1>
                <p className="text-[10px] text-white/40 tracking-widest font-semibold uppercase">Studio control center</p>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 lg:hidden text-white/40 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {[
              { id: "dashboard", label: "Dashboard Hub", icon: "📊" },
              { id: "conditions", label: "Conditions & Targets", icon: "🧠" },
              { id: "solfeggio", label: "Solfeggio Scale", icon: "🎼" },
              { id: "brainwaves", label: "Brainwaves Manager", icon: "🌊" },
              { id: "music", label: "Music Library", icon: "🎵" },
              { id: "users", label: "User Profiles", icon: "👤" },
              { id: "plans", label: "Membership Plans", icon: "💎" },
              { id: "sections", label: "Section Control", icon: "⚙️" },
              { id: "get_in_touch", label: "Get in Touch", icon: "📞" },
              { id: "policies", label: "Legal Policies", icon: "🛡️" },
              { id: "r2", label: "Cloudflare R2 Storage", icon: "☁️" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setEditingItem(null);
                    setCreatingItem(null);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all relative overflow-hidden group ${
                    isActive
                      ? "bg-gradient-to-r from-[#8B5CF6]/15 to-transparent border-l-4 border-[#8B5CF6] text-white shadow-[0_0_25px_rgba(139,92,246,0.1)]"
                      : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
                  }`}
                >
                  <span className={`text-lg transition-transform ${isActive ? "scale-110" : "opacity-60 group-hover:scale-105"}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="border-t border-white/5 pt-6 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-white/30 font-bold uppercase tracking-wider">
            <span>Supabase Sync</span>
            <span className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> connected
            </span>
          </div>

          <button
            onClick={handleAdminLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl text-[10px] font-extrabold uppercase tracking-widest hover:bg-red-950/50 hover:border-red-500 transition-all mt-2"
          >
            Sign Out Session 🚪
          </button>

          <p className="text-[10px] text-white/20">MantraHilling Event Engine v1.0</p>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-y-auto h-screen relative z-10 px-6 py-6 lg:px-10 lg:py-10">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between lg:hidden bg-[#0B0B0B]/85 backdrop-blur-md border border-white/5 rounded-2xl px-5 py-4 mb-6 sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">🧘</span>
            <span className="text-sm font-extrabold tracking-widest text-white uppercase font-sans">
              MANTRA<span className="text-[#8B5CF6]">HILLING</span>
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Toast alerts */}
        {toast && (
          <div
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl border text-sm font-semibold z-50 shadow-2xl animate-fade-in-up flex items-center gap-3 backdrop-blur-xl ${
              toast.type === "error"
                ? "bg-red-950/80 border-red-500/30 text-red-200"
                : "bg-emerald-950/80 border-emerald-500/30 text-emerald-200"
            }`}
          >
            <span>{toast.type === "error" ? "⚠️" : "✓"}</span>
            {toast.message}
          </div>
        )}

        {/* Loading indicators */}
        {loading && activeTab !== "r2" ? (
          <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#8B5CF6] border-t-transparent animate-spin" />
            <p className="text-white/40 text-xs tracking-widest font-bold uppercase">fetching database data...</p>
          </div>
        ) : (
          <div>
            {/* VIEW A: DASHBOARD HUB */}
            {activeTab === "dashboard" && (
              <div className="space-y-10 animate-fade-in">
                {/* Greeting banner */}
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                    Control Center Overview
                  </h2>
                  <p className="text-sm text-white/40 mt-1">Real-time telemetry and database management system.</p>
                </div>

                {/* Stats cards grids */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Conditions count */}
                  <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm shadow-xl">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-radial from-[#8B5CF6]/15 via-transparent to-transparent pointer-events-none" />
                    <p className="text-white/40 text-xs uppercase font-extrabold tracking-wider">Conditions</p>
                    <h3 className="text-4xl font-extrabold text-white mt-3 font-mono">{conditions.length}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/40 mt-4 font-semibold">
                      <span className="text-emerald-400">{totalFreeConditions} Free</span>
                      <span>•</span>
                      <span className="text-[#8B5CF6]">{totalProConditions} Pro</span>
                    </div>
                  </div>

                  {/* Card 2: Solfeggio count */}
                  <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm shadow-xl">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-radial from-[#00D1FF]/15 via-transparent to-transparent pointer-events-none" />
                    <p className="text-white/40 text-xs uppercase font-extrabold tracking-wider">Solfeggio Scales</p>
                    <h3 className="text-4xl font-extrabold text-white mt-3 font-mono">{solfeggio.length}</h3>
                    <div className="text-[10px] text-white/40 mt-4 font-semibold">
                      Fundamental Solfeggio Scale frequencies
                    </div>
                  </div>

                  {/* Card 3: Users count */}
                  <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm shadow-xl">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-radial from-[#F5B041]/15 via-transparent to-transparent pointer-events-none" />
                    <p className="text-white/40 text-xs uppercase font-extrabold tracking-wider">Active Profiles</p>
                    <h3 className="text-4xl font-extrabold text-white mt-3 font-mono">{profiles.length}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/40 mt-4 font-semibold">
                      <span className="text-[#F5B041]">
                        {profiles.filter(p => p.plan === "pro" || p.plan === "divine").length} Premium Users
                      </span>
                    </div>
                  </div>

                  {/* Card 4: Audio coverage pct */}
                  <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm shadow-xl">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-radial from-[#00D1FF]/15 via-transparent to-transparent pointer-events-none" />
                    <p className="text-white/40 text-xs uppercase font-extrabold tracking-wider">Audio Upload Coverage</p>
                    <h3 className="text-4xl font-extrabold text-white mt-3 font-mono">{audioCompletenessPct}%</h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/40 mt-4 font-semibold">
                      <span className="text-[#00D1FF] font-medium">{conditionsWithAudio} / {conditions.length} conditions linked</span>
                    </div>
                  </div>
                </div>

                {/* Subsections: Databases check status & Active uploads list */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Database Integrity Card */}
                  <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-6 lg:col-span-1 shadow-lg">
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-6">Database Health</h4>
                    <div className="space-y-4">
                      {[
                        { name: "Conditions Data", count: `${conditions.length} rows`, status: conditions.length > 0 },
                        { name: "Solfeggio Scale", count: `${solfeggio.length} rows`, status: solfeggio.length > 0 },
                        { name: "User Profiles", count: `${profiles.length} registered`, status: true }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                          <div>
                            <p className="text-xs font-semibold text-white/80">{item.name}</p>
                            <p className="text-[10px] text-white/40 font-mono mt-0.5">{item.count}</p>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${item.status ? "bg-emerald-950/50 text-emerald-400 border border-emerald-500/20" : "bg-red-950/50 text-red-400 border border-red-500/20"}`}>
                            {item.status ? "SEEDED" : "EMPTY"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Audio Hosting Check Status */}
                  <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-6 lg:col-span-2 shadow-lg">
                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-6">Cloudflare R2 Hosting Status</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/25 rounded-2xl p-4 border border-white/[0.02]">
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Conditions Tracks</p>
                        <p className="text-3xl font-extrabold text-white mt-1 font-mono">{conditionsWithAudio}</p>
                        <p className="text-[10px] text-white/40 mt-2 font-medium">Uploaded to `hilling/music/` and linked</p>
                      </div>
                      <div className="bg-black/25 rounded-2xl p-4 border border-white/[0.02]">
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Solfeggio Tracks</p>
                        <p className="text-3xl font-extrabold text-white mt-1 font-mono">{solfeggioWithAudio}</p>
                        <p className="text-[10px] text-white/40 mt-2 font-medium">Uploaded to `hilling/music/` and linked</p>
                      </div>
                    </div>
                    <div className="mt-5 p-4 bg-[#8B5CF6]/5 border border-[#8B5CF6]/15 rounded-2xl">
                      <p className="text-xs text-white/70 leading-relaxed font-semibold">
                        💡 **Hybrid Sound Synthesis Engine**: When the mobile app plays a session, it streams the background audio MP3 from Cloudflare R2 bucket while synthesizing precise binaural brainwave frequencies locally in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW B: CONDITIONS MANAGER */}
            {activeTab === "conditions" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                      Conditions & Wellness Targets
                    </h2>
                    <p className="text-sm text-white/40 mt-1">Configure frequencies, instructions, and media uploads.</p>
                  </div>
                  <button
                    onClick={initNewCondition}
                    className="bg-gradient-to-r from-[#8B5CF6] to-[#6366f1] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-2xl shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all"
                  >
                    + Add New Condition
                  </button>
                </div>

                {/* Category Filtering Tab Bar */}
                <div className="flex flex-wrap gap-2.5 pb-4 border-b border-white/5">
                  {["All", ...getCategoriesList().filter(c => c !== "Metadata")].map((cat) => {
                    const isActive = selectedAdminCat === cat;
                    const catLabels = {
                      All: "All Sanctuaries 🌐",
                      Mental: "Mental Health 🧠",
                      Physical: "Physical Healing ⚡",
                      Chronic: "Chronic Care 🦴",
                      Endocrine: "Endocrine Harmony 🦋",
                      Emotional: "Emotional Release 💙",
                      "Cardiovascular Disease": "Cardiovascular ❤️"
                    };
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedAdminCat(cat)}
                        className={`px-4.5 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all border ${
                          isActive
                            ? "bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                            : "bg-white/[0.02] border-white/10 text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
                        }`}
                      >
                        {catLabels[cat] || cat}
                      </button>
                    );
                  })}
                </div>

                {/* Hierarchical Subcategory List */}
                <div className="space-y-16">
                  {(() => {
                    const filteredConditions = selectedAdminCat === "All"
                      ? conditions
                      : conditions.filter(c => c.cat === selectedAdminCat);

                    if (filteredConditions.length === 0) {
                      return (
                        <div className="text-center py-20 text-white/20 text-sm font-semibold italic border border-dashed border-white/10 rounded-3xl animate-fade-in">
                          No wellness programs listed in this category sanctuary.
                        </div>
                      );
                    }

                    const catsToRender = selectedAdminCat === "All"
                      ? getCategoriesList().filter(c => c !== "Metadata")
                      : [selectedAdminCat];

                    return catsToRender.map((catKey) => {
                      const catConditions = conditions.filter(c => c.cat === catKey);
                      if (catConditions.length === 0) return null;

                      const details = getCatDetails(catKey);

                      // Group conditions dynamically by subcategory
                      const subCategoryGroups = {};
                      catConditions.forEach((item) => {
                        const subCatName = item.sub ? item.sub.split("·")[0]?.trim() : "General Frequencies";
                        if (!subCategoryGroups[subCatName]) {
                          subCategoryGroups[subCatName] = [];
                        }
                        subCategoryGroups[subCatName].push(item);
                      });

                      const subNames = Object.keys(subCategoryGroups).sort();

                      return (
                        <div key={catKey} className="space-y-6 animate-fade-in">
                          {/* Elegant Category Sanctuary Banner */}
                          <div
                            className="bg-[#121212]/80 border-l-4 rounded-3xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm"
                            style={{ borderLeftColor: details.color }}
                          >
                            {/* Accent Glow backdrop */}
                            <div
                              className="absolute inset-0 opacity-10 pointer-events-none"
                              style={{
                                backgroundImage: `linear-gradient(to right, ${details.color}25, transparent)`,
                              }}
                            />
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                              <div className="flex items-center gap-4">
                                <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
                                  {details.emoji}
                                </span>
                                <div>
                                  <h3 className="text-lg font-extrabold text-white uppercase tracking-wider font-sans">
                                    {details.name} Sanctuary
                                  </h3>
                                  <p className="text-xs text-white/50 font-medium mt-0.5">
                                    {details.desc}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <span
                                  className="px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border"
                                  style={{
                                    backgroundColor: `${details.color}15`,
                                    borderColor: `${details.color}30`,
                                    color: details.color,
                                  }}
                                >
                                  {catConditions.length} Sound Targets
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    initNewSubcategoryForCategory(catKey);
                                  }}
                                  className="px-4 py-1.5 bg-[#00D1FF]/10 border border-[#00D1FF]/20 hover:bg-[#00D1FF]/20 hover:border-[#00D1FF]/40 text-[#00D1FF] rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all"
                                >
                                  ➕ Add Sub-Category
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCategory({
                                      cat: catKey,
                                      name: details.name,
                                      emoji: details.emoji,
                                      color: details.color,
                                      desc: details.desc
                                    });
                                  }}
                                  className="px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all"
                                >
                                  ✏️ Edit Details
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Subcategory Grid Layout */}
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {subNames.map((subName) => {
                              return (
                                <div
                                  key={subName}
                                  className="bg-[#0B0B0B]/90 border border-white/5 rounded-[28px] p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:border-white/10 group"
                                >
                                  {/* Subcategory Card Header */}
                                  <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                                    <div className="flex items-center gap-3.5">
                                      <span className="text-2xl filter drop-shadow-[0_0_6px_rgba(255,255,255,0.1)]">
                                        {details.emoji}
                                      </span>
                                      <div>
                                        <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                                          {subName}
                                        </h4>
                                        <p className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">
                                          Pathway Sanctuary Group
                                        </p>
                                      </div>
                                    </div>
                                    <span
                                      className="text-[9px] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider border shrink-0"
                                      style={{
                                        backgroundColor: `${details.color}15`,
                                        borderColor: `${details.color}25`,
                                        color: details.color,
                                      }}
                                    >
                                      {subCategoryGroups[subName].length} Targets
                                    </span>
                                  </div>

                                  {/* Sound Targets nested inside this Card */}
                                  <div className="space-y-5 flex-grow">
                                    {subCategoryGroups[subName].map((item) => (
                                      <div
                                        key={item.id}
                                        className="p-4 bg-black/45 hover:bg-black/65 border border-white/5 hover:border-white/10 transition-all rounded-2xl relative"
                                      >
                                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mb-3">
                                          <div className="flex items-center gap-3">
                                            <span className="text-xl p-2 bg-white/5 border border-white/5 rounded-xl flex-shrink-0">
                                              {item.emoji}
                                            </span>
                                            <div>
                                              <div className="flex items-center gap-2">
                                                <h5 className="font-extrabold text-white text-xs tracking-wide">
                                                  {item.title}
                                                </h5>
                                                <span
                                                  className={`text-[8px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${
                                                    item.free
                                                      ? "bg-emerald-950/40 border-emerald-500/20 text-emerald-400"
                                                      : "bg-[#8B5CF6]/15 border-[#8B5CF6]/20 text-[#c4b5fd]"
                                                  }`}
                                                >
                                                  {item.free ? "FREE" : "PRO"}
                                                </span>
                                              </div>
                                              <p className="text-[9px] text-white/30 font-semibold mt-0.5">
                                                {item.sub.split("·")[1]?.trim() || "Neurological stimulation"}
                                              </p>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-3.5 self-end lg:self-auto flex-shrink-0">
                                            <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">
                                              ⏱ {item.duration} Min
                                            </span>
                                            <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">
                                              🧠 {item.binaural}Hz
                                            </span>
                                            <button
                                              onClick={() => {
                                                const parts = (item.sub || "").split("·");
                                                setEditingItem({
                                                  ...item,
                                                  freqs: JSON.stringify(item.freqs, null, 2),
                                                  _subCategory: parts[0]?.trim() || "",
                                                  _subDetail: parts.slice(1).join("·").trim() || ""
                                                });
                                              }}
                                              className="text-[9px] font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-[#8B5CF6] hover:border-[#8B5CF6] border border-white/10 px-3 py-1.5 rounded-xl transition-all"
                                            >
                                              Configure
                                            </button>
                                          </div>
                                        </div>

                                        {/* Phases & Connected Music R2 track */}
                                        <div className="space-y-3.5 pt-3 border-t border-white/5">
                                          {/* Phases timeline list */}
                                          <div className="space-y-1.5">
                                            <p className="text-[8px] text-white/30 uppercase font-extrabold tracking-wider">
                                              Therapy Sound Phases
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                              {(item.freqs || []).map((f, fIdx) => (
                                                <span
                                                  key={fIdx}
                                                  className="px-1.5 py-0.5 bg-white/[0.02] border border-white/5 text-[8px] rounded text-white/60 font-medium font-mono"
                                                >
                                                  {f.label || `P${fIdx + 1}`}:{" "}
                                                  <span className="text-[#00D1FF]">{f.hz}Hz</span> ({f.duration}m)
                                                </span>
                                              ))}
                                            </div>
                                          </div>

                                          {/* Music Track */}
                                          <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-black/30 border border-white/[0.03] rounded-xl text-[9px]">
                                            <span className="text-white/40 font-bold uppercase tracking-wider flex items-center gap-1">
                                              🎵 Ambient Track:
                                            </span>
                                            {item.audio_url ? (
                                              <span
                                                className="text-[#00D1FF] font-mono truncate max-w-[200px]"
                                                title={item.audio_url}
                                              >
                                                {item.audio_url.split("/").pop()}
                                              </span>
                                            ) : (
                                              <span className="text-white/20 italic">
                                                No ambient music track linked
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {/* VIEW C: SOLFEGGIO SCALES */}
            {activeTab === "solfeggio" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                      Solfeggio Scale Manager
                    </h2>
                    <p className="text-sm text-white/40 mt-1">Configure values, actions, colors, and audio tracks for the scales.</p>
                  </div>
                  <button
                    onClick={() => setEditingItem({ hz: "", note: "", name: "", action: "", color: "#8B5CF6", audio_url: "", _isNew: true })}
                    className="bg-gradient-to-r from-[#00D1FF] to-[#8B5CF6] hover:from-[#00D1FF]/80 hover:to-[#8B5CF6]/80 text-white font-extrabold text-[10px] uppercase tracking-wider px-5 py-3 rounded-2xl shadow-lg transition-all"
                  >
                    + Add Frequency
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {solfeggio.map((item) => (
                    <div
                      key={item.hz}
                      className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm hover:border-[#00D1FF]/25 hover:bg-[#121212]/95 transition-all group shadow-xl"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg border"
                            style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}33`, color: item.color }}
                          >
                            {item.note}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-white text-lg tracking-wide group-hover:text-[#8B5CF6] transition-colors">
                              {item.hz} Hz
                            </h3>
                            <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">{item.name} Frequency</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-white/60 mb-4 min-h-[32px] font-medium leading-relaxed">{item.action}</p>

                      <div className="bg-black/35 rounded-2xl p-4 border border-white/[0.03] mb-4 text-xs">
                        <p className="text-white/30 font-bold mb-1 uppercase tracking-wider text-[9px]">R2 Audio Track Source</p>
                        <p className="font-mono text-[10px] break-all text-[#00D1FF] truncate" title={item.audio_url || "No link"}>
                          {item.audio_url || "⚠️ NO AUDIO FILE LINKED"}
                        </p>
                      </div>

                      <div className="flex justify-end border-t border-white/5 pt-4 gap-2">
                        <button
                          onClick={() => handleDeleteSolfeggio(item.hz)}
                          className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500 px-4 py-2 rounded-xl transition-all"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setEditingItem({ ...item })}
                          className="text-xs font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl hover:border-[#00D1FF] transition-all"
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW: BRAINWAVES MANAGER */}
            {activeTab === "brainwaves" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                      Brainwaves Manager
                    </h2>
                    <p className="text-sm text-white/40 mt-1">Configure range, states, visual shapes, and color themes for the brainwaves.</p>
                  </div>
                  <button
                    onClick={() => setEditingItem({ name: "", range: "", state: "", color: "#8B5CF6", shape: [0.5, 0.8, 0.5, 0.8, 0.5, 0.8, 0.5, 0.8], shapeStr: "0.5, 0.8, 0.5, 0.8, 0.5, 0.8, 0.5, 0.8", translations: {}, _isBrainwave: true, _isNew: true })}
                    className="bg-gradient-to-r from-[#00D1FF] to-[#8B5CF6] hover:from-[#00D1FF]/80 hover:to-[#8B5CF6]/80 text-white font-extrabold text-[10px] uppercase tracking-wider px-5 py-3 rounded-2xl shadow-lg transition-all"
                  >
                    + Add Brainwave
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brainwaves.map((item) => (
                    <div
                      key={item.name}
                      className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm hover:border-[#00D1FF]/25 hover:bg-[#121212]/95 transition-all group shadow-xl"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg border"
                            style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}33`, color: item.color }}
                          >
                            {item.name[0]}
                          </div>
                          <div>
                            <h3 className="font-extrabold text-white text-lg tracking-wide group-hover:text-[#8B5CF6] transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Range: {item.range}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-white/60 mb-4 min-h-[32px] font-medium leading-relaxed">{item.state}</p>

                      <div className="bg-black/35 rounded-2xl p-4 border border-white/[0.03] mb-4 text-xs">
                        <p className="text-white/30 font-bold mb-1 uppercase tracking-wider text-[9px]">Waveform Shape Nodes</p>
                        <p className="font-mono text-[10px] break-all text-[#00D1FF] truncate">
                          {Array.isArray(item.shape) ? item.shape.join(", ") : "0.5, 0.8, 0.5, 0.8..."}
                        </p>
                      </div>

                      <div className="flex justify-end border-t border-white/5 pt-4 gap-2">
                        <button
                          onClick={() => handleDeleteBrainwave(item.name)}
                          className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500 px-4 py-2 rounded-xl transition-all"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setEditingItem({ ...item, _isBrainwave: true, shapeStr: Array.isArray(item.shape) ? item.shape.join(", ") : "" })}
                          className="text-xs font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl hover:border-[#00D1FF] transition-all"
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW D: REGISTERED USER PROFILES */}
            {activeTab === "users" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                    Registered Mobile Profiles
                  </h2>
                  <p className="text-sm text-white/40 mt-1">Manage user subscriptions, streaks, and view account analytics.</p>
                </div>

                <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.01] text-xs font-extrabold uppercase tracking-wider text-white/40">
                          <th className="p-6">User Contact</th>
                          <th className="p-6">Verification</th>
                          <th className="p-6">Streak</th>
                          <th className="p-6">Favorites Count</th>
                          <th className="p-6">Current Plan</th>
                          <th className="p-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      {profiles.length === 0 ? (
                        <tbody>
                          <tr>
                            <td colSpan="6" className="p-16 text-center text-white/30 text-sm font-semibold">
                              No registered user profiles found in the database.
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody className="divide-y divide-white/5">
                          {profiles.map((p) => (
                            <tr key={p.id} className="hover:bg-white/[0.01] transition-all border-b border-white/5 last:border-0">
                              <td className="p-6">
                                {p.phone && (
                                  <p className="font-bold text-[#00D1FF] text-sm truncate max-w-[220px]" title={p.phone}>
                                    📞 +91 {p.phone.replace(/^\+?91/, "")}
                                  </p>
                                )}
                                {p.email && !(p.email.startsWith("mantra_") && p.email.endsWith("@gmail.com")) ? (
                                  <p className="text-xs text-white/70 truncate max-w-[220px] mt-1" title={p.email}>
                                    📧 {p.email}
                                  </p>
                                ) : (
                                  !p.phone && <p className="font-bold text-white text-sm truncate max-w-[220px]">📧 No Contact Info</p>
                                )}
                                <p className="text-[10px] text-white/20 font-mono mt-1.5 truncate max-w-[220px]">UUID: {p.id}</p>
                              </td>
                              <td className="p-6">
                                {p.is_verified ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
                                    ✓ Verified
                                  </span>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/40 border border-amber-500/20 text-amber-400">
                                      ⚠️ Unverified
                                    </span>
                                    <button
                                      onClick={() => handleVerifyUser(p.id)}
                                      className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-colors"
                                      title="Manually confirm user's email verification status"
                                    >
                                      Verify Now
                                    </button>
                                  </div>
                                )}
                              </td>
                              <td className="p-6 text-sm font-semibold font-mono text-white/80">
                                {p.streak || 0} 🔥
                              </td>
                              <td className="p-6 text-sm font-semibold font-mono text-white/80">
                                {p.favorites ? p.favorites.length : 0} favs
                              </td>
                              <td className="p-6">
                                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${
                                  p.plan === "free" 
                                    ? "bg-white/5 border-white/10 text-white/60" 
                                    : p.plan === "pro" 
                                    ? "bg-[#8B5CF6]/15 border-[#8B5CF6]/20 text-[#c4b5fd]" 
                                    : "bg-[#ec4899]/15 border-[#ec4899]/20 text-[#fbcfe8]"
                                }`}>
                                  {p.plan || "free"}
                                </span>
                              </td>
                              <td className="p-6 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setEditingUser({ ...p })}
                                    className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-[#8B5CF6] text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-1"
                                    title="Edit user profile statistics, subscriptions, etc."
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(p.id, p.email)}
                                    className="px-3 py-1.5 bg-red-950/20 border border-red-500/20 hover:border-red-500 text-red-400 hover:bg-red-950/50 rounded-xl text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-1"
                                    title="Delete user permanently"
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW E: CLOUDFLARE R2 CREDENTIALS */}
            {activeTab === "r2" && (
              <div className="max-w-xl space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                    Cloudflare R2 Configuration
                  </h2>
                  <p className="text-sm text-white/40 mt-1">Configure local storage authorization for media uploads.</p>
                </div>

                <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-8 backdrop-blur-sm shadow-xl">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">API Keys</h3>
                  <p className="text-xs text-white/40 mb-6 leading-relaxed">
                    These credentials are saved locally inside your browser's LocalStorage to construct signed URLs for uploading audio tracks straight into the `hilling/music/` folder of your bucket.
                  </p>

                  <form onSubmit={saveR2Settings} className="space-y-6">
                    <div>
                      <label className="block text-xs text-white/50 mb-2 uppercase font-extrabold tracking-wider">Access Key ID</label>
                      <input
                        type="text"
                        value={r2KeyId}
                        onChange={(e) => setR2KeyId(e.target.value)}
                        className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:border-[#00D1FF] outline-none text-sm font-mono"
                        placeholder="Enter Cloudflare R2 Access Key ID"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-2 uppercase font-extrabold tracking-wider">Secret Access Key</label>
                      <input
                        type="password"
                        value={r2Secret}
                        onChange={(e) => setR2Secret(e.target.value)}
                        className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:border-[#00D1FF] outline-none text-sm font-mono"
                        placeholder="Enter Cloudflare R2 Secret Access Key"
                        required
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#00D1FF] to-[#8B5CF6] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-lg shadow-[#8B5CF6]/15 hover:opacity-95 transition-all"
                      >
                        Save Configuration Settings
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl p-8 backdrop-blur-sm shadow-xl space-y-4">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="text-[#00D1FF]">🌐</span> Cloudflare R2 CORS Configuration
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed font-semibold">
                    To upload audio tracks directly from your web browser to Cloudflare R2 securely and with a real-time progress bar, you must enable a **CORS Policy** on your R2 bucket.
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-extrabold text-white/70 uppercase tracking-wider">How to configure:</p>
                    <ol className="list-decimal list-inside text-xs text-white/50 space-y-2 pl-1 font-medium font-sans">
                      <li>Log in to your <strong className="text-[#00D1FF] font-extrabold">Cloudflare Dashboard</strong>.</li>
                      <li>Navigate to <strong>R2</strong> on the sidebar and select your bucket (<code>hilling</code>).</li>
                      <li>Go to the <strong>Settings</strong> tab at the top.</li>
                      <li>Scroll down to the <strong>CORS Policy</strong> section and click <strong>Add CORS Policy</strong>.</li>
                      <li>Paste the JSON below and click <strong>Save</strong>.</li>
                    </ol>
                  </div>

                  <div className="mt-4 pt-2">
                    <div className="flex justify-between items-center bg-black/40 border border-white/5 rounded-t-2xl px-4 py-2.5 text-[10px] text-white/40 uppercase font-mono font-bold tracking-wider">
                      <span>Bucket CORS JSON Policy</span>
                      <button
                        type="button"
                        onClick={() => {
                          const corsPolicy = JSON.stringify([
                            {
                              "AllowedOrigins": ["*"],
                              "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
                              "AllowedHeaders": ["*"],
                              "ExposeHeaders": [],
                              "MaxAgeSeconds": 3000
                            }
                          ], null, 2);
                          navigator.clipboard.writeText(corsPolicy);
                          showToast("CORS policy JSON copied to clipboard!");
                        }}
                        className="text-[#00D1FF] hover:text-white transition-all cursor-pointer font-bold"
                      >
                        Copy JSON 📋
                      </button>
                    </div>
                    <pre className="bg-black/60 border-x border-b border-white/5 rounded-b-2xl p-4 text-[10px] text-white/75 font-mono overflow-x-auto max-h-48 whitespace-pre-wrap select-all leading-relaxed">
{`[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW G: SECTION CONTROL PANEL */}
            {activeTab === "sections" && (
              <div className="space-y-10 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                    Home Screen Section Control
                  </h2>
                  <p className="text-sm text-white/40 mt-1">
                    Dynamically hide or show key homepage components on the mobile application in real-time.
                  </p>
                </div>

                <form onSubmit={handleSaveHomeSections} className="space-y-8 max-w-4xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Section 1: Suggested Auto */}
                    <div className="bg-[#121212]/80 border border-white/[0.05] hover:border-[#F5B041]/25 hover:bg-[#121212]/95 transition-all rounded-[28px] p-6 shadow-xl relative overflow-hidden backdrop-blur-sm flex flex-col justify-between min-h-[260px] group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-[#F5B041]/10 via-transparent to-transparent pointer-events-none" />
                      <div>
                        <div className="flex items-center gap-3.5 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#F5B041]/10 border border-[#F5B041]/20 flex items-center justify-center text-xl text-[#F5B041] filter drop-shadow-[0_0_8px_rgba(245,176,65,0.3)]">
                            🕒
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Suggested Auto</h4>
                            <p className="text-[9px] text-[#F5B041] uppercase tracking-widest font-extrabold font-mono mt-0.5">Time-of-Day Adaptive</p>
                          </div>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed font-sans font-medium">
                          Toggles the main recommended sound therapy session match card based on the current hour of the day.
                        </p>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-6">
                        <span className="text-[10px] text-white/30 uppercase font-extrabold tracking-wider">Visibility Status</span>
                        <button
                          type="button"
                          onClick={() => setSectionsConfig({ ...sectionsConfig, suggested: !sectionsConfig.suggested })}
                          className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
                            sectionsConfig.suggested
                              ? "bg-gradient-to-r from-[#F5B041] to-[#f39c12] shadow-[0_0_15px_rgba(245,176,65,0.4)]"
                              : "bg-white/10 border border-white/15"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-all duration-300 ${
                            sectionsConfig.suggested ? "left-7 shadow-lg" : "left-1"
                          }`} />
                        </button>
                      </div>
                    </div>

                    {/* Section 2: Featured Programs */}
                    <div className="bg-[#121212]/80 border border-white/[0.05] hover:border-[#00D1FF]/25 hover:bg-[#121212]/95 transition-all rounded-[28px] p-6 shadow-xl relative overflow-hidden backdrop-blur-sm flex flex-col justify-between min-h-[260px] group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-[#00D1FF]/10 via-transparent to-transparent pointer-events-none" />
                      <div>
                        <div className="flex items-center gap-3.5 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#00D1FF]/10 border border-[#00D1FF]/20 flex items-center justify-center text-xl text-[#00D1FF] filter drop-shadow-[0_0_8px_rgba(0,209,255,0.3)]">
                            ✨
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Featured Carousel</h4>
                            <p className="text-[9px] text-[#00D1FF] uppercase tracking-widest font-extrabold font-mono mt-0.5">Horizontal Programs</p>
                          </div>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed font-sans font-medium">
                          Toggles the horizontal scrolling shelf displaying the free tier featured sound healing cards.
                        </p>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-6">
                        <span className="text-[10px] text-white/30 uppercase font-extrabold tracking-wider">Visibility Status</span>
                        <button
                          type="button"
                          onClick={() => setSectionsConfig({ ...sectionsConfig, featured: !sectionsConfig.featured })}
                          className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
                            sectionsConfig.featured
                              ? "bg-gradient-to-r from-[#00D1FF] to-[#00a8ff] shadow-[0_0_15px_rgba(0,209,255,0.4)]"
                              : "bg-white/10 border border-white/15"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-all duration-300 ${
                            sectionsConfig.featured ? "left-7 shadow-lg" : "left-1"
                          }`} />
                        </button>
                      </div>
                    </div>

                    {/* Section 3: Recent History */}
                    <div className="bg-[#121212]/80 border border-white/[0.05] hover:border-[#8B5CF6]/25 hover:bg-[#121212]/95 transition-all rounded-[28px] p-6 shadow-xl relative overflow-hidden backdrop-blur-sm flex flex-col justify-between min-h-[260px] group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-[#8B5CF6]/10 via-transparent to-transparent pointer-events-none" />
                      <div>
                        <div className="flex items-center gap-3.5 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-xl text-[#8B5CF6] filter drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]">
                            ⏳
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Recent History</h4>
                            <p className="text-[9px] text-[#8B5CF6] uppercase tracking-widest font-extrabold font-mono mt-0.5">Vertical Sessions</p>
                          </div>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed font-sans font-medium">
                          Toggles the bottom vertical history list showcasing the three most recently completed user healing sessions.
                        </p>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-6">
                        <span className="text-[10px] text-white/30 uppercase font-extrabold tracking-wider">Visibility Status</span>
                        <button
                          type="button"
                          onClick={() => setSectionsConfig({ ...sectionsConfig, recents: !sectionsConfig.recents })}
                          className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
                            sectionsConfig.recents
                              ? "bg-gradient-to-r from-[#8B5CF6] to-[#6366f1] shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                              : "bg-white/10 border border-white/15"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-all duration-300 ${
                            sectionsConfig.recents ? "left-7 shadow-lg" : "left-1"
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submit Bar */}
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-gradient-to-r from-[#8B5CF6] to-[#00D1FF] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all flex items-center justify-center gap-3.5 h-[50px] min-w-[200px]"
                    >
                      {saving ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Save Layout Changes</span>
                          <span>🔒</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* VIEW F: MUSIC LIBRARY MANAGER */}
            {activeTab === "music" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                      Music Library & Storage
                    </h2>
                    <p className="text-sm text-white/40 mt-1">
                      Direct connection to Cloudflare R2 bucket (`hilling/music/`). Upload, copy links, and delete audio tracks.
                    </p>
                  </div>
                  
                  {/* General Upload Button */}
                  <div>
                    <label className={`cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-[#00D1FF] to-[#8B5CF6] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-2xl shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all ${
                      generalUploading ? "opacity-50 pointer-events-none" : ""
                    }`}>
                      {generalUploading ? `Uploading ${generalProgress}%...` : "+ Upload Audio Track"}
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleGeneralUpload}
                        className="hidden"
                        disabled={generalUploading}
                      />
                    </label>
                  </div>
                </div>

                {/* General upload progress bar */}
                {generalUploading && (
                  <div className="w-full bg-[#121212] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                    <span className="text-xs font-semibold text-white/60 shrink-0">Uploading Track...</span>
                    <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#00D1FF] h-full transition-all duration-300" style={{ width: `${generalProgress}%` }} />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#00D1FF]">{generalProgress}%</span>
                  </div>
                )}

                {/* Cloudflare R2 Warnings / Instructions */}
                {r2CredentialsMissing && (
                  <div className="p-5 bg-amber-950/40 border border-amber-500/20 text-amber-200 rounded-3xl text-sm font-semibold flex flex-col md:flex-row items-start md:items-center gap-4">
                    <span className="text-2xl">⚠️</span>
                    <div className="flex-1">
                      <p className="font-bold">Cloudflare R2 Credentials Missing</p>
                      <p className="text-xs text-amber-200/60 mt-0.5">
                        Please go to the <button onClick={() => setActiveTab("r2")} className="underline font-bold text-[#00D1FF]">R2 Storage</button> tab and enter your credentials to read and write files directly in R2.
                      </p>
                    </div>
                  </div>
                )}

                {/* Files Table Card */}
                {!r2CredentialsMissing && (
                  <div className="bg-[#121212]/80 border border-white/[0.05] rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm">
                    {loadingMusic ? (
                      <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <div className="w-8 h-8 rounded-full border-2 border-[#00D1FF] border-t-transparent animate-spin" />
                        <p className="text-white/40 text-xs tracking-widest font-bold uppercase">reading R2 bucket files...</p>
                      </div>
                    ) : musicFiles.length === 0 ? (
                      <div className="p-20 text-center text-white/30 text-sm font-semibold flex flex-col items-center justify-center gap-3">
                        <span className="text-4xl">🎵</span>
                        <p>No audio files found inside the `hilling/music/` folder of your bucket.</p>
                        <p className="text-xs text-white/20 max-w-sm">
                          Use the upload button above to upload audio files. They will be immediately available to play and link to your sessions.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01] text-xs font-extrabold uppercase tracking-wider text-white/40">
                              <th className="p-6">Track Filename</th>
                              <th className="p-6">Size</th>
                              <th className="p-6">Usage Links</th>
                              <th className="p-6">Audio Player Preview</th>
                              <th className="p-6 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {musicFiles.map((file, idx) => {
                              // Get which conditions or solfeggio Hz use this URL
                              const linkedConditions = conditions
                                .filter(c => c.audio_url === file.publicUrl)
                                .map(c => c.title);
                              const linkedSolfeggios = solfeggio
                                .filter(s => s.audio_url === file.publicUrl)
                                .map(s => `${s.hz}Hz`);
                              const links = [...linkedConditions, ...linkedSolfeggios];

                              return (
                                <tr key={idx} className="hover:bg-white/[0.01] transition-all text-sm border-b border-white/5 last:border-0">
                                  <td className="p-6">
                                    <p className="font-bold text-white max-w-[240px] truncate" title={file.filename}>
                                      {file.filename}
                                    </p>
                                    <p className="text-[10px] text-white/30 font-mono mt-0.5 max-w-[240px] truncate" title={file.key}>
                                      Key: {file.key}
                                    </p>
                                  </td>
                                  <td className="p-6 text-xs font-semibold font-mono text-white/60">
                                    {(file.sizeBytes / 1024 / 1024).toFixed(2)} MB
                                  </td>
                                  <td className="p-6">
                                    {links.length > 0 ? (
                                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                        {links.map((linkName, linkIdx) => (
                                          <span
                                            key={linkIdx}
                                            className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#8B5CF6]/15 border border-[#8B5CF6]/20 text-[#c4b5fd]"
                                          >
                                            {linkName}
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/5 border border-white/10 text-white/40">
                                        Not Linked
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-6">
                                    <audio
                                      src={file.publicUrl}
                                      controls
                                      preload="none"
                                      className="h-8 max-w-[200px] outline-none filter invert brightness-90 contrast-125 opacity-75 hover:opacity-100 transition-opacity"
                                    />
                                  </td>
                                  <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2">
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(file.publicUrl);
                                          showToast("Copied track URL to clipboard!");
                                        }}
                                        className="p-2 bg-white/5 border border-white/10 hover:border-[#00D1FF] text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-1"
                                        title="Copy URL Link"
                                      >
                                        🔗 Link
                                      </button>
                                      <button
                                        onClick={() => handleDeleteMusicFile(file.key)}
                                        className="p-2 bg-red-950/20 border border-red-500/20 hover:border-red-500 text-red-400 hover:bg-red-950/50 rounded-xl text-xs font-bold transition-all uppercase tracking-wider"
                                        title="Delete File"
                                      >
                                        🗑️ Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* VIEW G: MEMBERSHIP PLANS MANAGER */}
            {activeTab === "plans" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                    Membership Pricing & Plans
                  </h2>
                  <p className="text-sm text-white/40 mt-1">
                    Manage membership plans, subscription pricing, features, accent colors, and CTA buttons directly. Changes update the mobile app instantly.
                  </p>
                </div>

                <form onSubmit={handleSavePlans} className="space-y-8">
                  {/* Global Currency Selection Block */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                    <div className="space-y-1">
                      <label className="text-sm font-extrabold text-white uppercase tracking-wider block">
                        Global Billing Currency
                      </label>
                      <span className="text-xs text-white/40 block leading-relaxed">
                        Specify a symbol (e.g. $, ₹, €) or currency code (e.g. USDT, USD, EUR) to display globally next to the pricing matrix.
                      </span>
                    </div>
                    <div className="flex gap-2 min-w-[200px]">
                      <input
                        type="text"
                        value={localCurrency}
                        onChange={(e) => setLocalCurrency(e.target.value)}
                        placeholder="e.g. USDT, $, ₹"
                        className="w-full bg-[#121212] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#8B5CF6] transition-all font-bold text-center uppercase tracking-wider"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {localPlans.map((plan, planIdx) => (
                      <div
                        key={plan.key}
                        className="bg-black/45 border border-white/5 rounded-3xl p-6 space-y-6 relative overflow-hidden shadow-xl"
                        style={{
                          boxShadow: `0 10px 30px -15px ${plan.col}33`,
                          borderColor: `${plan.col}20`
                        }}
                      >
                        {/* Ambient backing glow matching the plan color */}
                        <div
                          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[40px] pointer-events-none opacity-20"
                          style={{ backgroundColor: plan.col }}
                        />

                        <div className="flex justify-between items-center relative z-10">
                          <span className="text-[10px] font-extrabold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 tracking-widest uppercase">
                            Plan: {plan.key.toUpperCase()}
                          </span>
                          <input
                            type="color"
                            value={plan.col}
                            onChange={(e) => {
                              const updated = [...localPlans];
                              updated[planIdx] = { ...updated[planIdx], col: e.target.value };
                              setLocalPlans(updated);
                            }}
                            className="w-8 h-8 rounded-full border border-white/10 bg-transparent cursor-pointer shrink-0"
                            title="Accent Theme Color"
                          />
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-1.5">
                              Plan Name (English)
                            </label>
                            <input
                              type="text"
                              value={plan.label}
                              onChange={(e) => {
                                const updated = [...localPlans];
                                updated[planIdx] = { ...updated[planIdx], label: e.target.value };
                                setLocalPlans(updated);
                              }}
                              className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-semibold outline-none focus:border-[#8B5CF6] transition-all"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-1.5">
                                Price (Monthly)
                              </label>
                              <input
                                type="text"
                                value={plan.price}
                                onChange={(e) => {
                                  const updated = [...localPlans];
                                  updated[planIdx] = { ...updated[planIdx], price: e.target.value };
                                  setLocalPlans(updated);
                                }}
                                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-mono font-bold outline-none focus:border-[#8B5CF6] transition-all"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-1.5">
                                Price (Yearly)
                              </label>
                              <input
                                type="text"
                                value={plan.priceY || ""}
                                onChange={(e) => {
                                  const updated = [...localPlans];
                                  updated[planIdx] = { ...updated[planIdx], priceY: e.target.value };
                                  setLocalPlans(updated);
                                }}
                                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-mono font-bold outline-none focus:border-[#8B5CF6] transition-all"
                                placeholder="e.g. ₹1999"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-1.5">
                                Unit (Monthly)
                              </label>
                              <input
                                type="text"
                                value={plan.per}
                                onChange={(e) => {
                                  const updated = [...localPlans];
                                  updated[planIdx] = { ...updated[planIdx], per: e.target.value };
                                  setLocalPlans(updated);
                                }}
                                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs outline-none focus:border-[#8B5CF6] transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-1.5">
                                Unit (Yearly)
                              </label>
                              <input
                                type="text"
                                value={plan.perY || ""}
                                onChange={(e) => {
                                  const updated = [...localPlans];
                                  updated[planIdx] = { ...updated[planIdx], perY: e.target.value };
                                  setLocalPlans(updated);
                                }}
                                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs outline-none focus:border-[#8B5CF6] transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-1.5">
                              Plan Badge Pill
                            </label>
                            <input
                              type="text"
                              value={plan.badge || ""}
                              onChange={(e) => {
                                const updated = [...localPlans];
                                updated[planIdx] = { ...updated[planIdx], badge: e.target.value || null };
                                setLocalPlans(updated);
                              }}
                              className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs outline-none focus:border-[#8B5CF6] transition-all"
                              placeholder="e.g. Most Popular (leave blank if none)"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-1.5">
                              CTA Button Text
                            </label>
                            <input
                              type="text"
                              value={plan.cta}
                              onChange={(e) => {
                                const updated = [...localPlans];
                                updated[planIdx] = { ...updated[planIdx], cta: e.target.value };
                                setLocalPlans(updated);
                              }}
                              className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-semibold outline-none focus:border-[#8B5CF6] transition-all"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-1.5">
                              Plan Features list (One feature per line)
                            </label>
                            <textarea
                              rows={5}
                              value={plan.items.join("\n")}
                              onChange={(e) => {
                                const updated = [...localPlans];
                                updated[planIdx] = { ...updated[planIdx], items: e.target.value.split("\n") };
                                setLocalPlans(updated);
                              }}
                              className="w-full bg-[#121212] border border-white/10 rounded-2xl px-4 py-3 text-white text-xs outline-none focus:border-[#8B5CF6] transition-all font-sans leading-relaxed resize-y"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-8 py-4 bg-gradient-to-r from-[#00D1FF] to-[#8B5CF6] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all flex items-center gap-2"
                    >
                      {saving ? "Saving Changes..." : "Save Plans Configurations"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* VIEW H: LEGAL POLICIES */}
            {activeTab === "policies" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                    Legal Policy Settings
                  </h2>
                  <p className="text-sm text-white/40 mt-1">
                    Manage the terms, privacy policy, and refund rules displayed in the mobile application.
                  </p>
                </div>

                {/* Sub-tab selectors */}
                <div className="flex flex-wrap gap-2.5 pb-4 border-b border-white/5">
                  {[
                    { id: "privacy_policy", label: "Privacy Policy 🛡️" },
                    { id: "terms_of_service", label: "Terms of Service 📄" },
                    { id: "refund_policy", label: "Refund Policy 🔄" }
                  ].map((tab) => {
                    const isActive = selectedPolicyTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedPolicyTab(tab.id)}
                        className={`px-4.5 py-2.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all border ${
                          isActive
                            ? "bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                            : "bg-white/[0.02] border-white/10 text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSavePolicy} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* ENGLISH VERSION CARD */}
                    <div className="bg-[#121212]/80 border border-white/[0.05] rounded-[28px] p-6 space-y-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-[#8B5CF6]/10 via-transparent to-transparent pointer-events-none" />
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🇬🇧</span>
                        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">English Version</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-2">
                            Policy Title
                          </label>
                          <input
                            type="text"
                            value={policyForm.title}
                            onChange={(e) => setPolicyForm({ ...policyForm, title: e.target.value })}
                            className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-[#8B5CF6] outline-none text-sm h-[48px]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-2">
                            Policy Document Content
                          </label>
                          <textarea
                            rows={15}
                            value={policyForm.content}
                            onChange={(e) => setPolicyForm({ ...policyForm, content: e.target.value })}
                            className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-4 text-white focus:border-[#8B5CF6] outline-none text-xs leading-relaxed resize-y font-mono"
                            placeholder="Enter policy content in English..."
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* HINDI VERSION CARD */}
                    <div className="bg-[#121212]/80 border border-white/[0.05] rounded-[28px] p-6 space-y-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-[#F5B041]/10 via-transparent to-transparent pointer-events-none" />
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🇮🇳</span>
                        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Hindi Version (हिंदी)</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-2">
                            Policy Title (Hindi)
                          </label>
                          <input
                            type="text"
                            value={policyForm.titleHi}
                            onChange={(e) => setPolicyForm({ ...policyForm, titleHi: e.target.value })}
                            className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-[#F5B041] outline-none text-sm h-[48px]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-2">
                            Policy Document Content (Hindi)
                          </label>
                          <textarea
                            rows={15}
                            value={policyForm.contentHi}
                            onChange={(e) => setPolicyForm({ ...policyForm, contentHi: e.target.value })}
                            className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-4 text-white focus:border-[#F5B041] outline-none text-xs leading-relaxed resize-y font-sans"
                            placeholder="हिंदी में नीति दस्तावेज की सामग्री दर्ज करें..."
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-8 py-4 bg-gradient-to-r from-[#00D1FF] to-[#8B5CF6] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all flex items-center gap-2 h-[50px] min-w-[200px]"
                    >
                      {saving ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Save Policy Configuration</span>
                          <span>🔒</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* VIEW I: GET IN TOUCH */}
            {activeTab === "get_in_touch" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase font-sans">
                    Get in Touch Settings 📞
                  </h2>
                  <p className="text-sm text-white/40 mt-1">
                    Configure contact details (Email, Phone, Website) shown on the mobile app's About Us screen.
                  </p>
                </div>

                <form onSubmit={handleSaveContactInfo} className="space-y-8">
                  {/* CONTACT DETAILS CONFIG */}
                  <div className="bg-[#121212]/80 border border-white/[0.05] rounded-[28px] p-8 max-w-2xl space-y-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#F5B041]/10 via-transparent to-transparent pointer-events-none" />
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Contact Information Settings</h3>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-2">
                          Support Email Address
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[48px]"
                          placeholder="e.g. support@mantrapuja.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-2">
                          Contact Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="text"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[48px]"
                          placeholder="e.g. +91 99999 99999"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-white/40 uppercase font-extrabold tracking-wider mb-2">
                          Website URL Link (Optional)
                        </label>
                        <input
                          type="url"
                          value={contactForm.website}
                          onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })}
                          className="w-full bg-black/35 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[48px]"
                          placeholder="e.g. https://www.mantrapuja.com"
                        />
                        <p className="text-[9px] text-white/30 mt-1.5 leading-relaxed font-sans font-medium">
                          💡 If left empty, the website link will be hidden in the mobile app.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-8 py-4 bg-gradient-to-r from-[#00D1FF] to-[#8B5CF6] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#8B5CF6]/15 hover:shadow-[#8B5CF6]/25 transition-all flex items-center gap-2 h-[50px] min-w-[200px]"
                    >
                      {saving ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Save Contact Details</span>
                          <span>🔒</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Editing drawer for Conditions, Solfeggio & Brainwaves */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg animate-fade-in p-4">
          <div className="w-full max-w-5xl h-[90vh] max-h-[850px] bg-[#0B0B0B] border border-white/10 rounded-[32px] p-8 md:p-10 overflow-y-auto flex flex-col shadow-[0_0_80px_rgba(139,92,246,0.15)] relative">
            <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                  Configure {editingItem._isBrainwave ? editingItem.name || "New Brainwave" : (editingItem.title ? editingItem.title : `${editingItem.hz || "New"}Hz Scale`)}
                </h3>
                <p className="text-xs text-white/40 mt-1">Make changes to metadata, frequencies, ranges, and visual elements.</p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-white/40 hover:text-white text-2xl transition-colors"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={
                editingItem._isBrainwave 
                  ? handleSaveBrainwave 
                  : (editingItem.hz !== undefined ? handleSaveSolfeggio : handleSaveCondition)
              }
              className="space-y-5 flex-1"
            >
              {editingItem._isBrainwave ? (
                /* BRAINWAVE CONFIG */
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Brainwave Name</label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm"
                        disabled={!editingItem._isNew}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Frequency Range</label>
                      <input
                        type="text"
                        value={editingItem.range}
                        onChange={(e) => setEditingItem({ ...editingItem, range: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm"
                        placeholder="e.g. 4–8 Hz"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">State / Neurological Effect</label>
                    <input
                      type="text"
                      value={editingItem.state}
                      onChange={(e) => setEditingItem({ ...editingItem, state: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm"
                      placeholder="e.g. Deep sleep · Healing"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Color Theme (Hex)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingItem.color}
                        onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                        className="flex-1 bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm"
                        placeholder="e.g. #8B5CF6"
                        required
                      />
                      <div className="w-10 h-10 rounded-xl border border-white/15" style={{ backgroundColor: editingItem.color }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Visual Waveform Shape (8 values between 0.0 and 1.0)</label>
                    <input
                      type="text"
                      value={editingItem.shapeStr}
                      onChange={(e) => setEditingItem({ ...editingItem, shapeStr: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm font-mono"
                      placeholder="e.g. 0.4, 0.9, 0.2, 0.8, 0.5, 0.9, 0.3, 0.7"
                      required
                    />
                  </div>
                </>
              ) : editingItem.hz !== undefined ? (
                /* SOLFEGGIO CONFIG */
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Frequency (Hz)</label>
                      <input
                        type="number"
                        value={editingItem.hz}
                        onChange={(e) => setEditingItem({ ...editingItem, hz: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm"
                        disabled={!editingItem._isNew}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Note (Musical Key)</label>
                      <input
                        type="text"
                        value={editingItem.note}
                        onChange={(e) => setEditingItem({ ...editingItem, note: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Frequency Title</label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Color Theme (Hex)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingItem.color}
                        onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm font-mono"
                        required
                      />
                      <div className="w-10 h-10 rounded-xl border border-white/15" style={{ backgroundColor: editingItem.color }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Frequency Action</label>
                    <textarea
                      value={editingItem.action}
                      onChange={(e) => setEditingItem({ ...editingItem, action: e.target.value })}
                      className="w-full h-24 bg-[#121212] border border-white/10 rounded-xl p-4 text-white focus:border-[#00D1FF] outline-none text-sm resize-none"
                      required
                    />
                  </div>
                </>
              ) : (
                /* CONDITION CONFIG */
                <>
                  {/* Premium Multilingual Translation Control Panel */}
                  <div className="bg-[#121212]/90 border border-white/5 rounded-3xl p-5 mb-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                          ✨ Multilingual Translation Engine
                        </h4>
                        <p className="text-[10px] text-white/40 mt-0.5">
                          Dynamic localization for all wellness programs and neural sessions.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAutoTranslateAll}
                        disabled={translating}
                        className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#00D1FF] hover:opacity-95 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(0,209,255,0.3)] disabled:opacity-50 flex items-center gap-2 self-start sm:self-auto h-[34px]"
                      >
                        {translating ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Translating...</span>
                          </>
                        ) : (
                          <>
                            <span>✨ Auto-Translate All</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                      {[
                        { code: "en", label: "English 🇬🇧" },
                        { code: "hi", label: "Hindi 🇮🇳" },
                        { code: "es", label: "Spanish 🇪🇸" },
                        { code: "fr", label: "French 🇫🇷" },
                        { code: "ar", label: "Arabic 🇸🇦" },
                        { code: "ja", label: "Japanese 🇯🇵" }
                      ].map((lang) => {
                        const isActive = activeLocale === lang.code;
                        const isTranslated = lang.code === "en" || (editingItem.translations && editingItem.translations[lang.code]);
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => setActiveLocale(lang.code)}
                            className={`px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border flex items-center gap-1.5 ${
                              isActive
                                ? "bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                                : "bg-black/25 border-white/5 text-white/50 hover:text-white/80 hover:bg-black/45"
                            }`}
                          >
                            <span>{lang.label}</span>
                            {isTranslated && lang.code !== "en" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Translated" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {activeLocale === "en" ? (
                    <div className="space-y-5">
                      {/* ROW 1: Title and Category Sanctuary */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Title</label>
                          <input
                            type="text"
                            value={editingItem.title}
                            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                            required
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs text-white/40 uppercase font-bold tracking-wider">Category Sanctuary</label>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem({
                                  ...editingItem,
                                  _isNewCat: !editingItem._isNewCat
                                });
                              }}
                              className="text-[9px] text-[#00D1FF] hover:underline font-bold"
                            >
                              {editingItem._isNewCat ? "← Select Dropdown" : "+ Create New"}
                            </button>
                          </div>
                          {editingItem._isNewCat ? (
                            <input
                              type="text"
                              value={editingItem.cat || ""}
                              onChange={(e) => setEditingItem({ ...editingItem, cat: e.target.value })}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] animate-fade-in"
                              placeholder="Type custom category name"
                              required
                            />
                          ) : (
                            <select
                              value={editingItem.cat || ""}
                              onChange={(e) => setEditingItem({ ...editingItem, cat: e.target.value })}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] animate-fade-in"
                              required
                            >
                              <option value="">-- Choose Category --</option>
                              {getCategoriesList().map((cat) => {
                                const details = getCatDetails(cat);
                                return (
                                  <option key={cat} value={cat}>
                                    {details.name} {details.emoji}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                        </div>
                      </div>

                      {/* ROW 2: Sub-Category and Pathway Detail */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-2.5">
                            <label className="block text-xs text-white/40 uppercase font-bold tracking-wider">Sub-Category</label>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem({
                                  ...editingItem,
                                  _isNewSub: !editingItem._isNewSub
                                });
                              }}
                              className="text-[10px] bg-[#00D1FF]/10 text-[#00D1FF] px-2.5 py-0.5 rounded-lg border border-[#00D1FF]/20 font-bold transition-all hover:bg-[#00D1FF]/25 hover:border-[#00D1FF]/40 active:scale-95"
                            >
                              {editingItem._isNewSub ? "← Choose Existing" : "+ Add New Sub-Category"}
                            </button>
                          </div>
                          {editingItem._isNewSub ? (
                            <>
                              <input
                                type="text"
                                value={editingItem._subCategory || ""}
                                onChange={(e) => {
                                  const subCat = e.target.value;
                                  setEditingItem({
                                    ...editingItem,
                                    _subCategory: subCat,
                                    sub: subCat + (editingItem._subDetail ? " · " + editingItem._subDetail : "")
                                  });
                                }}
                                className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] animate-fade-in"
                                placeholder="Type new sub-category name"
                                required
                              />
                              <p className="text-[9px] text-[#00D1FF]/70 mt-1.5 flex items-center gap-1 font-medium">
                                💡 New sub-categories are created dynamically on save & match the mobile app!
                              </p>
                            </>
                          ) : (
                            <select
                              value={editingItem._subCategory || ""}
                              onChange={(e) => {
                                const subCat = e.target.value;
                                setEditingItem({
                                  ...editingItem,
                                  _subCategory: subCat,
                                  sub: subCat + (editingItem._subDetail ? " · " + editingItem._subDetail : "")
                                });
                              }}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] animate-fade-in"
                              required
                            >
                              <option value="">-- Choose Sub-Category --</option>
                              {getSubcategoriesForCategory(editingItem.cat).map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                              ))}
                            </select>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Pathway Detail</label>
                          <input
                            type="text"
                            value={editingItem._subDetail || ""}
                            onChange={(e) => {
                              const detail = e.target.value;
                              setEditingItem({
                                ...editingItem,
                                _subDetail: detail,
                                sub: (editingItem._subCategory || "") + (detail ? " · " + detail : "")
                              });
                            }}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                            placeholder="e.g. Amygdala"
                          />
                        </div>
                      </div>

                      {/* ROW 3: Emoji Icon, Plan Access, and Color Theme */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Emoji Icon</label>
                          <input
                            type="text"
                            value={editingItem.emoji}
                            onChange={(e) => setEditingItem({ ...editingItem, emoji: e.target.value })}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-center text-sm h-[42px]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Plan Access</label>
                          <select
                            value={editingItem.free ? "free" : "pro"}
                            onChange={(e) => setEditingItem({ ...editingItem, free: e.target.value === "free" })}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                          >
                            <option value="free">Free Tier</option>
                            <option value="pro">Pro Tier</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Color Theme</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editingItem.color}
                              onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value })}
                              className="w-full bg-[#121212] border border-white/10 rounded-xl px-2 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-xs font-mono h-[42px]"
                              required
                            />
                            <div className="w-10 h-10 rounded-xl border border-white/15 flex-shrink-0" style={{ backgroundColor: editingItem.color }} />
                          </div>
                        </div>
                      </div>

                      {/* ROW 4: Duration, Binaural Delta, and Featured Instruments */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Duration (Min)</label>
                          <input
                            type="number"
                            value={editingItem.duration}
                            onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Binaural Delta (Hz)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editingItem.binaural}
                            onChange={(e) => setEditingItem({ ...editingItem, binaural: e.target.value })}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Featured Instruments</label>
                          <input
                            type="text"
                            value={editingItem.instruments}
                            onChange={(e) => setEditingItem({ ...editingItem, instruments: e.target.value })}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                            required
                          />
                        </div>
                      </div>

                      {/* ROW 5: Science Bio, Protocol Guidance, Expert Tips */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Science Bio</label>
                          <textarea
                            value={editingItem.science}
                            onChange={(e) => setEditingItem({ ...editingItem, science: e.target.value })}
                            className="w-full h-24 bg-[#121212] border border-white/10 rounded-xl p-3 text-white focus:border-[#8B5CF6] outline-none text-xs resize-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Protocol Guidance</label>
                          <textarea
                            value={editingItem.protocol}
                            onChange={(e) => setEditingItem({ ...editingItem, protocol: e.target.value })}
                            className="w-full h-24 bg-[#121212] border border-white/10 rounded-xl p-3 text-white focus:border-[#8B5CF6] outline-none text-xs resize-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Expert Tips</label>
                          <textarea
                            value={editingItem.tip || ""}
                            onChange={(e) => setEditingItem({ ...editingItem, tip: e.target.value })}
                            className="w-full h-24 bg-[#121212] border border-white/10 rounded-xl p-3 text-white focus:border-[#8B5CF6] outline-none text-xs resize-none"
                            required
                          />
                        </div>
                      </div>

                      {/* Standard Frequencies List */}
                      <div className="border border-white/5 bg-black/10 rounded-3xl p-5 space-y-4">
                        <FrequencyEditor
                          freqs={editingItem.freqs}
                          musicFiles={musicFiles}
                          r2KeyId={r2KeyId}
                          r2Secret={r2Secret}
                          onUploadSuccess={fetchMusicFiles}
                          onChange={(val) => {
                            let parsed = [];
                            try { parsed = JSON.parse(val); } catch(e){}
                            const sumMin = Array.isArray(parsed) ? parsed.reduce((sum, item) => sum + (parseInt(item.duration) || 0), 0) : 0;
                            setEditingItem({
                              ...editingItem,
                              freqs: val,
                              ...(sumMin > 0 ? { duration: sumMin } : {})
                            });
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5 animate-fade-in">
                      {/* Notice Banner */}
                      <div className="p-4 bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 rounded-2xl text-[11px] text-white/70 leading-relaxed font-semibold">
                        ℹ️ You are viewing and editing the **{activeLocale === "hi" ? "Hindi 🇮🇳" : activeLocale === "es" ? "Spanish 🇪🇸" : activeLocale === "fr" ? "French 🇫🇷" : activeLocale === "ar" ? "Arabic 🇸🇦" : "Japanese 🇯🇵"}** localization for this program. 
                        To keep this translation automatically in sync with English changes, click the **✨ Auto-Translate All** button above. Any manual edits below will override the neural translation.
                      </div>

                      {/* Localized Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">
                            Localized Title
                          </label>
                          <input
                            type="text"
                            value={editingItem.translations?.[activeLocale]?.title || ""}
                            onChange={(e) => updateTranslationField(activeLocale, "title", e.target.value)}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                            placeholder="Translated program title..."
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">
                            Localized Sub-Category · Pathway Detail
                          </label>
                          <input
                            type="text"
                            value={editingItem.translations?.[activeLocale]?.sub || ""}
                            onChange={(e) => updateTranslationField(activeLocale, "sub", e.target.value)}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                            placeholder="e.g. MORNING SESSION · Amygdala (translated)..."
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Localized Science Bio</label>
                          <textarea
                            value={editingItem.translations?.[activeLocale]?.science || ""}
                            onChange={(e) => updateTranslationField(activeLocale, "science", e.target.value)}
                            className="w-full h-28 bg-[#121212] border border-white/10 rounded-xl p-3 text-white focus:border-[#8B5CF6] outline-none text-xs resize-none"
                            placeholder="Translated science notes..."
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Localized Protocol Guidance</label>
                          <textarea
                            value={editingItem.translations?.[activeLocale]?.protocol || ""}
                            onChange={(e) => updateTranslationField(activeLocale, "protocol", e.target.value)}
                            className="w-full h-28 bg-[#121212] border border-white/10 rounded-xl p-3 text-white focus:border-[#8B5CF6] outline-none text-xs resize-none"
                            placeholder="Translated protocol..."
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Localized Expert Tips</label>
                          <textarea
                            value={editingItem.translations?.[activeLocale]?.tip || ""}
                            onChange={(e) => updateTranslationField(activeLocale, "tip", e.target.value)}
                            className="w-full h-28 bg-[#121212] border border-white/10 rounded-xl p-3 text-white focus:border-[#8B5CF6] outline-none text-xs resize-none"
                            placeholder="Translated tips..."
                            required
                          />
                        </div>
                      </div>

                      {/* Localized Frequencies/Phases List */}
                      <div className="border border-white/5 bg-black/10 rounded-3xl p-5 space-y-4">
                        <label className="block text-xs text-white/50 uppercase font-extrabold tracking-wider">
                          Localized Phase Labels & Effects
                        </label>
                        {(() => {
                          let stdFreqs = [];
                          try {
                            stdFreqs = typeof editingItem.freqs === "string" ? JSON.parse(editingItem.freqs) : (editingItem.freqs || []);
                          } catch (e) {}

                          if (!Array.isArray(stdFreqs) || stdFreqs.length === 0) {
                            return <p className="text-xs text-white/30 italic">No phases available to translate.</p>;
                          }

                          return (
                            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                              {stdFreqs.map((f, index) => {
                                const localFreq = editingItem.translations?.[activeLocale]?.freqs?.[index] || {};
                                return (
                                  <div key={index} className="p-4 bg-black/45 border border-white/5 rounded-2xl space-y-3">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00D1FF]">
                                        Phase {index + 1} ({f.hz}Hz · {f.duration}m)
                                      </span>
                                      <span className="text-[9px] text-white/30 italic">
                                        Original English: "{f.label || `Phase ${index + 1}`}" / "{f.effect || "None"}"
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-[9px] text-white/40 uppercase font-bold mb-1">
                                          Translated Label
                                        </label>
                                        <input
                                          type="text"
                                          value={localFreq.label || ""}
                                          onChange={(e) => updateTranslationPhaseField(activeLocale, index, "label", e.target.value)}
                                          className="w-full bg-[#121212] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-[#8B5CF6]"
                                          placeholder="e.g. Phase 1 translation..."
                                          required
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[9px] text-white/40 uppercase font-bold mb-1">
                                          Translated Effect / Description
                                        </label>
                                        <input
                                          type="text"
                                          value={localFreq.effect || ""}
                                          onChange={(e) => updateTranslationPhaseField(activeLocale, index, "effect", e.target.value)}
                                          className="w-full bg-[#121212] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-[#8B5CF6]"
                                          placeholder="e.g. Calming effects translation..."
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* R2 UPLOAD BOX */}
              <div className="bg-[#101424]/40 border border-[#00D1FF]/20 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#00D1FF] uppercase tracking-wider">Cloudflare R2 Media Track</h4>
                
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Select Existing Library Track</label>
                  <select
                    value={editingItem.audio_url || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, audio_url: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm h-[42px] mb-3"
                  >
                    <option value="">-- Choose from Music Library --</option>
                    {musicFiles.map((file) => (
                      <option key={file.publicUrl} value={file.publicUrl}>
                        {file.filename} ({(file.sizeBytes / 1024 / 1024).toFixed(2)} MB)
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2 my-3.5">
                    <div className="h-[1px] bg-white/5 flex-1" />
                    <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Or Manual URL Link</span>
                    <div className="h-[1px] bg-white/5 flex-1" />
                  </div>

                  <label className="block text-xs text-white/40 mb-1 font-sans">Audio File URL</label>
                  <input
                    type="url"
                    value={editingItem.audio_url || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, audio_url: e.target.value })}
                    className="w-full bg-[#08080a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm font-mono"
                    placeholder="No track linked. Upload or paste link."
                  />
                </div>

                <div className="border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center bg-black/25">
                  <span className="text-2xl mb-1">🎵</span>
                  <p className="text-[11px] text-white/50 mb-3 text-center">
                    Upload direct to Cloudflare R2 bucket (`hilling/music/`)
                  </p>
                  
                  <label className={`cursor-pointer px-4 py-2 bg-[#00D1FF]/10 hover:bg-[#00D1FF]/15 border border-[#00D1FF]/30 text-[#00D1FF] text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                    uploading ? "opacity-50 pointer-events-none" : ""
                  }`}>
                    {uploading ? `Uploading ${uploadProgress}%...` : "Select Music Track"}
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleUploadFile(e, editingItem, setEditingItem)}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>

                  {uploading && (
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3 max-w-[200px]">
                      <div className="bg-[#00D1FF] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/5">
                {editingItem.id && (
                  <button
                    type="button"
                    onClick={() => handleDeleteCondition(editingItem.id)}
                    className="px-4 bg-red-950/40 hover:bg-red-950/60 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold transition-all"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 border border-white/10 hover:bg-white/5 rounded-xl py-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#00D1FF] hover:opacity-95 text-white rounded-xl py-3 text-sm font-semibold shadow-lg transition-all flex items-center justify-center"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Creating condition drawer */}
      {creatingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg animate-fade-in p-4">
          <div className="w-full max-w-5xl h-[90vh] max-h-[850px] bg-[#0B0B0B] border border-white/10 rounded-[32px] p-8 md:p-10 overflow-y-auto flex flex-col shadow-[0_0_80px_rgba(0,209,255,0.12)] relative">
            <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                  Add New Condition
                </h3>
                <p className="text-xs text-white/40 mt-1">Create a brand new wellness target card.</p>
              </div>
              <button
                onClick={() => setCreatingItem(null)}
                className="text-white/40 hover:text-white text-2xl transition-colors"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateCondition} className="space-y-5 flex-1">
              {/* ROW 1: Unique ID & Title Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Unique ID (lowercase slug)</label>
                  <input
                    type="text"
                    value={creatingItem.id}
                    onChange={(e) => setCreatingItem({ ...creatingItem, id: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm font-mono h-[42px]"
                    placeholder="e.g. stress-relief"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Title Name</label>
                  <input
                    type="text"
                    value={creatingItem.title}
                    onChange={(e) => setCreatingItem({ ...creatingItem, title: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                    placeholder="e.g. Stress Relief"
                    required
                  />
                </div>
              </div>

              {/* ROW 2: Sub-Category, Pathway Detail & Category Sanctuary */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="block text-xs text-white/40 uppercase font-bold tracking-wider">Sub-Category</label>
                    <button
                      type="button"
                      onClick={() => {
                        setCreatingItem({
                          ...creatingItem,
                          _isNewSub: !creatingItem._isNewSub
                        });
                      }}
                      className="text-[10px] bg-[#00D1FF]/10 text-[#00D1FF] px-2.5 py-0.5 rounded-lg border border-[#00D1FF]/20 font-bold transition-all hover:bg-[#00D1FF]/25 hover:border-[#00D1FF]/40 active:scale-95"
                    >
                      {creatingItem._isNewSub ? "← Choose Existing" : "+ Add New Sub-Category"}
                    </button>
                  </div>
                  {creatingItem._isNewSub ? (
                    <>
                      <input
                        type="text"
                        value={creatingItem._subCategory || ""}
                        onChange={(e) => {
                          const subCat = e.target.value;
                          setCreatingItem({
                            ...creatingItem,
                            _subCategory: subCat,
                            sub: subCat + (creatingItem._subDetail ? " · " + creatingItem._subDetail : "")
                          });
                        }}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] animate-fade-in"
                        placeholder="Type new sub-category name"
                        required
                      />
                      <p className="text-[9px] text-[#00D1FF]/70 mt-1.5 flex items-center gap-1 font-medium">
                        💡 New sub-categories are created dynamically on save & match the mobile app!
                      </p>
                    </>
                  ) : (
                    <select
                      value={creatingItem._subCategory || ""}
                      onChange={(e) => {
                        const subCat = e.target.value;
                        setCreatingItem({
                          ...creatingItem,
                          _subCategory: subCat,
                          sub: subCat + (creatingItem._subDetail ? " · " + creatingItem._subDetail : "")
                        });
                      }}
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] animate-fade-in"
                      required
                    >
                      <option value="">-- Choose Sub-Category --</option>
                      {getSubcategoriesForCategory(creatingItem.cat).map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Pathway Detail</label>
                  <input
                    type="text"
                    value={creatingItem._subDetail || ""}
                    onChange={(e) => {
                      const detail = e.target.value;
                      setCreatingItem({
                        ...creatingItem,
                        _subDetail: detail,
                        sub: (creatingItem._subCategory || "") + (detail ? " · " + detail : "")
                      });
                    }}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                    placeholder="e.g. Amygdala"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs text-white/40 uppercase font-bold tracking-wider">Category Sanctuary</label>
                    <button
                      type="button"
                      onClick={() => {
                        setCreatingItem({
                          ...creatingItem,
                          _isNewCat: !creatingItem._isNewCat
                        });
                      }}
                      className="text-[9px] text-[#00D1FF] hover:underline font-bold"
                    >
                      {creatingItem._isNewCat ? "← Dropdown" : "+ Create New"}
                    </button>
                  </div>
                  {creatingItem._isNewCat ? (
                    <input
                      type="text"
                      value={creatingItem.cat || ""}
                      onChange={(e) => setCreatingItem({ ...creatingItem, cat: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] animate-fade-in"
                      placeholder="Type custom category name"
                      required
                    />
                  ) : (
                    <select
                      value={creatingItem.cat || ""}
                      onChange={(e) => setCreatingItem({ ...creatingItem, cat: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] animate-fade-in"
                      required
                    >
                      <option value="">-- Choose Category --</option>
                      {getCategoriesList().map((cat) => {
                        const details = getCatDetails(cat);
                        return (
                          <option key={cat} value={cat}>
                            {details.name} {details.emoji}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
              </div>

              {/* ROW 3: Emoji, Plan Access, and Color Theme */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Emoji Icon</label>
                  <input
                    type="text"
                    value={creatingItem.emoji}
                    onChange={(e) => setCreatingItem({ ...creatingItem, emoji: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-center text-sm h-[42px]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Plan Access</label>
                  <select
                    value={creatingItem.free ? "free" : "pro"}
                    onChange={(e) => setCreatingItem({ ...creatingItem, free: e.target.value === "free" })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                  >
                    <option value="free">Free Tier</option>
                    <option value="pro">Pro Tier</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Hex Color Theme</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={creatingItem.color}
                      onChange={(e) => setCreatingItem({ ...creatingItem, color: e.target.value })}
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm font-mono h-[42px]"
                      required
                    />
                    <div className="w-10 h-10 rounded-xl border border-white/15 flex-shrink-0" style={{ backgroundColor: creatingItem.color }} />
                  </div>
                </div>
              </div>

              {/* ROW 4: Duration, Binaural Delta, and Featured Instruments */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Duration (Min)</label>
                  <input
                    type="number"
                    value={creatingItem.duration}
                    onChange={(e) => setCreatingItem({ ...creatingItem, duration: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Binaural Delta (Hz)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={creatingItem.binaural}
                    onChange={(e) => setCreatingItem({ ...creatingItem, binaural: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Featured Instruments</label>
                  <input
                    type="text"
                    value={creatingItem.instruments}
                    onChange={(e) => setCreatingItem({ ...creatingItem, instruments: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Science Bio</label>
                  <textarea
                    value={creatingItem.science}
                    onChange={(e) => setCreatingItem({ ...creatingItem, science: e.target.value })}
                    className="w-full h-20 bg-[#121212] border border-white/10 rounded-xl p-3 text-white focus:border-[#8B5CF6] outline-none text-xs resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Protocol Guidance</label>
                  <textarea
                    value={creatingItem.protocol}
                    onChange={(e) => setCreatingItem({ ...creatingItem, protocol: e.target.value })}
                    className="w-full h-20 bg-[#121212] border border-white/10 rounded-xl p-3 text-white focus:border-[#8B5CF6] outline-none text-xs resize-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Expert Tip</label>
                <input
                  type="text"
                  value={creatingItem.tip}
                  onChange={(e) => setCreatingItem({ ...creatingItem, tip: e.target.value })}
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm"
                  required
                />
              </div>

              <div className="border border-white/5 bg-black/10 rounded-3xl p-5 space-y-4">
                <FrequencyEditor
                  freqs={creatingItem.freqs}
                  musicFiles={musicFiles}
                  r2KeyId={r2KeyId}
                  r2Secret={r2Secret}
                  onUploadSuccess={fetchMusicFiles}
                  onChange={(val) => {
                    let parsed = [];
                    try { parsed = JSON.parse(val); } catch(e){}
                    const sumMin = Array.isArray(parsed) ? parsed.reduce((sum, item) => sum + (parseInt(item.duration) || 0), 0) : 0;
                    setCreatingItem({
                      ...creatingItem,
                      freqs: val,
                      ...(sumMin > 0 ? { duration: sumMin } : {})
                    });
                  }}
                />
              </div>

              {/* R2 UPLOAD BOX */}
              <div className="bg-[#101424]/40 border border-[#00D1FF]/20 rounded-2xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#00D1FF] uppercase tracking-wider">Cloudflare R2 Media Track</h4>
                
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Select Existing Library Track</label>
                  <select
                    value={creatingItem.audio_url || ""}
                    onChange={(e) => setCreatingItem({ ...creatingItem, audio_url: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm h-[42px] mb-3"
                  >
                    <option value="">-- Choose from Music Library --</option>
                    {musicFiles.map((file) => (
                      <option key={file.publicUrl} value={file.publicUrl}>
                        {file.filename} ({(file.sizeBytes / 1024 / 1024).toFixed(2)} MB)
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2 my-3.5">
                    <div className="h-[1px] bg-white/5 flex-1" />
                    <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">Or Manual URL Link</span>
                    <div className="h-[1px] bg-white/5 flex-1" />
                  </div>

                  <label className="block text-xs text-white/40 mb-1 font-sans">Audio File URL</label>
                  <input
                    type="url"
                    value={creatingItem.audio_url || ""}
                    onChange={(e) => setCreatingItem({ ...creatingItem, audio_url: e.target.value })}
                    className="w-full bg-[#08080a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#00D1FF] outline-none text-sm font-mono"
                    placeholder="No track linked. Upload or paste link."
                  />
                </div>

                <div className="border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center bg-black/25">
                  <span className="text-2xl mb-1">🎵</span>
                  <p className="text-[11px] text-white/50 mb-3 text-center">
                    Upload direct to Cloudflare R2 bucket (`hilling/music/`)
                  </p>
                  
                  <label className={`cursor-pointer px-4 py-2 bg-[#00D1FF]/10 hover:bg-[#00D1FF]/15 border border-[#00D1FF]/30 text-[#00D1FF] text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                    uploading ? "opacity-50 pointer-events-none" : ""
                  }`}>
                    {uploading ? `Uploading ${uploadProgress}%...` : "Select Music Track"}
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleUploadFile(e, creatingItem, setCreatingItem)}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>

                  {uploading && (
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3 max-w-[200px]">
                      <div className="bg-[#00D1FF] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setCreatingItem(null)}
                  className="w-1/2 border border-white/10 hover:bg-white/5 rounded-xl py-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="w-1/2 bg-gradient-to-r from-[#8B5CF6] to-[#00D1FF] hover:opacity-95 text-white rounded-xl py-3 text-sm font-semibold shadow-lg transition-all flex items-center justify-center"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Create Target"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category settings modal editor */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg animate-fade-in p-4">
          <div className="w-full max-w-2xl bg-[#0B0B0B] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_0_80px_rgba(139,92,246,0.15)] relative">
            <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                  Configure Sanctuary Details
                </h3>
                <p className="text-xs text-white/40 mt-1">Configure emoji, theme color, and descriptions for "{editingCategory.cat}"</p>
              </div>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-white/40 hover:text-white text-2xl transition-colors"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveCategoryMeta} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Sanctuary Name</label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Sanctuary Emoji</label>
                  <input
                    type="text"
                    value={editingCategory.emoji}
                    onChange={(e) => setEditingCategory({ ...editingCategory, emoji: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] text-center"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Theme Color (Hex)</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={editingCategory.color}
                    onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm font-mono h-[42px]"
                    required
                  />
                  <div className="w-10 h-10 rounded-xl border border-white/15 shrink-0" style={{ backgroundColor: editingCategory.color }} />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Description</label>
                <textarea
                  value={editingCategory.desc}
                  onChange={(e) => setEditingCategory({ ...editingCategory, desc: e.target.value })}
                  className="w-full h-24 bg-[#121212] border border-white/10 rounded-xl p-3.5 text-white focus:border-[#8B5CF6] outline-none text-sm resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="w-1/2 border border-white/10 hover:bg-white/5 rounded-xl py-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-1/2 bg-gradient-to-r from-[#8B5CF6] to-[#00D1FF] hover:opacity-95 text-white rounded-xl py-3 text-sm font-semibold shadow-lg transition-all flex items-center justify-center"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Save Details"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Editing user modal editor */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg animate-fade-in p-4">
          <div className="w-full max-w-2xl bg-[#0B0B0B] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_0_80px_rgba(139,92,246,0.15)] relative">
            <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                  Edit User Profile
                </h3>
                <p className="text-xs text-white/40 mt-1">Configure membership tier, streak value, and verify account.</p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-white/40 hover:text-white text-2xl transition-colors"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveUserProfile} className="space-y-6">
              {/* Account Contact Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Account Email Address</label>
                  <input
                    type="email"
                    value={editingUser.email || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Phone Number (Clean)</label>
                  <input
                    type="text"
                    value={editingUser.phone || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] font-mono"
                    placeholder="e.g. 7974899898"
                  />
                </div>
              </div>
              <p className="text-[10px] text-white/20 font-mono mt-1.5 select-all">UUID: {editingUser.id}</p>

              {/* Verification & Plan Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Verification Status</label>
                  <div className="flex items-center gap-3 bg-[#121212] border border-white/5 rounded-xl px-4 py-2.5 h-[42px]">
                    {editingUser.is_verified ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        ✓ Verified Account
                      </span>
                    ) : (
                      <>
                        <span className="text-xs font-bold text-amber-400 flex-1">
                          ⚠️ Unverified
                        </span>
                        <button
                          type="button"
                          onClick={() => handleVerifyUser(editingUser.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-colors shrink-0"
                        >
                          Verify now
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Membership Plan</label>
                  <select
                    value={editingUser.plan || "free"}
                    onChange={(e) => setEditingUser({ ...editingUser, plan: e.target.value })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px]"
                  >
                    <option value="free">Free Tier</option>
                    <option value="pro">Pro Membership</option>
                    <option value="divine">Divine Access</option>
                  </select>
                </div>
              </div>

              {/* Streak & Sessions Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Current Streak (Days)</label>
                  <input
                    type="number"
                    value={editingUser.streak !== undefined ? editingUser.streak : 0}
                    onChange={(e) => setEditingUser({ ...editingUser, streak: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] font-mono"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">Sessions Left (For Free Tier)</label>
                  <input
                    type="number"
                    value={editingUser.sessions !== undefined ? editingUser.sessions : 5}
                    onChange={(e) => setEditingUser({ ...editingUser, sessions: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#8B5CF6] outline-none text-sm h-[42px] font-mono"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handleDeleteUser(editingUser.id, editingUser.email)}
                  className="px-4.5 py-3 bg-red-950/20 border border-red-500/20 hover:border-red-500 hover:bg-red-950/50 text-red-400 rounded-xl text-xs font-bold transition-all uppercase tracking-wider shrink-0"
                >
                  🗑️ Delete User
                </button>
                <div className="flex-1 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="w-1/2 border border-white/10 hover:bg-white/5 rounded-xl py-3 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingUser}
                    className="w-1/2 bg-gradient-to-r from-[#8B5CF6] to-[#00D1FF] hover:opacity-95 text-white rounded-xl py-3 text-sm font-semibold shadow-lg transition-all flex items-center justify-center"
                  >
                    {savingUser ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
