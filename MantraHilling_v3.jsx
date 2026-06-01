import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   CONDITIONS DATABASE
═══════════════════════════════════════════════════════════ */
const CONDITIONS = [
  { id:"anxiety",   cat:"Mental",   emoji:"🧠", free:true,  title:"Anxiety & Panic",            sub:"Nervous system · Amygdala",          duration:25, color:"#7c3aed",
    freqs:[{hz:432,label:"432 Hz",role:"Primary",effect:"Lowers cortisol, calms nervous system"},{hz:528,label:"528 Hz",role:"Support",effect:"Reduces stress hormones at source"},{hz:40,label:"40 Hz",role:"Gamma",effect:"Anchors scattered thoughts"},{hz:10,label:"10 Hz",role:"Alpha",effect:"Shifts to rest-and-digest state"}],
    binaural:10, instruments:"Tibetan bowls · Crystal flute", protocol:"20–30 min daily. Begin with 432 Hz for 10 min then add 528 Hz.", tip:"Combine with 4-7-8 breathing — exhale twice as long as inhale.", science:"Cortisol reduction measurable within 20 min. Alpha at 10 Hz suppresses amygdala hyperactivation." },
  { id:"depression",cat:"Mental",   emoji:"🌤️", free:true,  title:"Depression & Low Mood",      sub:"Limbic system · Serotonin pathways",  duration:40, color:"#f59e0b",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Stimulates serotonin and dopamine release"},{hz:396,label:"396 Hz",role:"Release",effect:"Liberates guilt and fear"},{hz:963,label:"963 Hz",role:"Pineal",effect:"Elevates mood and awareness"},{hz:7.83,label:"7.83 Hz",role:"Schumann",effect:"Earth resonance — grounds and restores baseline"}],
    binaural:10, instruments:"Piano · Strings · Choral", protocol:"Morning 30–45 min. Avoid minor keys initially. Progress to 963 Hz week 2.", tip:"963 Hz with eyes closed in morning sunlight powerfully resets circadian mood.", science:"528 Hz activates mesolimbic dopamine pathway. 7.83 Hz syncs with hippocampal theta waves." },
  { id:"sleep",     cat:"Mental",   emoji:"🌙", free:true,  title:"Insomnia & Sleep",            sub:"Pineal gland · Melatonin",            duration:45, color:"#3b82f6",
    freqs:[{hz:3,label:"Delta 3 Hz",role:"Primary",effect:"Deep sleep induction — matches NREM brainwaves"},{hz:5,label:"Theta 5 Hz",role:"Transition",effect:"Hypnagogic state — bridges wakefulness to sleep"},{hz:174,label:"174 Hz",role:"Support",effect:"Natural anesthetic — deepest Solfeggio"},{hz:432,label:"432 Hz",role:"Calm",effect:"Reduces sympathetic overdrive"}],
    binaural:3, instruments:"Hang drum · Singing bowls · Drone", protocol:"Begin 45 min before sleep. Dark room. Progress 432→174→delta.", tip:"Binaural delta at 2–3 Hz with pink noise is the most studied sleep combination.", science:"Delta entrainment suppresses arousal centers in reticular formation." },
  { id:"adhd",      cat:"Mental",   emoji:"🎯", free:false, title:"ADHD & Focus Deficit",        sub:"Prefrontal cortex · Dopamine",        duration:30, color:"#10b981",
    freqs:[{hz:40,label:"40 Hz",role:"Gamma",effect:"MIT studies confirm sharper focus and attention"},{hz:14,label:"14 Hz",role:"Beta",effect:"Alertness and task engagement"},{hz:10,label:"10 Hz",role:"Alpha",effect:"Flow state — relaxed yet attentive"},{hz:528,label:"528 Hz",role:"Coherence",effect:"Neural coherence for sustained attention"}],
    binaural:20, instruments:"Binaural beats · Isochronic tones", protocol:"25 min study sessions, 5 min silence. Build to 2 cycles.", tip:"40 Hz gamma reduces ADHD hyperactivity symptoms in peer-reviewed studies.", science:"ADHD involves deficient gamma oscillations. External 40 Hz supplements endogenous gamma." },
  { id:"ptsd",      cat:"Mental",   emoji:"🕊️", free:false, title:"PTSD & Trauma",              sub:"Hippocampus · Vagus nerve",           duration:30, color:"#8b5cf6",
    freqs:[{hz:432,label:"432 Hz",role:"Primary",effect:"Brings body out of survival mode"},{hz:396,label:"396 Hz",role:"Release",effect:"Releases deeply held fear — root liberation"},{hz:639,label:"639 Hz",role:"Safety",effect:"Heals relationship to safety and others"},{hz:528,label:"528 Hz",role:"Repair",effect:"Rebuilds neural pathways post-trauma"}],
    binaural:6, instruments:"Crystal bowls · Cello · Nature", protocol:"Start with 10 min at 432 Hz. Build slowly over weeks. Always pair with grounding.", tip:"Combine with somatic movement — frequency + body awareness accelerates release.", science:"432 Hz activates PNS via vagal afferents. 396 Hz modulates amygdala threat response." },
  { id:"pain",      cat:"Physical", emoji:"⚡", free:false, title:"Chronic Pain & Fibromyalgia", sub:"Nociceptors · CNS sensitization",     duration:30, color:"#ef4444",
    freqs:[{hz:174,label:"174 Hz",role:"Primary",effect:"Natural pain anesthetic — deepest tissue"},{hz:528,label:"528 Hz",role:"Anti-inflam",effect:"Anti-inflammatory at cellular level"},{hz:40,label:"40 Hz",role:"Perception",effect:"Reduces chronic pain perception in trials"},{hz:432,label:"432 Hz",role:"Muscle",effect:"Relaxes skeletal muscle tension"}],
    binaural:10, instruments:"Low drums · Crystal bowls · Cello", protocol:"2× daily, 30 min. Place speakers near affected area. 174 Hz first 15 min.", tip:"174 Hz is the most underused frequency — especially effective for nerve pain.", science:"174 Hz resonates in connective tissue. TENS at similar frequencies: 40–60% VAS reduction." },
  { id:"heart",     cat:"Physical", emoji:"❤️", free:false, title:"Cardiovascular Health",       sub:"Heart · Vascular endothelium",       duration:30, color:"#ec4899",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Reduces oxidative stress in cardiac cells"},{hz:432,label:"432 Hz",role:"BP",effect:"Lowers heart rate and blood pressure"},{hz:639,label:"639 Hz",role:"Heart",effect:"Heart chakra — emotional heart healing"},{hz:7.83,label:"7.83 Hz",role:"HRV",effect:"Entrains heart rate variability"}],
    binaural:10, instruments:"Harp · Soft piano · Nature", protocol:"30 min during rest or light stretching. Morning preferred.", tip:"432 Hz shows measurable BP reduction vs 440 Hz standard tuning.", science:"528 Hz reduces ROS in H9c2 cardiac cells. 432 Hz lowers sympathetic nervous activity." },
  { id:"cancer",    cat:"Physical", emoji:"🛡️", free:false, title:"Cancer Support",              sub:"Immune system · Cellular health",     duration:60, color:"#6366f1",
    freqs:[{hz:40,label:"40 Hz",role:"Immune",effect:"Triggers microglia immune activity — MIT Picower"},{hz:528,label:"528 Hz",role:"DNA",effect:"DNA repair — studied by Dr. Len Horowitz"},{hz:432,label:"432 Hz",role:"Coherence",effect:"Restores cellular coherence"},{hz:638,label:"638 Hz",role:"NK Cells",effect:"Stimulates natural killer cell activation"}],
    binaural:40, instruments:"Pure sine tones · Crystal bowls", protocol:"ADJUNCT ONLY — never replace medical treatment. 2× daily 30 min.", tip:"Music therapy is integrated in 80%+ of US cancer centers as evidence-based care.", science:"40 Hz gamma reduces amyloid plaques and upregulates immune markers in MIT trials." },
  { id:"alzheimers",cat:"Physical", emoji:"🧩", free:false, title:"Alzheimer's & Dementia",      sub:"Hippocampus · Cortical networks",    duration:60, color:"#a855f7",
    freqs:[{hz:40,label:"40 Hz",role:"Primary",effect:"MIT: 1hr/day reduced amyloid plaques 50%"},{hz:528,label:"528 Hz",role:"Memory",effect:"Supports neural plasticity and memory"},{hz:432,label:"432 Hz",role:"Emotion",effect:"Evokes memory through emotional pathways"},{hz:10,label:"10 Hz",role:"Alpha",effect:"Memory network re-engagement"}],
    binaural:40, instruments:"Personalized music · Singing bowls", protocol:"Daily 1hr. Use personally meaningful music from patient's youth (ages 15–25).", tip:"Personalized playlists produce recall even in late-stage dementia.", science:"GENUS trial: 40 Hz reduced tau tangles and amyloid-β in cortex." },
  { id:"parkinsons",cat:"Physical", emoji:"🌿", free:false, title:"Parkinson's Disease",         sub:"Basal ganglia · Dopamine neurons",   duration:30, color:"#14b8a6",
    freqs:[{hz:40,label:"40 Hz",role:"Primary",effect:"Reduced tremor, improved motor control in trials"},{hz:528,label:"528 Hz",role:"Neural",effect:"Dopaminergic pathway support"},{hz:432,label:"432 Hz",role:"Rhythm",effect:"Stabilizes motor output rhythms"},{hz:120,label:"120 Hz",role:"Beta",effect:"Counteracts pathological beta suppression"}],
    binaural:10, instruments:"Rhythmic drumming · Metronome music", protocol:"Rhythmic Auditory Stimulation (RAS) daily. Walk in beat with 120–140 BPM.", tip:"RAS is FDA-cleared as physical therapy adjunct for Parkinson's gait.", science:"RAS at 120 Hz entrains striatal circuits bypassing the defective basal ganglia." },
  { id:"arthritis", cat:"Chronic",  emoji:"🦴", free:false, title:"Arthritis & Joints",          sub:"Synovial joints · Cartilage",        duration:30, color:"#78716c",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Anti-inflammatory — reduces cytokines"},{hz:174,label:"174 Hz",role:"Analgesic",effect:"Deep analgesic — reduces joint pain"},{hz:285,label:"285 Hz",role:"Cartilage",effect:"Cartilage and tissue regeneration"},{hz:432,label:"432 Hz",role:"Muscle",effect:"Relaxes periarticular muscles"}],
    binaural:10, instruments:"Low bowl resonance · Deep harp", protocol:"Local vibration at 174 Hz near joint + 528 Hz systemic. 30 min, 2× daily.", tip:"Warm-water sound bath with 528 Hz — water amplifies vibration to joints.", science:"174 Hz disrupts prostaglandin-mediated pain. 528 Hz inhibits COX-2 pathway." },
  { id:"diabetes",  cat:"Chronic",  emoji:"🩸", free:false, title:"Diabetes & Blood Sugar",      sub:"Pancreas · Insulin signaling",       duration:30, color:"#f97316",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Supports pancreatic cell function"},{hz:432,label:"432 Hz",role:"Cortisol",effect:"Reduces cortisol — major insulin resistance driver"},{hz:396,label:"396 Hz",role:"Anxiety",effect:"Releases anxiety around food — metabolic reset"},{hz:741,label:"741 Hz",role:"Detox",effect:"Liver and metabolic detoxification"}],
    binaural:7, instruments:"Gentle piano · Singing bowls", protocol:"30 min daily. Morning best. Pair with mindful eating and glucose monitoring.", tip:"Stress reduction via music directly improves glucose via cortisol suppression.", science:"20% cortisol reduction = measurable fasting glucose improvement." },
  { id:"thyroid",   cat:"Endocrine",emoji:"🦋", free:false, title:"Thyroid Disorders",           sub:"Thyroid gland · Throat chakra",      duration:20, color:"#06b6d4",
    freqs:[{hz:741,label:"741 Hz",role:"Primary",effect:"Throat chakra — stimulates thyroid field"},{hz:528,label:"528 Hz",role:"Repair",effect:"Cellular repair — oxidative damage reversal"},{hz:432,label:"432 Hz",role:"HPA",effect:"Normalizes hormonal cascade"},{hz:396,label:"396 Hz",role:"Expression",effect:"Releases suppressed expression — key thyroid pattern"}],
    binaural:10, instruments:"Throat singing · B-note sound bowls", protocol:"741 Hz listening 2× daily. Add humming 10 min/day with hand on throat.", tip:"Humming 'mmmm' at 741 Hz creates direct local vibration at thyroid.", science:"Thyroid responds to local mechanical vibration. TSH normalization observed in studies." },
  { id:"hormonal",  cat:"Endocrine",emoji:"🌸", free:false, title:"Hormonal Imbalance",          sub:"Ovaries · Adrenals · Hypothalamus",  duration:35, color:"#ec4899",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Reproductive cellular repair"},{hz:432,label:"432 Hz",role:"HPA",effect:"Balances estrogen-cortisol relationship"},{hz:639,label:"639 Hz",role:"Womb",effect:"Heart and womb — sacred feminine healing"},{hz:963,label:"963 Hz",role:"Master",effect:"Pineal/pituitary — master hormone gland"}],
    binaural:7, instruments:"Crystal bowls · Harp · Sacred chants", protocol:"Cycle-aware: 528 Hz follicular, 639 Hz ovulatory, 432 Hz luteal, 396 Hz menstrual.", tip:"Yin yoga with 528 Hz creates powerful hormonal rebalancing.", science:"Cortisol suppression via PNS activates pulsatile GnRH release." },
  { id:"autoimmune",cat:"Chronic",  emoji:"🔬", free:false, title:"Autoimmune Diseases",         sub:"Immune system dysregulation",        duration:45, color:"#84cc16",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Reduces chronic systemic inflammation"},{hz:432,label:"432 Hz",role:"HPA",effect:"Downregulates stress-immune overactivation"},{hz:285,label:"285 Hz",role:"Regen",effect:"Cellular regeneration — heals immune-damaged tissue"},{hz:396,label:"396 Hz",role:"Emotional",effect:"Releases trauma — key driver of immune dysregulation"}],
    binaural:7, instruments:"Crystal bowls (A=432 Hz) · Ambient drone", protocol:"Daily 30–60 min. Layer 396 Hz emotional sessions 2× weekly.", tip:"Unresolved trauma links to autoimmune onset — emotional frequencies are critical.", science:"528 Hz reduces NF-κB pathway activation. 432 Hz reduces IL-6 markers." },
  { id:"grief",     cat:"Emotional",emoji:"💙", free:true,  title:"Grief & Loss",                sub:"Heart · Limbic system",              duration:30, color:"#3b82f6",
    freqs:[{hz:639,label:"639 Hz",role:"Primary",effect:"Heart chakra — processes grief safely"},{hz:528,label:"528 Hz",role:"Rebuild",effect:"Rebuilds inner coherence after loss"},{hz:396,label:"396 Hz",role:"Release",effect:"Liberation from guilt and grief"},{hz:432,label:"432 Hz",role:"Ground",effect:"Grounding and stabilizing presence"}],
    binaural:7, instruments:"Cello · Gentle piano · Choral voices", protocol:"Allow emotional expression during listening. Let tears flow. 30 min as needed.", tip:"Music in 432 Hz during crying is one of the most efficient emotional processing tools.", science:"639 Hz entrainment activates oxytocin release — counteracts isolation of grief." },
  { id:"addiction", cat:"Emotional",emoji:"🔓", free:false, title:"Addiction & Recovery",        sub:"Reward pathways · Prefrontal cortex", duration:40, color:"#8b5cf6",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Repairs dopamine receptors — neural recovery"},{hz:40,label:"40 Hz",role:"Control",effect:"Strengthens impulse control pathways"},{hz:396,label:"396 Hz",role:"Shame",effect:"Releases shame and guilt — core addiction drivers"},{hz:963,label:"963 Hz",role:"Spirit",effect:"Spiritual reconnection — addresses existential void"}],
    binaural:10, instruments:"Drumming circles · Rhythmic music", protocol:"Active music-making most powerful. Group drumming or choir. 40 Hz binaural 2× daily.", tip:"Group drumming shows remarkable addiction recovery — synchronizes brainwaves AND builds community.", science:"Rhythm synchronizes mesolimbic circuits. Group music releases endogenous opioids and oxytocin." },
  { id:"selfesteem",cat:"Emotional",emoji:"✨", free:true,  title:"Self-Esteem & Identity",      sub:"Default mode network · Ego",         duration:25, color:"#f59e0b",
    freqs:[{hz:396,label:"396 Hz",role:"Primary",effect:"Breaks fear-based self-limiting beliefs"},{hz:528,label:"528 Hz",role:"Worth",effect:"Self-worth resonance — heart of self-acceptance"},{hz:639,label:"639 Hz",role:"Harmony",effect:"Heals relationship with self and others"},{hz:963,label:"963 Hz",role:"Higher",effect:"Higher self connection — transcends limiting ego"}],
    binaural:10, instruments:"Own voice toning · Sound bowls", protocol:"528 Hz listening + journaling. Then 5 min free vocal toning. Daily morning.", tip:"Your own voice is the most powerful healing instrument — hum freely for 5 min daily.", science:"DMN quieted by focused music. 396 Hz triggers limbic amygdala recalibration." },
  { id:"migraine",  cat:"Physical", emoji:"💫", free:false, title:"Migraines & Headaches",       sub:"Trigeminovascular system · Brain",   duration:35, color:"#a855f7",
    freqs:[{hz:432,label:"432 Hz",role:"Primary",effect:"Vasodilation and skeletal muscle relaxation"},{hz:174,label:"174 Hz",role:"Analgesic",effect:"Most direct frequency for headache relief"},{hz:528,label:"528 Hz",role:"Neuro",effect:"Reduces neuroinflammation"},{hz:3,label:"Delta 3 Hz",role:"Rest",effect:"Deep rest — migraine most responsive to stillness"}],
    binaural:3, instruments:"Very soft singing bowls · Low ambient drone", protocol:"Dark room, 174 Hz at barely-audible volume. Cold pack on neck.", tip:"During acute migraine: barely-audible is more effective than loud — nervous system is hypersensitized.", science:"Trigeminovascular sensitization responds to 174 Hz dampening. 432 Hz vasodilates cranial vasculature." },
  { id:"respiratory",cat:"Physical",emoji:"🫁", free:false, title:"Respiratory Disorders",       sub:"Lungs · Bronchial airways",          duration:20, color:"#06b6d4",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Reduces bronchial inflammation"},{hz:432,label:"432 Hz",role:"Breathing",effect:"Slows breathing rate — expands capacity"},{hz:285,label:"285 Hz",role:"Tissue",effect:"Bronchial tissue regeneration"},{hz:174,label:"174 Hz",role:"Relax",effect:"Deep diaphragmatic tension release"}],
    binaural:7, instruments:"Flute · Throat singing · Didgeridoo", protocol:"528 Hz + pursed-lip breathing: inhale 2s, exhale 4–6s. 20 min, 2× daily.", tip:"Even listening to wind instruments neurologically activates respiratory muscles.", science:"528 Hz reduces bronchial mast cell degranulation. Didgeridoo training improves FEV1 in COPD." },
  { id:"skin",      cat:"Physical", emoji:"🌱", free:false, title:"Skin Disorders",              sub:"Skin microbiome · Immune-skin axis",  duration:30, color:"#10b981",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Reduces mast cell activation in skin"},{hz:285,label:"285 Hz",role:"Regen",effect:"Skin cell regeneration and renewal"},{hz:432,label:"432 Hz",role:"Stress",effect:"Reduces stress-induced flares"},{hz:396,label:"396 Hz",role:"Emotional",effect:"Clears emotional stress linked to skin conditions"}],
    binaural:7, instruments:"Soft ambient · Crystal bowls · Nature", protocol:"Daily 30 min + evening sessions during flares. 285 Hz for regeneration, 528 Hz for inflammation.", tip:"Skin disorders have highest psychosomatic component — emotional frequencies often provide breakthrough.", science:"Skin-brain axis: cortisol directly triggers keratinocyte inflammation. 432 Hz breaks the stress-flare loop." },
  { id:"digestive", cat:"Physical", emoji:"🌀", free:false, title:"Digestive Disorders",         sub:"Enteric nervous system · Gut-brain",  duration:25, color:"#f97316",
    freqs:[{hz:528,label:"528 Hz",role:"Primary",effect:"Soothes intestinal lining, reduces flares"},{hz:432,label:"432 Hz",role:"PNS",effect:"Activates 'rest and digest' mode"},{hz:174,label:"174 Hz",role:"Pain",effect:"Relieves GI cramping and spasm"},{hz:639,label:"639 Hz",role:"Gut-Brain",effect:"Harmonizes gut-brain via vagal tone"}],
    binaural:7, instruments:"Slow drumming · Deep bass tones", protocol:"Listen during meals and 20 min post-meal lying down.", tip:"The gut has 500M neurons — it literally absorbs sound through the enteric nervous system.", science:"IBS cortisol-gut loop disrupted by PNS 432 Hz activation." },
];

const SOLFEGGIO = [
  {hz:174,note:"F",name:"Foundation",action:"Pain relief & anesthesia",     color:"#6366f1"},
  {hz:285,note:"D",name:"Quantum",   action:"Tissue & cellular regeneration",color:"#8b5cf6"},
  {hz:396,note:"G",name:"Liberation",action:"Fear & guilt release",          color:"#a855f7"},
  {hz:417,note:"A",name:"Change",    action:"Trauma & pattern clearing",     color:"#ec4899"},
  {hz:528,note:"C",name:"Love / DNA",action:"Cellular repair & love",        color:"#f59e0b"},
  {hz:639,note:"A",name:"Connection",action:"Interpersonal harmony",         color:"#10b981"},
  {hz:741,note:"G",name:"Expression",action:"Toxin clearing & throat",       color:"#06b6d4"},
  {hz:852,note:"A",name:"Intuition", action:"Third eye & intuition",         color:"#3b82f6"},
  {hz:963,note:"B",name:"Unity",     action:"Pineal activation & oneness",   color:"#7c3aed"},
];

const BRAINWAVES = [
  {name:"Delta",range:"0.5–4 Hz",  state:"Deep sleep · Healing",        color:"#6366f1",shape:[0.2,0.8,0.2,0.9,0.1,0.7,0.3,0.8]},
  {name:"Theta",range:"4–8 Hz",   state:"Meditation · Creativity · REM",color:"#8b5cf6",shape:[0.4,0.9,0.2,0.8,0.5,0.9,0.3,0.7]},
  {name:"Alpha",range:"8–13 Hz",  state:"Calm · Flow · Learning",       color:"#10b981",shape:[0.5,0.8,0.5,0.8,0.5,0.8,0.5,0.8]},
  {name:"Beta", range:"13–30 Hz", state:"Alert · Focus · Active",       color:"#f59e0b",shape:[0.6,0.4,0.7,0.3,0.6,0.4,0.7,0.3]},
  {name:"Gamma",range:"30–100 Hz",state:"Peak cognition · Insight",     color:"#ef4444",shape:[0.5,0.9,0.1,0.9,0.5,0.9,0.1,0.9]},
];

const FREE_IDS = new Set(["anxiety","depression","sleep","grief","selfesteem"]);
const CATS = ["All","Mental","Physical","Chronic","Endocrine","Emotional"];

/* ═══════════════════════════════════════════════════════════
   LANGUAGE STRINGS
═══════════════════════════════════════════════════════════ */
const LANGS = {
  en:{code:"en",flag:"🇬🇧",name:"English",dir:"ltr",
    tagline:"Heal with Sound",sub:"Ancient frequencies. Modern science.",search:"Search conditions, frequencies…",
    selectLang:"Choose your language",free:"Free",pro:"Pro",divine:"Divine",monthly:"/ mo",yearly:"/ yr",
    save:"Save 40%",mostPop:"Most Popular",bestVal:"Best Value",upgrade:"Upgrade to Pro",tryFree:"Try Free",
    currentPlan:"Current Plan",unlock:"Unlock All 22+ Conditions",planLabel:"Your Plan",sessLeft:"sessions left",
    unlimited:"Unlimited",home:"Home",explore:"Explore",library:"Library",plans:"Plans",you:"You",
    featured:"Sound Remedies",trending:"Trending",goodMorn:"Good morning",goodAft:"Good afternoon",goodEve:"Good evening",
    streakDays:"Day Streak 🔥",protocol:"Protocol",tip:"Expert Tip",science:"Science",instruments:"Instruments",
    startSession:"Start Session",pause:"Pause",resume:"Resume",stop:"Stop",nowPlaying:"Now Playing",
    frequencies:"Frequencies",freqMap:"Solfeggio Map",brainwaves:"Brainwaves",allConditions:"All Conditions",
    continue:"Continue",binaural:"Binaural Beats",volume:"Volume",playing:"Playing",selectFreq:"Tap to play individually",
    tier_free:["5 sessions / month","5 healing conditions","432 Hz + 528 Hz basics","Standard audio quality","Supported by ads"],
    tier_pro:["Unlimited sessions","All 22+ conditions","Full Solfeggio library (174–963 Hz)","Offline downloads","Lossless HD audio","Zero ads","Sleep timer + reminders","Progress tracking & streaks"],
    tier_divine:["Everything in Pro","AI-powered frequency diagnosis","Personalized weekly programs","Live group sound baths","1:1 therapist sessions (2/mo)","Family plan — 4 users","Priority support 24/7"],
    priceM:"₹299",priceY:"₹1,999",divM:"₹799",divY:"₹5,999",freeP:"₹0"},
  hi:{code:"hi",flag:"🇮🇳",name:"हिंदी",dir:"ltr",
    tagline:"ध्वनि से उपचार",sub:"प्राचीन आवृत्तियाँ। आधुनिक विज्ञान।",search:"स्थिति, आवृत्तियाँ खोजें…",
    selectLang:"भाषा चुनें",free:"निःशुल्क",pro:"प्रो",divine:"दिव्य",monthly:"/ माह",yearly:"/ वर्ष",
    save:"40% बचाएं",mostPop:"सबसे लोकप्रिय",bestVal:"सर्वश्रेष्ठ",upgrade:"प्रो में अपग्रेड करें",tryFree:"निःशुल्क आज़माएं",
    currentPlan:"वर्तमान योजना",unlock:"22+ स्थितियाँ अनलॉक करें",planLabel:"आपकी योजना",sessLeft:"सत्र शेष",
    unlimited:"असीमित",home:"होम",explore:"अन्वेषण",library:"पुस्तकालय",plans:"योजनाएं",you:"आप",
    featured:"ध्वनि चिकित्सा",trending:"लोकप्रिय",goodMorn:"सुप्रभात",goodAft:"शुभ अपराह्न",goodEve:"शुभ संध्या",
    streakDays:"दिन की श्रृंखला 🔥",protocol:"प्रोटोकॉल",tip:"विशेषज्ञ टिप",science:"विज्ञान",instruments:"वाद्ययंत्र",
    startSession:"सत्र शुरू करें",pause:"रोकें",resume:"जारी रखें",stop:"बंद करें",nowPlaying:"अभी चल रहा है",
    frequencies:"आवृत्तियाँ",freqMap:"सोल्फेगियो मानचित्र",brainwaves:"मस्तिष्क तरंगें",allConditions:"सभी स्थितियाँ",
    continue:"जारी रखें",binaural:"बाइनॉरल बीट्स",volume:"वॉल्यूम",playing:"चल रहा है",selectFreq:"व्यक्तिगत रूप से चलाएं",
    tier_free:["5 सत्र / माह","5 उपचार स्थितियाँ","432 Hz + 528 Hz मूल","सामान्य ऑडियो","विज्ञापन समर्थित"],
    tier_pro:["असीमित सत्र","सभी 22+ स्थितियाँ","पूर्ण सोल्फेगियो","ऑफलाइन डाउनलोड","HD ऑडियो","विज्ञापन मुक्त","स्लीप टाइमर","प्रगति ट्रैकिंग"],
    tier_divine:["प्रो की सभी सुविधाएं","AI निदान","व्यक्तिगत कार्यक्रम","लाइव साउंड बाथ","1:1 थेरेपिस्ट","पारिवारिक योजना","प्राथमिकता सहायता"],
    priceM:"₹299",priceY:"₹1,999",divM:"₹799",divY:"₹5,999",freeP:"₹0"},
  es:{code:"es",flag:"🇪🇸",name:"Español",dir:"ltr",
    tagline:"Sana con el Sonido",sub:"Frecuencias antiguas. Ciencia moderna.",search:"Buscar condiciones…",
    selectLang:"Elige tu idioma",free:"Gratis",pro:"Pro",divine:"Divino",monthly:"/ mes",yearly:"/ año",
    save:"Ahorra 40%",mostPop:"Más Popular",bestVal:"Mejor Valor",upgrade:"Actualizar a Pro",tryFree:"Prueba Gratis",
    currentPlan:"Plan Actual",unlock:"Desbloquear 22+ Condiciones",planLabel:"Tu Plan",sessLeft:"sesiones restantes",
    unlimited:"Ilimitado",home:"Inicio",explore:"Explorar",library:"Biblioteca",plans:"Planes",you:"Tú",
    featured:"Destacado",trending:"Tendencias",goodMorn:"Buenos días",goodAft:"Buenas tardes",goodEve:"Buenas noches",
    streakDays:"Días seguidos 🔥",protocol:"Protocolo",tip:"Consejo Experto",science:"Ciencia",instruments:"Instrumentos",
    startSession:"Iniciar",pause:"Pausar",resume:"Reanudar",stop:"Detener",nowPlaying:"Reproduciendo",
    frequencies:"Frecuencias",freqMap:"Mapa Solfeggio",brainwaves:"Ondas Cerebrales",allConditions:"Todas las Condiciones",
    continue:"Continuar",binaural:"Beats Binaurales",volume:"Volumen",playing:"Reproduciendo",selectFreq:"Toca para reproducir",
    tier_free:["5 sesiones / mes","5 condiciones","Frecuencias básicas","Calidad estándar","Con anuncios"],
    tier_pro:["Sesiones ilimitadas","22+ condiciones","Biblioteca Solfeggio","Offline","Audio HD","Sin anuncios","Temporizador","Seguimiento"],
    tier_divine:["Todo de Pro","Diagnóstico IA","Programas personalizados","Baños sonoros","Sesiones 1:1","Plan familiar","Soporte 24/7"],
    priceM:"€4.99",priceY:"€34.99",divM:"€9.99",divY:"€69.99",freeP:"€0"},
  fr:{code:"fr",flag:"🇫🇷",name:"Français",dir:"ltr",
    tagline:"Guérissez par le Son",sub:"Fréquences anciennes. Science moderne.",search:"Rechercher…",
    selectLang:"Choisissez votre langue",free:"Gratuit",pro:"Pro",divine:"Divin",monthly:"/ mois",yearly:"/ an",
    save:"Économisez 40%",mostPop:"Plus Populaire",bestVal:"Meilleur Rapport",upgrade:"Passer à Pro",tryFree:"Essai Gratuit",
    currentPlan:"Plan Actuel",unlock:"Débloquer 22+ Conditions",planLabel:"Votre Plan",sessLeft:"séances restantes",
    unlimited:"Illimité",home:"Accueil",explore:"Explorer",library:"Bibliothèque",plans:"Abonnements",you:"Vous",
    featured:"Vedette",trending:"Tendances",goodMorn:"Bonjour",goodAft:"Bon après-midi",goodEve:"Bonsoir",
    streakDays:"Jours consécutifs 🔥",protocol:"Protocole",tip:"Conseil Expert",science:"Science",instruments:"Instruments",
    startSession:"Démarrer",pause:"Pause",resume:"Reprendre",stop:"Arrêter",nowPlaying:"En cours",
    frequencies:"Fréquences",freqMap:"Carte Solfeggio",brainwaves:"Ondes Cérébrales",allConditions:"Toutes les Conditions",
    continue:"Continuer",binaural:"Beats Binauraux",volume:"Volume",playing:"En lecture",selectFreq:"Appuyer pour écouter",
    tier_free:["5 séances / mois","5 conditions","Fréquences de base","Qualité standard","Avec publicités"],
    tier_pro:["Séances illimitées","22+ conditions","Bibliothèque complète","Hors ligne","HD","Sans pub","Minuterie","Suivi"],
    tier_divine:["Tout du Pro","Diagnostic IA","Programmes","Bains sonores","Sessions 1:1","Famille","Support 24/7"],
    priceM:"€4,99",priceY:"€34,99",divM:"€9,99",divY:"€69,99",freeP:"€0"},
  ar:{code:"ar",flag:"🇸🇦",name:"العربية",dir:"rtl",
    tagline:"الشفاء بالصوت",sub:"ترددات قديمة. علم حديث.",search:"ابحث عن الحالات…",
    selectLang:"اختر لغتك",free:"مجاني",pro:"برو",divine:"إلهي",monthly:"/ شهر",yearly:"/ سنة",
    save:"وفر 40%",mostPop:"الأكثر شعبية",bestVal:"أفضل قيمة",upgrade:"ترقية إلى برو",tryFree:"جرب مجاناً",
    currentPlan:"الخطة الحالية",unlock:"فتح 22+ حالة",planLabel:"خطتك",sessLeft:"جلسات متبقية",
    unlimited:"غير محدود",home:"الرئيسية",explore:"استكشاف",library:"المكتبة",plans:"الخطط",you:"أنت",
    featured:"مميز",trending:"رائج",goodMorn:"صباح الخير",goodAft:"مساء الخير",goodEve:"مساء النور",
    streakDays:"أيام متتالية 🔥",protocol:"البروتوكول",tip:"نصيحة الخبير",science:"العلم",instruments:"الآلات",
    startSession:"بدء",pause:"إيقاف",resume:"استئناف",stop:"إيقاف تام",nowPlaying:"يعزف الآن",
    frequencies:"الترددات",freqMap:"خريطة سولفيجيو",brainwaves:"موجات الدماغ",allConditions:"جميع الحالات",
    continue:"متابعة",binaural:"نبضات ثنائية",volume:"الصوت",playing:"يعزف",selectFreq:"اضغط للتشغيل",
    tier_free:["5 جلسات / شهر","5 حالات","ترددات أساسية","جودة عادية","مع إعلانات"],
    tier_pro:["غير محدود","22+ حالة","مكتبة كاملة","بدون إنترنت","HD","بدون إعلانات","مؤقت","تتبع"],
    tier_divine:["كل برو","ذكاء اصطناعي","برامج مخصصة","حمامات صوتية","1:1","عائلة","دعم 24/7"],
    priceM:"$4.99",priceY:"$34.99",divM:"$9.99",divY:"$69.99",freeP:"$0"},
  ja:{code:"ja",flag:"🇯🇵",name:"日本語",dir:"ltr",
    tagline:"音で癒す",sub:"古代の周波数。現代の科学。",search:"症状・周波数を検索…",
    selectLang:"言語を選択",free:"無料",pro:"プロ",divine:"神聖",monthly:"/ 月",yearly:"/ 年",
    save:"40%節約",mostPop:"人気No.1",bestVal:"最高コスパ",upgrade:"Proにアップグレード",tryFree:"無料で試す",
    currentPlan:"現在のプラン",unlock:"22+症状を解放",planLabel:"あなたのプラン",sessLeft:"セッション残り",
    unlimited:"無制限",home:"ホーム",explore:"探索",library:"ライブラリ",plans:"プラン",you:"あなた",
    featured:"おすすめ",trending:"トレンド",goodMorn:"おはようございます",goodAft:"こんにちは",goodEve:"こんばんは",
    streakDays:"日連続 🔥",protocol:"プロトコル",tip:"専門家のヒント",science:"科学",instruments:"楽器",
    startSession:"開始",pause:"一時停止",resume:"再開",stop:"停止",nowPlaying:"再生中",
    frequencies:"周波数",freqMap:"ソルフェジオマップ",brainwaves:"脳波",allConditions:"すべての症状",
    continue:"続ける",binaural:"バイノーラルビート",volume:"音量",playing:"再生中",selectFreq:"タップして再生",
    tier_free:["5セッション / 月","5つの症状","基本周波数","標準音質","広告あり"],
    tier_pro:["無制限","22以上の症状","全ライブラリ","オフライン","HD","広告なし","タイマー","進捗"],
    tier_divine:["Pro全機能","AI診断","個別プログラム","ライブ音浴","1対1","ファミリー","優先サポート"],
    priceM:"¥499",priceY:"¥3,999",divM:"¥1,299",divY:"¥9,999",freeP:"¥0"},
};

/* ═══════════════════════════════════════════════════════════
   WEB AUDIO ENGINE
═══════════════════════════════════════════════════════════ */
function useAudioEngine() {
  const ctxRef   = useRef(null);
  const nodesRef = useRef([]);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  };

  // Gracefully fade out and stop all active oscillators
  const stopAll = (fadeSecs = 0.6) => {
    const ctx = ctxRef.current;
    if (!ctx || !nodesRef.current.length) return;
    nodesRef.current.forEach(({ osc, gain }) => {
      try {
        gain.gain.setTargetAtTime(0, ctx.currentTime, fadeSecs / 4);
        setTimeout(() => { try { osc.stop(); } catch (_) {} }, fadeSecs * 1000 + 100);
      } catch (_) {}
    });
    nodesRef.current = [];
  };

  // Create one binaural pair: left ear at hz, right ear at hz + delta
  // Returns { osc, gain } nodes added to nodesRef
  const addBinauralPair = (ctx, hz, delta, masterGain, vol, wave = "sine") => {
    const now = ctx.currentTime;
    const merger = ctx.createChannelMerger(2);
    merger.connect(masterGain);

    ["L", "R"].forEach((ch, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(i === 0 ? hz : hz + delta, now);
      gain.gain.setValueAtTime(vol, now);
      osc.connect(gain);
      gain.connect(merger, 0, i);
      osc.start(now);
      nodesRef.current.push({ osc, gain });
    });
  };

  // Add a regular (mono) oscillator
  const addMono = (ctx, hz, vol, wave = "sine", fadeIn = 1.0) => {
    const now  = ctx.currentTime;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(hz, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.setTargetAtTime(vol, now, fadeIn / 3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    nodesRef.current.push({ osc, gain });
  };

  /*
   * playCondition — plays the full layered sound for a condition:
   *   1. Primary healing frequency (binaural sine)
   *   2. Sub-octave drone (mono triangle) for grounding warmth
   *   3. Shimmer tone at 5th harmonic (mono sine, very soft)
   *   4. Slight detune chorus voice
   */
  const playCondition = (condition, volumeLevel = 0.28, binauralOn = true) => {
    stopAll(0.3);
    const ctx = getCtx();
    const now = ctx.currentTime;
    const hz  = condition.freqs[0].hz;   // primary freq
    const delta = binauralOn ? condition.binaural : 0;

    // Master volume node
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.setTargetAtTime(volumeLevel, now, 1.0); // 3s fade-in
    master.connect(ctx.destination);

    if (binauralOn && delta > 0) {
      addBinauralPair(ctx, hz, delta, master, 0.9);
    } else {
      // Mono primary tone
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(hz, now);
      gain.gain.setValueAtTime(0.9, now);
      osc.connect(gain); gain.connect(master); osc.start(now);
      nodesRef.current.push({ osc, gain });
    }

    // Sub-octave drone — warmth & grounding
    if (hz > 20) {
      const subHz = hz / 2;
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(subHz, now);
      subGain.gain.setValueAtTime(0, now);
      subGain.gain.setTargetAtTime(0.18, now, 1.5);
      subOsc.connect(subGain); subGain.connect(ctx.destination); subOsc.start(now);
      nodesRef.current.push({ osc: subOsc, gain: subGain });
    }

    // Shimmer — fifth harmonic (very soft)
    if (hz > 10) {
      const shimHz = hz * 1.5;
      const shimOsc = ctx.createOscillator();
      const shimGain = ctx.createGain();
      shimOsc.type = "sine";
      shimOsc.frequency.setValueAtTime(shimHz, now);
      shimGain.gain.setValueAtTime(0, now);
      shimGain.gain.setTargetAtTime(0.06, now, 2.0);
      shimOsc.connect(shimGain); shimGain.connect(ctx.destination); shimOsc.start(now);
      nodesRef.current.push({ osc: shimOsc, gain: shimGain });
    }

    // Slight detune chorus (2 cents sharp)
    const detOsc  = ctx.createOscillator();
    const detGain = ctx.createGain();
    detOsc.type = "sine";
    detOsc.frequency.setValueAtTime(hz * 1.0012, now);
    detGain.gain.setValueAtTime(0, now);
    detGain.gain.setTargetAtTime(0.08, now, 1.8);
    detOsc.connect(detGain); detGain.connect(ctx.destination); detOsc.start(now);
    nodesRef.current.push({ osc: detOsc, gain: detGain });

    nodesRef.current.push({ osc: { stop: () => {} }, gain: master });
  };

  // Play a single frequency (for individual freq buttons in session)
  const playOne = (hz, volumeLevel = 0.25, binauralDelta = 10) => {
    stopAll(0.2);
    const ctx = getCtx();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.setTargetAtTime(volumeLevel, now, 0.3);
    master.connect(ctx.destination);

    if (binauralDelta > 0) {
      addBinauralPair(ctx, hz, binauralDelta, master, 0.9);
    } else {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = "sine"; osc.frequency.setValueAtTime(hz, now); gain.gain.setValueAtTime(0.9, now);
      osc.connect(gain); gain.connect(master); osc.start(now);
      nodesRef.current.push({ osc, gain });
    }
    nodesRef.current.push({ osc: { stop: () => {} }, gain: master });
  };

  const setMasterVolume = (vol) => {
    nodesRef.current.forEach(({ gain }) => {
      try { gain.gain.setTargetAtTime(vol, ctxRef.current.currentTime, 0.1); } catch (_) {}
    });
  };

  return { playCondition, playOne, stopAll, setMasterVolume };
}

/* ═══════════════════════════════════════════════════════════
   WAVEFORM ANIMATION HOOK
═══════════════════════════════════════════════════════════ */
function useWave(active, length = 48) {
  const [wave, setWave] = useState(() =>
    Array.from({ length }, (_, i) => Math.sin(i * 0.45) * 0.4 + 0.5)
  );
  const raf = useRef();
  useEffect(() => {
    if (!active) { cancelAnimationFrame(raf.current); return; }
    const tick = () => {
      setWave(w => w.map(v => Math.max(0.08, Math.min(0.98, v + (Math.random() - 0.5) * 0.18))));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);
  return wave;
}

function getGreeting(L) {
  const h = new Date().getHours();
  return h < 12 ? L.goodMorn : h < 17 ? L.goodAft : L.goodEve;
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [screen,    setScreen]    = useState("lang");
  const [lang,      setLang]      = useState("en");
  const [tab,       setTab]       = useState("home");
  const [plan,      setPlan]      = useState("free");
  const [billing,   setBilling]   = useState("monthly");
  const [sessions,  setSessions]  = useState(5);
  const [streak]                  = useState(7);
  const [catFilter, setCatFilter] = useState("All");
  const [query,     setQuery]     = useState("");
  const [active,    setActive]    = useState(null);
  const [playing,   setPlaying]   = useState(false);
  const [elapsed,   setElapsed]   = useState(0);
  const [showGate,  setShowGate]  = useState(false);
  const [favs,      setFavs]      = useState(new Set(["anxiety","sleep"]));
  const [history,   setHistory]   = useState(["sleep","anxiety","grief"]);
  const [tabAnim,   setTabAnim]   = useState(true);
  const [volume,    setVolume]    = useState(0.28);
  const [binauralOn,setBinauralOn]= useState(true);
  const [activeFreq,setActiveFreq]= useState(null); // index of individually playing freq
  const [solPlaying,setSolPlaying]= useState(null); // solfeggio hz playing in library

  const audio    = useAudioEngine();
  const timerRef = useRef();
  const wave     = useWave(playing, 48);
  const L        = LANGS[lang];
  const isRTL    = L.dir === "rtl";

  useEffect(() => { setTabAnim(false); setTimeout(() => setTabAnim(true), 60); }, [tab]);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  // Sync volume slider → audio engine
  useEffect(() => { if (playing) audio.setMasterVolume(volume); }, [volume]);

  const formatTime = s =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const openSession = (cond) => {
    const isFree = FREE_IDS.has(cond.id);
    if (!isFree && plan === "free") { setShowGate(true); return; }
    if (isFree && plan === "free" && sessions <= 0) { setShowGate(true); return; }
    audio.stopAll(0.4);
    setActive(cond);
    setPlaying(false);
    setElapsed(0);
    setActiveFreq(null);
    setTab("session");
  };

  const startPlay = () => {
    if (plan === "free" && FREE_IDS.has(active?.id)) setSessions(s => Math.max(0, s - 1));
    audio.playCondition(active, volume, binauralOn);
    setPlaying(true);
    setActiveFreq(null);
    setSolPlaying(null);
    if (!history.includes(active.id)) setHistory(h => [active.id, ...h].slice(0, 10));
  };

  const pausePlay = () => {
    audio.stopAll(0.5);
    setPlaying(false);
    setActiveFreq(null);
  };

  const resetSession = () => {
    audio.stopAll(0.4);
    setPlaying(false);
    setElapsed(0);
    setActiveFreq(null);
  };

  const stopSession = () => {
    audio.stopAll(0.5);
    setPlaying(false);
    setElapsed(0);
    setActiveFreq(null);
    setTab("explore");
  };

  const playFreqBtn = (freq, idx) => {
    if (activeFreq === idx) {
      audio.stopAll(0.4);
      setActiveFreq(null);
      setPlaying(false);
      return;
    }
    audio.playOne(freq.hz, volume, binauralOn ? (active?.binaural || 10) : 0);
    setActiveFreq(idx);
    setPlaying(false);
    if (!history.includes(active?.id)) setHistory(h => [active.id, ...h].slice(0, 10));
  };

  const playSolfeggio = (hz) => {
    if (solPlaying === hz) {
      audio.stopAll(0.4);
      setSolPlaying(null);
      return;
    }
    audio.playOne(hz, volume, binauralOn ? 10 : 0);
    setSolPlaying(hz);
  };

  const toggleFav = (id, e) => {
    e.stopPropagation();
    setFavs(f => { const n = new Set(f); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const filtered = CONDITIONS.filter(c => {
    if (catFilter !== "All" && c.cat !== catFilter) return false;
    if (query && !`${c.title} ${c.sub} ${c.cat} ${c.freqs.map(f => f.hz + " " + f.label).join(" ")}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  /* ── Styles ── */
  const S = {
    shell:    { display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:"#05030d",fontFamily:"'DM Sans','Noto Sans',sans-serif" },
    phone:    { width:390,minHeight:790,maxHeight:860,background:"#080514",borderRadius:46,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 0 0 1px rgba(255,255,255,0.07),0 48px 96px rgba(0,0,0,0.9)" },
    statusBar:{ padding:"14px 26px 0",display:"flex",justifyContent:"space-between",alignItems:"center",color:"rgba(255,255,255,0.4)",fontSize:12,flexShrink:0 },
    scroll:   { flex:1,overflowY:"auto",overflowX:"hidden",scrollbarWidth:"none",paddingBottom:88,direction:isRTL?"rtl":"ltr",opacity:tabAnim?1:0,transform:tabAnim?"translateY(0)":"translateY(10px)",transition:"opacity .22s ease,transform .22s ease" },
    nav:      { position:"absolute",bottom:0,left:0,right:0,background:"rgba(8,5,20,0.97)",backdropFilter:"blur(24px)",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-around",alignItems:"center",padding:"10px 0 22px",zIndex:20 },
    navBtn:   (a) => ({ display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",color:a?"#a78bfa":"rgba(255,255,255,0.3)",fontSize:9,fontFamily:"inherit",transition:"color .18s",minWidth:54 }),
    navIco:   (a) => ({ fontSize:20,filter:a?"drop-shadow(0 0 8px rgba(167,139,250,0.7))":"none" }),
    pill:     (col,bg) => ({ fontSize:10,padding:"3px 9px",borderRadius:10,background:bg||"rgba(167,139,250,0.12)",color:col||"#a78bfa",fontWeight:500 }),
    card:     { background:"rgba(255,255,255,0.028)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:20,padding:"14px 16px",cursor:"pointer",transition:"all .18s" },
    gradHdr:  (col) => ({ background:`linear-gradient(160deg,${col}22 0%,transparent 100%)`,padding:"22px 22px 0" }),
    btnPrim:  (col) => ({ width:"100%",padding:"14px",borderRadius:18,border:"none",cursor:"pointer",background:`linear-gradient(135deg,${col},${col}bb)`,color:"#fff",fontSize:14,fontWeight:500,fontFamily:"inherit",boxShadow:`0 6px 20px ${col}44`,transition:"all .18s" }),
    secBtn:   { padding:"11px",borderRadius:16,border:"1px solid rgba(255,255,255,0.12)",background:"transparent",color:"rgba(255,255,255,0.5)",fontSize:13,fontFamily:"inherit",cursor:"pointer" },
    label:    { color:"rgba(255,255,255,0.35)",fontSize:10,letterSpacing:1.8,textTransform:"uppercase",marginBottom:10 },
  };

  /* ══════════════════════════════
     LANG SELECT SCREEN
  ══════════════════════════════ */
  if (screen === "lang") return (
    <div style={S.shell}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@300;400;600&family=Noto+Sans+Arabic:wght@400;500&family=Noto+Sans+JP:wght@300;400&family=Noto+Sans+Devanagari:wght@300;400&display=swap" rel="stylesheet"/>
      <div style={S.phone}>
        <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"28px 26px",overflowY:"auto",scrollbarWidth:"none"}}>
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{width:72,height:72,borderRadius:22,background:"linear-gradient(135deg,#7c3aed,#a855f7)",margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 12px 32px rgba(124,58,237,0.5)"}}>
              <span style={{fontSize:34}}>🎵</span>
            </div>
            <h1 style={{fontSize:30,fontWeight:300,color:"#fff",letterSpacing:3,fontFamily:"'Cormorant Garamond',serif",marginBottom:4}}>MantraHilling</h1>
            <p style={{color:"rgba(255,255,255,0.25)",fontSize:11,letterSpacing:2}}>SOUND THERAPY · WELLNESS</p>
          </div>
          <p style={{textAlign:"center",color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:18}}>{LANGS[lang].selectLang}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:24}}>
            {Object.values(LANGS).map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} style={{padding:"12px 10px",borderRadius:16,border:`1px solid ${lang===l.code?"rgba(167,139,250,0.5)":"rgba(255,255,255,0.06)"}`,background:lang===l.code?"rgba(167,139,250,0.1)":"rgba(255,255,255,0.02)",cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"all .18s",direction:"ltr"}}>
                <span style={{fontSize:18}}>{l.flag}</span>
                <span style={{color:lang===l.code?"#c4b5fd":"rgba(255,255,255,0.55)",fontSize:12,fontWeight:lang===l.code?500:400,fontFamily:"inherit"}}>{l.name}</span>
                {lang===l.code && <span style={{marginLeft:"auto",color:"#a78bfa",fontSize:12}}>✓</span>}
              </button>
            ))}
          </div>
          <button onClick={() => setScreen("app")} style={{...S.btnPrim("#7c3aed"),fontSize:15}}>
            {LANGS[lang].continue} →
          </button>
          <p style={{textAlign:"center",color:"rgba(255,255,255,0.18)",fontSize:11,marginTop:12}}>{LANGS[lang].tryFree} · {LANGS[lang].freeP}</p>
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════
     HOME
  ══════════════════════════════ */
  const renderHome = () => {
    const suggested = CONDITIONS.find(c => c.id === "anxiety");
    const recent    = history.map(id => CONDITIONS.find(c => c.id === id)).filter(Boolean).slice(0, 3);
    return (
      <div>
        <div style={{...S.gradHdr("#7c3aed"),paddingBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
            <div>
              <p style={{color:"rgba(255,255,255,0.35)",fontSize:12,marginBottom:3}}>{getGreeting(L)} ✨</p>
              <h2 style={{color:"#fff",fontSize:24,fontWeight:300,fontFamily:"'Cormorant Garamond',serif",letterSpacing:1,lineHeight:1.1}}>{L.tagline}</h2>
              <p style={{color:"rgba(255,255,255,0.28)",fontSize:11,marginTop:3}}>{L.sub}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
              <div style={{background:"rgba(251,146,60,0.15)",border:"1px solid rgba(251,146,60,0.25)",borderRadius:12,padding:"6px 12px",textAlign:"center"}}>
                <p style={{color:"#fb923c",fontSize:18,fontWeight:600,lineHeight:1}}>{streak}</p>
                <p style={{color:"rgba(251,146,60,0.7)",fontSize:9,marginTop:1}}>{L.streakDays}</p>
              </div>
              <div style={{...S.pill("#a78bfa"),padding:"4px 10px"}}>
                {plan==="free" ? `${sessions} ${L.sessLeft}` : L.unlimited}
              </div>
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"11px 14px",display:"flex",alignItems:"center",gap:9}} onClick={() => setTab("explore")}>
            <span style={{fontSize:14,opacity:.4}}>🔍</span>
            <span style={{color:"rgba(255,255,255,0.2)",fontSize:13}}>{L.search}</span>
          </div>
        </div>

        <div style={{padding:"20px 20px 0"}}>
          <p style={S.label}>{L.featured}</p>
          <div onClick={() => openSession(suggested)} style={{background:"linear-gradient(135deg,rgba(124,58,237,0.22),rgba(168,85,247,0.1))",border:"1px solid rgba(167,139,250,0.18)",borderRadius:24,padding:"18px",marginBottom:20,cursor:"pointer",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-30,right:-30,width:130,height:130,background:"radial-gradient(circle,rgba(167,139,250,0.08),transparent)",borderRadius:"50%",pointerEvents:"none"}}/>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
              <div style={{width:46,height:46,borderRadius:15,background:"rgba(167,139,250,0.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🧠</div>
              <div style={{flex:1}}>
                <p style={{color:"#fff",fontSize:15,fontWeight:500,marginBottom:2}}>{suggested.title}</p>
                <p style={{color:"rgba(167,139,250,0.55)",fontSize:11}}>{suggested.freqs.map(f=>f.label).join(" · ")}</p>
              </div>
              <span style={{...S.pill("#4ade80","rgba(74,222,128,0.08)"),fontSize:9}}>{L.free}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:1.5,height:26,marginBottom:12}}>
              {Array.from({length:38},(_,i) => (
                <div key={i} style={{width:5,borderRadius:3,height:`${(Math.sin(i*.5)*.4+.5)*60+10}%`,background:"rgba(167,139,250,0.3)"}}/>
              ))}
            </div>
            <div style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)",borderRadius:14,padding:"10px 18px",display:"inline-flex",alignItems:"center",gap:6,boxShadow:"0 4px 14px rgba(124,58,237,0.4)"}}>
              <span style={{color:"#fff",fontSize:13,fontWeight:500}}>▶ {L.startSession} · {suggested.duration} min</span>
            </div>
          </div>

          <p style={S.label}>{L.trending}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:20}}>
            {CONDITIONS.filter(c => FREE_IDS.has(c.id)).map(c => (
              <div key={c.id} onClick={() => openSession(c)} style={{...S.card,borderColor:`${c.color}18`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:22}}>{c.emoji}</span>
                  <span style={{...S.pill("#4ade80","rgba(74,222,128,0.08)"),fontSize:9}}>{L.free}</span>
                </div>
                <p style={{color:"rgba(255,255,255,0.85)",fontSize:12,fontWeight:500,lineHeight:1.3,marginBottom:3}}>{c.title}</p>
                <p style={{color:"rgba(255,255,255,0.28)",fontSize:10}}>{c.duration} min</p>
              </div>
            ))}
          </div>

          {recent.length > 0 && <>
            <p style={S.label}>Recent</p>
            {recent.map(c => (
              <div key={c.id} onClick={() => openSession(c)} style={{...S.card,display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
                <span style={{fontSize:20}}>{c.emoji}</span>
                <div style={{flex:1}}>
                  <p style={{color:"rgba(255,255,255,0.8)",fontSize:13}}>{c.title}</p>
                  <p style={{color:"rgba(255,255,255,0.28)",fontSize:11}}>{c.freqs[0].hz} Hz · {c.freqs[1].hz} Hz</p>
                </div>
                <span style={{color:c.color,fontSize:14}}>▶</span>
              </div>
            ))}
          </>}

          {plan === "free" && (
            <div onClick={() => setTab("plans")} style={{background:"linear-gradient(135deg,rgba(124,58,237,0.15),rgba(236,72,153,0.08))",border:"1px solid rgba(167,139,250,0.13)",borderRadius:20,padding:"16px",cursor:"pointer",marginTop:8}}>
              <p style={{color:"#c4b5fd",fontSize:14,fontWeight:500,marginBottom:3}}>💎 {L.unlock}</p>
              <p style={{color:"rgba(255,255,255,0.3)",fontSize:12}}>{L.sub}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ══════════════════════════════
     EXPLORE
  ══════════════════════════════ */
  const renderExplore = () => (
    <div style={{padding:"20px"}}>
      <h2 style={{color:"#fff",fontSize:20,fontWeight:300,fontFamily:"'Cormorant Garamond',serif",letterSpacing:1,marginBottom:14}}>{L.allConditions}</h2>
      <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"10px 14px",display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
        <span style={{opacity:.4}}>🔍</span>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder={L.search} style={{background:"none",border:"none",outline:"none",color:"rgba(255,255,255,0.7)",fontSize:13,flex:1,fontFamily:"inherit"}}/>
        {query && <button onClick={() => setQuery("")} style={{background:"none",border:"none",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontSize:18,lineHeight:1}}>×</button>}
      </div>
      <div style={{display:"flex",gap:7,overflowX:"auto",scrollbarWidth:"none",marginBottom:14,paddingBottom:2}}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCatFilter(c)} style={{flexShrink:0,padding:"6px 14px",borderRadius:20,border:`1px solid ${catFilter===c?"rgba(167,139,250,0.4)":"rgba(255,255,255,0.07)"}`,background:catFilter===c?"rgba(167,139,250,0.1)":"transparent",color:catFilter===c?"#c4b5fd":"rgba(255,255,255,0.4)",fontSize:12,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
            {c}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
        {filtered.map(c => {
          const locked = !FREE_IDS.has(c.id) && plan === "free";
          return (
            <div key={c.id} onClick={() => openSession(c)} style={{...S.card,borderColor:`${c.color}20`,position:"relative",overflow:"hidden",opacity:locked?0.75:1}}>
              <div style={{position:"absolute",top:-14,right:-14,width:56,height:56,background:`radial-gradient(circle,${c.color}14,transparent)`,borderRadius:"50%",pointerEvents:"none"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <span style={{fontSize:22}}>{c.emoji}</span>
                <div style={{display:"flex",gap:4,alignItems:"center"}}>
                  <button onClick={e => toggleFav(c.id,e)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,opacity:favs.has(c.id)?0.9:0.22,transition:"opacity .15s"}}>♥</button>
                  <span style={{...S.pill(locked?"#a78bfa":"#4ade80",locked?"rgba(167,139,250,0.08)":"rgba(74,222,128,0.08)"),fontSize:9}}>{locked?"PRO":L.free}</span>
                </div>
              </div>
              <p style={{color:"rgba(255,255,255,0.82)",fontSize:12,fontWeight:500,lineHeight:1.3,marginBottom:4}}>{c.title}</p>
              <p style={{color:"rgba(255,255,255,0.28)",fontSize:10,marginBottom:6}}>{c.cat} · {c.duration}m</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {c.freqs.slice(0,2).map(f => (
                  <span key={f.hz} style={{fontSize:9,padding:"2px 6px",borderRadius:6,background:`${c.color}15`,color:c.color}}>{f.hz} Hz</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <div style={{textAlign:"center",padding:"40px 0",color:"rgba(255,255,255,0.28)",fontSize:13}}>No conditions found.<br/>Try a different search.</div>}
    </div>
  );

  /* ══════════════════════════════
     SESSION PLAYER  ← with real audio
  ══════════════════════════════ */
  const renderSession = () => {
    if (!active) return null;
    const progress = Math.min(1, elapsed / (active.duration * 60));
    const circ     = 2 * Math.PI * 54;
    const isSessionPlaying = playing || activeFreq !== null;

    return (
      <div>
        <div style={{padding:"14px 20px 0",display:"flex",alignItems:"center",gap:10}}>
          <button onClick={stopSession} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"8px 14px",color:"rgba(255,255,255,0.55)",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
          <button onClick={e => toggleFav(active.id,e)} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",fontSize:22,opacity:favs.has(active.id)?0.9:0.25,transition:"opacity .15s"}}>♥</button>
        </div>

        <div style={{...S.gradHdr(active.color),paddingBottom:22,paddingTop:14}}>
          <p style={{...S.label,marginBottom:8}}>{L.nowPlaying}</p>
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:18}}>
            <div style={{width:52,height:52,borderRadius:15,background:`${active.color}2a`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{active.emoji}</div>
            <div>
              <h3 style={{color:"#fff",fontSize:17,fontWeight:400,fontFamily:"'Cormorant Garamond',serif",marginBottom:2}}>{active.title}</h3>
              <p style={{color:"rgba(255,255,255,0.3)",fontSize:11}}>{active.sub}</p>
            </div>
          </div>

          {/* Circular progress timer */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:16}}>
            <div style={{position:"relative",width:124,height:124}}>
              <svg width="124" height="124" style={{transform:"rotate(-90deg)"}}>
                <circle cx="62" cy="62" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5"/>
                <circle cx="62" cy="62" r="54" fill="none" stroke={active.color} strokeWidth="5"
                  strokeDasharray={circ} strokeDashoffset={circ*(1-progress)}
                  strokeLinecap="round" style={{transition:"stroke-dashoffset .8s ease"}}/>
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <p style={{color:"#fff",fontSize:22,fontWeight:300}}>{formatTime(elapsed)}</p>
                <p style={{color:"rgba(255,255,255,0.28)",fontSize:10,marginTop:1}}>{active.duration} min</p>
              </div>
            </div>
          </div>

          {/* Waveform */}
          <div style={{display:"flex",alignItems:"center",gap:1.5,height:34,marginBottom:14,justifyContent:"center"}}>
            {wave.slice(0,48).map((h,i) => (
              <div key={i} style={{width:4.5,borderRadius:3,height:`${h*100}%`,
                background:isSessionPlaying
                  ? `${active.color}${Math.round(h*180+55).toString(16).padStart(2,"0")}`
                  : "rgba(255,255,255,0.1)",
                transition:"height .08s"}}/>
            ))}
          </div>

          {/* Play controls */}
          <div style={{display:"flex",gap:10,justifyContent:"center",alignItems:"center"}}>
            <button onClick={resetSession} style={{...S.secBtn,padding:"9px 14px",fontSize:12}}>↺</button>
            <button onClick={playing ? pausePlay : startPlay} style={{...S.btnPrim(active.color),width:"auto",padding:"12px 28px",borderRadius:16,fontSize:14}}>
              {playing ? `⏸ ${L.pause}` : `▶ ${elapsed===0 ? L.startSession : L.resume}`}
            </button>
            <button onClick={stopSession} style={{...S.secBtn,padding:"9px 14px",fontSize:12}}>■</button>
          </div>

          {/* Volume + Binaural controls */}
          <div style={{marginTop:14,padding:"0 4px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:13,opacity:.5}}>🔈</span>
              <input type="range" min="0" max="1" step="0.01" value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                style={{flex:1,accentColor:active.color,cursor:"pointer",height:3}}/>
              <span style={{fontSize:13,opacity:.5}}>🔊</span>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>🎧 {L.binaural}</span>
              <button onClick={() => { setBinauralOn(b => !b); if(playing){audio.stopAll(0.2); setTimeout(()=>{ audio.playCondition(active,volume,!binauralOn); },300); } }} style={{background:binauralOn?`${active.color}25`:"rgba(255,255,255,0.04)",border:`1px solid ${binauralOn?active.color+"55":"rgba(255,255,255,0.1)"}`,borderRadius:20,padding:"4px 14px",color:binauralOn?active.color:"rgba(255,255,255,0.35)",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>
                {binauralOn ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>

        {/* Individual frequency buttons */}
        <div style={{padding:"16px 20px 0"}}>
          <p style={S.label}>{L.frequencies} — {L.selectFreq}</p>
          {active.freqs.map((f,i) => {
            const isThisPlaying = activeFreq === i;
            return (
              <div key={i} onClick={() => playFreqBtn(f,i)} style={{display:"flex",gap:12,alignItems:"center",marginBottom:10,padding:"12px 14px",background:isThisPlaying?`${active.color}18`:"rgba(255,255,255,0.025)",borderRadius:16,border:`1px solid ${isThisPlaying?active.color+"44":"rgba(255,255,255,0.05)"}`,cursor:"pointer",transition:"all .2s"}}>
                <div style={{background:`${active.color}22`,borderRadius:10,padding:"7px 10px",textAlign:"center",minWidth:72,flexShrink:0}}>
                  <p style={{color:active.color,fontSize:13,fontWeight:600,lineHeight:1}}>{f.hz} Hz</p>
                  <p style={{color:"rgba(255,255,255,0.28)",fontSize:8,marginTop:2}}>{f.role}</p>
                </div>
                <div style={{flex:1}}>
                  <p style={{color:"rgba(255,255,255,0.72)",fontSize:12,lineHeight:1.5}}>{f.effect}</p>
                </div>
                <div style={{flexShrink:0,width:28,height:28,borderRadius:"50%",background:isThisPlaying?active.color:"rgba(255,255,255,0.06)",border:`1px solid ${isThisPlaying?active.color:"rgba(255,255,255,0.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                  <span style={{fontSize:10,color:isThisPlaying?"#fff":"rgba(255,255,255,0.4)"}}>{isThisPlaying?"⏸":"▶"}</span>
                </div>
              </div>
            );
          })}

          {/* Binaural beat info */}
          {binauralOn && (
            <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:14,padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:16}}>🎧</span>
              <div>
                <p style={{color:"rgba(255,255,255,0.55)",fontSize:11,marginBottom:2}}>{L.binaural} active — {active.binaural} Hz beat frequency</p>
                <p style={{color:"rgba(255,255,255,0.28)",fontSize:10}}>Left ear: {active.freqs[0].hz} Hz · Right ear: {active.freqs[0].hz + active.binaural} Hz · Requires headphones</p>
              </div>
            </div>
          )}

          <p style={S.label}>{L.protocol}</p>
          <div style={{background:"rgba(255,255,255,0.02)",borderRadius:16,padding:"13px",marginBottom:10,border:"1px solid rgba(255,255,255,0.04)"}}>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:13,lineHeight:1.7}}>{active.protocol}</p>
          </div>

          <p style={S.label}>{L.tip}</p>
          <div style={{background:`${active.color}10`,border:`1px solid ${active.color}28`,borderRadius:16,padding:"13px",marginBottom:10}}>
            <p style={{color:"rgba(255,255,255,0.65)",fontSize:13,lineHeight:1.7}}>💡 {active.tip}</p>
          </div>

          <p style={S.label}>{L.science}</p>
          <div style={{background:"rgba(255,255,255,0.018)",borderRadius:16,padding:"13px",marginBottom:10,border:"1px solid rgba(255,255,255,0.04)"}}>
            <p style={{color:"rgba(255,255,255,0.45)",fontSize:12,lineHeight:1.7}}>🔬 {active.science}</p>
          </div>

          <p style={S.label}>{L.instruments}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:6}}>
            {active.instruments.split("·").map((ins,i) => (
              <span key={i} style={{fontSize:11,padding:"5px 10px",borderRadius:10,background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.45)",border:"1px solid rgba(255,255,255,0.06)"}}>🎵 {ins.trim()}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ══════════════════════════════
     LIBRARY
  ══════════════════════════════ */
  const renderLibrary = () => (
    <div style={{padding:"20px"}}>
      <h2 style={{color:"#fff",fontSize:20,fontWeight:300,fontFamily:"'Cormorant Garamond',serif",letterSpacing:1,marginBottom:4}}>{L.freqMap}</h2>
      <p style={{color:"rgba(255,255,255,0.3)",fontSize:12,marginBottom:6}}>Tap any frequency to preview it</p>

      {/* Volume for library previews */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,padding:"10px 12px",background:"rgba(255,255,255,0.025)",borderRadius:14,border:"1px solid rgba(255,255,255,0.05)"}}>
        <span style={{fontSize:12,opacity:.5}}>🔈</span>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(parseFloat(e.target.value))} style={{flex:1,accentColor:"#7c3aed",cursor:"pointer"}}/>
        <span style={{fontSize:12,opacity:.5}}>🔊</span>
        <button onClick={() => setBinauralOn(b => !b)} style={{background:binauralOn?"rgba(167,139,250,0.15)":"rgba(255,255,255,0.04)",border:`1px solid ${binauralOn?"rgba(167,139,250,0.4)":"rgba(255,255,255,0.08)"}`,borderRadius:10,padding:"4px 10px",color:binauralOn?"#a78bfa":"rgba(255,255,255,0.3)",fontSize:10,cursor:"pointer",fontFamily:"inherit",transition:"all .2s",flexShrink:0}}>
          🎧 {binauralOn?"ON":"OFF"}
        </button>
      </div>

      {SOLFEGGIO.map(s => {
        const isPlaying = solPlaying === s.hz;
        const pct = Math.round(((Math.log(s.hz)-Math.log(174))/(Math.log(963)-Math.log(174)))*100);
        return (
          <div key={s.hz} onClick={() => playSolfeggio(s.hz)} style={{marginBottom:9,background:isPlaying?`${s.color}12`:"rgba(255,255,255,0.022)",border:`1px solid ${isPlaying?s.color+"44":"rgba(255,255,255,0.05)"}`,borderRadius:16,padding:"12px 14px",cursor:"pointer",transition:"all .2s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:34,height:34,borderRadius:10,background:`${s.color}22`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <p style={{color:s.color,fontSize:12,fontWeight:600}}>{s.note}</p>
                </div>
                <div>
                  <p style={{color:"rgba(255,255,255,0.85)",fontSize:13,fontWeight:500}}>{s.hz} Hz · {s.name}</p>
                  <p style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{s.action}</p>
                </div>
              </div>
              <div style={{width:28,height:28,borderRadius:"50%",background:isPlaying?s.color:"rgba(255,255,255,0.05)",border:`1px solid ${isPlaying?s.color:"rgba(255,255,255,0.08)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
                <span style={{fontSize:10,color:isPlaying?"#fff":"rgba(255,255,255,0.4)"}}>{isPlaying?"⏸":"▶"}</span>
              </div>
            </div>
            <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.05)",overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,borderRadius:2,background:s.color}}/>
            </div>
          </div>
        );
      })}

      <h3 style={{color:"#fff",fontSize:16,fontWeight:300,fontFamily:"'Cormorant Garamond',serif",marginTop:22,marginBottom:12}}>{L.brainwaves}</h3>
      {BRAINWAVES.map(bw => (
        <div key={bw.name} style={{marginBottom:9,background:"rgba(255,255,255,0.022)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:14,padding:"12px 14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <div>
              <span style={{color:"#fff",fontSize:13,fontWeight:500}}>{bw.name}</span>
              <span style={{color:"rgba(255,255,255,0.3)",fontSize:11,marginLeft:8}}>{bw.range}</span>
            </div>
            <span style={{fontSize:10,padding:"2px 8px",borderRadius:8,background:`${bw.color}18`,color:bw.color}}>{bw.state.split("·")[0].trim()}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:2,height:20}}>
            {Array.from({length:40},(_,i) => {
              const s = bw.shape[i % bw.shape.length];
              return <div key={i} style={{width:5,borderRadius:2,height:`${s*100}%`,background:`${bw.color}50`}}/>;
            })}
          </div>
          <p style={{color:"rgba(255,255,255,0.28)",fontSize:10,marginTop:5}}>{bw.state}</p>
        </div>
      ))}
    </div>
  );

  /* ══════════════════════════════
     PLANS
  ══════════════════════════════ */
  const renderPlans = () => {
    const tiers = [
      {key:"free",  label:L.free,  price:L.freeP, per:"",      items:L.tier_free,   col:"#94a3b8",badge:null,       cta:L.tryFree},
      {key:"pro",   label:L.pro,   price:billing==="monthly"?L.priceM:L.priceY, per:billing==="monthly"?L.monthly:L.yearly, items:L.tier_pro,  col:"#8b5cf6",badge:L.mostPop, cta:L.upgrade},
      {key:"divine",label:L.divine,price:billing==="monthly"?L.divM:L.divY,    per:billing==="monthly"?L.monthly:L.yearly, items:L.tier_divine,col:"#f5b041",badge:L.bestVal, cta:"Get Divine ✨"},
    ];
    return (
      <div style={{padding:"20px",fontFamily:"'DM Sans','Poppins',sans-serif"}}>
        <h2 style={{color:"#fff",fontSize:22,fontWeight:700,letterSpacing:2,textTransform:"uppercase",textAlign:"center",marginTop:16,marginBottom:6}}>Choose Healing Plan</h2>
        <p style={{color:"rgba(255,255,255,0.45)",fontSize:12,textAlign:"center",lineHeight:1.6,marginBottom:26,padding:"0 10px"}}>Select a sound sanctuary membership to unlock higher neural pathways and ancient frequency designs</p>
        
        {/* Toggle matrix */}
        <div style={{display:"flex",background:"rgba(255,255,255,0.025)",borderRadius:16,padding:4,marginBottom:26,border:"1px solid rgba(255,255,255,0.05)"}}>
          {["monthly","yearly"].map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{flex:1,padding:"10px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"inherit",background:billing===b?"#8b5cf6":"transparent",color:billing===b?"#fff":"rgba(255,255,255,0.45)",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .25s",boxShadow:billing===b?"0 4px 12px rgba(139,92,246,0.3)":"none"}}>
              {b==="monthly"?"Monthly":"Yearly"}
              {b==="yearly" && <span style={{fontSize:9,background:"rgba(245,176,65,0.15)",color:"#f5b041",padding:"2px 6px",borderRadius:6,fontWeight:800}}>{L.save}</span>}
            </button>
          ))}
        </div>

        {/* Plan Cards */}
        {tiers.map(t => {
          const isActivePlan = plan === t.key;
          const isPro = t.key === "pro";
          const isDivine = t.key === "divine";
          const isFree = t.key === "free";

          // Parse price string to make the Rupee symbol smaller (Apple-style premium design)
          const priceStr = t.price || "";
          const hasRupee = priceStr.startsWith("₹");
          const displayPrice = hasRupee ? priceStr.substring(1) : priceStr;

          // Select background colors & borders for the glassmorphic card gradient
          let cardBg = "linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(10, 8, 20, 0.98) 100%)";
          let borderGlowColor = "rgba(255, 255, 255, 0.04)";
          let shadow = "none";
          
          if (isPro) {
            cardBg = isActivePlan 
              ? "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(10, 8, 20, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(10, 8, 20, 0.98) 100%)";
            borderGlowColor = isActivePlan ? "rgba(139, 92, 246, 0.45)" : "rgba(139, 92, 246, 0.15)";
            if (isActivePlan) shadow = "0 8px 32px rgba(139, 92, 246, 0.15)";
          } else if (isDivine) {
            cardBg = isActivePlan 
              ? "linear-gradient(135deg, rgba(245, 176, 65, 0.15) 0%, rgba(10, 8, 20, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(245, 176, 65, 0.05) 0%, rgba(10, 8, 20, 0.98) 100%)";
            borderGlowColor = isActivePlan ? "rgba(245, 176, 65, 0.45)" : "rgba(245, 176, 65, 0.15)";
            if (isActivePlan) shadow = "0 8px 32px rgba(245, 176, 65, 0.15)";
          } else if (isFree) {
            cardBg = isActivePlan 
              ? "linear-gradient(135deg, rgba(0, 209, 255, 0.08) 0%, rgba(10, 8, 20, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(10, 8, 20, 0.98) 100%)";
            borderGlowColor = isActivePlan ? "rgba(0, 209, 255, 0.35)" : "rgba(255, 255, 255, 0.04)";
            if (isActivePlan) shadow = "0 8px 32px rgba(0, 209, 255, 0.12)";
          }

          return (
            <div key={t.key} style={{
              background: cardBg,
              border: `1px solid ${borderGlowColor}`,
              borderRadius: "28px",
              padding: "24px",
              marginBottom: "20px",
              position: "relative",
              overflow: "hidden",
              boxShadow: shadow,
              backgroundColor: "rgba(10, 8, 20, 0.85)",
              transition: "all 0.3s ease"
            }}>
              {/* Backing neon glassmorphic refraction sphere (aesthetic backing glow) */}
              <div style={{
                position: "absolute",
                top: "-42px",
                right: -42,
                width: "130px",
                height: "130px",
                borderRadius: "65px",
                backgroundColor: t.col + "15",
                zIndex: 0,
                pointerEvents: "none"
              }} />

              {/* Top Glowing Active Indicator Strip */}
              {isActivePlan && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  backgroundColor: t.col,
                  boxShadow: `0 2px 8px ${t.col}`,
                  zIndex: 1
                }} />
              )}

              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",width:"100%",position:"relative",zIndex:2}}>
                {/* Left Side: Title & Badge Pill */}
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                  <h3 style={{color:"#fff",fontSize:22,fontWeight:900,letterSpacing:1.5,textTransform:"uppercase",margin:0}}>{t.label}</h3>
                  {t.badge && (
                    <div style={{
                      backgroundColor: t.col + "18",
                      border: `1px solid ${t.col}40`,
                      color: t.col,
                      padding: "2px 8px",
                      borderRadius: 6,
                      fontSize: 8.5,
                      fontWeight: "800",
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      marginTop: 6
                    }}>
                      ✦ {t.badge}
                    </div>
                  )}
                </div>

                {/* Right Side: Price (Smaller currency symbol) */}
                <div style={{direction:"ltr",textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
                  <div style={{display:"flex",alignItems:"baseline"}}>
                    {hasRupee && (
                      <span style={{fontSize:16,fontWeight:600,color:"#fff",marginRight:2}}>₹</span>
                    )}
                    <span style={{color:"#fff",fontSize:28,fontWeight:900}}>{displayPrice}</span>
                  </div>
                  {t.per && <div style={{color:"rgba(255,255,255,0.45)",fontSize:12,fontWeight:500,marginTop:2}}>{t.per}</div>}
                </div>
              </div>

              {/* Thematic Divider */}
              <div style={{height:1,background: t.col + "25",margin:"18px 0",position:"relative",zIndex:2}} />

              <div style={{marginBottom:24,display:"flex",flexDirection:"column",gap:10,position:"relative",zIndex:2}}>
                {t.items.map((feat,fi) => (
                  <div key={fi} style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{color:t.col,fontSize:13,textShadow:`0 0 6px ${t.col}`,flexShrink:0}}>✦</span>
                    <span style={{color:"#E5E5E5",fontSize:13,lineHeight:1.4}}>{feat}</span>
                  </div>
                ))}
              </div>

              {isActivePlan ? (
                <div style={{
                  background: `${t.col}12`,
                  borderRadius: 16,
                  padding: "14px",
                  textAlign: "center",
                  color: t.col,
                  fontSize: 11,
                  fontWeight: "800",
                  letterSpacing: 2,
                  textShadow: `0 0 6px ${t.col}`,
                  position: "relative",
                  zIndex: 2
                }}>
                  ✦ ACTIVE SANCTUARY PROTOCOL
                </div>
              ) : (
                <button
                  onClick={() => {
                    setPlan(t.key);
                    const newSessions = t.key !== "free" ? 99999 : sessions;
                    if (t.key !== "free") setSessions(newSessions);
                  }}
                  style={{
                    width:"100%",
                    padding:"14px",
                    borderRadius:16,
                    border:"none",
                    cursor:"pointer",
                    fontFamily:"inherit",
                    fontWeight:"800",
                    fontSize:12.5,
                    letterSpacing:1.5,
                    color:"#fff",
                    textTransform:"uppercase",
                    background: isPro 
                      ? "linear-gradient(135deg, #8b5cf6 0%, #00d1ff 100%)" 
                      : isDivine 
                        ? "linear-gradient(135deg, #f5b041 0%, #ec4899 100%)" 
                        : "rgba(255,255,255,0.03)",
                    border: isFree ? "1px solid rgba(255,255,255,0.08)" : "none",
                    boxShadow: isPro 
                      ? "0 4px 15px rgba(139,92,246,0.3)" 
                      : isDivine 
                        ? "0 4px 15px rgba(245,176,65,0.3)" 
                        : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  {t.cta.toUpperCase()} {!isFree && "✨"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /* ══════════════════════════════
     PROFILE
  ══════════════════════════════ */
  const renderProfile = () => (
    <div style={{padding:"20px"}}>
      <div style={{textAlign:"center",marginBottom:22}}>
        <div style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,rgba(124,58,237,0.5),rgba(236,72,153,0.35))",border:"2px solid rgba(167,139,250,0.28)",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32}}>🧘</div>
        <h3 style={{color:"#fff",fontSize:18,fontWeight:400,marginBottom:2}}>Sound Healer</h3>
        <p style={{color:"rgba(255,255,255,0.3)",fontSize:12}}>{L.planLabel}: <span style={{color:"#a78bfa",fontWeight:500}}>{plan==="free"?L.free:plan==="pro"?L.pro:L.divine}</span></p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9,marginBottom:20}}>
        {[{label:"Streak",val:streak+"🔥"},{label:"Sessions",val:history.length},{label:"Minutes",val:history.reduce((a,id)=>{const c=CONDITIONS.find(x=>x.id===id);return a+(c?.duration||0);},0)}].map((s,i) => (
          <div key={i} style={{background:"rgba(255,255,255,0.028)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:16,padding:"12px",textAlign:"center"}}>
            <p style={{color:"#fff",fontSize:20,fontWeight:500,lineHeight:1,marginBottom:3}}>{s.val}</p>
            <p style={{color:"rgba(255,255,255,0.3)",fontSize:10}}>{s.label}</p>
          </div>
        ))}
      </div>

      {favs.size > 0 && <>
        <p style={S.label}>♥ Favorites</p>
        {[...favs].map(id => { const c=CONDITIONS.find(x=>x.id===id); if(!c) return null; return (
          <div key={id} onClick={() => openSession(c)} style={{...S.card,display:"flex",gap:12,alignItems:"center",marginBottom:8,cursor:"pointer"}}>
            <span style={{fontSize:18}}>{c.emoji}</span>
            <div style={{flex:1}}>
              <p style={{color:"rgba(255,255,255,0.8)",fontSize:12,margin:0}}>{c.title}</p>
              <p style={{color:"rgba(255,255,255,0.28)",fontSize:10,margin:0}}>{c.cat} · {c.duration}m</p>
            </div>
            <span 
              onClick={(e) => { e.stopPropagation(); toggleFav(id); }} 
              style={{color:"#ec4899",fontSize:16,padding:"4px",cursor:"pointer",marginRight:4}}
            >
              ♥
            </span>
            <span style={{color:c.color,fontSize:12}}>▶</span>
          </div>
        );})}
      </>}

      <p style={{...S.label,marginTop:16}}>Language</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:20}}>
        {Object.values(LANGS).map(l => (
          <button key={l.code} onClick={() => setLang(l.code)} style={{padding:"7px 12px",borderRadius:14,border:`1px solid ${lang===l.code?"rgba(167,139,250,0.4)":"rgba(255,255,255,0.06)"}`,background:lang===l.code?"rgba(167,139,250,0.1)":"transparent",color:lang===l.code?"#c4b5fd":"rgba(255,255,255,0.4)",fontSize:12,cursor:"pointer",fontFamily:"inherit",direction:"ltr"}}>
            {l.flag} {l.name}
          </button>
        ))}
      </div>
      {plan==="free" && <button onClick={() => setTab("plans")} style={{...S.btnPrim("#7c3aed")}}>💎 {L.upgrade}</button>}
    </div>
  );

  /* ══════════════════════════════
     GATE MODAL
  ══════════════════════════════ */
  const GateModal = () => (
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",flexDirection:"column",justifyContent:"flex-end",zIndex:30,backdropFilter:"blur(14px)"}}>
      <div style={{background:"#0d0920",borderRadius:"28px 28px 0 0",padding:"26px 22px 44px",border:"1px solid rgba(167,139,250,0.14)"}}>
        <div style={{width:38,height:3,borderRadius:2,background:"rgba(255,255,255,0.1)",margin:"0 auto 20px"}}/>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:44,marginBottom:10}}>💎</div>
          <h3 style={{color:"#fff",fontSize:19,fontWeight:300,fontFamily:"'Cormorant Garamond',serif",marginBottom:5}}>{L.unlock}</h3>
          <p style={{color:"rgba(255,255,255,0.3)",fontSize:12}}>{L.sub}</p>
        </div>
        {["Real binaural beats — 9 Solfeggio frequencies","Unlimited sessions for all 22+ conditions","Individual frequency play in every session","HD lossless audio · Offline mode"].map((f,i) => (
          <div key={i} style={{display:"flex",gap:10,alignItems:"center",marginBottom:9}}>
            <span style={{color:"#a78bfa",fontSize:13}}>✦</span>
            <span style={{color:"rgba(255,255,255,0.62)",fontSize:13}}>{f}</span>
          </div>
        ))}
        <button onClick={() => { setPlan("pro"); setSessions(9999); setShowGate(false); }} style={{...S.btnPrim("#7c3aed"),marginTop:16,marginBottom:8,fontSize:15}}>
          {L.upgrade} — {L.priceM}{L.monthly}
        </button>
        <button onClick={() => setShowGate(false)} style={{...S.secBtn,width:"100%",fontSize:13}}>
          {L.tryFree} ({sessions} {L.sessLeft})
        </button>
      </div>
    </div>
  );

  /* ══════════════════════════════
     NAV + RENDER
  ══════════════════════════════ */
  const NAV = [
    {key:"home",    ico:"🏠", label:L.home},
    {key:"explore", ico:"🔍", label:L.explore},
    ...(active ? [{key:"session",ico:playing||activeFreq!==null?"🔊":"▶",label:playing||activeFreq!==null?L.playing:"Play"}] : []),
    {key:"library", ico:"📊", label:L.library},
    {key:"plans",   ico:"💎", label:L.plans},
    {key:"profile", ico:"👤", label:L.you},
  ];

  return (
    <div style={S.shell}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@300;400;600&family=Noto+Sans+Arabic:wght@400;500&family=Noto+Sans+JP:wght@300;400&family=Noto+Sans+Devanagari:wght@300;400&display=swap" rel="stylesheet"/>
      <style>{`::-webkit-scrollbar{display:none}input[type=range]{-webkit-appearance:none;height:3px;border-radius:2px;outline:none}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#a78bfa;cursor:pointer}`}</style>
      <div style={S.phone}>
        <div style={S.statusBar}>
          <span>9:41</span>
          <div style={{width:80,height:18,background:"rgba(0,0,0,0.4)",borderRadius:10,margin:"0 auto"}}/>
          <div style={{display:"flex",gap:3,alignItems:"center",fontSize:11}}><span>●●●</span><span>🔋</span></div>
        </div>

        <div style={S.scroll}>
          {tab==="home"    && renderHome()}
          {tab==="explore" && renderExplore()}
          {tab==="session" && renderSession()}
          {tab==="library" && renderLibrary()}
          {tab==="plans"   && renderPlans()}
          {tab==="profile" && renderProfile()}
        </div>

        <div style={S.nav}>
          {NAV.map(n => {
            const isActive = tab === n.key;
            return (
              <button key={n.key} style={S.navBtn(isActive)} onClick={() => setTab(n.key)}>
                <span style={S.navIco(isActive)}>{n.ico}</span>
                <span>{n.label}</span>
              </button>
            );
          })}
        </div>

        {showGate && <GateModal/>}
      </div>
    </div>
  );
}
