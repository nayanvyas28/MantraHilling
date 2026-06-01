# System Requirements Specification: MantraHilling

## 1. Core Architectural Pillars

### A. Real-Time Dynamic Synchronization
* **Database Driven Permissions:** System must bypass offline constants. All PRO vs FREE access gates must read dynamically from the Supabase database (`free` boolean).
* **Instant Banners Update:** Emojis, colors, sanctuary descriptions, names, and targets changed in the Web Admin must instantly synchronize to the mobile explorer screens without redeployment.

### B. High-Fidelity Hybrid Sound Synthesizer
* **Ambient Multi-Stream Support:** The app must play high-fidelity ambient MP3 soundscapes directly from Cloudflare R2 (`https://pub-*.r2.dev/hilling/music/*`).
* **Precise Binaural Wave Synthesis:** Synthesizer must run inside an isolated WebView engine, generating sub-bass monaural/binaural carrier oscillations (Alpha, Delta, Theta, Gamma, Schumann waves) based on the current active phase.
* **Seamless Transitions:** On phase intervals, the background track and oscillator frequency must transition smoothly using `CHANGE_FREQUENCY` events.

---

## 2. Web Admin Control Center

### A. Category Sanctuary Hierarchical Banners
* **Structured Directory:** Group target programs by Category, Sub-category, and individual targets.
* **Visual Anchors:** Sections must render with colored left accent borders matching their Category theme.

### B. CORS-Free Multipart Uploads
* **Direct Server Streaming:** `/api/upload` Next.js route must accept multipart forms and upload files directly from Next.js server to R2, eliminating CORS locks.
* **Auto-URL Fetching:** Uploading a music file must automatically fetch and bind its R2 public URL directly to the phase or program field.

---

## 3. Expo Mobile UX/UI

### A. Floating Navigation & Mini-Player Stack
* **Floating Tab Bar:** Rounded tab bar (`borderRadius: 22`) floating above screen boundaries (`bottom: 12 + BOTTOM_INSET`).
* **Floating Player:** Mini-playback card floating at `bottom: 86 + BOTTOM_INSET`.

### B. Visual Cinematic Grammar
* **Dynamic Card Shadows:** Programs must dynamically cast glowing aura shadows matching their custom theme color.
* **Glassmorphic Banners:** Left colored category accent stripes for distinct visual partitioning.
