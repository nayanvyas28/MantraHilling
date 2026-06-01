/* ═══════════════════════════════════════════════════════════
   CONDITIONS DATABASE
   Contains wellness targets, frequency pairings, tips, and science
═══════════════════════════════════════════════════════════ */
export const CONDITIONS = [
  {
    "id": "sleep",
    "cat": "Mental",
    "emoji": "🌙",
    "free": true,
    "title": "Insomnia & Sleep",
    "sub": "Pineal gland · Melatonin",
    "duration": 45,
    "color": "#3b82f6",
    "freqs": [
      {
        "hz": 3,
        "role": "Primary",
        "label": "Phase 1: Sleep Induction",
        "effect": "Deep sleep induction — matches NREM brainwaves",
        "duration": 20
      },
      {
        "hz": 5,
        "role": "Transition",
        "label": "Phase 2: Transition",
        "effect": "Hypnagogic state — bridges wakefulness to sleep",
        "duration": 15
      },
      {
        "hz": 174,
        "role": "Support",
        "label": "Phase 3: Pain Relieving",
        "effect": "Natural anesthetic — deepest Solfeggio",
        "duration": 5
      },
      {
        "hz": 432,
        "role": "Calm",
        "label": "Phase 4: Deep Calming",
        "effect": "Reduces sympathetic overdrive",
        "duration": 5
      }
    ],
    "binaural": 3,
    "instruments": "Hang drum · Singing bowls · Drone",
    "protocol": "Begin 45 min before sleep. Dark room. Progress 432→174→delta.",
    "tip": "Binaural delta at 2–3 Hz with pink noise is the most studied sleep combination.",
    "science": "Delta entrainment suppresses arousal centers in reticular formation.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/sleep.mp3",
    "translations": {
      "hi": {
        "title": "अनिद्रा और नींद",
        "sub": "पीनियल ग्रंथि · मेलाटोनिन",
        "instruments": "हैंग ड्रम · गायन कटोरे · ड्रोन",
        "protocol": "सोने से 45 मिनट पहले शुरू करें। अँधेरा कमरा. प्रगति 432→174→डेल्टा।",
        "tip": "गुलाबी शोर के साथ 2-3 हर्ट्ज़ पर बिनौरल डेल्टा सबसे अधिक अध्ययन किया गया नींद संयोजन है।",
        "science": "डेल्टा प्रवेश जालीदार गठन में उत्तेजना केंद्रों को दबा देता है।",
        "freqs": [
          {
            "hz": 3,
            "role": "Primary",
            "label": "चरण 1: नींद प्रेरण",
            "effect": "गहरी नींद प्रेरण - एनआरईएम मस्तिष्क तरंगों से मेल खाता है",
            "duration": 20
          },
          {
            "hz": 5,
            "role": "Transition",
            "label": "चरण 2: संक्रमण",
            "effect": "सम्मोहन अवस्था - जागृति को नींद से जोड़ता है",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Support",
            "label": "चरण 3: दर्द निवारक",
            "effect": "प्राकृतिक संवेदनाहारी - सबसे गहरी सोलफेगियो",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Calm",
            "label": "चरण 4: गहरी शांति",
            "effect": "सहानुभूतिपूर्ण तीव्रता को कम करता है",
            "duration": 5
          }
        ]
      ,
    "searchResults": "खोज परिणाम",
    "aiWelcome": "आपके एआई ध्वनि अभयारण्य में आपका स्वागत है। 🧘✨\n\nबताएं कि आप वर्तमान में क्या महसूस कर रहे हैं—जैसे शारीरिक दर्द, मानसिक तनाव, चिंता, या ध्यान की कमी—और मैं एक अनुकूलित सोल्फेगियो और ब्रेनवेव एंट्रैनमेंट प्रोटोकॉल को संश्लेषित करने के लिए हमारे न्यूरोलॉजिकल ऑडियो डेटाबेस को स्कैन करूँगा।",
    "saveBtn": "सहेजें",
    "cancelBtn": "रद्द करें",
    "guestUser": "अतिथि उपयोगकर्ता",
    "enterName": "नाम दर्ज करें",
    "streakLabel": "सिलसिला",
    "sessionsLabel": "सत्र",
    "minutesLabel": "मिनट",
    "favorites": "पसंदीदा",
    "language": "भाषा",
    "signOut": "साइन आउट",
    "signInOrCreate": "साइन इन करें / खाता बनाएं",
    "backToExplore": "अन्वेषण पर वापस जाएं",
    "chooseProtocol": "अपना सत्र शुरू करने के लिए एक लक्षित प्रोटोकॉल मार्ग चुनें",
    "beginProtocol": "प्रोटोकॉल शुरू करें",
    "changeProtocol": "प्रोटोकॉल बदलें",
    "activeBeat": "सक्रिय —",
    "hzBeat": "हर्ट्ज़ बीट",
    "left": "बायां",
    "right": "दायां",
    "headphonesRecommended": "हेडफ़ोन की सिफारिश की जाती है।",
    "tapToSynthesize": "पूर्वावलोकन संश्लेषित करने के लिए किसी भी आवृत्ति पर टैप करें",
    "binauralBeatsLabel": "बाइनॉरल बीट्स:",
    "getDivine": "दिव्य प्राप्त करें",
    "chooseHealingPlan": "उपचार योजना चुनें",
    "plansDesc": "उच्च तंत्रिका मार्गों और प्राचीन आवृत्ति डिजाइनों को अनलॉक करने के लिए ध्वनि अभयारण्य सदस्यता चुनें",
    "monthlyLabel": "मासिक",
    "yearlyLabel": "वार्षिक",
    "initializingSanctuary": "अभयारण्य प्रारंभ किया जा रहा है...",
    "acousticSoundSanctuary": "ध्वनिक ध्वनि अभयारण्य",
    "authDesc": "प्रगति सहेजने और सुविधाओं को अनलॉक करने के लिए साइन इन करें",
    "emailPlaceholder": "ईमेल पता",
    "passwordPlaceholder": "पासवर्ड",
    "createAccount": "खाता बनाएं",
    "signIn": "साइन इन करें",
    "hasAccountSignIn": "पहले से ही एक खाता है? साइन इन करें",
    "noAccountCreate": "खाता नहीं है? एक बनाएं",
    "continueAsGuest": "अतिथि के रूप में जारी रखें",
    "verificationEmailSent": "सत्यापन ईमेल भेजा गया! अपना इनबॉक्स जांचें।",
    "sessionCompleted": "सत्र पूरा हुआ! 🧘✨\n\nआपकी हीलिंग श्रृंखला अब {streak} दिन है।",
    "sessionsEnabled": "सत्र सक्रिय",
    "paused": "रुका हुआ",
    "recentsLabel": "हाल ही में",
    "notSignedIn": "साइन इन नहीं किया",
    "aiAnalysisComplete": "🔬 **न्यूरल ध्वनि विश्लेषण पूर्ण**",
    "aiDetectedPattern": "🎯 पाया गया पैटर्न:",
    "patternPain": "दैहिक दर्द सक्रियता",
    "patternSleep": "मेलाटोनिन और नींद चक्र व्यवधान",
    "patternFocus": "प्रीफ्रंटल कॉर्टेक्स अनियमितता",
    "patternAnxiety": "सहानुभूति तंत्रिका तंत्र की अति सक्रियता",
    "patternSadness": "लिम्बिक सेरोटोनिन की कमी",
    "patternDefault": "स्वायत्त तंत्रिका तंत्र असंतुलन",
    "aiPrescribedFrequencies": "🧠 निर्धारित आवृत्तियाँ:",
    "aiMatchedSanctuaries": "📋 {count} चिकित्सा अभयारण्य मिले हैं। अपना सत्र शुरू करने के लिए नीचे किसी पर भी टैप करें।"},
      "es": {
        "title": "Insomnio y sueño",
        "sub": "Glándula pineal · Melatonina",
        "instruments": "Tambor colgante · Cuencos tibetanos · Drone",
        "protocol": "Comience 45 min antes de dormir. Cuarto oscuro. Progreso 432→174→delta.",
        "tip": "La delta binaural a 2-3 Hz con ruido rosa es la combinación de sueño más estudiada.",
        "science": "El arrastre delta suprime los centros de excitación en la formación reticular.",
        "freqs": [
          {
            "hz": 3,
            "role": "Primary",
            "label": "Fase 1: Inducción del sueño",
            "effect": "Inducción del sueño profundo: coincide con las ondas cerebrales NREM",
            "duration": 20
          },
          {
            "hz": 5,
            "role": "Transition",
            "label": "Fase 2: Transición",
            "effect": "Estado hipnagógico: une la vigilia con el sueño",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Support",
            "label": "Fase 3: Alivio del dolor",
            "effect": "Anestésico natural: solfeo más profundo",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Calm",
            "label": "Fase 4: Calmante profundo",
            "effect": "Reduce la sobrecarga simpática",
            "duration": 5
          }
        ]
      ,
    "searchResults": "Resultados de búsqueda",
    "aiWelcome": "Bienvenido a tu Santuario de Sonido de IA. 🧘✨\n\nExplique lo que siente actualmente (como dolor físico, estrés mental, ansiedad o falta de concentración) y escanearé nuestras bases de datos de audio neurológico para sintetizar un protocolo personalizado de Solfeggio y arrastre de ondas cerebrales.",
    "saveBtn": "Guardar",
    "cancelBtn": "Cancelar",
    "guestUser": "Usuario Invitado",
    "enterName": "Ingrese su nombre",
    "streakLabel": "Racha",
    "sessionsLabel": "Sesiones",
    "minutesLabel": "Minutos",
    "favorites": "Favoritos",
    "language": "Idioma",
    "signOut": "Cerrar sesión",
    "signInOrCreate": "Iniciar sesión / Crear cuenta",
    "backToExplore": "Volver a Explorar",
    "chooseProtocol": "Elija una vía de protocolo objetivo para comenzar su sesión",
    "beginProtocol": "Comenzar Protocolo",
    "changeProtocol": "Cambiar Protocolo",
    "activeBeat": "activo —",
    "hzBeat": "Hz beat",
    "left": "Izquierda",
    "right": "Derecha",
    "headphonesRecommended": "Se recomiendan auriculares.",
    "tapToSynthesize": "Toque cualquier frecuencia para sintetizar la vista previa",
    "binauralBeatsLabel": "Beats binaurales:",
    "getDivine": "Obtener Divino",
    "chooseHealingPlan": "Elegir plan de sanación",
    "plansDesc": "Seleccione una membresía del santuario de sonido para desbloquear vías neuronales más altas y diseños de frecuencia antiguos",
    "monthlyLabel": "Mensual",
    "yearlyLabel": "Anual",
    "initializingSanctuary": "Inicializando Santuario...",
    "acousticSoundSanctuary": "Santuario de sonido acústico",
    "authDesc": "Inicie sesión para guardar el progreso y desbloquear funciones",
    "emailPlaceholder": "Correo electrónico",
    "passwordPlaceholder": "Contraseña",
    "createAccount": "Crear cuenta",
    "signIn": "Iniciar sesión",
    "hasAccountSignIn": "¿Ya tienes una cuenta? Iniciar sesión",
    "noAccountCreate": "¿No tienes una cuenta? Crea una",
    "continueAsGuest": "Continuar como invitado",
    "verificationEmailSent": "¡Correo de verificación enviado! Revisa tu bandeja de entrada.",
    "sessionCompleted": "¡Sesión completada! 🧘✨\n\nTu racha de sanación es ahora de {streak} días.",
    "sessionsEnabled": "Sesiones habilitadas",
    "paused": "Pausado",
    "recentsLabel": "Recientes",
    "notSignedIn": "No ha iniciado sesión",
    "aiAnalysisComplete": "🔬 **ANÁLISIS DE SONIDO NEURONAL COMPLETO**",
    "aiDetectedPattern": "🎯 Patrón detectado:",
    "patternPain": "Activación del dolor somático",
    "patternSleep": "Alteración de la melatonina y el ciclo del sueño",
    "patternFocus": "Desregulación de la corteza prefrontal",
    "patternAnxiety": "Sobrecarga del sistema nervioso simpático",
    "patternSadness": "Agotamiento de serotonina límbica",
    "patternDefault": "Desequilibrio del sistema nervioso autónomo",
    "aiPrescribedFrequencies": "🧠 Frecuencias prescritas:",
    "aiMatchedSanctuaries": "📋 {count} santuarios de curación coincidentes. Toque cualquiera a continuación para comenzar su sesión."},
      "fr": {
        "title": "Insomnie et sommeil",
        "sub": "Glande pinéale · Mélatonine",
        "instruments": "Tambour suspendu · Bols chantants · Drone",
        "protocol": "Commencez 45 minutes avant de dormir. Pièce sombre. Progression 432 → 174 → delta.",
        "tip": "Le delta binaural à 2–3 Hz avec bruit rose est la combinaison de sommeil la plus étudiée.",
        "science": "L'entraînement delta supprime les centres d'éveil dans la formation réticulaire.",
        "freqs": [
          {
            "hz": 3,
            "role": "Primary",
            "label": "Phase 1 : Induction du sommeil",
            "effect": "Induction du sommeil profond – correspond aux ondes cérébrales NREM",
            "duration": 20
          },
          {
            "hz": 5,
            "role": "Transition",
            "label": "Phase 2 : Transition",
            "effect": "État hypnagogique – relie l’éveil au sommeil",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Support",
            "label": "Phase 3 : Soulagement de la douleur",
            "effect": "Anesthésique naturel – Solfège le plus profond",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Calm",
            "label": "Phase 4 : Apaisation profonde",
            "effect": "Réduit l'overdrive sympathique",
            "duration": 5
          }
        ]
      ,
    "searchResults": "Résultats de recherche",
    "aiWelcome": "Bienvenue dans votre sanctuaire sonore IA. 🧘✨\n\nExpliquez ce que vous ressentez actuellement (comme une douleur physique, un stress mental, de l'anxiété ou un manque de concentration) et je scannerai nos bases de données audio neurologiques pour synthétiser un protocole personnalisé de Solfège et d'entraînement des ondes cérébrales.",
    "saveBtn": "Enregistrer",
    "cancelBtn": "Annuler",
    "guestUser": "Utilisateur Invité",
    "enterName": "Entrez le nom",
    "streakLabel": "Série",
    "sessionsLabel": "Séances",
    "minutesLabel": "Minutes",
    "favorites": "Favoris",
    "language": "Langue",
    "signOut": "Déconnexion",
    "signInOrCreate": "Se connecter / Créer un compte",
    "backToExplore": "Retour à l'exploration",
    "chooseProtocol": "Choisissez une voie de protocole cible pour commencer votre séance",
    "beginProtocol": "Démarrer le protocole",
    "changeProtocol": "Changer de protocole",
    "activeBeat": "actif —",
    "hzBeat": "battement Hz",
    "left": "Gauche",
    "right": "Droite",
    "headphonesRecommended": "Casque recommandé.",
    "tapToSynthesize": "Appuyez sur n'importe quelle fréquence pour synthétiser l'aperçu",
    "binauralBeatsLabel": "Battements binauraux :",
    "getDivine": "Devenir Divin",
    "chooseHealingPlan": "Choisir un plan de guérison",
    "plansDesc": "Sélectionnez un abonnement au sanctuaire sonore pour débloquer des voies neuronales supérieures et des conceptions de fréquences anciennes",
    "monthlyLabel": "Mensuel",
    "yearlyLabel": "Annuel",
    "initializingSanctuary": "Initialisation du sanctuaire...",
    "acousticSoundSanctuary": "Sanctuaire sonore acoustique",
    "authDesc": "Connectez-vous pour enregistrer votre progression et débloquer des fonctionnalités",
    "emailPlaceholder": "Adresse e-mail",
    "passwordPlaceholder": "Mot de passe",
    "createAccount": "Créer un compte",
    "signIn": "Se connecter",
    "hasAccountSignIn": "Vous avez déjà un compte ? Se connecter",
    "noAccountCreate": "Vous n'avez pas de compte ? Créez-en un",
    "continueAsGuest": "Continuer en tant qu'invité",
    "verificationEmailSent": "E-mail de vérification envoyé ! Vérifiez votre boîte de réception.",
    "sessionCompleted": "Séance terminée ! 🧘✨\n\nVotre série de guérison est maintenant de {streak} jours.",
    "sessionsEnabled": "Sessions activées",
    "paused": "En pause",
    "recentsLabel": "Récents",
    "notSignedIn": "Non connecté",
    "aiAnalysisComplete": "🔬 **ANALYSE DU SON NEURAL COMPLÈTE**",
    "aiDetectedPattern": "🎯 Modèle détecté :",
    "patternPain": "Activation de la douleur somatique",
    "patternSleep": "Perturbation de la mélatonine et du cycle du sommeil",
    "patternFocus": "Dérégulation du cortex préfrontal",
    "patternAnxiety": "Surcharge du système nerveux sympathique",
    "patternSadness": "Épuisement de la sérotonine limbique",
    "patternDefault": "Déséquilibre du système nerveux autonome",
    "aiPrescribedFrequencies": "🧠 Fréquences prescrites :",
    "aiMatchedSanctuaries": "📋 {count} sanctuaires de guérison correspondants. Appuyez sur l'un d'eux ci-dessous pour commencer votre séance."},
      "ar": {
        "title": "الأرق والنوم",
        "sub": "الغدة الصنوبرية · الميلاتونين",
        "instruments": "طبل معلق · أوعية الغناء · الطائرة بدون طيار",
        "protocol": "ابدأ قبل النوم بـ 45 دقيقة. غرفة مظلمة. التقدم 432 → 174 → دلتا.",
        "tip": "دلتا الأذنين عند 2-3 هرتز مع الضوضاء الوردية هي مجموعة النوم الأكثر دراسة.",
        "science": "يعمل نظام دلتا على منع مراكز الإثارة في التكوين الشبكي.",
        "freqs": [
          {
            "hz": 3,
            "role": "Primary",
            "label": "المرحلة 1: تحريض النوم",
            "effect": "تحريض النوم العميق - يطابق الموجات الدماغية لحركة العين غير السريعة",
            "duration": 20
          },
          {
            "hz": 5,
            "role": "Transition",
            "label": "المرحلة 2: الانتقال",
            "effect": "حالة التنويم المغناطيسي - تربط بين اليقظة والنوم",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Support",
            "label": "المرحلة 3: تخفيف الألم",
            "effect": "مخدر طبيعي - أعمق سولفيجيو",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Calm",
            "label": "المرحلة 4: التهدئة العميقة",
            "effect": "يقلل من فرط الحركة الودية",
            "duration": 5
          }
        ]
      ,
    "searchResults": "نتائج البحث",
    "aiWelcome": "مرحبًا بك في ملاذ الصوت الخاص بالذكاء الاصطناعي. 🧘✨\n\nاشرح ما تشعر به حاليًا - مثل الألم الجسدي أو الضغط العقلي أو القلق أو قلة التركيز - وسأقوم بفحص قواعد بيانات الصوت العصبية لدينا لتركيب بروتوكول سولفيجيو وتدريب موجات الدماغ المخصص.",
    "saveBtn": "حفظ",
    "cancelBtn": "إلغاء",
    "guestUser": "مستخدم ضيف",
    "enterName": "أدخل الاسم",
    "streakLabel": "سلسلة",
    "sessionsLabel": "جلسات",
    "minutesLabel": "دقائق",
    "favorites": "المفضلة",
    "language": "اللغة",
    "signOut": "تسجيل الخروج",
    "signInOrCreate": "تسجيل الدخول / إنشاء حساب",
    "backToExplore": "الالتحاق بالاستكشاف",
    "chooseProtocol": "اختر مسار البروتوكول المستهدف لبدء جلستك",
    "beginProtocol": "ابدأ البروتوكول",
    "changeProtocol": "تغيير البروتوكول",
    "activeBeat": "نشط —",
    "hzBeat": "نبضة هرتز",
    "left": "اليسار",
    "right": "اليمين",
    "headphonesRecommended": "يوصى باستخدام سماعات الرأس.",
    "tapToSynthesize": "اضغط على أي تردد لتركيب المعاينة",
    "binauralBeatsLabel": "النبضات ثنائية الأذن:",
    "getDivine": "احصل على الباقة الإلهية",
    "chooseHealingPlan": "اختر خطة الشفاء",
    "plansDesc": "اختر عضوية ملاذ الصوت لفتح مسارات عصبية أعلى وتصميمات ترددية قديمة",
    "monthlyLabel": "شهرياً",
    "yearlyLabel": "سنوياً",
    "initializingSanctuary": "تهيئة الملاذ...",
    "acousticSoundSanctuary": "ملاذ الصوت الصوتي",
    "authDesc": "سجل الدخول لحفظ التقدم وفتح الميزات",
    "emailPlaceholder": "البريد الإلكتروني",
    "passwordPlaceholder": "كلمة المرور",
    "createAccount": "إنشاء حساب",
    "signIn": "تسجيل الدخول",
    "hasAccountSignIn": "لديك حساب بالفعل؟ سجل الدخول",
    "noAccountCreate": "ليس لديك حساب؟ أنشئ حسابًا",
    "continueAsGuest": "المتابعة كضيف",
    "verificationEmailSent": "تم إرسال بريد التحقق! تحقق من صندوق الوارد الخاص بك.",
    "sessionCompleted": "اكتملت الجلسة! 🧘✨\n\nسلسلة الشفاء الخاصة بك هي الآن {streak} يومًا.",
    "sessionsEnabled": "جلسات مفعلة",
    "paused": "متوقف مؤقتاً",
    "recentsLabel": "الأخيرة",
    "notSignedIn": "لم تقم بتسجيل الدخول",
    "aiAnalysisComplete": "🔬 **اكتمل التحليل الصوتي العصبي**",
    "aiDetectedPattern": "🎯 النمط المكتشف:",
    "patternPain": "تنشيط الألم الجسدي",
    "patternSleep": "اضطراب الميلاتونين ودورة النوم",
    "patternFocus": "خلل في القشرة الجبهية",
    "patternAnxiety": "فرط نشاط الجهاز العصبي الودي",
    "patternSadness": "استنفاد السيروتونين الحوفي",
    "patternDefault": "اختلال توازن الجهاز العصبي اللاإرادي",
    "aiPrescribedFrequencies": "🧠 الترددات المحددة:",
    "aiMatchedSanctuaries": "📋 تم مطابقة {count} من ملاذات الشفاء. اضغط على أي منها أدناه لبدء جلستك."},
      "ja": {
        "title": "不眠症と睡眠",
        "sub": "松果体 · メラトニン",
        "instruments": "ハングドラム · シンギングボウル · ドローン",
        "protocol": "睡眠の 45 分前に始めてください。暗室。 432→174→デルタと進みます。",
        "tip": "2 ～ 3 Hz のバイノーラル デルタとピンク ノイズは、最も研究されている睡眠の組み合わせです。",
        "science": "デルタ同調は網様体における覚醒中枢を抑制します。",
        "freqs": [
          {
            "hz": 3,
            "role": "Primary",
            "label": "フェーズ 1: 睡眠導入",
            "effect": "深い睡眠導入 — ノンレム脳波と一致",
            "duration": 20
          },
          {
            "hz": 5,
            "role": "Transition",
            "label": "フェーズ 2: 移行",
            "effect": "催眠状態 — 覚醒から睡眠への橋渡し",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Support",
            "label": "フェーズ 3: 鎮痛",
            "effect": "自然麻酔 — 最も深いソルフェジオ",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Calm",
            "label": "フェーズ 4: 深い鎮静",
            "effect": "交感神経の過剰ドライブを軽減",
            "duration": 5
          }
        ]
      ,
    "searchResults": "検索結果",
    "aiWelcome": "AIサウンドサンクチュアリへようこそ。🧘✨\n\n身体的な痛み、精神的なストレス、不安、集中の欠如など、現在感じていることを説明してください。当社の神経オーディオデータベースをスキャンして、カスタマイズされたソルフェジオおよび脳波引き込みプロトコルを合成します。",
    "saveBtn": "保存",
    "cancelBtn": "キャンセル",
    "guestUser": "ゲストユーザー",
    "enterName": "名前を入力",
    "streakLabel": "継続日数",
    "sessionsLabel": "セッション",
    "minutesLabel": "分",
    "favorites": "お気に入り",
    "language": "言語",
    "signOut": "サインアウト",
    "signInOrCreate": "サインイン / アカウント作成",
    "backToExplore": "探索に戻る",
    "chooseProtocol": "セッションを開始するためのターゲットプロトコル経路を選択してください",
    "beginProtocol": "プロトコルを開始",
    "changeProtocol": "プロトコルを変更",
    "activeBeat": "アクティブ —",
    "hzBeat": "Hzビート",
    "left": "左",
    "right": "右",
    "headphonesRecommended": "ヘッドホンの使用を推奨します。",
    "tapToSynthesize": "タップしてプレビューを合成します",
    "binauralBeatsLabel": "バイノーラルビート:",
    "getDivine": "ディバインを取得",
    "chooseHealingPlan": "ヒーリングプランの選択",
    "plansDesc": "サウンドサンクチュアリのメンバーシップを選択して、より高い神経経路と古代の周波数設計を解き放ちます",
    "monthlyLabel": "月間",
    "yearlyLabel": "年間",
    "initializingSanctuary": "サンクチュアリを初期化中...",
    "acousticSoundSanctuary": "アコースティックサウンドサンクチュアリ",
    "authDesc": "進行状況を保存し、機能を解放するにはサインインしてください",
    "emailPlaceholder": "メールアドレス",
    "passwordPlaceholder": "パスワード",
    "createAccount": "アカウント作成",
    "signIn": "サインイン",
    "hasAccountSignIn": "すでにアカウントをお持ちですか？ サインイン",
    "noAccountCreate": "アカウントをお持ちでないですか？ 作成する",
    "continueAsGuest": "ゲストとして続行",
    "verificationEmailSent": "確認メールを送信しました！ 受信トレイを確認してください。",
    "sessionCompleted": "セッション完了！ 🧘✨\n\nヒーリングの継続日数は現在 {streak} 日です。",
    "sessionsEnabled": "セッションが有効です",
    "paused": "一時停止中",
    "recentsLabel": "履歴",
    "notSignedIn": "サインインしていません",
    "aiAnalysisComplete": "🔬 **神経サウンド分析完了**",
    "aiDetectedPattern": "🎯 検出されたパターン:",
    "patternPain": "体性痛の活性化",
    "patternSleep": "メラトニンと睡眠サイクルの乱れ",
    "patternFocus": "前頭前皮質の調節障害",
    "patternAnxiety": "交感神経系のオーバードライブ",
    "patternSadness": "辺縁系セロトニンの枯渇",
    "patternDefault": "自律神経系のアンバランス",
    "aiPrescribedFrequencies": "🧠 処方された周波数:",
    "aiMatchedSanctuaries": "📋 {count} 件の癒しの聖域が見つかりました。以下をタップしてセッションを開始してください。"}
    }
  },
  {
    "id": "pain",
    "cat": "Physical",
    "emoji": "⚡",
    "free": false,
    "title": "Chronic Pain & Fibromyalgia",
    "sub": "Nociceptors · Central nervous system",
    "duration": 30,
    "color": "#ef4444",
    "freqs": [
      {
        "hz": 174,
        "role": "Primary",
        "label": "Phase 1: Deep Anesthetic",
        "effect": "Natural pain anesthetic — deepest tissue",
        "duration": 10
      },
      {
        "hz": 528,
        "role": "Anti-inflam",
        "label": "Phase 2: Anti-Inflammatory",
        "effect": "Anti-inflammatory at cellular level",
        "duration": 10
      },
      {
        "hz": 40,
        "role": "Perception",
        "label": "Phase 3: Modulation",
        "effect": "Reduces chronic pain perception in trials",
        "duration": 5
      },
      {
        "hz": 432,
        "role": "Muscle",
        "label": "Phase 4: Muscle Release",
        "effect": "Relaxes skeletal muscle tension",
        "duration": 5
      }
    ],
    "binaural": 10,
    "instruments": "Low drums · Crystal bowls · Cello",
    "protocol": "2× daily, 30 min. Place speakers near affected area. 174 Hz first 15 min.",
    "tip": "174 Hz is the most underused frequency — especially effective for nerve pain.",
    "science": "174 Hz resonates in connective tissue. TENS at similar frequencies: 40–60% VAS reduction.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/pain.mp3",
    "translations": {
      "hi": {
        "title": "क्रोनिक दर्द और फाइब्रोमायल्गिया",
        "sub": "नोसिसेप्टर · केंद्रीय तंत्रिका तंत्र",
        "instruments": "कम ड्रम · क्रिस्टल कटोरे · सेलो",
        "protocol": "2× दैनिक, 30 मिनट। प्रभावित क्षेत्र के पास स्पीकर लगाएं। 174 हर्ट्ज पहले 15 मिनट।",
        "tip": "174 हर्ट्ज सबसे कम उपयोग की जाने वाली आवृत्ति है - विशेष रूप से तंत्रिका दर्द के लिए प्रभावी।",
        "science": "174 हर्ट्ज़ संयोजी ऊतक में प्रतिध्वनित होता है। समान आवृत्तियों पर TENS: 40-60% VAS कमी।",
        "freqs": [
          {
            "hz": 174,
            "role": "Primary",
            "label": "चरण 1: गहरा संवेदनाहारी",
            "effect": "प्राकृतिक दर्द संवेदनाहारी - सबसे गहरा ऊतक",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Anti-inflam",
            "label": "चरण 2: सूजन रोधी",
            "effect": "सेलुलर स्तर पर सूजन रोधी",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Perception",
            "label": "चरण 3: मॉड्यूलेशन",
            "effect": "परीक्षणों में पुराने दर्द की अनुभूति को कम करता है",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "चरण 4: मांसपेशियों को मुक्त करता है",
            "effect": "कंकाल की मांसपेशियों के तनाव को आराम देता है",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Dolor Crónico y Fibromialgia",
        "sub": "Nociceptores · Sistema nervioso central",
        "instruments": "Tambores bajos · Cuencos de cristal · Violonchelo",
        "protocol": "2× al día, 30 min. Coloque los altavoces cerca del área afectada. 174 Hz primeros 15 min.",
        "tip": "174 Hz es la frecuencia menos utilizada, especialmente eficaz para el dolor nervioso.",
        "science": "174 Hz resuena en el tejido conectivo. TENS a frecuencias similares: reducción VAS del 40-60%.",
        "freqs": [
          {
            "hz": 174,
            "role": "Primary",
            "label": "Fase 1: Anestésico profundo",
            "effect": "Anestésico natural para el dolor — tejido más profundo",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Anti-inflam",
            "label": "Fase 2: Antiinflamatorio",
            "effect": "Antiinflamatorio a nivel celular",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Perception",
            "label": "Fase 3: Modulación",
            "effect": "Reduce la percepción del dolor crónico en ensayos",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "Fase 4: Liberación muscular",
            "effect": "Relaja la tensión del músculo esquelético",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Douleur chronique et fibromyalgie",
        "sub": "Nocicepteurs · Système nerveux central",
        "instruments": "Tambours graves · Bols de cristal · Violoncelle",
        "protocol": "2× par jour, 30 min. Placez les enceintes à proximité de la zone affectée. 174 Hz premières 15 min.",
        "tip": "174 Hz est la fréquence la plus sous-utilisée – particulièrement efficace pour les douleurs nerveuses.",
        "science": "174 Hz résonne dans le tissu conjonctif. TENS à fréquences similaires : réduction de l’EVA de 40 à 60 %.",
        "freqs": [
          {
            "hz": 174,
            "role": "Primary",
            "label": "Phase 1 : Anesthésique profond",
            "effect": "Anesthésique naturel de la douleur — tissus les plus profonds",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Anti-inflam",
            "label": "Phase 2 : Anti-inflammatoire",
            "effect": "Anti-inflammatoire au niveau cellulaire",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Perception",
            "label": "Phase 3 : Modulation",
            "effect": "Réduit la perception de la douleur chronique dans les essais",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "Phase 4 : Libération musculaire",
            "effect": "Détend la tension des muscles squelettiques",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "الألم المزمن والفيبروميالجيا",
        "sub": "مستقبلات الألم · الجهاز العصبي المركزي",
        "instruments": "طبول منخفضة · أوعية كريستالية · التشيلو",
        "protocol": "2 × يوميًا، 30 دقيقة. ضع مكبرات الصوت بالقرب من المنطقة المصابة. 174 هرتز أول 15 دقيقة.",
        "tip": "174 هرتز هو التردد الأقل استخدامًا، وهو فعال بشكل خاص في علاج آلام الأعصاب.",
        "science": "تردد 174 هرتز يتردد في النسيج الضام. TENS على ترددات مماثلة: تخفيض خدمات القيمة المضافة بنسبة 40-60%.",
        "freqs": [
          {
            "hz": 174,
            "role": "Primary",
            "label": "المرحلة 1: مخدر عميق",
            "effect": "مخدر الألم الطبيعي - أعمق الأنسجة",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Anti-inflam",
            "label": "المرحلة 2: مضاد للالتهابات",
            "effect": "مضاد للالتهابات على المستوى الخلوي",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Perception",
            "label": "المرحلة 3: التعديل",
            "effect": "يقلل من إدراك الألم المزمن في التجارب",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "المرحلة 4: تحرير العضلات",
            "effect": "يريح توتر العضلات الهيكلية",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "慢性痛と線維筋痛症",
        "sub": "侵害受容器 · 中枢神経系",
        "instruments": "低音ドラム · クリスタルボウル · チェロ",
        "protocol": "毎日 2 回、30 分。スピーカーを患部の近くに置きます。 174 Hz 最初の 15 分間",
        "tip": "174 Hz は最も活用されていない周波数であり、特に神経痛に効果的です。",
        "science": "174 Hz は結合組織で共鳴します。同様の周波数での TENS: 40 ～ 60% の VAS 減少。",
        "freqs": [
          {
            "hz": 174,
            "role": "Primary",
            "label": "フェーズ 1: 深部麻酔",
            "effect": "自然な痛みの麻酔 - 最深部組織",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Anti-inflam",
            "label": "フェーズ 2: 抗炎症",
            "effect": "細胞レベルでの抗炎症",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Perception",
            "label": "フェーズ 3: 調節",
            "effect": "試験中の慢性痛の知覚を軽減",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "フェーズ 4: 筋肉の解放",
            "effect": "骨格筋の緊張を緩和",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "cancer",
    "cat": "Physical",
    "emoji": "🛡️",
    "free": false,
    "title": "Cancer Support",
    "sub": "Immune system · Cellular health",
    "duration": 60,
    "color": "#6366f1",
    "freqs": [
      {
        "hz": 40,
        "role": "Immune",
        "label": "Phase 1: Immune Trigger",
        "effect": "Triggers microglia immune activity — MIT Picower",
        "duration": 20
      },
      {
        "hz": 528,
        "role": "DNA",
        "label": "Phase 2: DNA Support",
        "effect": "DNA repair — studied by Dr. Len Horowitz",
        "duration": 20
      },
      {
        "hz": 432,
        "role": "Coherence",
        "label": "Phase 3: Cellular Coherence",
        "effect": "Restores cellular coherence",
        "duration": 10
      },
      {
        "hz": 638,
        "role": "NK Cells",
        "label": "Phase 4: NK Activation",
        "effect": "Stimulates natural killer cell activation",
        "duration": 10
      }
    ],
    "binaural": 40,
    "instruments": "Pure sine tones · Crystal bowls",
    "protocol": "ADJUNCT ONLY — never replace medical treatment. 2× daily 30 min.",
    "tip": "Music therapy is integrated in 80%+ of US cancer centers as evidence-based care.",
    "science": "40 Hz gamma reduces amyloid plaques and upregulates immune markers in MIT trials.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/cancer.mp3",
    "translations": {
      "hi": {
        "title": "कैंसर सहायता",
        "sub": "प्रतिरक्षा प्रणाली · सेलुलर स्वास्थ्य",
        "instruments": "शुद्ध साइन टोन · क्रिस्टल बाउल्स",
        "protocol": "केवल सहायक - चिकित्सा उपचार को कभी न बदलें। 2× प्रतिदिन 30 मिनट।",
        "tip": "अमेरिका के 80% से अधिक कैंसर केंद्रों में साक्ष्य-आधारित देखभाल के रूप में संगीत चिकित्सा को एकीकृत किया गया है।",
        "science": "40 हर्ट्ज गामा एमआईटी परीक्षणों में अमाइलॉइड प्लाक को कम करता है और प्रतिरक्षा मार्करों को बढ़ाता है।",
        "freqs": [
          {
            "hz": 40,
            "role": "Immune",
            "label": "चरण 1: प्रतिरक्षा ट्रिगर",
            "effect": "ट्रिगर माइक्रोग्लिया प्रतिरक्षा गतिविधि - एमआईटी पिकॉवर",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "DNA",
            "label": "चरण 2: डीएनए समर्थन",
            "effect": "डीएनए मरम्मत - डॉ. लेन होरोविट्ज़ द्वारा अध्ययन किया गया",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Coherence",
            "label": "चरण 3: सेलुलर सुसंगतता",
            "effect": "सेलुलर सुसंगतता को पुनर्स्थापित करता है",
            "duration": 10
          },
          {
            "hz": 638,
            "role": "NK Cells",
            "label": "चरण 4: एनके सक्रियण",
            "effect": "प्राकृतिक किलर सेल सक्रियण को उत्तेजित करता है",
            "duration": 10
          }
        ]
      },
      "es": {
        "title": "Apoyo al cáncer",
        "sub": "Sistema inmunológico · Salud celular",
        "instruments": "Tonos sinusoidales puros · Cuencos de cristal",
        "protocol": "SÓLO ADJUNTO: nunca reemplaza el tratamiento médico. 2× al día 30 min.",
        "tip": "La musicoterapia está integrada en más del 80% de los centros oncológicos de EE. UU. como atención basada en evidencia.",
        "science": "La gamma de 40 Hz reduce las placas amiloides y regula positivamente los marcadores inmunológicos en ensayos del MIT.",
        "freqs": [
          {
            "hz": 40,
            "role": "Immune",
            "label": "Fase 1: Activador inmunológico",
            "effect": "Activa la actividad inmune de la microglia - MIT Picower",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "DNA",
            "label": "Fase 2: Soporte del ADN",
            "effect": "Reparación del ADN - estudiada por el Dr. Len Horowitz",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Coherence",
            "label": "Fase 3: Coherencia celular",
            "effect": "Restaura la coherencia celular",
            "duration": 10
          },
          {
            "hz": 638,
            "role": "NK Cells",
            "label": "Fase 4: Activación de NK",
            "effect": "Estimula la activación de las células asesinas naturales",
            "duration": 10
          }
        ]
      },
      "fr": {
        "title": "Soutien contre le cancer",
        "sub": "Système immunitaire · Santé cellulaire",
        "instruments": "Tons sinusoïdaux purs · Bols en cristal",
        "protocol": "COMPLÉMENT UNIQUEMENT – ne remplace jamais un traitement médical. 2× par jour 30 min.",
        "tip": "La musicothérapie est intégrée dans plus de 80 % des centres de cancérologie américains en tant que soins fondés sur des preuves.",
        "science": "Le gamma 40 Hz réduit les plaques amyloïdes et régule positivement les marqueurs immunitaires dans les essais du MIT.",
        "freqs": [
          {
            "hz": 40,
            "role": "Immune",
            "label": "Phase 1 : Déclencheur immunitaire",
            "effect": "Déclenche l'activité immunitaire des microglies - MIT Picower",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "DNA",
            "label": "Phase 2 : Prise en charge de l'ADN",
            "effect": "Réparation de l'ADN - étudiée par le Dr Len Horowitz",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Coherence",
            "label": "Phase 3 : Cohérence Cellulaire",
            "effect": "Restaure la cohérence cellulaire",
            "duration": 10
          },
          {
            "hz": 638,
            "role": "NK Cells",
            "label": "Phase 4 : Activation NK",
            "effect": "Stimule l’activation des cellules tueuses naturelles",
            "duration": 10
          }
        ]
      },
      "ar": {
        "title": "دعم السرطان",
        "sub": "الجهاز المناعي · الصحة الخلوية",
        "instruments": "نغمات جيبية نقية · أوعية كريستالية",
        "protocol": "مساعد فقط - لا يحل محل العلاج الطبي أبدًا. 2× يوميا 30 دقيقة.",
        "tip": "تم دمج العلاج بالموسيقى في أكثر من 80% من مراكز السرطان في الولايات المتحدة كرعاية قائمة على الأدلة.",
        "science": "غاما 40 هرتز تقلل من لويحات الأميلويد وتنظم العلامات المناعية في تجارب معهد ماساتشوستس للتكنولوجيا.",
        "freqs": [
          {
            "hz": 40,
            "role": "Immune",
            "label": "المرحلة 1: المحفز المناعي",
            "effect": "تحفيز النشاط المناعي للخلايا الدبقية الصغيرة - معهد ماساتشوستس للتكنولوجيا Picower",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "DNA",
            "label": "المرحلة 2: دعم الحمض النووي",
            "effect": "إصلاح الحمض النووي - درسها الدكتور لين هورويتز",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Coherence",
            "label": "المرحلة 3: التماسك الخلوي",
            "effect": "استعادة التماسك الخلوي",
            "duration": 10
          },
          {
            "hz": 638,
            "role": "NK Cells",
            "label": "المرحلة 4: تنشيط NK",
            "effect": "يحفز تنشيط الخلايا القاتلة الطبيعية",
            "duration": 10
          }
        ]
      },
      "ja": {
        "title": "がんサポート",
        "sub": "免疫システム · 細胞の健康",
        "instruments": "純粋なサイントーン · クリスタルボウル",
        "protocol": "調整のみ — 決して医療治療に代わるものではありません。毎日30分×2回。",
        "tip": "音楽療法は、米国のがんセンターの 80% 以上で科学的根拠に基づいたケアとして組み込まれています。",
        "science": "MIT 試験では、40 Hz ガンマ線はアミロイド斑を減少させ、免疫マーカーを上方制御します。",
        "freqs": [
          {
            "hz": 40,
            "role": "Immune",
            "label": "フェーズ 1: 免疫トリガー",
            "effect": "ミクログリア免疫活性を誘発 — MIT Picower",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "DNA",
            "label": "フェーズ 2: DNA サポート",
            "effect": "DNA 修復 — レン・ホロウィッツ博士による研究",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Coherence",
            "label": "フェーズ 3: 細胞の密着性",
            "effect": "細胞の密着性を回復する",
            "duration": 10
          },
          {
            "hz": 638,
            "role": "NK Cells",
            "label": "フェーズ 4: NK 活性化",
            "effect": "ナチュラルキラー細胞の活性化を刺激する",
            "duration": 10
          }
        ]
      }
    }
  },
  {
    "id": "arthritis",
    "cat": "Chronic",
    "emoji": "🦴",
    "free": false,
    "title": "Arthritis & Joints",
    "sub": "Synovial joints · Cartilage",
    "duration": 30,
    "color": "#78716c",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Inflammation Release",
        "effect": "Anti-inflammatory — reduces cytokines",
        "duration": 10
      },
      {
        "hz": 174,
        "role": "Analgesic",
        "label": "Phase 2: Joint Pain Relief",
        "effect": "Deep analgesic — reduces joint pain",
        "duration": 10
      },
      {
        "hz": 285,
        "role": "Regen",
        "label": "Phase 3: Regeneration",
        "effect": "Cartilage and tissue regeneration",
        "duration": 5
      },
      {
        "hz": 432,
        "role": "Muscle",
        "label": "Phase 4: Muscle Relax",
        "effect": "Relaxes periarticular muscles",
        "duration": 5
      }
    ],
    "binaural": 10,
    "instruments": "Low bowl resonance · Deep harp",
    "protocol": "Local vibration at 174 Hz near joint + 528 Hz systemic. 30 min, 2× daily.",
    "tip": "Warm-water sound bath with 528 Hz — water amplifies vibration to joints.",
    "science": "174 Hz disrupts prostaglandin-mediated pain. 528 Hz inhibits COX-2 pathway.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/arthritis.mp3",
    "translations": {
      "hi": {
        "title": "गठिया और जोड़",
        "sub": "सिनोवियल जोड़ · उपास्थि",
        "instruments": "कम कटोरा प्रतिध्वनि · गहरी वीणा",
        "protocol": "जोड़ के पास 174 हर्ट्ज पर स्थानीय कंपन + 528 हर्ट्ज प्रणालीगत। 30 मिनट, 2× प्रतिदिन।",
        "tip": "528 हर्ट्ज के साथ गर्म पानी का ध्वनि स्नान - पानी जोड़ों में कंपन को बढ़ाता है।",
        "science": "174 हर्ट्ज़ प्रोस्टाग्लैंडीन-मध्यस्थ दर्द को बाधित करता है। 528 हर्ट्ज COX-2 मार्ग को रोकता है।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: सूजन मुक्ति",
            "effect": "सूजन रोधी - साइटोकिन्स को कम करता है",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "चरण 2: जोड़ों के दर्द से राहत",
            "effect": "गहरा एनाल्जेसिक - जोड़ों के दर्द को कम करता है",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "चरण 3: पुनर्जनन",
            "effect": "उपास्थि और ऊतक पुनर्जनन",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "चरण 4: मांसपेशियों को आराम",
            "effect": "पेरीआर्टिकुलर मांसपेशियों को आराम देता है",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Artritis y Articulaciones",
        "sub": "Articulaciones sinoviales · Cartílago",
        "instruments": "Resonancia de cuenco bajo · Arpa profunda",
        "protocol": "Vibración local a 174 Hz cerca de la articulación + 528 Hz sistémica. 30 min, 2 veces al día.",
        "tip": "Baño sonoro de agua caliente con 528 Hz: el agua amplifica la vibración en las articulaciones.",
        "science": "174 Hz interrumpe el dolor mediado por prostaglandinas. 528 Hz inhibe la vía COX-2.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Liberación de inflamación",
            "effect": "Antiinflamatorio: reduce las citoquinas",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "Fase 2: Alivio del dolor en las articulaciones",
            "effect": "Analgésico profundo: reduce el dolor en las articulaciones",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "Fase 3: Regeneración",
            "effect": "Regeneración de cartílagos y tejidos",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "Fase 4: Relajación muscular",
            "effect": "Relaja los músculos periarticulares",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Arthrite et articulations",
        "sub": "Articulations synoviales · Cartilage",
        "instruments": "Faible résonance du bol · Harpe profonde",
        "protocol": "Vibration locale à 174 Hz près de l'articulation + 528 Hz systémique. 30 minutes, 2 fois par jour.",
        "tip": "Bain sonore à l'eau chaude à 528 Hz — l'eau amplifie les vibrations des articulations.",
        "science": "174 Hz perturbe la douleur médiée par les prostaglandines. 528 Hz inhibe la voie COX-2.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : Libération de l'inflammation",
            "effect": "Anti-inflammatoire — réduit les cytokines",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "Phase 2 : Soulagement des douleurs articulaires",
            "effect": "Analgésique profond — réduit les douleurs articulaires",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "Phase 3 : Régénération",
            "effect": "Régénération du cartilage et des tissus",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "Phase 4 : Relaxation musculaire",
            "effect": "Détend les muscles périarticulaires",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "التهاب المفاصل والمفاصل",
        "sub": "المفاصل الزلالية · الغضاريف",
        "instruments": "رنين الوعاء المنخفض · القيثارة العميقة",
        "protocol": "اهتزاز موضعي عند 174 هرتز بالقرب من المفصل + 528 هرتز نظامي. 30 دقيقة، 2 × يوميا.",
        "tip": "حمام صوتي بماء دافئ بتردد 528 هرتز - يعمل الماء على تضخيم اهتزاز المفاصل.",
        "science": "174 هرتز يعطل الألم الناتج عن البروستاجلاندين. 528 هرتز يمنع مسار COX-2.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: إطلاق الالتهاب",
            "effect": "مضاد للالتهابات - يقلل السيتوكينات",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "المرحلة 2: تخفيف آلام المفاصل",
            "effect": "مسكن عميق - يقلل آلام المفاصل",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "المرحلة 3: التجديد",
            "effect": "تجديد الغضروف والأنسجة",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "المرحلة 4: استرخاء العضلات",
            "effect": "استرخاء العضلات المحيطة بالمفصل",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "関節炎と関節",
        "sub": "滑膜関節 · 軟骨",
        "instruments": "低いボウル共鳴 · ディープハープ",
        "protocol": "関節付近の 174 Hz の局所振動 + 全身の 528 Hz の振動。 30分、毎日2回。",
        "tip": "528 Hz の温水サウンドバス - 水が関節への振動を増幅します。",
        "science": "174 Hz はプロスタグランジン媒介の痛みを破壊します。 528 Hz は COX-2 経路を阻害します。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: 炎症の解放",
            "effect": "抗炎症 — サイトカインの減少",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "フェーズ 2: 関節痛の緩和",
            "effect": "深い鎮痛 — 関節の痛みの軽減",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "フェーズ 3: 再生",
            "effect": "軟骨と組織の再生",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Muscle",
            "label": "フェーズ 4: 筋肉の弛緩",
            "effect": "関節周囲の筋肉を弛緩します",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "hormonal",
    "cat": "Endocrine",
    "emoji": "🌸",
    "free": false,
    "title": "Hormonal Imbalance",
    "sub": "Ovaries · Adrenals · Hypothalamus",
    "duration": 35,
    "color": "#ec4899",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Reproductive Repair",
        "effect": "Reproductive cellular repair",
        "duration": 15
      },
      {
        "hz": 432,
        "role": "HPA",
        "label": "Phase 2: Adrenal Balance",
        "effect": "Balances estrogen-cortisol relationship",
        "duration": 10
      },
      {
        "hz": 639,
        "role": "Womb",
        "label": "Phase 3: Womb Connection",
        "effect": "Heart and womb — sacred feminine healing",
        "duration": 5
      },
      {
        "hz": 963,
        "role": "Master",
        "label": "Phase 4: Pineal Switch",
        "effect": "Pineal/pituitary — master hormone gland",
        "duration": 5
      }
    ],
    "binaural": 7,
    "instruments": "Crystal bowls · Harp · Sacred chants",
    "protocol": "Cycle-aware: 528 Hz follicular, 639 Hz ovulatory, 432 Hz luteal, 396 Hz menstrual.",
    "tip": "Yin yoga with 528 Hz creates powerful hormonal rebalancing.",
    "science": "Cortisol suppression via PNS activates brain output.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/hormonal.mp3",
    "translations": {
      "hi": {
        "title": "हार्मोनल असंतुलन",
        "sub": "अंडाशय · अधिवृक्क · हाइपोथैलेमस",
        "instruments": "क्रिस्टल कटोरे · हार्प · पवित्र मंत्र",
        "protocol": "चक्र-जागरूक: 528 हर्ट्ज कूपिक, 639 हर्ट्ज ओव्यूलेटरी, 432 हर्ट्ज ल्यूटियल, 396 हर्ट्ज मासिक धर्म।",
        "tip": "528 हर्ट्ज़ के साथ यिन योग शक्तिशाली हार्मोनल पुनर्संतुलन बनाता है।",
        "science": "पीएनएस के माध्यम से कोर्टिसोल का दमन मस्तिष्क आउटपुट को सक्रिय करता है।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: प्रजनन मरम्मत",
            "effect": "प्रजनन सेलुलर मरम्मत",
            "duration": 15
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "चरण 2: अधिवृक्क संतुलन",
            "effect": "एस्ट्रोजन-कोर्टिसोल संबंध को संतुलित करता है",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Womb",
            "label": "चरण 3: गर्भ संबंध",
            "effect": "हृदय और गर्भ - पवित्र स्त्री उपचार",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Master",
            "label": "चरण 4: पीनियल स्विच",
            "effect": "पीनियल/पिट्यूटरी - मास्टर हार्मोन ग्रंथि",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Desequilibrio hormonal",
        "sub": "Ovarios · Suprarrenales · Hipotálamo",
        "instruments": "Cuencos de cristal · Arpa · Cantos sagrados",
        "protocol": "Ciclo-consciente: 528 Hz folicular, 639 Hz ovulatorio, 432 Hz lúteo, 396 Hz menstrual.",
        "tip": "Yin yoga con 528 Hz crea un poderoso reequilibrio hormonal.",
        "science": "La supresión de cortisol a través del SNP activa la producción cerebral.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Reparación reproductiva",
            "effect": "Reparación celular reproductiva",
            "duration": 15
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "Fase 2: Equilibrio suprarrenal",
            "effect": "Equilibra la relación estrógeno-cortisol",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Womb",
            "label": "Fase 3: Conexión con el útero",
            "effect": "Corazón y útero: curación femenina sagrada",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Master",
            "label": "Fase 4: Cambio pineal",
            "effect": "Pineal/pituitaria: glándula hormonal maestra",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Déséquilibre hormonal",
        "sub": "Ovaires · Surrénales · Hypothalamus",
        "instruments": "Bols en cristal · Harpe · Chants sacrés",
        "protocol": "Teneur en compte du cycle : 528 Hz folliculaire, 639 Hz ovulatoire, 432 Hz lutéal, 396 Hz menstruel.",
        "tip": "Le Yin yoga à 528 Hz crée un puissant rééquilibrage hormonal.",
        "science": "La suppression du cortisol via le PNS active le débit cérébral.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : Réparation reproductive",
            "effect": "Réparation cellulaire reproductive",
            "duration": 15
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "Phase 2 : Équilibre surrénalien",
            "effect": "Équilibre la relation œstrogène-cortisol",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Womb",
            "label": "Phase 3 : Connexion à l'utérus",
            "effect": "Cœur et ventre – guérison féminine sacrée",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Master",
            "label": "Phase 4 : commutation pinéale",
            "effect": "Pinéale/hypophyse – glande hormonale principale",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "خلل هرموني",
        "sub": "المبايض · الغدة الكظرية · ما تحت المهاد",
        "instruments": "أوعية كريستال · القيثارة · الأناشيد المقدسة",
        "protocol": "الدورة: 528 هرتز جريبي، 639 هرتز تبويض، 432 هرتز أصفري، 396 هرتز حيض.",
        "tip": "يوجا يين بتردد 528 هرتز تخلق إعادة توازن هرمونية قوية.",
        "science": "قمع الكورتيزول عن طريق PNS ينشط إنتاج الدماغ.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: الإصلاح الإنجابي",
            "effect": "إصلاح الخلايا الإنجابية",
            "duration": 15
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "المرحلة 2: توازن الغدة الكظرية",
            "effect": "يوازن العلاقة بين هرمون الاستروجين والكورتيزول",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Womb",
            "label": "المرحلة 3: اتصال الرحم",
            "effect": "القلب والرحم - الشفاء الأنثوي المقدس",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Master",
            "label": "المرحلة 4: التبديل الصنوبري",
            "effect": "الصنوبرية / الغدة النخامية - الغدة الهرمونية الرئيسية",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "ホルモンバランスの乱れ",
        "sub": "卵巣 · 副腎 · 視床下部",
        "instruments": "クリスタルボウル · ハープ · 神聖な聖歌",
        "protocol": "周期を意識: 卵胞期 528 Hz、排卵期 639 Hz、黄体期 432 Hz、月経期 396 Hz。",
        "tip": "528 Hz の陰ヨガは、強力なホルモンのバランスを整えます。",
        "science": "PNS によるコルチゾール抑制は脳の出力を活性化します。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: 生殖修復",
            "effect": "生殖細胞の修復",
            "duration": 15
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "フェーズ 2: 副腎のバランス",
            "effect": "エストロゲンとコルチゾールの関係のバランス",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Womb",
            "label": "フェーズ 3: 子宮のつながり",
            "effect": "心臓と子宮 — 神聖な女性の癒し",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Master",
            "label": "フェーズ 4: 松果体スイッチ",
            "effect": "松果体/下垂体 — マスター ホルモン腺",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "grief",
    "cat": "Emotional",
    "emoji": "💙",
    "free": true,
    "title": "Grief & Loss",
    "sub": "Heart · Limbic system",
    "duration": 30,
    "color": "#3b82f6",
    "freqs": [
      {
        "hz": 639,
        "role": "Primary",
        "label": "Phase 1: Heart Processing",
        "effect": "Heart chakra — processes grief safely",
        "duration": 10
      },
      {
        "hz": 528,
        "role": "Rebuild",
        "label": "Phase 2: Coherence Rebuilding",
        "effect": "Rebuilds inner coherence after loss",
        "duration": 10
      },
      {
        "hz": 396,
        "role": "Release",
        "label": "Phase 3: Guilt Liberation",
        "effect": "Liberation from guilt and grief",
        "duration": 5
      },
      {
        "hz": 432,
        "role": "Ground",
        "label": "Phase 4: Grounding Connection",
        "effect": "Grounding and stabilizing presence",
        "duration": 5
      }
    ],
    "binaural": 7,
    "instruments": "Cello · Gentle piano · Choral voices",
    "protocol": "Allow emotional expression during listening. Let tears flow. 30 min as needed.",
    "tip": "Music in 432 Hz during crying is one of the most efficient emotional processing tools.",
    "science": "639 Hz entrainment activates oxytocin release — counteracts isolation of grief.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/grief.mp3",
    "translations": {
      "hi": {
        "title": "दुःख और हानि",
        "sub": "हृदय · लिम्बिक प्रणाली",
        "instruments": "सेलो · कोमल पियानो · कोरल आवाजें",
        "protocol": "सुनने के दौरान भावनात्मक अभिव्यक्ति की अनुमति दें। आंसुओं को बहने दो. आवश्यकतानुसार 30 मिनट।",
        "tip": "रोने के दौरान 432 हर्ट्ज़ में संगीत सबसे कुशल भावनात्मक प्रसंस्करण उपकरणों में से एक है।",
        "science": "639 हर्ट्ज एंट्रेनमेंट ऑक्सीटोसिन रिलीज को सक्रिय करता है - दुःख के अलगाव का प्रतिकार करता है।",
        "freqs": [
          {
            "hz": 639,
            "role": "Primary",
            "label": "चरण 1: हृदय प्रसंस्करण",
            "effect": "हृदय चक्र - दुःख को सुरक्षित रूप से संसाधित करता है",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Rebuild",
            "label": "चरण 2: सुसंगतता पुनर्निर्माण",
            "effect": "हानि के बाद आंतरिक सुसंगतता का पुनर्निर्माण करता है",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "चरण 3: अपराध मुक्ति",
            "effect": "अपराध और दुःख से मुक्ति",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Ground",
            "label": "चरण 4: ग्राउंडिंग कनेक्शन",
            "effect": "ग्राउंडिंग और स्थिर उपस्थिति",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Duelo y pérdida",
        "sub": "Corazón · Sistema límbico",
        "instruments": "Violonchelo · Piano suave · Voces corales",
        "protocol": "Permitir la expresión emocional durante la escucha. Deja que las lágrimas fluyan. 30 min según sea necesario.",
        "tip": "La música en 432 Hz durante el llanto es una de las herramientas de procesamiento emocional más eficientes.",
        "science": "El arrastre de 639 Hz activa la liberación de oxitocina y contrarresta el aislamiento del duelo.",
        "freqs": [
          {
            "hz": 639,
            "role": "Primary",
            "label": "Fase 1: Procesamiento del corazón",
            "effect": "Chakra del corazón: procesa el dolor de manera segura",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Rebuild",
            "label": "Fase 2: Reconstrucción de la coherencia",
            "effect": "Reconstruye la coherencia interna después de una pérdida",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "Fase 3: Liberación de la culpa",
            "effect": "Liberación de la culpa y el dolor",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Ground",
            "label": "Fase 4: Conexión a tierra",
            "effect": "Presencia arraigada y estabilizadora",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Deuil et perte",
        "sub": "Cœur · Système limbique",
        "instruments": "Violoncelle · Piano doux · Voix chorales",
        "protocol": "Permettez l’expression émotionnelle pendant l’écoute. Laisse couler les larmes. 30 minutes selon les besoins.",
        "tip": "La musique à 432 Hz pendant les pleurs est l'un des outils de traitement émotionnel les plus efficaces.",
        "science": "L'entraînement à 639 Hz active la libération d'ocytocine et contrecarre l'isolement du chagrin.",
        "freqs": [
          {
            "hz": 639,
            "role": "Primary",
            "label": "Phase 1 : traitement cardiaque",
            "effect": "Chakra du cœur – traite le deuil en toute sécurité",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Rebuild",
            "label": "Phase 2 : Reconstruction de la cohérence",
            "effect": "Reconstruit la cohérence intérieure après une perte",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "Phase 3 : Libération de la culpabilité",
            "effect": "Libération de la culpabilité et du chagrin",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Ground",
            "label": "Phase 4 : connexion à la terre",
            "effect": "Présence ancrée et stabilisatrice",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "الحزن والفقد",
        "sub": "القلب · الجهاز الحوفي",
        "instruments": "التشيلو · البيانو اللطيف · الأصوات الكورالية",
        "protocol": "تسمح بالتعبير العاطفي أثناء الاستماع. دع الدموع تتدفق. 30 دقيقة حسب الحاجة.",
        "tip": "تعتبر الموسيقى بتردد 432 هرتز أثناء البكاء من أكثر أدوات المعالجة العاطفية كفاءة.",
        "science": "639 هرتز ينشط إطلاق الأوكسيتوسين - يقاوم عزلة الحزن.",
        "freqs": [
          {
            "hz": 639,
            "role": "Primary",
            "label": "المرحلة 1: معالجة القلب",
            "effect": "شاكرا القلب - تعالج الحزن بأمان",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Rebuild",
            "label": "المرحلة 2: إعادة بناء التماسك",
            "effect": "إعادة بناء التماسك الداخلي بعد الخسارة",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "المرحلة 3: تحرير الذنب",
            "effect": "التحرر من الشعور بالذنب والحزن",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Ground",
            "label": "المرحلة 4: اتصال التأريض",
            "effect": "ترسيخ الحضور وتثبيته",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "悲しみと喪失",
        "sub": "心臓 · 大脳辺縁系",
        "instruments": "チェロ · 優しいピアノ · 合唱の声",
        "protocol": "リスニング中に感情表現を可能にします。涙を流しましょう。必要に応じて 30 分。",
        "tip": "泣いているときの 432 Hz の音楽は、最も効率的な感情処理ツールの 1 つです。",
        "science": "639 Hz の同調はオキシトシンの放出を活性化します — 悲しみの孤立を打ち消します。",
        "freqs": [
          {
            "hz": 639,
            "role": "Primary",
            "label": "フェーズ 1: 心臓の処理",
            "effect": "ハート チャクラ — 悲しみを安全に処理する",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Rebuild",
            "label": "フェーズ 2: 一貫性の再構築",
            "effect": "喪失後の内なる一貫性を再構築する",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "フェーズ 3: 罪悪感の解放",
            "effect": "罪悪感と悲しみからの解放",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "Ground",
            "label": "フェーズ 4: グラウンディング接続",
            "effect": "グラウンディングして存在を安定させる",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "digestive",
    "cat": "Physical",
    "emoji": "🌀",
    "free": false,
    "title": "Digestive Disorders",
    "sub": "Enteric nervous system · Gut-brain",
    "duration": 25,
    "color": "#f97316",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Lining Soothing",
        "effect": "Soothes intestinal lining, reduces flares",
        "duration": 10
      },
      {
        "hz": 432,
        "role": "PNS",
        "label": "Phase 2: Rest & Digest",
        "effect": "Activates 'rest and digest' mode",
        "duration": 10
      },
      {
        "hz": 174,
        "role": "Pain",
        "label": "Phase 3: Cramp Relief",
        "effect": "Relieves GI cramping and spasm",
        "duration": 2.5
      },
      {
        "hz": 639,
        "role": "Gut-Brain",
        "label": "Phase 4: Vagal Tone",
        "effect": "Harmonizes gut-brain via vagal tone",
        "duration": 2.5
      }
    ],
    "binaural": 7,
    "instruments": "Slow drumming · Deep bass tones",
    "protocol": "Listen during meals and 20 min post-meal lying down.",
    "tip": "The gut has 500M neurons — it literally absorbs sound through the enteric nervous system.",
    "science": "IBS cortisol-gut loop disrupted by PNS 432 Hz activation.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/digestive.mp3",
    "translations": {
      "hi": {
        "title": "पाचन संबंधी विकार",
        "sub": "आंत्र तंत्रिका तंत्र · आंत-मस्तिष्क",
        "instruments": "धीमी गति से ढोल बजाना · गहरे बास स्वर",
        "protocol": "भोजन के दौरान और भोजन के बाद 20 मिनट तक लेटकर सुनें।",
        "tip": "आंत में 500M न्यूरॉन्स होते हैं - यह वस्तुतः आंत्र तंत्रिका तंत्र के माध्यम से ध्वनि को अवशोषित करता है।",
        "science": "पीएनएस 432 हर्ट्ज सक्रियण द्वारा आईबीएस कोर्टिसोल-गट लूप बाधित।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: अस्तर सुखदायक",
            "effect": "आंतों की परत को शांत करता है, भड़कना कम करता है",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "PNS",
            "label": "चरण 2: आराम और पाचन",
            "effect": "'आराम और पाचन' मोड को सक्रिय करता है",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Pain",
            "label": "चरण 3: ऐंठन से राहत",
            "effect": "जीआई ऐंठन और ऐंठन से राहत देता है",
            "duration": 2.5
          },
          {
            "hz": 639,
            "role": "Gut-Brain",
            "label": "चरण 4: योनि टोन",
            "effect": "योनि टोन के माध्यम से आंत-मस्तिष्क को सुसंगत बनाता है",
            "duration": 2.5
          }
        ]
      },
      "es": {
        "title": "Trastornos digestivos",
        "sub": "Sistema nervioso entérico · Intestino-cerebro",
        "instruments": "Percusión lenta · Tonos graves profundos",
        "protocol": "Escuche durante las comidas y 20 min después de comer acostado.",
        "tip": "El intestino tiene 500 millones de neuronas; literalmente absorbe el sonido a través del sistema nervioso entérico.",
        "science": "Bucle cortisol-intestino del SII interrumpido por la activación del PNS 432 Hz.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Calmante del revestimiento",
            "effect": "Alivia el revestimiento intestinal, reduce los brotes",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "PNS",
            "label": "Fase 2: Descanso y digestión",
            "effect": "Activa el modo 'descanso y digestión'",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Pain",
            "label": "Fase 3: Alivio de calambres",
            "effect": "Alivia los calambres y espasmos gastrointestinales",
            "duration": 2.5
          },
          {
            "hz": 639,
            "role": "Gut-Brain",
            "label": "Fase 4: Tono vagal",
            "effect": "Armoniza intestino-cerebro a través del tono vagal",
            "duration": 2.5
          }
        ]
      },
      "fr": {
        "title": "Troubles digestifs",
        "sub": "Système nerveux entérique · Intestin-cerveau",
        "instruments": "Batterie lente · Des basses profondes",
        "protocol": "Écoutez pendant les repas et 20 minutes après le repas en position couchée.",
        "tip": "L’intestin possède 500 millions de neurones – ils absorbent littéralement les sons via le système nerveux entérique.",
        "science": "Boucle cortisol-intestin du SCI perturbée par l'activation du PNS 432 Hz.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : doublure apaisante",
            "effect": "Apaise la muqueuse intestinale, réduit les poussées",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "PNS",
            "label": "Phase 2 : Repos et digestion",
            "effect": "Active le mode « repos et digestion »",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Pain",
            "label": "Phase 3 : Soulagement des crampes",
            "effect": "Soulage les crampes et les spasmes gastro-intestinaux",
            "duration": 2.5
          },
          {
            "hz": 639,
            "role": "Gut-Brain",
            "label": "Phase 4 : tonus vagal",
            "effect": "Harmonise l'intestin et le cerveau via le tonus vagal",
            "duration": 2.5
          }
        ]
      },
      "ar": {
        "title": "اضطرابات الجهاز الهضمي",
        "sub": "الجهاز العصبي المعوي · الأمعاء والدماغ",
        "instruments": "الطبول البطيء · نغمات الجهير العميقة",
        "protocol": "استمع أثناء الوجبات و20 دقيقة بعد الوجبة أثناء الاستلقاء.",
        "tip": "تحتوي القناة الهضمية على 500 مليون خلية عصبية، وهي تمتص الصوت حرفيًا من خلال الجهاز العصبي المعوي.",
        "science": "تعطلت حلقة القناة الهضمية الكورتيزول IBS عن طريق تنشيط PNS 432 هرتز.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: تهدئة البطانة",
            "effect": "تهدئة بطانة الأمعاء، وتقليل التوهجات",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "PNS",
            "label": "المرحلة 2: الراحة والهضم",
            "effect": "تنشيط وضع \"الراحة والهضم\"",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Pain",
            "label": "المرحلة 3: تخفيف التشنج",
            "effect": "تخفيف تشنج وتشنج الجهاز الهضمي",
            "duration": 2.5
          },
          {
            "hz": 639,
            "role": "Gut-Brain",
            "label": "المرحلة 4: نغمة المبهم",
            "effect": "ينسق الأمعاء والدماغ عبر نغمة مبهمة",
            "duration": 2.5
          }
        ]
      },
      "ja": {
        "title": "消化器疾患",
        "sub": "腸神経系 · 腸脳",
        "instruments": "ゆっくりとしたドラム演奏 · 重低音",
        "protocol": "食事中と食後 20 分間横になって聞いてください。",
        "tip": "腸には 5 億個のニューロンがあり、文字通り腸神経系を通じて音を吸収します。",
        "science": "IBS コルチゾール - 腸ループは PNS 432 Hz の活性化によって破壊されました。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: 粘膜の鎮静",
            "effect": "腸内壁を落ち着かせ、フレアを軽減",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "PNS",
            "label": "フェーズ 2: 休息と消化",
            "effect": "「休息と消化」モードを有効にする",
            "duration": 10
          },
          {
            "hz": 174,
            "role": "Pain",
            "label": "フェーズ 3: けいれんの緩和",
            "effect": "胃腸のけいれんとけいれんを和らげる",
            "duration": 2.5
          },
          {
            "hz": 639,
            "role": "Gut-Brain",
            "label": "フェーズ 4: 迷走神経の緊張",
            "effect": "迷走神経の緊張によって腸と脳を調和させる",
            "duration": 2.5
          }
        ]
      }
    }
  },
  {
    "id": "ptsd",
    "cat": "Mental",
    "emoji": "🕊️",
    "free": false,
    "title": "PTSD & Trauma",
    "sub": "Hippocampus · Vagus nerve",
    "duration": 30,
    "color": "#8b5cf6",
    "freqs": [
      {
        "hz": 432,
        "role": "Primary",
        "label": "Phase 1: Safety",
        "effect": "Brings body out of survival mode",
        "duration": 10
      },
      {
        "hz": 396,
        "role": "Release",
        "label": "Phase 2: Root Liberation",
        "effect": "Releases deeply held fear — root liberation",
        "duration": 10
      },
      {
        "hz": 639,
        "role": "Safety",
        "label": "Phase 3: Harmony",
        "effect": "Heals relationship to safety and others",
        "duration": 5
      },
      {
        "hz": 528,
        "role": "Repair",
        "label": "Phase 4: Repair",
        "effect": "Rebuilds neural pathways post-trauma",
        "duration": 5
      }
    ],
    "binaural": 6,
    "instruments": "Crystal bowls · Cello · Nature",
    "protocol": "Start with 10 min at 432 Hz. Build slowly over weeks. Always pair with grounding.",
    "tip": "Combine with somatic movement — frequency + body awareness accelerates release.",
    "science": "432 Hz activates PNS via vagal afferents. 396 Hz modulates amygdala threat response.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/ptsd.mp3",
    "translations": {
      "ar": {
        "sub": "الحصين · العصب المبهم",
        "tip": "ادمجها مع الحركة الجسدية - التردد + الوعي بالجسم يسرع عملية التحرر.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "المرحلة الأولى: السلامة",
            "effect": "يخرج الجسم من وضع البقاء على قيد الحياة",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "المرحلة الثانية: تحرير الجذر",
            "effect": "يطلق الخوف العميق - تحرير الجذور",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Safety",
            "label": "المرحلة 3: الانسجام",
            "effect": "يشفي العلاقة بالسلامة والآخرين",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "المرحلة الرابعة: الإصلاح",
            "effect": "يعيد بناء المسارات العصبية بعد الصدمة",
            "duration": 5
          }
        ],
        "title": "اضطراب ما بعد الصدمة والصدمات",
        "science": "432 هرتز ينشط PNS عبر المؤثرات المبهمة. 396 هرتز ينظم الاستجابة لتهديد اللوزة.",
        "protocol": "ابدأ بـ 10 دقائق عند 432 هرتز. قم بالبناء ببطء على مدى أسابيع. قم دائمًا بالاقتران مع التأريض."
      },
      "es": {
        "sub": "Hipocampo · nervio vago",
        "tip": "Combínelo con movimiento somático: la frecuencia + la conciencia corporal aceleran la liberación.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Fase 1: Seguridad",
            "effect": "Saca al cuerpo del modo de supervivencia",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "Fase 2: Liberación de Raíces",
            "effect": "Libera el miedo profundamente arraigado: liberación de raíz",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Safety",
            "label": "Fase 3: Armonía",
            "effect": "Cura la relación con la seguridad y los demás.",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "Fase 4: Reparación",
            "effect": "Reconstruye las vías neuronales post-trauma",
            "duration": 5
          }
        ],
        "title": "TEPT y trauma",
        "science": "432 Hz activa el SNP a través de aferentes vagales. 396 Hz modula la respuesta a la amenaza de la amígdala.",
        "protocol": "Comience con 10 min a 432 Hz. Construya lentamente durante semanas. Emparéjelo siempre con conexión a tierra."
      },
      "fr": {
        "sub": "Hippocampe · Nerf vague",
        "tip": "Combinez avec le mouvement somatique – la fréquence + la conscience du corps accélèrent la libération.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Phase 1 : Sécurité",
            "effect": "Fait sortir le corps du mode survie",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "Phase 2 : Libération des racines",
            "effect": "Libère une peur profondément ancrée – libération des racines",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Safety",
            "label": "Phase 3 : Harmonie",
            "effect": "Guérit la relation à la sécurité et aux autres",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "Phase 4 : Réparation",
            "effect": "Reconstruit les voies neuronales après un traumatisme",
            "duration": 5
          }
        ],
        "title": "SSPT et traumatismes",
        "science": "432 Hz active le PNS via les afférences vagales. 396 Hz module la réponse à la menace de l'amygdale.",
        "protocol": "Commencez par 10 min à 432 Hz. Construisez lentement au fil des semaines. Associez toujours avec une mise à la terre."
      },
      "hi": {
        "title": "पीटीएसडी और आघात",
        "sub": "हिप्पोकैम्पस · वेगस तंत्रिका",
        "instruments": "क्रिस्टल कटोरे · सेलो · प्रकृति",
        "protocol": "432 हर्ट्ज पर 10 मिनट से शुरू करें। कुछ हफ़्तों में धीरे-धीरे निर्माण करें। हमेशा ग्राउंडिंग के साथ युग्मित करें.",
        "tip": "दैहिक गति के साथ संयोजन करें - आवृत्ति + शारीरिक जागरूकता मुक्ति को तेज करती है।",
        "science": "432 हर्ट्ज योनि अभिवाही के माध्यम से पीएनएस को सक्रिय करता है। 396 हर्ट्ज अमिगडाला खतरे की प्रतिक्रिया को नियंत्रित करता है।",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "चरण 1: सुरक्षा",
            "effect": "शरीर को जीवित अवस्था से बाहर लाता है",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "चरण 2: मूल मुक्ति",
            "effect": "गहराई से व्याप्त भय को दूर करता है - जड़ मुक्ति",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Safety",
            "label": "चरण 3: सद्भाव",
            "effect": "सुरक्षा और अन्य के साथ संबंधों को ठीक करता है",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "चरण 4: मरम्मत",
            "effect": "आघात के बाद तंत्रिका मार्गों का पुनर्निर्माण करता है",
            "duration": 5
          }
        ]
      },
      "ja": {
        "sub": "海馬 · 迷走神経",
        "tip": "体性の動きと組み合わせると、周波数と身体の意識が解放を加速します。",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "フェーズ 1: 安全性",
            "effect": "身体をサバイバルモードから抜け出す",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "フェーズ 2: ルートの解放",
            "effect": "根深い恐怖を解放します — 根の解放",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Safety",
            "label": "フェーズ 3: 調和",
            "effect": "安全や他人との関係を癒します",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "フェーズ 4: 修復",
            "effect": "外傷後の神経経路を再構築する",
            "duration": 5
          }
        ],
        "title": "PTSDとトラウマ",
        "science": "432 Hz は迷走神経求心性神経を介して PNS を活性化します。 396 Hz は扁桃体の脅威への反応を調節します。",
        "protocol": "432 Hz で 10 分間から始めます。数週間かけてゆっくりと構築します。常にアースとペアリングしてください。"
      }
    }
  },
  {
    "id": "migraine",
    "cat": "Physical",
    "emoji": "💫",
    "free": false,
    "title": "Migraines & Headaches",
    "sub": "Trigeminovascular system · Brain",
    "duration": 35,
    "color": "#a855f7",
    "freqs": [
      {
        "hz": 432,
        "role": "Primary",
        "label": "Phase 1: Vasodilation",
        "effect": "Vasodilation and skeletal muscle relaxation",
        "duration": 15
      },
      {
        "hz": 174,
        "role": "Analgesic",
        "label": "Phase 2: Headache Relief",
        "effect": "Most direct frequency for headache relief",
        "duration": 10
      },
      {
        "hz": 528,
        "role": "Neuro",
        "label": "Phase 3: Inflammation Relief",
        "effect": "Reduces neuroinflammation",
        "duration": 5
      },
      {
        "hz": 3,
        "role": "Rest",
        "label": "Phase 4: Deep Stillness",
        "effect": "Deep rest — migraine most responsive to stillness",
        "duration": 5
      }
    ],
    "binaural": 3,
    "instruments": "Very soft singing bowls · Low ambient drone",
    "protocol": "Dark room, 174 Hz at barely-audible volume. Cold pack on neck.",
    "tip": "During acute migraine: barely-audible is more effective than loud — nervous system is hypersensitized.",
    "science": "Trigeminovascular sensitization responds to 174 Hz dampening. 432 Hz vasodilates cranial vasculature.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/migraine.mp3",
    "translations": {
      "hi": {
        "title": "माइग्रेन और सिरदर्द",
        "sub": "ट्राइजेमिनोवास्कुलर सिस्टम · मस्तिष्क",
        "instruments": "बहुत नरम गायन कटोरे · कम परिवेश वाला ड्रोन",
        "protocol": "अंधेरा कमरा, बमुश्किल-श्रव्य मात्रा में 174 हर्ट्ज। गर्दन पर कोल्ड पैक.",
        "tip": "तीव्र माइग्रेन के दौरान: तेज़ आवाज़ की तुलना में मुश्किल से सुनाई देना अधिक प्रभावी होता है - तंत्रिका तंत्र अतिसंवेदनशील होता है।",
        "science": "ट्राइजेमिनोवास्कुलर संवेदीकरण 174 हर्ट्ज़ नमी पर प्रतिक्रिया करता है। 432 हर्ट्ज वैसोडिलेट कपाल वाहिका।",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "चरण 1: वासोडिलेशन",
            "effect": "वासोडिलेशन और कंकाल की मांसपेशियों को आराम",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "चरण 2: सिरदर्द से राहत",
            "effect": "सिरदर्द से राहत के लिए सबसे प्रत्यक्ष आवृत्ति",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neuro",
            "label": "चरण 3: सूजन से राहत",
            "effect": "न्यूरोइन्फ्लेमेशन को कम करता है",
            "duration": 5
          },
          {
            "hz": 3,
            "role": "Rest",
            "label": "चरण 4: गहरी शांति",
            "effect": "गहरी शांति - माइग्रेन शांति के प्रति सबसे अधिक प्रतिक्रियाशील है",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Migrañas y dolores de cabeza",
        "sub": "Sistema trigéminovascular · Cerebro",
        "instruments": "Cuencos tibetanos muy suaves · Drone ambiental bajo",
        "protocol": "Cuarto oscuro, 174 Hz a un volumen apenas audible. Compresa fría en el cuello.",
        "tip": "Durante la migraña aguda: lo apenas audible es más eficaz que lo alto: el sistema nervioso está hipersensibilizado.",
        "science": "La sensibilización trigéminovascular responde a una amortiguación de 174 Hz. 432 Hz vasodilata la vasculatura craneal.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Fase 1: Vasodilatación",
            "effect": "Vasodilatación y relajación del músculo esquelético",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "Fase 2: Alivio del dolor de cabeza",
            "effect": "Frecuencia más directa para el alivio del dolor de cabeza",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neuro",
            "label": "Fase 3: Alivio de la inflamación",
            "effect": "Reduce la neuroinflamación",
            "duration": 5
          },
          {
            "hz": 3,
            "role": "Rest",
            "label": "Fase 4: Quietud profunda",
            "effect": "Descanso profundo: la migraña responde mejor a la quietud",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Migraines et maux de tête",
        "sub": "Système trigéminovasculaire · Cerveau",
        "instruments": "Bols chantants très doux · Drone ambiant faible",
        "protocol": "Pièce sombre, 174 Hz à un volume à peine audible. Poche froide sur le cou.",
        "tip": "Lors d'une migraine aiguë : un traitement à peine audible est plus efficace qu'un traitement fort : le système nerveux est hypersensibilisé.",
        "science": "La sensibilisation trigéminovasculaire répond à un amortissement de 174 Hz. 432 Hz vasodilate le système vasculaire crânien.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Phase 1 : Vasodilatation",
            "effect": "Vasodilatation et relaxation des muscles squelettiques",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "Phase 2 : Soulagement des maux de tête",
            "effect": "Fréquence la plus directe pour soulager les maux de tête",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neuro",
            "label": "Phase 3 : Soulagement de l'inflammation",
            "effect": "Réduit la neuroinflammation",
            "duration": 5
          },
          {
            "hz": 3,
            "role": "Rest",
            "label": "Phase 4 : Silence profonde",
            "effect": "Repos profond : la migraine répond le mieux à l'immobilité",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "الصداع النصفي والصداع",
        "sub": "نظام الأوعية الدموية الثلاثية التوائم · الدماغ",
        "instruments": "أوعية غناء ناعمة جدًا · طائرة بدون طيار محيطة منخفضة",
        "protocol": "غرفة مظلمة، 174 هرتز بمستوى صوت بالكاد مسموع. كمادة باردة على الرقبة.",
        "tip": "أثناء الصداع النصفي الحاد: الصوت بالكاد مسموع أكثر فعالية من الصوت العالي - يكون الجهاز العصبي شديد الحساسية.",
        "science": "يستجيب التحسس الوعائي الثلاثي التوائم لترطيب 174 هرتز. 432 هرتز يوسع الأوعية الدموية في الجمجمة.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "المرحلة 1: توسع الأوعية",
            "effect": "توسع الأوعية الدموية واسترخاء العضلات الهيكلية",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "المرحلة 2: تخفيف الصداع",
            "effect": "التردد الأكثر مباشرة لتخفيف الصداع",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neuro",
            "label": "المرحلة 3: تخفيف الالتهاب",
            "effect": "تقليل الالتهاب العصبي",
            "duration": 5
          },
          {
            "hz": 3,
            "role": "Rest",
            "label": "المرحلة 4: السكون العميق",
            "effect": "الراحة العميقة - الصداع النصفي الأكثر استجابة للسكون",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "片頭痛と頭痛",
        "sub": "三叉神経血管系 · 脳",
        "instruments": "非常に柔らかいシンギングボウル · 周囲の低いドローン",
        "protocol": "暗い部屋、かろうじて聞こえる音量で 174 Hz。首に冷湿布。",
        "tip": "急性片頭痛中: 大音量よりも、かろうじて聞こえる程度の方が効果的です。神経系が過敏になっています。",
        "science": "三叉神経血管感作は 174 Hz の減衰に反応します。 432 Hz の血管は頭蓋血管を拡張します。",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "フェーズ 1: 血管拡張",
            "effect": "血管拡張と骨格筋弛緩",
            "duration": 15
          },
          {
            "hz": 174,
            "role": "Analgesic",
            "label": "フェーズ 2: 頭痛の緩和",
            "effect": "頭痛緩和に最も直接的な頻度",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neuro",
            "label": "フェーズ 3: 炎症の緩和",
            "effect": "神経炎症を軽減",
            "duration": 5
          },
          {
            "hz": 3,
            "role": "Rest",
            "label": "フェーズ 4: 深い静寂",
            "effect": "深い休息 — 片頭痛は静寂に最も反応します",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "thyroid",
    "cat": "Endocrine",
    "emoji": "🦋",
    "free": false,
    "title": "Thyroid Disorders",
    "sub": "Thyroid gland · Throat chakra",
    "duration": 20,
    "color": "#06b6d4",
    "freqs": [
      {
        "hz": 741,
        "role": "Primary",
        "label": "Phase 1: Throat Chakra",
        "effect": "Throat chakra — stimulates thyroid field",
        "duration": 10
      },
      {
        "hz": 528,
        "role": "Repair",
        "label": "Phase 2: Cellular Repair",
        "effect": "Cellular repair — oxidative damage reversal",
        "duration": 5
      },
      {
        "hz": 432,
        "role": "HPA",
        "label": "Phase 3: HPA Balance",
        "effect": "Normalizes hormonal cascade",
        "duration": 2.5
      },
      {
        "hz": 396,
        "role": "Expression",
        "label": "Phase 4: Suppressed Release",
        "effect": "Releases suppressed expression — key thyroid pattern",
        "duration": 2.5
      }
    ],
    "binaural": 10,
    "instruments": "Throat singing · B-note sound bowls",
    "protocol": "741 Hz listening 2× daily. Add humming 10 min/day with hand on throat.",
    "tip": "Humming 'mmmm' at 741 Hz creates direct local vibration at thyroid.",
    "science": "Thyroid responds to local mechanical vibration. TSH normalization observed in studies.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/thyroid.mp3",
    "translations": {
      "hi": {
        "title": "थायराइड विकार",
        "sub": "थायरॉयड ग्रंथि · गला चक्र",
        "instruments": "गला गाना · बी-नोट ध्वनि कटोरे",
        "protocol": "741 हर्ट्ज प्रतिदिन 2× सुनना। प्रतिदिन 10 मिनट तक गले पर हाथ रखकर गुनगुना करें।",
        "tip": "741 हर्ट्ज़ पर 'एमएमएमएम' गुंजन करने से थायरॉइड पर सीधा स्थानीय कंपन पैदा होता है।",
        "science": "थायरॉइड स्थानीय यांत्रिक कंपन पर प्रतिक्रिया करता है। अध्ययनों में टीएसएच सामान्यीकरण देखा गया।",
        "freqs": [
          {
            "hz": 741,
            "role": "Primary",
            "label": "चरण 1: गला चक्र",
            "effect": "गला चक्र - थायरॉयड क्षेत्र को उत्तेजित करता है",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "चरण 2: सेलुलर मरम्मत",
            "effect": "सेलुलर मरम्मत - ऑक्सीडेटिव क्षति रिवर्सल",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "चरण 3: एचपीए संतुलन",
            "effect": "हार्मोनल कैस्केड को सामान्य करता है",
            "duration": 2.5
          },
          {
            "hz": 396,
            "role": "Expression",
            "label": "चरण 4: दबा हुआ रिलीज",
            "effect": "दबा हुआ अभिव्यक्ति जारी करता है - प्रमुख थायरॉयड पैटर्न",
            "duration": 2.5
          }
        ]
      },
      "es": {
        "title": "Trastornos de la tiroides",
        "sub": "Glándula tiroides · Chakra de la garganta",
        "instruments": "Canto de garganta · Cuencos de sonido de nota B",
        "protocol": "741 Hz escuchando 2 veces al día. Añadir tarareando 10 min/día con la mano en la garganta.",
        "tip": "El zumbido 'mmmm' a 741 Hz crea una vibración local directa en la tiroides.",
        "science": "La tiroides responde a la vibración mecánica local. Normalización de TSH observada en los estudios.",
        "freqs": [
          {
            "hz": 741,
            "role": "Primary",
            "label": "Fase 1: Chakra de la garganta",
            "effect": "Chakra de la garganta: estimula el campo tiroideo",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "Fase 2: Reparación celular",
            "effect": "Reparación celular: reversión del daño oxidativo",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "Fase 3: Equilibrio HPA",
            "effect": "Normaliza la cascada hormonal",
            "duration": 2.5
          },
          {
            "hz": 396,
            "role": "Expression",
            "label": "Fase 4: Liberación suprimida",
            "effect": "Libera la expresión suprimida: patrón tiroideo clave",
            "duration": 2.5
          }
        ]
      },
      "fr": {
        "title": "Troubles thyroïdiens",
        "sub": "Glande thyroïde · Chakra de la gorge",
        "instruments": "Chant de gorge · Bols sonores B-note",
        "protocol": "741 Hz en écoute 2 fois par jour. Ajoutez le bourdonnement 10 min/jour avec la main sur la gorge.",
        "tip": "Le bourdonnement « mmmm » à 741 Hz crée une vibration locale directe au niveau de la thyroïde.",
        "science": "La thyroïde répond aux vibrations mécaniques locales. Normalisation de la TSH observée dans les études.",
        "freqs": [
          {
            "hz": 741,
            "role": "Primary",
            "label": "Phase 1 : Chakra de la gorge",
            "effect": "Chakra de la gorge – stimule le champ thyroïdien",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "Phase 2 : Réparation cellulaire",
            "effect": "Réparation cellulaire – inversion des dommages oxydatifs",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "Phase 3 : Équilibre HPA",
            "effect": "Normalise la cascade hormonale",
            "duration": 2.5
          },
          {
            "hz": 396,
            "role": "Expression",
            "label": "Phase 4 : libération supprimée",
            "effect": "Libère l’expression supprimée – schéma thyroïdien clé",
            "duration": 2.5
          }
        ]
      },
      "ar": {
        "title": "اضطرابات الغدة الدرقية",
        "sub": "الغدة الدرقية · شاكرا الحلق",
        "instruments": "غناء الحلق · أوعية صوت B-note",
        "protocol": "استماع 741 هرتز 2 × يوميًا. أضف الطنين لمدة 10 دقائق في اليوم مع وضع اليد على الحلق.",
        "tip": "طنين \"mmmm\" عند 741 هرتز يخلق اهتزازًا محليًا مباشرًا في الغدة الدرقية.",
        "science": "تستجيب الغدة الدرقية للاهتزازات الميكانيكية المحلية. لوحظ تطبيع TSH في الدراسات.",
        "freqs": [
          {
            "hz": 741,
            "role": "Primary",
            "label": "المرحلة 1: شاكرا الحلق",
            "effect": "شاكرا الحلق - تحفز مجال الغدة الدرقية",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "المرحلة 2: إصلاح الخلايا",
            "effect": "إصلاح الخلايا - عكس الضرر التأكسدي",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "المرحلة 3: توازن HPA",
            "effect": "إعادة التتالي الهرموني",
            "duration": 2.5
          },
          {
            "hz": 396,
            "role": "Expression",
            "label": "المرحلة 4: الإطلاق المكبوت",
            "effect": "إطلاق التعبير المكبوت - نمط الغدة الدرقية الرئيسي",
            "duration": 2.5
          }
        ]
      },
      "ja": {
        "title": "甲状腺疾患",
        "sub": "甲状腺 · 喉のチャクラ",
        "instruments": "喉の歌 · B 音のボウル",
        "protocol": "741 Hz を毎日 2 回聞いてください。喉に手を当ててハミングを 1 日 10 分間追加します。",
        "tip": "741 Hz で「うーん」とハミングすると、甲状腺に直接局所的な振動が生じます。",
        "science": "甲状腺は局所的な機械的振動に反応します。研究で観察されたTSHの正常化。",
        "freqs": [
          {
            "hz": 741,
            "role": "Primary",
            "label": "フェーズ 1: 喉のチャクラ",
            "effect": "喉のチャクラ — 甲状腺野を刺激",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Repair",
            "label": "フェーズ 2: 細胞の修復",
            "effect": "細胞の修復 — 酸化的損傷の回復",
            "duration": 5
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "フェーズ 3: HPA バランス",
            "effect": "ホルモンカスケードを正常化",
            "duration": 2.5
          },
          {
            "hz": 396,
            "role": "Expression",
            "label": "フェーズ 4: 抑制された放出",
            "effect": "抑制された発現を放出 — 重要な甲状腺パターン",
            "duration": 2.5
          }
        ]
      }
    }
  },
  {
    "id": "addiction",
    "cat": "Emotional",
    "emoji": "🔓",
    "free": false,
    "title": "Addiction & Recovery",
    "sub": "Reward pathways · Prefrontal cortex",
    "duration": 40,
    "color": "#8b5cf6",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Receptor Repair",
        "effect": "Repairs dopamine receptors — neural recovery",
        "duration": 15
      },
      {
        "hz": 40,
        "role": "Control",
        "label": "Phase 2: Impulse Control",
        "effect": "Strengthens impulse control pathways",
        "duration": 15
      },
      {
        "hz": 396,
        "role": "Shame",
        "label": "Phase 3: Shame Release",
        "effect": "Releases shame and guilt — core addiction drivers",
        "duration": 5
      },
      {
        "hz": 963,
        "role": "Spirit",
        "label": "Phase 4: Higher Alignment",
        "effect": "Spiritual reconnection — addresses existential void",
        "duration": 5
      }
    ],
    "binaural": 10,
    "instruments": "Drumming circles · Rhythmic music",
    "protocol": "Active music-making most powerful. Group drumming or choir. 40 Hz binaural 2× daily.",
    "tip": "Group drumming shows remarkable addiction recovery — synchronizes brainwaves AND builds community.",
    "science": "Rhythm synchronizes mesolimbic circuits. Group music releases endogenous opioids and oxytocin.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/addiction.mp3",
    "translations": {
      "hi": {
        "title": "व्यसन और पुनर्प्राप्ति",
        "sub": "पुरस्कार पथ · प्रीफ्रंटल कॉर्टेक्स",
        "instruments": "ड्रमिंग सर्कल · लयबद्ध संगीत",
        "protocol": "सक्रिय संगीत-निर्माण सबसे शक्तिशाली। समूह ढोल बजाना या गाना बजाना। 40 हर्ट्ज बाइनॉरल 2× प्रतिदिन।",
        "tip": "समूह में ढोल बजाना उल्लेखनीय लत से मुक्ति दर्शाता है - मस्तिष्क तरंगों को सिंक्रनाइज़ करता है और समुदाय का निर्माण करता है।",
        "science": "रिदम मेसोलेम्बिक सर्किट को सिंक्रोनाइज़ करता है। समूह संगीत अंतर्जात ओपिओइड और ऑक्सीटोसिन जारी करता है।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: रिसेप्टर मरम्मत",
            "effect": "डोपामाइन रिसेप्टर्स की मरम्मत - तंत्रिका पुनर्प्राप्ति",
            "duration": 15
          },
          {
            "hz": 40,
            "role": "Control",
            "label": "चरण 2: आवेग नियंत्रण",
            "effect": "आवेग नियंत्रण मार्गों को मजबूत करता है",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Shame",
            "label": "चरण 3: शर्म मुक्ति",
            "effect": "शर्म और अपराध बोध को दूर करता है - मुख्य लत चालक",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Spirit",
            "label": "चरण 4: उच्च संरेखण",
            "effect": "आध्यात्मिक पुन: संयोजन - अस्तित्वगत शून्यता को संबोधित करता है",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Adicción y recuperación",
        "sub": "Vías de recompensa · Corteza prefrontal",
        "instruments": "Círculos de tambores · Música rítmica",
        "protocol": "La creación musical activa más poderosa. Batería en grupo o coro. 40 Hz binaural 2 veces al día.",
        "tip": "Tocar la batería en grupo muestra una notable recuperación de la adicción: sincroniza las ondas cerebrales Y construye una comunidad.",
        "science": "El ritmo sincroniza los circuitos mesolímbicos. La música grupal libera opioides endógenos y oxitocina.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Reparación de receptores",
            "effect": "Repara los receptores de dopamina: recuperación neuronal",
            "duration": 15
          },
          {
            "hz": 40,
            "role": "Control",
            "label": "Fase 2: Control de impulsos",
            "effect": "Fortalece las vías de control de impulsos",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Shame",
            "label": "Fase 3: Liberación de la vergüenza",
            "effect": "Libera la vergüenza y la culpa: impulsores centrales de la adicción",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Spirit",
            "label": "Fase 4: Alineación superior",
            "effect": "Reconexión espiritual: aborda el vacío existencial",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Dépendance et rétablissement",
        "sub": "Voies de récompense · Cortex préfrontal",
        "instruments": "Cercles de tambours · Musique rythmée",
        "protocol": "La création musicale active la plus puissante. Groupe de percussions ou chorale. 40 Hz binaural 2 fois par jour.",
        "tip": "Les tambours de groupe montrent une guérison remarquable de la dépendance – synchronisent les ondes cérébrales ET construisent une communauté.",
        "science": "Le rythme synchronise les circuits mésolimbiques. La musique de groupe libère des opioïdes endogènes et de l'ocytocine.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : Réparation du récepteur",
            "effect": "Répare les récepteurs de la dopamine – récupération neuronale",
            "duration": 15
          },
          {
            "hz": 40,
            "role": "Control",
            "label": "Phase 2 : Contrôle des impulsions",
            "effect": "Renforce les voies de contrôle des impulsions",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Shame",
            "label": "Phase 3 : Libération de la honte",
            "effect": "Libère la honte et la culpabilité – les principaux moteurs de la dépendance",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Spirit",
            "label": "Phase 4 : alignement supérieur",
            "effect": "Reconnexion spirituelle – répond au vide existentiel",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "الإدمان والتعافي",
        "sub": "مسارات المكافأة · قشرة الفص الجبهي",
        "instruments": "دوائر الطبول · الموسيقى الإيقاعية",
        "protocol": "صناعة الموسيقى النشطة هي الأقوى. الطبول الجماعية أو الجوقة. 40 هرتز بكلتا الأذنين 2 × يوميا.",
        "tip": "يُظهر قرع الطبول الجماعي تعافيًا ملحوظًا من الإدمان — حيث يعمل على مزامنة الموجات الدماغية وبناء المجتمع.",
        "science": "يقوم الإيقاع بمزامنة الدوائر المتوسطة الطرفية. تطلق الموسيقى الجماعية المواد الأفيونية الذاتية والأوكسيتوسين.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: إصلاح المستقبلات",
            "effect": "إصلاح مستقبلات الدوبامين - التعافي العصبي",
            "duration": 15
          },
          {
            "hz": 40,
            "role": "Control",
            "label": "المرحلة 2: التحكم في الاندفاعات",
            "effect": "تقوية مسارات التحكم في الانفعالات",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Shame",
            "label": "المرحلة 3: إطلاق الخجل",
            "effect": "إطلاق الخجل والشعور بالذنب - محركات الإدمان الأساسية",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Spirit",
            "label": "المرحلة 4: التوافق العالي",
            "effect": "إعادة الاتصال الروحي - تعالج الفراغ الوجودي",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "依存症と回復",
        "sub": "報酬経路 · 前頭前野",
        "instruments": "ドラムサークル · リズミカルな音楽",
        "protocol": "アクティブな音楽制作が最も強力です。グループでの太鼓演奏や合唱。 40 Hz バイノーラル 毎日 2 回。",
        "tip": "グループでのドラム演奏は中毒からの顕著な回復を示し、脳波を同期させ、コミュニティを構築します。",
        "science": "リズムは中脳辺縁系回路を同期させます。グループ音楽は内因性オピオイドとオキシトシンを放出します。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: 受容体の修復",
            "effect": "ドーパミン受容体の修復 — 神経の回復",
            "duration": 15
          },
          {
            "hz": 40,
            "role": "Control",
            "label": "フェーズ 2: 衝動制御",
            "effect": "衝動制御経路の強化",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Shame",
            "label": "フェーズ 3: 恥の解放",
            "effect": "恥と罪悪感の解放 — 中核的な依存症要因の解消",
            "duration": 5
          },
          {
            "hz": 963,
            "role": "Spirit",
            "label": "フェーズ 4: 高次の調整",
            "effect": "スピリチュアルな再接続 — 実存的空白に対処",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "selfesteem",
    "cat": "Emotional",
    "emoji": "✨",
    "free": true,
    "title": "Self-Esteem & Identity",
    "sub": "Default mode network · Ego",
    "duration": 25,
    "color": "#f59e0b",
    "freqs": [
      {
        "hz": 396,
        "role": "Primary",
        "label": "Phase 1: Belief Breakthrough",
        "effect": "Breaks fear-based self-limiting beliefs",
        "duration": 10
      },
      {
        "hz": 528,
        "role": "Worth",
        "label": "Phase 2: Self Worth",
        "effect": "Self-worth resonance — heart of self-acceptance",
        "duration": 10
      },
      {
        "hz": 639,
        "role": "Harmony",
        "label": "Phase 3: Harmonizer",
        "effect": "Harmonizes relationship with self and others",
        "duration": 2.5
      },
      {
        "hz": 963,
        "role": "Higher",
        "label": "Phase 4: Connection",
        "effect": "Higher self connection — transcends limiting ego",
        "duration": 2.5
      }
    ],
    "binaural": 10,
    "instruments": "Own voice toning · Sound bowls",
    "protocol": "528 Hz listening + journaling. Then 5 min free vocal toning. Daily morning.",
    "tip": "Your own voice is the most powerful healing instrument — hum freely for 5 min daily.",
    "science": "DMN quieted by focused music. 396 Hz triggers limbic amygdala recalibration.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/selfesteem.mp3",
    "translations": {
      "hi": {
        "title": "आत्म-सम्मान और पहचान",
        "sub": "डिफ़ॉल्ट मोड नेटवर्क · अहंकार",
        "instruments": "खुद की आवाज टोनिंग · ध्वनि कटोरे",
        "protocol": "528 हर्ट्ज सुनना + जर्नलिंग। फिर 5 मिनट की निःशुल्क वोकल टोनिंग। रोजाना सुबह.",
        "tip": "आपकी अपनी आवाज उपचार का सबसे शक्तिशाली साधन है - रोजाना 5 मिनट तक खुलकर गुनगुनाएं।",
        "science": "डीएमएन केंद्रित संगीत से शांत हुआ। 396 हर्ट्ज़ लिम्बिक एमिग्डाला रिकैलिब्रेशन को ट्रिगर करता है।",
        "freqs": [
          {
            "hz": 396,
            "role": "Primary",
            "label": "चरण 1: विश्वास निर्णायक",
            "effect": "भय-आधारित आत्म-सीमित विश्वासों को तोड़ता है",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Worth",
            "label": "चरण 2: आत्म मूल्य",
            "effect": "आत्म-मूल्य प्रतिध्वनि - आत्म-स्वीकृति का दिल",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Harmony",
            "label": "चरण 3: हार्मोनाइज़र",
            "effect": "स्वयं और दूसरों के साथ संबंधों में सामंजस्य स्थापित करता है",
            "duration": 2.5
          },
          {
            "hz": 963,
            "role": "Higher",
            "label": "चरण 4: कनेक्शन",
            "effect": "उच्च आत्म संबंध - अहंकार को सीमित करने से परे",
            "duration": 2.5
          }
        ]
      },
      "es": {
        "title": "Autoestima e Identidad",
        "sub": "Red en modo predeterminado · Ego",
        "instruments": "Tono de voz propio · Cuencos de sonido",
        "protocol": "Escucha 528 Hz + registro en diario. Luego 5 min de tonificación vocal libre. Mañana diaria.",
        "tip": "Tu propia voz es el instrumento curativo más poderoso: tararea libremente durante 5 minutos al día.",
        "science": "DMN silenciado por música enfocada. 396 Hz desencadena la recalibración de la amígdala límbica.",
        "freqs": [
          {
            "hz": 396,
            "role": "Primary",
            "label": "Fase 1: Avance de creencias",
            "effect": "Rompe creencias autolimitantes basadas en el miedo",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Worth",
            "label": "Fase 2: Autovaloración",
            "effect": "Resonancia de la autoestima: corazón de la autoaceptación",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Harmony",
            "label": "Fase 3: Armonizador",
            "effect": "Armoniza la relación con uno mismo y con los demás",
            "duration": 2.5
          },
          {
            "hz": 963,
            "role": "Higher",
            "label": "Fase 4: Conexión",
            "effect": "Conexión superior con uno mismo: trasciende el ego limitante",
            "duration": 2.5
          }
        ]
      },
      "fr": {
        "title": "Estime de soi et identité",
        "sub": "Réseau en mode par défaut · Ego",
        "instruments": "Tonification de votre propre voix · Bols sonores",
        "protocol": "Écoute 528 Hz + journalisation. Puis 5 min de tonification vocale gratuite. Tous les matins.",
        "tip": "Votre propre voix est l’instrument de guérison le plus puissant : fredonnez librement pendant 5 minutes par jour.",
        "science": "DMN apaisé par une musique ciblée. 396 Hz déclenche le recalibrage de l’amygdale limbique.",
        "freqs": [
          {
            "hz": 396,
            "role": "Primary",
            "label": "Phase 1 : Percée des croyances",
            "effect": "Brise les croyances autolimitantes basées sur la peur",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Worth",
            "label": "Phase 2 : l’estime de soi",
            "effect": "Résonance d'estime de soi - cœur de l'acceptation de soi",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Harmony",
            "label": "Phase 3 : Harmoniseur",
            "effect": "Harmonise la relation à soi et aux autres",
            "duration": 2.5
          },
          {
            "hz": 963,
            "role": "Higher",
            "label": "Phase 4 : Connexion",
            "effect": "Connexion à soi supérieure - transcende l'ego limitant",
            "duration": 2.5
          }
        ]
      },
      "ar": {
        "title": "احترام الذات والهوية",
        "sub": "شبكة الوضع الافتراضي · الأنا",
        "instruments": "نغمة الصوت الخاصة · أوعية الصوت",
        "protocol": "استماع بتردد 528 هرتز + تدوين اليوميات. ثم 5 دقائق مجانية من التنغيم الصوتي. صباح يومي .",
        "tip": "صوتك هو أقوى أداة علاجية - قم بالدندنة بحرية لمدة 5 دقائق يوميًا.",
        "science": "DMN تهدأ بالموسيقى المركزة. 396 هرتز يؤدي إلى إعادة معايرة اللوزة الحوفية.",
        "freqs": [
          {
            "hz": 396,
            "role": "Primary",
            "label": "المرحلة 1: اختراق المعتقد",
            "effect": "يكسر المعتقدات المقيدة للذات القائمة على الخوف",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Worth",
            "label": "المرحلة 2: قيمة الذات",
            "effect": "صدى قيمة الذات - قلب قبول الذات",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Harmony",
            "label": "المرحلة 3: المنسق",
            "effect": "ينسق العلاقة مع الذات والآخرين",
            "duration": 2.5
          },
          {
            "hz": 963,
            "role": "Higher",
            "label": "المرحلة 4: الاتصال",
            "effect": "اتصال ذاتي أعلى - يتجاوز الأنا المقيدة",
            "duration": 2.5
          }
        ]
      },
      "ja": {
        "title": "自尊心とアイデンティティ",
        "sub": "デフォルト モード ネットワーク · エゴ",
        "instruments": "自分の声の調子を整える · サウンド ボウル",
        "protocol": "528 Hz のリスニング + ジャーナリング。その後、5分間の無料の声の調子を整えます。毎日の朝。",
        "tip": "自分の声は最も強力な癒しの道具です。毎日 5 分間、自由にハミングしましょう。",
        "science": "DMN は集中した音楽によって静まり返りました。 396 Hz は辺縁扁桃体の再調整を引き起こします。",
        "freqs": [
          {
            "hz": 396,
            "role": "Primary",
            "label": "フェーズ 1: 信念の打破",
            "effect": "恐怖に基づく自己制限的な信念を打ち破る",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Worth",
            "label": "フェーズ 2: 自尊心",
            "effect": "自尊心の共鳴 — 自己受容の中心",
            "duration": 10
          },
          {
            "hz": 639,
            "role": "Harmony",
            "label": "フェーズ 3: ハーモナイザー",
            "effect": "自己と他者との関係を調和させる",
            "duration": 2.5
          },
          {
            "hz": 963,
            "role": "Higher",
            "label": "フェーズ 4: つながり",
            "effect": "高次の自己とのつながり — 制限的な自我を超越する",
            "duration": 2.5
          }
        ]
      }
    }
  },
  {
    "id": "heart-hyper-morning",
    "cat": "Cardiovascular Disease",
    "emoji": "☀️",
    "free": false,
    "title": "Hypertension — Morning Session",
    "sub": "HYPERTENSION · Morning Session",
    "duration": 10,
    "color": "#ec4899",
    "freqs": [
      {
        "hz": 432,
        "role": "Primary",
        "label": "Phase 1: BP Reduction",
        "effect": "Slows heart rate, aids vasodilation",
        "duration": 10,
        "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/HYPERTENSION%20%E2%80%94%20MORNING%20SESSION%20432%20Hz%20%C2%B7%2055%E2%80%9360%20BPM%20%C2%B7%20BP%20reduction%20%C2%B7%2010%20min.wav"
      }
    ],
    "binaural": 10,
    "instruments": "Flute · Slow strings",
    "protocol": "Morning 10 min session. Sit upright. Focus on slow, regular exhalations.",
    "tip": "432 Hz helps slow the heart rate. Ideal to start your day calm.",
    "science": "432 Hz induces parasympathetic activity, leading to a measurable reduction in systolic BP.",
    "audio_url": "",
    "translations": {
      "hi": {
        "title": "उच्च रक्तचाप - सुबह का सत्र",
        "sub": "उच्च रक्तचाप · सुबह का सत्र",
        "instruments": "बांसुरी · धीमे तार",
        "protocol": "सुबह 10 मिनट का सत्र। सीधे बैठो. धीमी, नियमित साँस छोड़ने पर ध्यान दें।",
        "tip": "432 हर्ट्ज हृदय गति को धीमा करने में मदद करता है। अपने दिन की शुरुआत शांति से करने के लिए आदर्श।",
        "science": "432 हर्ट्ज पैरासिम्पेथेटिक गतिविधि को प्रेरित करता है, जिससे सिस्टोलिक बीपी में मापनीय कमी आती है।",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "चरण 1: बीपी में कमी",
            "effect": "हृदय गति को धीमा करता है, वासोडिलेशन में सहायता करता है",
            "duration": 10
          }
        ]
      },
      "es": {
        "title": "Hipertensión — Sesión de Mañana",
        "sub": "HIPERTENSIÓN · Sesión de Mañana",
        "instruments": "Flauta · Cuerdas lentas",
        "protocol": "Sesión de mañana de 10 min. Siéntate erguido. Concéntrese en exhalaciones lentas y regulares.",
        "tip": "432 Hz ayuda a disminuir el ritmo cardíaco. Ideal para empezar el día tranquilo.",
        "science": "432 Hz induce actividad parasimpática, lo que lleva a una reducción mensurable de la PA sistólica.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Fase 1: Reducción de la PA",
            "effect": "Disminuye la frecuencia cardíaca, ayuda a la vasodilatación",
            "duration": 10
          }
        ]
      },
      "fr": {
        "title": "Hypertension — Séance du matin",
        "sub": "HYPERTENSION · Séance du matin",
        "instruments": "Flûte · Cordes lentes",
        "protocol": "Séance du matin de 10 min. Asseyez-vous droit. Concentrez-vous sur des expirations lentes et régulières.",
        "tip": "432 Hz aide à ralentir la fréquence cardiaque. Idéal pour commencer votre journée au calme.",
        "science": "432 Hz induit une activité parasympathique, conduisant à une réduction mesurable de la tension artérielle systolique.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Phase 1 : Réduction de la pression artérielle",
            "effect": "Ralentit la fréquence cardiaque, facilite la vasodilatation",
            "duration": 10
          }
        ]
      },
      "ar": {
        "title": "ارتفاع ضغط الدم - الجلسة الصباحية",
        "sub": "ارتفاع ضغط الدم · الجلسة الصباحية",
        "instruments": "الناي · الوتريات البطيئة",
        "protocol": "جلسة صباحية مدتها 10 دقائق. اجلس بشكل مستقيم. ركز على الزفير البطيء والمنتظم.",
        "tip": "432 هرتز يساعد على إبطاء معدل ضربات القلب. مثالية لبدء يومك بالهدوء.",
        "science": "432 هرتز يحفز نشاط الجهاز السمبتاوي، مما يؤدي إلى انخفاض ملموس في ضغط الدم الانقباضي.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "المرحلة الأولى: خفض ضغط الدم",
            "effect": "يبطئ معدل ضربات القلب، ويساعد على توسع الأوعية الدموية",
            "duration": 10
          }
        ]
      },
      "ja": {
        "title": "ハイパーテンション — 午前のセッション",
        "sub": "ハイパーテンション · 午前のセッション",
        "instruments": "フルート · 遅い弦楽器",
        "protocol": "午前の 10 分間のセッション。直立して座ります。ゆっくりと規則的に吐き出すことに集中してください。",
        "tip": "432 Hz は心拍数を下げるのに役立ちます。一日を穏やかに始めるのに最適です。",
        "science": "432 Hz は副交感神経活動を誘発し、収縮期血圧の測定可能な低下につながります。",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "フェーズ 1: 血圧低下",
            "effect": "心拍数を低下させ、血管拡張を促進します",
            "duration": 10
          }
        ]
      }
    }
  },
  {
    "id": "heart-hyper-evening",
    "cat": "Cardiovascular Disease",
    "emoji": "🌙",
    "free": false,
    "title": "Hypertension — Evening Cortisol Clearing",
    "sub": "HYPERTENSION · Evening Cortisol Clearing",
    "duration": 10,
    "color": "#ec4899",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Cortisol Clearing",
        "effect": "Lowers stress hormones, promotes cellular calm",
        "duration": 5
      },
      {
        "hz": 639,
        "role": "Heart",
        "label": "Phase 2: Relational Heart Harmony",
        "effect": "Supports emotional relaxation and heart rate stability",
        "duration": 5
      }
    ],
    "binaural": 10,
    "instruments": "Chimes · Soft pads",
    "protocol": "Evening 10 min session. Clear the day's stress and reduce arterial pressure.",
    "tip": "Focus on the transition between the two frequencies.",
    "science": "528 Hz clears emotional cortisol buildup while 639 Hz encourages heart rhythm stability.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/Phase%201%20%E2%80%94%20Respiratory%20Entrainment%20(0%E2%80%938%20min).wav",
    "translations": {
      "hi": {
        "title": "उच्च रक्तचाप - शाम कोर्टिसोल साफ़ करना",
        "sub": "उच्च रक्तचाप · शाम कोर्टिसोल साफ़ करना",
        "instruments": "झंकार · नरम पैड",
        "protocol": "शाम 10 मिनट का सत्र। दिन भर का तनाव दूर करें और रक्तचाप कम करें।",
        "tip": "दो आवृत्तियों के बीच संक्रमण पर ध्यान दें।",
        "science": "528 हर्ट्ज भावनात्मक कोर्टिसोल बिल्डअप को साफ़ करता है जबकि 639 हर्ट्ज हृदय ताल स्थिरता को प्रोत्साहित करता है।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: कोर्टिसोल समाशोधन",
            "effect": "तनाव हार्मोन को कम करता है, सेलुलर शांति को बढ़ावा देता है",
            "duration": 5
          },
          {
            "hz": 639,
            "role": "Heart",
            "label": "चरण 2: संबंधपरक हृदय सद्भाव",
            "effect": "भावनात्मक विश्राम और हृदय गति स्थिरता का समर्थन करता है",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Hipertensión — Limpieza Vespertina de Cortisol",
        "sub": "HIPERTENSIÓN · Limpieza Vespertina de Cortisol",
        "instruments": "Campanas · Almohadillas suaves",
        "protocol": "Vespertina Sesión de 10 min. Despeja el estrés del día y reduce la presión arterial.",
        "tip": "Centrarse en la transición entre las dos frecuencias.",
        "science": "528 Hz elimina la acumulación de cortisol emocional mientras que 639 Hz fomenta la estabilidad del ritmo cardíaco.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Limpieza de cortisol",
            "effect": "Reduce las hormonas del estrés, promueve la calma celular",
            "duration": 5
          },
          {
            "hz": 639,
            "role": "Heart",
            "label": "Fase 2: Armonía cardíaca relacional",
            "effect": "Apoya la relajación emocional y la estabilidad del ritmo cardíaco",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Hypertension — Éclaircissement du cortisol du soir",
        "sub": "HYPERTENSION · Éclaircissement du cortisol du soir",
        "instruments": "Carillons · Coussinets souples",
        "protocol": "Séance du soir de 10 minutes. Éliminez le stress de la journée et réduisez la pression artérielle.",
        "tip": "Focus sur la transition entre les deux fréquences.",
        "science": "528 Hz élimine l'accumulation de cortisol émotionnel tandis que 639 Hz favorise la stabilité du rythme cardiaque.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : Élimination du cortisol",
            "effect": "Réduit les hormones du stress, favorise le calme cellulaire",
            "duration": 5
          },
          {
            "hz": 639,
            "role": "Heart",
            "label": "Phase 2 : Harmonie cardiaque relationnelle",
            "effect": "Favorise la relaxation émotionnelle et la stabilité de la fréquence cardiaque",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "ارتفاع ضغط الدم — تصفية الكورتيزول في المساء",
        "sub": "ارتفاع ضغط الدم · تصفية الكورتيزول في المساء",
        "instruments": "الدقات · الوسادات الناعمة",
        "protocol": "جلسة مسائية مدتها 10 دقائق. التخلص من ضغوط اليوم وتقليل الضغط الشرياني.",
        "tip": "التركيز على الانتقال بين الترددين.",
        "science": "528 هرتز يزيل تراكم الكورتيزول العاطفي بينما 639 هرتز يشجع استقرار إيقاع القلب.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: إزالة الكورتيزول",
            "effect": "خفض هرمونات التوتر، وتعزيز الهدوء الخلوي",
            "duration": 5
          },
          {
            "hz": 639,
            "role": "Heart",
            "label": "المرحلة 2: تناغم القلب العلائقي",
            "effect": "يدعم الاسترخاء العاطفي واستقرار معدل ضربات القلب",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "高血圧 — 夕方のコルチゾールの除去",
        "sub": "高血圧 · 夜のコルチゾールの除去",
        "instruments": "チャイム · ソフトパッド",
        "protocol": "夜の 10 分間のセッション。一日のストレスを解消し、動脈圧を下げます。",
        "tip": "2 つの周波数間の遷移に注目してください。",
        "science": "528 Hz は感情的なコルチゾールの蓄積を解消し、639 Hz は心臓のリズムの安定を促します。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: コルチゾールの除去",
            "effect": "ストレス ホルモンを低下させ、細胞の静けさを促進",
            "duration": 5
          },
          {
            "hz": 639,
            "role": "Heart",
            "label": "フェーズ 2: 関係性の心臓の調和",
            "effect": "感情的なリラックスと心拍数の安定性をサポート",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "heart-recovery-2",
    "cat": "Cardiovascular Disease",
    "emoji": "🛡️",
    "free": false,
    "title": "Post-Cardiac Recovery — Phase 2 (Weeks 3–6)",
    "sub": "POST-CARDIAC EVENT RECOVERY · Phase 2 (Weeks 3–6)",
    "duration": 30,
    "color": "#ec4899",
    "freqs": [
      {
        "hz": 432,
        "role": "Primary",
        "label": "Phase 1: Alpha Integration",
        "effect": "Neural coherence and vascular tissue regeneration",
        "duration": 30
      }
    ],
    "binaural": 10,
    "instruments": "Violin · Calm drone",
    "protocol": "Weeks 3-6 recovery. Sit or lie comfortably. Focus on expanding lung capacity.",
    "tip": "Listen with stereo headphones to maximize the Alpha brainwave undertone.",
    "science": "Alpha (10 Hz) binaural beats over a 432 Hz carrier frequency trigger neural coherence, facilitating tissue repair.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/Phase%201%20%E2%80%94%20Respiratory%20Entrainment%20(0%E2%80%938%20min).wav",
    "translations": {
      "hi": {
        "title": "हृदय-पश्चात पुनर्प्राप्ति - चरण 2 (सप्ताह 3-6)",
        "sub": "हृदय-पश्चात घटना पुनर्प्राप्ति · चरण 2 (सप्ताह 3-6)",
        "instruments": "वायलिन · शांत ड्रोन",
        "protocol": "सप्ताह 3-6 पुनर्प्राप्ति। आराम से बैठें या लेटें। फेफड़ों की क्षमता बढ़ाने पर ध्यान दें।",
        "tip": "अल्फा ब्रेनवेव अंडरटोन को अधिकतम करने के लिए स्टीरियो हेडफ़ोन के साथ सुनें।",
        "science": "अल्फा (10 हर्ट्ज) बाइन्यूरल 432 हर्ट्ज वाहक आवृत्ति पर धड़कता है जिससे तंत्रिका सुसंगतता ट्रिगर होती है, जिससे ऊतक की मरम्मत में सुविधा होती है।",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "चरण 1: अल्फा एकीकरण",
            "effect": "तंत्रिका सुसंगतता और संवहनी ऊतक पुनर्जनन",
            "duration": 30
          }
        ]
      },
      "es": {
        "title": "Recuperación poscardíaca — Fase 2 (semanas 3 a 6)",
        "sub": "RECUPERACIÓN POS EVENTO CARDÍACO · Fase 2 (semanas 3 a 6)",
        "instruments": "Violín · Drone tranquilo",
        "protocol": "Recuperación de las semanas 3 a 6. Siéntate o acuéstate cómodamente. Concéntrese en ampliar la capacidad pulmonar.",
        "tip": "Escuche con auriculares estéreo para maximizar el tono de las ondas cerebrales Alfa.",
        "science": "Los latidos binaurales alfa (10 Hz) sobre una frecuencia portadora de 432 Hz desencadenan la coherencia neuronal, lo que facilita la reparación de los tejidos.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Fase 1: Integración Alfa",
            "effect": "Coherencia neuronal y regeneración del tejido vascular",
            "duration": 30
          }
        ]
      },
      "fr": {
        "title": "Récupération post-cardiaque – Phase 2 (semaines 3 à 6)",
        "sub": "RÉCUPÉRATION POST-ÉVÉNEMENT CARDIAQUE · Phase 2 (semaines 3 à 6)",
        "instruments": "Violon · Drone calme",
        "protocol": "Semaines 3 à 6 de récupération. Asseyez-vous ou allongez-vous confortablement. Concentrez-vous sur l’expansion de la capacité pulmonaire.",
        "tip": "Écoutez avec un casque stéréo pour maximiser la nuance des ondes cérébrales Alpha.",
        "science": "Les battements binauraux alpha (10 Hz) sur une fréquence porteuse de 432 Hz déclenchent la cohérence neuronale, facilitant la réparation des tissus.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Phase 1 : Intégration Alpha",
            "effect": "Cohérence neuronale et régénération des tissus vasculaires",
            "duration": 30
          }
        ]
      },
      "ar": {
        "title": "التعافي بعد القلب - المرحلة الثانية (الأسابيع 3-6)",
        "sub": "التعافي من حدث ما بعد القلب · المرحلة الثانية (الأسابيع 3-6)",
        "instruments": "الكمان · طائرة بدون طيار هادئة",
        "protocol": "التعافي من الأسابيع 3-6. الجلوس أو الاستلقاء بشكل مريح. التركيز على توسيع سعة الرئة.",
        "tip": "استمع باستخدام سماعات الرأس الاستريو لتعظيم نغمة الفكرة الرائعة لـ Alpha.",
        "science": "نبضات ألفا (10 هرتز) بكلتا الأذنين على تردد موجة حاملة 432 هرتز تؤدي إلى التماسك العصبي، مما يسهل إصلاح الأنسجة.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "المرحلة الأولى: تكامل ألفا",
            "effect": "التماسك العصبي وتجديد الأنسجة الوعائية",
            "duration": 30
          }
        ]
      },
      "ja": {
        "title": "心臓病後の回復 — フェーズ 2 (3 ～ 6 週間)",
        "sub": "心臓イベント後の回復 · フェーズ 2 (3 ～ 6 週間)",
        "instruments": "ヴァイオリン · カーム ドローン",
        "protocol": "3 ～ 6 週間の回復。快適に座ったり横になったりできます。肺活量の拡大に重点を置きます。",
        "tip": "アルファ脳波のアンダートーンを最大化するには、ステレオヘッドフォンで聞いてください。",
        "science": "432 Hz のキャリア周波数を超えるアルファ (10 Hz) バイノーラル ビートが神経のコヒーレンスを引き起こし、組織の修復を促進します。",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "フェーズ 1: アルファ統合",
            "effect": "神経のコヒーレンスと血管組織の再生",
            "duration": 30
          }
        ]
      }
    }
  },
  {
    "id": "depression",
    "cat": "Mental",
    "emoji": "🌤️",
    "free": true,
    "title": "Depression & Low Mood",
    "sub": "Limbic system · Serotonin pathways",
    "duration": 40,
    "color": "#f59e0b",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Uplifting",
        "effect": "Stimulates serotonin and dopamine release",
        "duration": 15
      },
      {
        "hz": 396,
        "role": "Release",
        "label": "Phase 2: Liberation",
        "effect": "Liberates guilt and fear",
        "duration": 15
      },
      {
        "hz": 963,
        "role": "Pineal",
        "label": "Phase 3: Connection",
        "effect": "Elevates mood and awareness",
        "duration": 5
      },
      {
        "hz": 7.83,
        "role": "Schumann",
        "label": "Phase 4: Grounding",
        "effect": "Earth resonance — grounds and restores baseline",
        "duration": 5
      }
    ],
    "binaural": 10,
    "instruments": "Piano · Strings · Choral",
    "protocol": "Morning 30–45 min. Avoid minor keys initially. Progress to 963 Hz week 2.",
    "tip": "963 Hz with eyes closed in morning sunlight powerfully resets circadian mood.",
    "science": "528 Hz activates mesolimbic dopamine pathway. 7.83 Hz syncs with hippocampal theta waves.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/depression.mp3",
    "translations": {
      "hi": {
        "title": "अवसाद और निम्न मनोदशा",
        "sub": "लिम्बिक प्रणाली · सेरोटोनिन मार्ग",
        "instruments": "पियानो · तार · कोरल",
        "protocol": "सुबह 30-45 मिनट। शुरुआत में छोटी चाबियों से बचें। सप्ताह 2 में 963 हर्ट्ज़ की प्रगति।",
        "tip": "सुबह की धूप में आँखें बंद करके 963 हर्ट्ज़ सर्कैडियन मूड को शक्तिशाली रूप से रीसेट करता है।",
        "science": "528 हर्ट्ज मेसोलेम्बिक डोपामाइन मार्ग को सक्रिय करता है। 7.83 हर्ट्ज हिप्पोकैम्पस थीटा तरंगों के साथ समन्वयित होता है।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: उत्थान",
            "effect": "सेरोटोनिन और डोपामाइन रिलीज को उत्तेजित करता है",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "चरण 2: मुक्ति",
            "effect": "अपराध और भय से मुक्ति देता है",
            "duration": 15
          },
          {
            "hz": 963,
            "role": "Pineal",
            "label": "चरण 3: कनेक्शन",
            "effect": "मनोदशा और जागरूकता को बढ़ाता है",
            "duration": 5
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "चरण 4: ग्राउंडिंग",
            "effect": "पृथ्वी प्रतिध्वनि - आधार रेखा को आधार और पुनर्स्थापित करता है",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Depresión y bajo estado de ánimo",
        "sub": "Sistema límbico · Vías de la serotonina",
        "instruments": "Piano · Cuerdas · Coral",
        "protocol": "Mañana 30–45 min. Evite las tonalidades menores inicialmente. Progrese a 963 Hz en la semana 2.",
        "tip": "963 Hz con los ojos cerrados bajo la luz del sol de la mañana restablece poderosamente el estado de ánimo circadiano.",
        "science": "528 Hz activa la vía de la dopamina mesolímbica. 7,83 Hz se sincroniza con las ondas theta del hipocampo.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Edificante",
            "effect": "Estimula la liberación de serotonina y dopamina",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "Fase 2: Liberación",
            "effect": "Libera la culpa y el miedo",
            "duration": 15
          },
          {
            "hz": 963,
            "role": "Pineal",
            "label": "Fase 3: Conexión",
            "effect": "Eleva el estado de ánimo y la conciencia",
            "duration": 5
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "Fase 4: Conexión a tierra",
            "effect": "Resonancia terrestre: conexión a tierra y restaura la línea base",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Dépression et mauvaise humeur",
        "sub": "Système limbique · Voies de la sérotonine",
        "instruments": "Piano · Cordes · Chorale",
        "protocol": "Matin 30–45 min. Évitez les touches mineures au départ. Progression vers 963 Hz semaine 2.",
        "tip": "963 Hz avec les yeux fermés au soleil du matin réinitialise puissamment l'humeur circadienne.",
        "science": "528 Hz active la voie dopaminergique mésolimbique. 7,83 Hz se synchronise avec les ondes thêta de l'hippocampe.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : Édifiante",
            "effect": "Stimule la libération de sérotonine et de dopamine",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "Phase 2 : Libération",
            "effect": "Libère la culpabilité et la peur",
            "duration": 15
          },
          {
            "hz": 963,
            "role": "Pineal",
            "label": "Phase 3 : Connexion",
            "effect": "Élève l'humeur et la conscience",
            "duration": 5
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "Phase 4 : Enracinement",
            "effect": "Résonance terrestre — ancre et restaure la ligne de base",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "الاكتئاب والمزاج المنخفض",
        "sub": "الجهاز الحوفي · مسارات السيروتونين",
        "instruments": "البيانو · الآلات الوترية · الكورال",
        "protocol": "الصباح 30-45 دقيقة. تجنب المفاتيح الثانوية في البداية. التقدم إلى 963 هرتز في الأسبوع 2.",
        "tip": "963 هرتز مع عيون مغلقة في ضوء الشمس الصباحي يعيد ضبط المزاج اليومي بقوة.",
        "science": "528 هرتز ينشط مسار الدوبامين الوسطي الطرفي. 7.83 هرتز يتزامن مع موجات ثيتا الحصين.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: الارتقاء",
            "effect": "يحفز إطلاق السيروتونين والدوبامين",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "المرحلة 2: التحرر",
            "effect": "يحرر الشعور بالذنب والخوف",
            "duration": 15
          },
          {
            "hz": 963,
            "role": "Pineal",
            "label": "المرحلة 3: الاتصال",
            "effect": "يرفع المزاج والوعي",
            "duration": 5
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "المرحلة 4: التأريض",
            "effect": "رنين الأرض - يؤسس ويستعيد خط الأساس",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "うつ病と気分の落ち込み",
        "sub": "大脳辺縁系 · セロトニン経路",
        "instruments": "ピアノ · 弦楽 · 合唱",
        "protocol": "朝 30 ～ 45 分。最初はマイナーキーを避けてください。 963 Hz の第 2 週に進みます。",
        "tip": "朝の日差しを浴びて目を閉じた状態で 963 Hz を使用すると、概日リズムが強力にリセットされます。",
        "science": "528 Hz は中脳辺縁系ドーパミン経路を活性化します。 7.83 Hzは海馬のシータ波と同期します。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: 高揚感",
            "effect": "セロトニンとドーパミンの放出を刺激する",
            "duration": 15
          },
          {
            "hz": 396,
            "role": "Release",
            "label": "フェーズ 2: 解放",
            "effect": "罪悪感と恐怖を解放する",
            "duration": 15
          },
          {
            "hz": 963,
            "role": "Pineal",
            "label": "フェーズ 3: つながり",
            "effect": "気分と意識を高める",
            "duration": 5
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "フェーズ 4: グラウンディング",
            "effect": "地球の共鳴 — グラウンディングしてベースラインを回復する",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "adhd",
    "cat": "Mental",
    "emoji": "🎯",
    "free": false,
    "title": "ADHD & Focus Deficit",
    "sub": "Prefrontal cortex · Dopamine",
    "duration": 30,
    "color": "#10b981",
    "freqs": [
      {
        "hz": 40,
        "role": "Gamma",
        "label": "Phase 1: Active Focus",
        "effect": "MIT studies confirm sharper focus and attention",
        "duration": 10
      },
      {
        "hz": 14,
        "role": "Beta",
        "label": "Phase 2: Engagement",
        "effect": "Alertness and task engagement",
        "duration": 10
      },
      {
        "hz": 10,
        "role": "Alpha",
        "label": "Phase 3: Flow State",
        "effect": "Flow state — relaxed yet attentive",
        "duration": 5
      },
      {
        "hz": 528,
        "role": "Coherence",
        "label": "Phase 4: Integration",
        "effect": "Neural coherence for sustained attention",
        "duration": 5
      }
    ],
    "binaural": 20,
    "instruments": "Binaural beats · Isochronic tones",
    "protocol": "25 min study sessions, 5 min silence. Build to 2 cycles.",
    "tip": "40 Hz gamma reduces ADHD hyperactivity symptoms in peer-reviewed studies.",
    "science": "ADHD involves deficient gamma oscillations. External 40 Hz supplements endogenous gamma.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/adhd.mp3",
    "translations": {
      "hi": {
        "title": "एडीएचडी और फोकस डेफिसिट",
        "sub": "प्रीफ्रंटल कॉर्टेक्स · डोपामाइन",
        "instruments": "बाइनॉरल बीट्स · आइसोक्रोनिक टोन",
        "protocol": "25 मिनट का अध्ययन सत्र, 5 मिनट का मौन। 2 चक्रों तक बनाएँ।",
        "tip": "सहकर्मी-समीक्षित अध्ययनों में 40 हर्ट्ज गामा एडीएचडी अतिसक्रियता लक्षणों को कम करता है।",
        "science": "एडीएचडी में गामा दोलनों की कमी शामिल है। बाहरी 40 हर्ट्ज़ अंतर्जात गामा का पूरक है।",
        "freqs": [
          {
            "hz": 40,
            "role": "Gamma",
            "label": "चरण 1: सक्रिय फोकस",
            "effect": "एमआईटी अध्ययन तीव्र फोकस और ध्यान की पुष्टि करते हैं",
            "duration": 10
          },
          {
            "hz": 14,
            "role": "Beta",
            "label": "चरण 2: संलग्नता",
            "effect": "सतर्कता और कार्य संलग्नता",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "चरण 3: प्रवाह स्थिति",
            "effect": "प्रवाह स्थिति - आराम से फिर भी चौकस",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Coherence",
            "label": "चरण 4: एकीकरण",
            "effect": "निरंतर ध्यान के लिए तंत्रिका सुसंगतता",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "TDAH y Déficit de Focalización",
        "sub": "Corteza prefrontal · Dopamina",
        "instruments": "Latidos binaurales · Tonos isocrónicos",
        "protocol": "Sesiones de estudio de 25 min, silencio de 5 min. Construir a 2 ciclos.",
        "tip": "La gamma de 40 Hz reduce los síntomas de hiperactividad del TDAH en estudios revisados ​​por pares.",
        "science": "El TDAH implica oscilaciones gamma deficientes. Los 40 Hz externos complementan la gamma endógena.",
        "freqs": [
          {
            "hz": 40,
            "role": "Gamma",
            "label": "Fase 1: Enfoque activo",
            "effect": "Los estudios del MIT confirman un enfoque y una atención más nítidos",
            "duration": 10
          },
          {
            "hz": 14,
            "role": "Beta",
            "label": "Fase 2: Compromiso",
            "effect": "Alerta y compromiso con la tarea",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "Fase 3: Estado de flujo",
            "effect": "Estado de flujo: relajado pero atento",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Coherence",
            "label": "Fase 4: Integración",
            "effect": "Coherencia neuronal para una atención sostenida",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "TDAH et déficit de concentration",
        "sub": "Cortex préfrontal · Dopamine",
        "instruments": "Battements binauraux · Tonalités isochrones",
        "protocol": "Séances d'étude de 25 min, 5 min de silence. Construire jusqu'à 2 cycles.",
        "tip": "Le gamma 40 Hz réduit les symptômes d’hyperactivité du TDAH dans des études évaluées par des pairs.",
        "science": "Le TDAH implique des oscillations gamma déficientes. Le 40 Hz externe complète le gamma endogène.",
        "freqs": [
          {
            "hz": 40,
            "role": "Gamma",
            "label": "Phase 1 : Concentration active",
            "effect": "Des études du MIT confirment une concentration et une attention accrues",
            "duration": 10
          },
          {
            "hz": 14,
            "role": "Beta",
            "label": "Phase 2 : Engagement",
            "effect": "Vigilance et engagement dans les tâches",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "Phase 3 : État du flux",
            "effect": "État de flux – détendu mais attentif",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Coherence",
            "label": "Phase 4 : Intégration",
            "effect": "Cohérence neuronale pour une attention soutenue",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "اضطراب فرط الحركة ونقص الانتباه ونقص التركيز",
        "sub": "قشرة الفص الجبهي · الدوبامين",
        "instruments": "نبضات بكلتا الأذنين · نغمات متزامنة",
        "protocol": "جلسات دراسة مدتها 25 دقيقة، و5 دقائق صمت. بناء على دورتين.",
        "tip": "40 هرتز غاما يقلل من أعراض فرط النشاط ADHD في الدراسات التي راجعها النظراء.",
        "science": "اضطراب فرط الحركة ونقص الانتباه ينطوي على نقص في تذبذبات غاما. 40 هرتز خارجي يكمل غاما الذاتية.",
        "freqs": [
          {
            "hz": 40,
            "role": "Gamma",
            "label": "المرحلة 1: التركيز النشط",
            "effect": "دراسات معهد ماساتشوستس للتكنولوجيا تؤكد التركيز والانتباه بشكل أكبر",
            "duration": 10
          },
          {
            "hz": 14,
            "role": "Beta",
            "label": "المرحلة 2: المشاركة",
            "effect": "اليقظة والمشاركة في المهام",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "المرحلة 3: حالة التدفق",
            "effect": "حالة التدفق - استرخاء وانتباه",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Coherence",
            "label": "المرحلة 4: التكامل",
            "effect": "التماسك العصبي من أجل الاهتمام المستمر",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "ADHD と集中力欠如",
        "sub": "前頭前野 · ドーパミン",
        "instruments": "バイノーラル ビート · 等時性トーン",
        "protocol": "25 分間の勉強セッション、5 分間の沈黙。 2サイクルまで構築します。",
        "tip": "査読済みの研究では、40 Hz ガンマ線が ADHD の多動性症状を軽減します。",
        "science": "ADHD にはガンマ振動の欠如が関係します。外部 40 Hz は内因性ガンマを補います。",
        "freqs": [
          {
            "hz": 40,
            "role": "Gamma",
            "label": "フェーズ 1: アクティブな集中力",
            "effect": "MIT の研究により、より鋭い集中力と注意力が確認されています",
            "duration": 10
          },
          {
            "hz": 14,
            "role": "Beta",
            "label": "フェーズ 2: エンゲージメント",
            "effect": "注意力とタスクへの取り組み",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "フェーズ 3: フロー状態",
            "effect": "フロー状態 — リラックスしているが注意力がある",
            "duration": 5
          },
          {
            "hz": 528,
            "role": "Coherence",
            "label": "フェーズ 4: 統合",
            "effect": "注意力を持続させるための神経のコヒーレンス",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "parkinsons",
    "cat": "Physical",
    "emoji": "🌿",
    "free": false,
    "title": "Parkinson's Disease",
    "sub": "Basal ganglia · Dopamine neurons",
    "duration": 30,
    "color": "#14b8a6",
    "freqs": [
      {
        "hz": 40,
        "role": "Primary",
        "label": "Phase 1: Motor Control",
        "effect": "Reduced tremor, improved motor control in trials",
        "duration": 10
      },
      {
        "hz": 528,
        "role": "Neural",
        "label": "Phase 2: Dopamine Support",
        "effect": "Dopaminergic pathway support",
        "duration": 10
      },
      {
        "hz": 432,
        "role": "Rhythm",
        "label": "Phase 3: Rhythm Stabilizer",
        "effect": "Stabilizes motor output rhythms",
        "duration": 5
      },
      {
        "hz": 120,
        "role": "Beta",
        "label": "Phase 4: Pathway Release",
        "effect": "Counteracts pathological beta suppression",
        "duration": 5
      }
    ],
    "binaural": 10,
    "instruments": "Rhythmic drumming · Metronome music",
    "protocol": "Rhythmic Auditory Stimulation (RAS) daily. Walk in beat with 120–140 BPM.",
    "tip": "RAS is FDA-cleared as physical therapy adjunct for Parkinson's gait.",
    "science": "RAS at 120 Hz entrains striatal circuits bypassing the defective basal ganglia.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/parkinsons.mp3",
    "translations": {
      "hi": {
        "title": "पार्किंसंस रोग",
        "sub": "बेसल गैन्ग्लिया · डोपामाइन न्यूरॉन्स",
        "instruments": "लयबद्ध ड्रमिंग · मेट्रोनोम संगीत",
        "protocol": "लयबद्ध श्रवण उत्तेजना (आरएएस) प्रतिदिन। 120-140 बीपीएम के साथ वॉक इन बीट।",
        "tip": "आरएएस को पार्किंसंस चाल के लिए भौतिक चिकित्सा सहायक के रूप में एफडीए द्वारा मंजूरी दे दी गई है।",
        "science": "120 हर्ट्ज पर आरएएस दोषपूर्ण बेसल गैन्ग्लिया को दरकिनार करते हुए स्ट्राइटल सर्किट में प्रवेश करता है।",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "चरण 1: मोटर नियंत्रण",
            "effect": "परीक्षणों में कंपन कम, बेहतर मोटर नियंत्रण",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neural",
            "label": "चरण 2: डोपामाइन समर्थन",
            "effect": "डोपामिनर्जिक मार्ग समर्थन",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Rhythm",
            "label": "चरण 3: रिदम स्टेबलाइजर",
            "effect": "मोटर आउटपुट लय को स्थिर करता है",
            "duration": 5
          },
          {
            "hz": 120,
            "role": "Beta",
            "label": "चरण 4: पाथवे रिलीज़",
            "effect": "पैथोलॉजिकल बीटा दमन का प्रतिकार करता है",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Enfermedad de Parkinson",
        "sub": "Ganglios basales · Neuronas dopaminérgicas",
        "instruments": "Tambores rítmicos · Música de metrónomo",
        "protocol": "Estimulación auditiva rítmica (RAS) diaria. Camine al ritmo de 120 a 140 BPM.",
        "tip": "RAS está aprobado por la FDA como complemento de la fisioterapia para la marcha del Parkinson.",
        "science": "RAS a 120 Hz arrastra circuitos estriatales sin pasar por los ganglios basales defectuosos.",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "Fase 1: Control motor",
            "effect": "Reducción del temblor, mejor control motor en los ensayos",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neural",
            "label": "Fase 2: Apoyo a la dopamina",
            "effect": "Apoyo a la vía dopaminérgica",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Rhythm",
            "label": "Fase 3: Estabilizador del ritmo",
            "effect": "Estabiliza los ritmos de salida motora",
            "duration": 5
          },
          {
            "hz": 120,
            "role": "Beta",
            "label": "Fase 4: Liberación de la vía",
            "effect": "Contrarresta la supresión beta patológica",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Maladie de Parkinson",
        "sub": "Ganglions de la base · Neurones dopaminergiques",
        "instruments": "Batterie rythmique · Musique métronome",
        "protocol": "Stimulation auditive rythmique (RAS) quotidiennement. Marchez au rythme de 120 à 140 BPM.",
        "tip": "RAS est approuvé par la FDA comme complément de thérapie physique pour la démarche de Parkinson.",
        "science": "Le RAS à 120 Hz entraîne les circuits striataux contournant les noyaux gris centraux défectueux.",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "Phase 1 : Contrôle du moteur",
            "effect": "Tremblements réduits, contrôle moteur amélioré lors des essais",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neural",
            "label": "Phase 2 : Soutien à la dopamine",
            "effect": "Soutien de la voie dopaminergique",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Rhythm",
            "label": "Phase 3 : Stabilisateur de rythme",
            "effect": "Stabilise les rythmes de sortie du moteur",
            "duration": 5
          },
          {
            "hz": 120,
            "role": "Beta",
            "label": "Phase 4 : Libération de la voie",
            "effect": "Contrecarre la suppression bêta pathologique",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "مرض باركنسون",
        "sub": "العقد القاعدية · الخلايا العصبية الدوبامين",
        "instruments": "الطبول الإيقاعي · موسيقى المسرع",
        "protocol": "التحفيز السمعي الإيقاعي (RAS) يوميًا. المشي بسرعة 120-140 نبضة في الدقيقة.",
        "tip": "RAS حاصل على موافقة إدارة الأغذية والعقاقير (FDA) كعلاج طبيعي مساعد لمشية باركنسون.",
        "science": "RAS عند 120 هرتز يجذب الدوائر القاتلة متجاوزًا العقد القاعدية المعيبة.",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "المرحلة 1: التحكم في المحركات",
            "effect": "تقليل الارتعاش، وتحسين التحكم في المحركات في التجارب",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neural",
            "label": "المرحلة 2: دعم الدوبامين",
            "effect": "دعم مسار الدوبامين",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Rhythm",
            "label": "المرحلة 3: مثبت الإيقاع",
            "effect": "استقرار إيقاعات مخرجات المحرك",
            "duration": 5
          },
          {
            "hz": 120,
            "role": "Beta",
            "label": "المرحلة 4: إطلاق المسار",
            "effect": "يقاوم قمع بيتا المرضي",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "パーキンソン病",
        "sub": "大脳基底核 · ドーパミン ニューロン",
        "instruments": "リズミカルなドラム演奏 · メトロノーム音楽",
        "protocol": "毎日リズミカルな聴覚刺激 (RAS)。 120 ～ 140 BPM のビートで歩きます。",
        "tip": "RAS は、パーキンソン病の歩行に対する理学療法の補助として FDA に認可されています。",
        "science": "120 Hz の RAS は、欠陥のある大脳基底核を迂回する線条体回路に同調します。",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "フェーズ 1: 運動制御",
            "effect": "試験における震えの軽減、運動制御の改善",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Neural",
            "label": "フェーズ 2: ドーパミンのサポート",
            "effect": "ドーパミン作動性経路のサポート",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Rhythm",
            "label": "フェーズ 3: リズムスタビライザー",
            "effect": "運動出力のリズムを安定させる",
            "duration": 5
          },
          {
            "hz": 120,
            "role": "Beta",
            "label": "フェーズ 4: 経路の放出",
            "effect": "病的なベータ抑制に対抗する",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "diabetes",
    "cat": "Chronic",
    "emoji": "🩸",
    "free": false,
    "title": "Diabetes & Blood Sugar",
    "sub": "Pancreas · Insulin signaling",
    "duration": 30,
    "color": "#f97316",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Pancreas Resonance",
        "effect": "Supports pancreatic cell function",
        "duration": 10
      },
      {
        "hz": 432,
        "role": "Cortisol",
        "label": "Phase 2: Cortisol Reduction",
        "effect": "Reduces cortisol — major insulin resistance driver",
        "duration": 10
      },
      {
        "hz": 396,
        "role": "Anxiety",
        "label": "Phase 3: Emotional Reset",
        "effect": "Releases anxiety around food — metabolic reset",
        "duration": 5
      },
      {
        "hz": 741,
        "role": "Detox",
        "label": "Phase 4: Detoxification",
        "effect": "Liver and metabolic detoxification",
        "duration": 5
      }
    ],
    "binaural": 7,
    "instruments": "Gentle piano · Singing bowls",
    "protocol": "30 min daily. Morning best. Pair with mindful eating and glucose monitoring.",
    "tip": "Stress reduction via music directly improves glucose via cortisol suppression.",
    "science": "20% cortisol reduction = measurable fasting glucose improvement.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/diabetes.mp3",
    "translations": {
      "hi": {
        "title": "मधुमेह और रक्त शर्करा",
        "sub": "अग्न्याशय · इंसुलिन संकेतन",
        "instruments": "कोमल पियानो · गायन के कटोरे",
        "protocol": "प्रतिदिन 30 मिनट। सुबह सबसे अच्छी. ध्यानपूर्वक खान-पान और ग्लूकोज की निगरानी के साथ इसे जोड़ें।",
        "tip": "संगीत के माध्यम से तनाव कम करने से सीधे कोर्टिसोल दमन के माध्यम से ग्लूकोज में सुधार होता है।",
        "science": "20% कोर्टिसोल कमी = मापने योग्य उपवास ग्लूकोज सुधार।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: अग्न्याशय अनुनाद",
            "effect": "अग्न्याशय कोशिका कार्य का समर्थन करता है",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Cortisol",
            "label": "चरण 2: कोर्टिसोल कटौती",
            "effect": "कोर्टिसोल को कम करता है - प्रमुख इंसुलिन प्रतिरोध चालक",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Anxiety",
            "label": "चरण 3: भावनात्मक रीसेट",
            "effect": "भोजन के आसपास चिंता को दूर करता है - चयापचय रीसेट",
            "duration": 5
          },
          {
            "hz": 741,
            "role": "Detox",
            "label": "चरण 4: विषहरण",
            "effect": "यकृत और चयापचय विषहरण",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Diabetes y azúcar en sangre",
        "sub": "Páncreas · Señalización de insulina",
        "instruments": "Piano suave · Cuencos tibetanos",
        "protocol": "30 min diarios. Lo mejor de la mañana. Combínelo con una alimentación consciente y un control de la glucosa.",
        "tip": "La reducción del estrés a través de la música mejora directamente la glucosa a través de la supresión del cortisol.",
        "science": "Reducción del cortisol del 20 % = mejora mensurable de la glucosa en ayunas.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Resonancia del páncreas",
            "effect": "Apoya la función de las células pancreáticas",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Cortisol",
            "label": "Fase 2: Reducción del cortisol",
            "effect": "Reduce el cortisol, principal factor de resistencia a la insulina",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Anxiety",
            "label": "Fase 3: Restablecimiento emocional",
            "effect": "Libera la ansiedad relacionada con la comida: reinicio metabólico",
            "duration": 5
          },
          {
            "hz": 741,
            "role": "Detox",
            "label": "Fase 4: Desintoxicación",
            "effect": "Desintoxicación hepática y metabólica",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Diabète et glycémie",
        "sub": "Pancréas · Signalisation de l'insuline",
        "instruments": "Piano doux · Bols chantants",
        "protocol": "30 minutes par jour. Le meilleur du matin. Associez-le à une alimentation consciente et à une surveillance de la glycémie.",
        "tip": "La réduction du stress via la musique améliore directement la glycémie via la suppression du cortisol.",
        "science": "Réduction de 20 % du cortisol = amélioration mesurable de la glycémie à jeun.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : Résonance pancréatique",
            "effect": "Soutient la fonction des cellules pancréatiques",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Cortisol",
            "label": "Phase 2 : Réduction du cortisol",
            "effect": "Réduit le cortisol – principal facteur de résistance à l’insuline",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Anxiety",
            "label": "Phase 3 : Réinitialisation émotionnelle",
            "effect": "Libère l’anxiété liée à la nourriture – réinitialisation métabolique",
            "duration": 5
          },
          {
            "hz": 741,
            "role": "Detox",
            "label": "Phase 4 : Désintoxication",
            "effect": "Désintoxication hépatique et métabolique",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "مرض السكري وسكر الدم",
        "sub": "البنكرياس · إشارات الأنسولين",
        "instruments": "بيانو لطيف · أوعية الغناء",
        "protocol": "30 دقيقة يوميًا. صباح أفضل. إقرانه مع الأكل اليقظ ومراقبة الجلوكوز.",
        "tip": "يؤدي تقليل التوتر عن طريق الموسيقى إلى تحسين مستوى الجلوكوز بشكل مباشر عن طريق تثبيط الكورتيزول.",
        "science": "تخفيض الكورتيزول بنسبة 20% = تحسن ملموس في نسبة الجلوكوز أثناء الصيام.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: رنين البنكرياس",
            "effect": "يدعم وظيفة خلايا البنكرياس",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Cortisol",
            "label": "المرحلة 2: تقليل الكورتيزول",
            "effect": "يقلل الكورتيزول - المحرك الرئيسي لمقاومة الأنسولين",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Anxiety",
            "label": "المرحلة 3: إعادة الضبط العاطفي",
            "effect": "التخلص من القلق بشأن الطعام - إعادة ضبط التمثيل الغذائي",
            "duration": 5
          },
          {
            "hz": 741,
            "role": "Detox",
            "label": "المرحلة 4: إزالة السموم",
            "effect": "إزالة السموم من الكبد والتمثيل الغذائي",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "糖尿病と血糖値",
        "sub": "膵臓 · インスリンシグナル伝達",
        "instruments": "優しいピアノ · シンギングボウル",
        "protocol": "毎日 30 分。朝最高。注意深い食事と血糖値のモニタリングを組み合わせてください。",
        "tip": "音楽によるストレス軽減は、コルチゾール抑制により血糖値を直接改善します。",
        "science": "20% コルチゾール減少 = 測定可能な空腹時血糖の改善。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: 膵臓の共鳴",
            "effect": "膵臓細胞の機能をサポート",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Cortisol",
            "label": "フェーズ 2: コルチゾールの減少",
            "effect": "コルチゾールを減少させる — インスリン抵抗性の主な要因",
            "duration": 10
          },
          {
            "hz": 396,
            "role": "Anxiety",
            "label": "フェーズ 3: 感情のリセット",
            "effect": "食事に関する不安を解放 — 代謝のリセット",
            "duration": 5
          },
          {
            "hz": 741,
            "role": "Detox",
            "label": "フェーズ 4: 解毒",
            "effect": "肝臓と代謝の解毒",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "anxiety",
    "cat": "Mental",
    "emoji": "🧠",
    "free": true,
    "title": "Anxiety & Panic",
    "sub": "Nervous system · Amygdala",
    "duration": 25,
    "color": "#7c3aed",
    "freqs": [
      {
        "hz": 432,
        "role": "Primary",
        "label": "Phase 1: Calming",
        "effect": "Lowers cortisol, calms nervous system",
        "duration": 10
      },
      {
        "hz": 528,
        "role": "Support",
        "label": "Phase 2: Restoration",
        "effect": "Reduces stress hormones at source",
        "duration": 10
      },
      {
        "hz": 40,
        "role": "Gamma",
        "label": "Phase 3: Focus",
        "effect": "Anchors scattered thoughts",
        "duration": 2
      },
      {
        "hz": 10,
        "role": "Alpha",
        "label": "Phase 4: Coherence",
        "effect": "Shifts to rest-and-digest state",
        "duration": 3
      }
    ],
    "binaural": 10,
    "instruments": "Tibetan bowls · Crystal flute",
    "protocol": "20–30 min daily. Begin with 432 Hz for 10 min then add 528 Hz.",
    "tip": "Combine with 4-7-8 breathing — exhale twice as long as inhale.",
    "science": "Cortisol reduction measurable within 20 min. Alpha at 10 Hz suppresses amygdala hyperactivation.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/anxiety.mp3",
    "translations": {
      "hi": {
        "title": "चिंता और घबराहट",
        "sub": "तंत्रिका तंत्र · अमिगडाला",
        "instruments": "तिब्बती कटोरे · क्रिस्टल बांसुरी",
        "protocol": "प्रतिदिन 20-30 मिनट। 10 मिनट के लिए 432 हर्ट्ज से शुरू करें और फिर 528 हर्ट्ज जोड़ें।",
        "tip": "4-7-8 श्वास के साथ संयोजित करें - जितनी देर श्वास लें उससे दोगुनी दूरी छोड़ें।",
        "science": "कोर्टिसोल में कमी 20 मिनट के भीतर मापी जा सकती है। 10 हर्ट्ज पर अल्फा एमिग्डाला हाइपरएक्टिवेशन को दबा देता है।",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "चरण 1: शांत करना",
            "effect": "कोर्टिसोल को कम करता है, तंत्रिका तंत्र को शांत करता है",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "चरण 2: बहाली",
            "effect": "स्रोत पर तनाव हार्मोन को कम करता है",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Gamma",
            "label": "चरण 3: फोकस",
            "effect": "बिखरे हुए विचारों को एंकर करता है",
            "duration": 2
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "चरण 4: सुसंगतता",
            "effect": "आराम करने और पचाने की स्थिति में बदलाव",
            "duration": 3
          }
        ]
      },
      "es": {
        "title": "Ansiedad y pánico",
        "sub": "Sistema nervioso · Amígdala",
        "instruments": "Cuencos tibetanos · Flauta de cristal",
        "protocol": "20–30 min diarios. Comience con 432 Hz durante 10 minutos y luego agregue 528 Hz.",
        "tip": "Combine con la respiración 4-7-8: exhale el doble de tiempo que inhala.",
        "science": "Reducción de cortisol medible en 20 min. Alfa a 10 Hz suprime la hiperactivación de la amígdala.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Fase 1: Calmar",
            "effect": "Reduce el cortisol, calma el sistema nervioso",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "Fase 2: Restauración",
            "effect": "Reduce las hormonas del estrés en la fuente",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Gamma",
            "label": "Fase 3: Enfoque",
            "effect": "Ancla los pensamientos dispersos",
            "duration": 2
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "Fase 4: Coherencia",
            "effect": "Cambia al estado de reposo y digestión",
            "duration": 3
          }
        ]
      },
      "fr": {
        "title": "Anxiété et panique",
        "sub": "Système nerveux · Amygdale",
        "instruments": "Bols tibétains · Flûte de cristal",
        "protocol": "20 à 30 minutes par jour. Commencez par 432 Hz pendant 10 min puis ajoutez 528 Hz.",
        "tip": "Combinez avec la respiration 4-7-8 – expirez deux fois plus longtemps que vous inspirez.",
        "science": "Réduction du cortisol mesurable en 20 min. Alpha à 10 Hz supprime l'hyperactivation de l'amygdale.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Phase 1 : Calmant",
            "effect": "Abaisse le cortisol, calme le système nerveux",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "Phase 2 : Restauration",
            "effect": "Réduit les hormones du stress à la source",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Gamma",
            "label": "Phase 3 : Concentration",
            "effect": "Ancre les pensées dispersées",
            "duration": 2
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "Phase 4 : Cohérence",
            "effect": "Passage à l'état de repos et de digestion",
            "duration": 3
          }
        ]
      },
      "ar": {
        "title": "القلق والذعر",
        "sub": "الجهاز العصبي · اللوزة الدماغية",
        "instruments": "أوعية التبت · الناي البلوري",
        "protocol": "20-30 دقيقة يومياً. ابدأ بـ 432 هرتز لمدة 10 دقائق ثم أضف 528 هرتز.",
        "tip": "ادمجها مع التنفس 4-7-8 - الزفير ضعف مدة الشهيق.",
        "science": "تخفيض الكورتيزول يمكن قياسه خلال 20 دقيقة. ألفا عند 10 هرتز يمنع فرط نشاط اللوزة.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "المرحلة 1: التهدئة",
            "effect": "خفض الكورتيزول، وتهدئة الجهاز العصبي",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "المرحلة 2: استعادة الجسم",
            "effect": "تقليل هرمونات التوتر عند المصدر",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Gamma",
            "label": "المرحلة 3: التركيز",
            "effect": "تثبيت الأفكار المتناثرة",
            "duration": 2
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "المرحلة 4: التماسك",
            "effect": "التحول إلى حالة الراحة والهضم",
            "duration": 3
          }
        ]
      },
      "ja": {
        "title": "不安とパニック",
        "sub": "神経系 · 扁桃体",
        "instruments": "チベットボウル · クリスタルフルート",
        "protocol": "毎日 20 ～ 30 分。 10 分間 432 Hz から始めて、その後 528 Hz を追加します。",
        "tip": "4-7-8 呼吸と組​​み合わせます — 吸う時間の 2 倍の時間を吐きます。",
        "science": "コルチゾールの減少は 20 分以内に測定可能。 10 Hz のアルファは扁桃体の過剰活性化を抑制します。",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "フェーズ 1: 心を落ち着かせる",
            "effect": "コルチゾールを低下させ、神経系を落ち着かせる",
            "duration": 10
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "フェーズ 2: 回復",
            "effect": "ストレスホルモンの根源を減らす",
            "duration": 10
          },
          {
            "hz": 40,
            "role": "Gamma",
            "label": "フェーズ 3: 集中力",
            "effect": "散らばった思考を固定する",
            "duration": 2
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "フェーズ 4: 一貫性",
            "effect": "休息と消化の状態への移行",
            "duration": 3
          }
        ]
      }
    }
  },
  {
    "id": "skin",
    "cat": "Physical",
    "emoji": "🌱",
    "free": false,
    "title": "Skin Disorders",
    "sub": "Skin microbiome · Immune-skin axis",
    "duration": 30,
    "color": "#10b981",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Skin Axis",
        "effect": "Reduces mast cell activation in skin",
        "duration": 10
      },
      {
        "hz": 285,
        "role": "Regen",
        "label": "Phase 2: Cellular Renewal",
        "effect": "Skin cell regeneration and renewal",
        "duration": 10
      },
      {
        "hz": 432,
        "role": "Stress",
        "label": "Phase 3: Stress Flare Loop",
        "effect": "Reduces stress-induced flares",
        "duration": 5
      },
      {
        "hz": 396,
        "role": "Emotional",
        "label": "Phase 4: Psychosomatic Reset",
        "effect": "Clears emotional stress linked to skin conditions",
        "duration": 5
      }
    ],
    "binaural": 7,
    "instruments": "Soft ambient · Crystal bowls · Nature",
    "protocol": "Daily 30 min + evening sessions during flares. 285 Hz for regeneration, 528 Hz for inflammation.",
    "tip": "Skin disorders have highest psychosomatic component — emotional frequencies often provide breakthrough.",
    "science": "Skin-brain axis: cortisol directly triggers keratinocyte inflammation. 432 Hz breaks the stress-flare loop.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/skin.mp3",
    "translations": {
      "hi": {
        "title": "त्वचा विकार",
        "sub": "त्वचा माइक्रोबायोम · प्रतिरक्षा-त्वचा अक्ष",
        "instruments": "नरम परिवेश · क्रिस्टल कटोरे · प्रकृति",
        "protocol": "भड़कने के दौरान दैनिक 30 मिनट + शाम के सत्र। पुनर्जनन के लिए 285 हर्ट्ज़, सूजन के लिए 528 हर्ट्ज़।",
        "tip": "त्वचा विकारों में उच्चतम मनोदैहिक घटक होते हैं - भावनात्मक आवृत्तियाँ अक्सर सफलता प्रदान करती हैं।",
        "science": "त्वचा-मस्तिष्क अक्ष: कोर्टिसोल सीधे केराटिनोसाइट सूजन को ट्रिगर करता है। 432 हर्ट्ज स्ट्रेस-फ्लेयर लूप को तोड़ता है।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: त्वचा अक्ष",
            "effect": "त्वचा में मस्तूल कोशिका सक्रियण को कम करता है",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "चरण 2: सेलुलर नवीकरण",
            "effect": "त्वचा कोशिका पुनर्जनन और नवीकरण",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Stress",
            "label": "चरण 3: तनाव भड़कना लूप",
            "effect": "तनाव से प्रेरित भड़कना कम करता है",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "चरण 4: मनोदैहिक रीसेट",
            "effect": "त्वचा की स्थिति से जुड़े भावनात्मक तनाव को दूर करता है",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Trastornos de la piel",
        "sub": "Microbioma de la piel · Eje inmunológico-piel",
        "instruments": "Ambiente suave · Cuencos de cristal · Naturaleza",
        "protocol": "Diariamente 30 min + sesiones nocturnas durante los brotes. 285 Hz para regeneración, 528 Hz para inflamación.",
        "tip": "Los trastornos de la piel tienen un componente psicosomático más alto: las frecuencias emocionales a menudo proporcionan un avance.",
        "science": "Eje piel-cerebro: el cortisol desencadena directamente la inflamación de los queratinocitos. 432 Hz rompe el bucle de tensión-expansión.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Eje de la piel",
            "effect": "Reduce la activación de los mastocitos en la piel",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "Fase 2: Renovación celular",
            "effect": "Regeneración y renovación de las células de la piel",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Stress",
            "label": "Fase 3: Stress Flare Loop",
            "effect": "Reduce las erupciones inducidas por el estrés",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "Fase 4: Restablecimiento psicosomático",
            "effect": "Elimina el estrés emocional relacionado con las afecciones de la piel",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Troubles cutanés",
        "sub": "Microbiome cutané · Axe immuno-peau",
        "instruments": "Ambiance douce · Bols de cristal · Nature",
        "protocol": "Séances quotidiennes de 30 min + soirées pendant les poussées. 285 Hz pour la régénération, 528 Hz pour l'inflammation.",
        "tip": "Les troubles cutanés ont une composante psychosomatique la plus élevée – les fréquences émotionnelles permettent souvent une percée.",
        "science": "Axe peau-cerveau : le cortisol déclenche directement l’inflammation des kératinocytes. 432 Hz brise la boucle de poussée de stress.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : Axe cutané",
            "effect": "Réduit l'activation des mastocytes dans la peau",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "Phase 2 : Renouvellement cellulaire",
            "effect": "Régénération et renouvellement des cellules cutanées",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Stress",
            "label": "Phase 3 : Boucle de poussée de stress",
            "effect": "Réduit les poussées induites par le stress",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "Phase 4 : Réinitialisation psychosomatique",
            "effect": "Élimine le stress émotionnel lié aux affections cutanées",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "اضطرابات الجلد",
        "sub": "ميكروبيوم الجلد · محور المناعة والجلد",
        "instruments": "محيط ناعم · أوعية كريستالية · الطبيعة",
        "protocol": "يوميًا 30 دقيقة + جلسات مسائية أثناء التوهجات. 285 هرتز للتجديد، 528 هرتز للالتهاب.",
        "tip": "تحتوي الاضطرابات الجلدية على أعلى مكونات نفسية جسدية - غالبًا ما توفر الترددات العاطفية اختراقًا.",
        "science": "محور الجلد والدماغ: يؤدي الكورتيزول مباشرة إلى التهاب الخلايا الكيراتينية. 432 هرتز يكسر حلقة الإجهاد والتوهج.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: محور الجلد",
            "effect": "يقلل من تنشيط الخلايا البدينة في الجلد",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "المرحلة 2: تجديد الخلايا",
            "effect": "تجديد خلايا الجلد وتجديدها",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Stress",
            "label": "المرحلة 3: حلقة توهج الإجهاد",
            "effect": "تقلل من التوهجات الناجمة عن الإجهاد",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "المرحلة 4: إعادة الضبط النفسي الجسدي",
            "effect": "إزالة التوتر العاطفي المرتبط بالأمراض الجلدية",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "皮膚疾患",
        "sub": "皮膚マイクロバイオーム · 免疫-皮膚軸",
        "instruments": "ソフトアンビエント · クリスタルボウル · 自然",
        "protocol": "毎日 30 分 + 再発中の夜のセッション。再生には 285 Hz、炎症には 528 Hz。",
        "tip": "皮膚疾患には最も心身的な要素が多く、感情的な周波数が突破口となることがよくあります。",
        "science": "皮膚-脳軸: コルチゾールはケラチノサイトの炎症を直接引き起こします。 432 Hz ではストレス-フレア ループが切れます。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: 皮膚軸",
            "effect": "皮膚のマスト細胞の活性化を抑制します",
            "duration": 10
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "フェーズ 2: 細胞の再生",
            "effect": "皮膚細胞の再生と再生",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Stress",
            "label": "フェーズ 3: ストレスフレアループ",
            "effect": "ストレス誘発性のフレアを軽減します",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "フェーズ 4: 心身リセット",
            "effect": "皮膚の状態に関連する感情的ストレスを解消します",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "alzheimers",
    "cat": "Physical",
    "emoji": "🧩",
    "free": false,
    "title": "Alzheimer's & Dementia",
    "sub": "Hippocampus · Cortical networks",
    "duration": 60,
    "color": "#a855f7",
    "freqs": [
      {
        "hz": 40,
        "role": "Primary",
        "label": "Phase 1: Plaque Clearance",
        "effect": "MIT: 1hr/day reduced amyloid plaques 50%",
        "duration": 20
      },
      {
        "hz": 528,
        "role": "Memory",
        "label": "Phase 2: Memory Network",
        "effect": "Supports neural plasticity and memory",
        "duration": 20
      },
      {
        "hz": 432,
        "role": "Emotion",
        "label": "Phase 3: Emotional Recall",
        "effect": "Evokes memory through emotional pathways",
        "duration": 10
      },
      {
        "hz": 10,
        "role": "Alpha",
        "label": "Phase 4: Integration",
        "effect": "Memory network re-engagement",
        "duration": 10
      }
    ],
    "binaural": 40,
    "instruments": "Personalized music · Singing bowls",
    "protocol": "Daily 1hr. Use personally meaningful music from patient's youth (ages 15–25).",
    "tip": "Personalized playlists produce recall even in late-stage dementia.",
    "science": "GENUS trial: 40 Hz reduced tau tangles and amyloid-β in cortex.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/alzheimers.mp3",
    "translations": {
      "hi": {
        "title": "अल्जाइमर और डिमेंशिया",
        "sub": "हिप्पोकैम्पस · कॉर्टिकल नेटवर्क",
        "instruments": "वैयक्तिकृत संगीत · गायन कटोरे",
        "protocol": "दैनिक 1 घंटा। रोगी की युवावस्था (15-25 वर्ष) के व्यक्तिगत रूप से सार्थक संगीत का उपयोग करें।",
        "tip": "वैयक्तिकृत प्लेलिस्ट अंतिम चरण के मनोभ्रंश में भी याद दिलाती हैं।",
        "science": "जीनस परीक्षण: कॉर्टेक्स में 40 हर्ट्ज कम ताऊ टेंगल्स और अमाइलॉइड-बीटा।",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "चरण 1: प्लाक क्लीयरेंस",
            "effect": "एमआईटी: 1 घंटा/दिन कम अमाइलॉइड प्लाक 50%",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "Memory",
            "label": "चरण 2: मेमोरी नेटवर्क",
            "effect": "तंत्रिका प्लास्टिसिटी और मेमोरी का समर्थन करता है",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Emotion",
            "label": "चरण 3: भावनात्मक स्मरण",
            "effect": "भावनात्मक मार्गों के माध्यम से स्मृति को जागृत करता है",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "चरण 4: एकीकरण",
            "effect": "मेमोरी नेटवर्क पुनः जुड़ाव",
            "duration": 10
          }
        ]
      },
      "es": {
        "title": "Alzheimer y Demencia",
        "sub": "Hipocampo · Redes corticales",
        "instruments": "Música personalizada · Cuencos tibetanos",
        "protocol": "Diaria 1h. Utilice música personalmente significativa de la juventud del paciente (entre 15 y 25 años).",
        "tip": "Las listas de reproducción personalizadas producen recuerdos incluso en las últimas etapas de la demencia.",
        "science": "Ensayo GENUS: 40 Hz redujeron los ovillos de tau y el β-amiloide en la corteza.",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "Fase 1: Eliminación de placa",
            "effect": "MIT: 1 hora/día reduce las placas de amiloide al 50%",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "Memory",
            "label": "Fase 2: Red de memoria",
            "effect": "Apoya la plasticidad neuronal y la memoria",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Emotion",
            "label": "Fase 3: Recuerdo emocional",
            "effect": "Evoca la memoria a través de vías emocionales",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "Fase 4: Integración",
            "effect": "Reintegración de la red de memoria",
            "duration": 10
          }
        ]
      },
      "fr": {
        "title": "Alzheimer et démence",
        "sub": "Hippocampe · Réseaux corticaux",
        "instruments": "Musique personnalisée · Bols chantants",
        "protocol": "Daily 1hr. Utilisez de la musique personnellement significative provenant de la jeunesse du patient (âgés de 15 à 25 ans).",
        "tip": "Les listes de lecture personnalisées produisent un rappel même en cas de démence à un stade avancé.",
        "science": "Essai GENUS : 40 Hz ont réduit les enchevêtrements de tau et l'amyloïde-β dans le cortex.",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "Phase 1 : élimination de la plaque",
            "effect": "MIT : 1h/jour plaques amyloïdes réduites de 50%",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "Memory",
            "label": "Phase 2 : Réseau de mémoire",
            "effect": "Prend en charge la plasticité neuronale et la mémoire",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Emotion",
            "label": "Phase 3 : Rappel émotionnel",
            "effect": "Évoque la mémoire à travers des chemins émotionnels",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "Phase 4 : Intégration",
            "effect": "Réengagement du réseau mémoire",
            "duration": 10
          }
        ]
      },
      "ar": {
        "title": "مرض الزهايمر والخرف",
        "sub": "الحصين · الشبكات القشرية",
        "instruments": "موسيقى مخصصة · أوعية الغناء",
        "protocol": "يوميًا لمدة ساعة واحدة. استخدم موسيقى ذات معنى شخصي من شباب المريض (الذين تتراوح أعمارهم بين 15 و25 عامًا).",
        "tip": "تؤدي قوائم التشغيل المخصصة إلى استدعاء الأصوات حتى في المراحل المتأخرة من الخرف.",
        "science": "تجربة GENUS: خفضت 40 هرتز تشابكات تاو وأميلويد-بيتا في القشرة.",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "المرحلة 1: إزالة اللويحات",
            "effect": "معهد ماساتشوستس للتكنولوجيا: لويحات الأميلويد المخفضة بنسبة 50% لمدة ساعة/يوم",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "Memory",
            "label": "المرحلة 2: شبكة الذاكرة",
            "effect": "تدعم اللدونة العصبية والذاكرة",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Emotion",
            "label": "المرحلة 3: الاستدعاء العاطفي",
            "effect": "تثير الذاكرة من خلال المسارات العاطفية",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "المرحلة 4: التكامل",
            "effect": "إعادة مشاركة شبكة الذاكرة",
            "duration": 10
          }
        ]
      },
      "ja": {
        "title": "アルツハイマー病と認知症",
        "sub": "海馬 · 皮質ネットワーク",
        "instruments": "パーソナライズされた音楽 · シンギングボウル",
        "protocol": "毎日 1 時間。患者の若い頃（15 ～ 25 歳）の個人的に意味のある音楽を使用します。",
        "tip": "パーソナライズされたプレイリストは、認知症の後期段階でも思い出すことができます。",
        "science": "GENUS 試験: 40 Hz は皮質のタウもつれとアミロイドβを減少させました。",
        "freqs": [
          {
            "hz": 40,
            "role": "Primary",
            "label": "フェーズ 1: プラーク除去",
            "effect": "MIT: 1 時間/日でアミロイド斑が 50% 減少",
            "duration": 20
          },
          {
            "hz": 528,
            "role": "Memory",
            "label": "フェーズ 2: 記憶ネットワーク",
            "effect": "神経可塑性と記憶をサポート",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "Emotion",
            "label": "フェーズ 3: 感情の想起",
            "effect": "感情経路を通じて記憶を呼び起こす",
            "duration": 10
          },
          {
            "hz": 10,
            "role": "Alpha",
            "label": "フェーズ 4: 統合",
            "effect": "記憶ネットワークの再結合",
            "duration": 10
          }
        ]
      }
    }
  },
  {
    "id": "autoimmune",
    "cat": "Chronic",
    "emoji": "🔬",
    "free": false,
    "title": "Autoimmune Diseases",
    "sub": "Immune system dysregulation",
    "duration": 45,
    "color": "#84cc16",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Inflammatory Control",
        "effect": "Reduces chronic systemic inflammation",
        "duration": 20
      },
      {
        "hz": 432,
        "role": "HPA",
        "label": "Phase 2: Stress Downregulation",
        "effect": "Downregulates stress-immune overactivation",
        "duration": 15
      },
      {
        "hz": 285,
        "role": "Regen",
        "label": "Phase 3: Tissue Regeneration",
        "effect": "Cellular regeneration — heals immune-damaged tissue",
        "duration": 5
      },
      {
        "hz": 396,
        "role": "Emotional",
        "label": "Phase 4: Trauma Release",
        "effect": "Releases trauma — key driver of immune dysregulation",
        "duration": 5
      }
    ],
    "binaural": 7,
    "instruments": "Crystal bowls (A=432 Hz) · Ambient drone",
    "protocol": "Daily 30–60 min. Layer 396 Hz emotional sessions 2× weekly.",
    "tip": "Unresolved trauma links to autoimmune onset — emotional frequencies are critical.",
    "science": "528 Hz reduces NF-κB pathway activation. 432 Hz reduces IL-6 markers.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/autoimmune.mp3",
    "translations": {
      "hi": {
        "title": "ऑटोइम्यून रोग",
        "sub": "प्रतिरक्षा प्रणाली की गड़बड़ी",
        "instruments": "क्रिस्टल बाउल्स (ए=432 हर्ट्ज) · एम्बिएंट ड्रोन",
        "protocol": "दैनिक 30-60 मिनट। परत 396 हर्ट्ज़ भावनात्मक सत्र 2× साप्ताहिक।",
        "tip": "अनसुलझे आघात ऑटोइम्यून शुरुआत से जुड़े हैं - भावनात्मक आवृत्तियाँ महत्वपूर्ण हैं।",
        "science": "528 हर्ट्ज NF-κB पाथवे सक्रियण को कम करता है। 432 Hz IL-6 मार्करों को कम करता है।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: सूजन नियंत्रण",
            "effect": "पुरानी प्रणालीगत सूजन को कम करता है",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "चरण 2: तनाव डाउनरेगुलेशन",
            "effect": "तनाव-प्रतिरक्षा अतिसक्रियता को डाउनरेगुलेट करता है",
            "duration": 15
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "चरण 3: ऊतक पुनर्जनन",
            "effect": "सेलुलर पुनर्जनन - प्रतिरक्षा-क्षतिग्रस्त ऊतक को ठीक करता है",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "चरण 4: आघात मुक्ति",
            "effect": "आघात मुक्त करता है - प्रतिरक्षा विकृति का प्रमुख चालक",
            "duration": 5
          }
        ]
      },
      "es": {
        "title": "Enfermedades autoinmunes",
        "sub": "Desregulación del sistema inmunológico",
        "instruments": "Cuencos de cristal (A=432 Hz) · Dron ambiental",
        "protocol": "Diariamente 30–60 min. Capa de sesiones emocionales de 396 Hz 2 veces por semana.",
        "tip": "Los traumas no resueltos se vinculan con la aparición de enfermedades autoinmunes: las frecuencias emocionales son fundamentales.",
        "science": "528 Hz reduce la activación de la vía NF-κB. 432 Hz reduce los marcadores de IL-6.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Control inflamatorio",
            "effect": "Reduce la inflamación sistémica crónica",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "Fase 2: Regulación negativa del estrés",
            "effect": "Regula negativamente la sobreactivación inmune del estrés",
            "duration": 15
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "Fase 3: Regeneración de tejidos",
            "effect": "Regeneración celular: cura el tejido inmunitario dañado",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "Fase 4: Liberación del trauma",
            "effect": "Libera el trauma, factor clave de la desregulación inmunitaria",
            "duration": 5
          }
        ]
      },
      "fr": {
        "title": "Maladies auto-immunes",
        "sub": "Dérégulation du système immunitaire",
        "instruments": "Bols de cristal (A=432 Hz) · Drone ambiant",
        "protocol": "Quotidiennement 30 à 60 minutes. Séances émotionnelles en couches 396 Hz 2 fois par semaine.",
        "tip": "Les traumatismes non résolus sont liés à une apparition auto-immune – les fréquences émotionnelles sont critiques.",
        "science": "528 Hz réduit l'activation de la voie NF-κB. 432 Hz réduit les marqueurs IL-6.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : Contrôle inflammatoire",
            "effect": "Réduit l’inflammation systémique chronique",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "Phase 2 : régulation négative du stress",
            "effect": "Régule à la baisse la suractivation immunitaire contre le stress",
            "duration": 15
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "Phase 3 : Régénération des tissus",
            "effect": "Régénération cellulaire – guérit les tissus immunitairement endommagés",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "Phase 4 : Libération du traumatisme",
            "effect": "Libère le traumatisme – facteur clé de la dérégulation immunitaire",
            "duration": 5
          }
        ]
      },
      "ar": {
        "title": "أمراض المناعة الذاتية",
        "sub": "خلل تنظيم الجهاز المناعي",
        "instruments": "الأوعية الكريستالية (A = 432 هرتز) · الطائرة بدون طيار المحيطة",
        "protocol": "يوميًا 30-60 دقيقة. جلسات عاطفية بطبقة 396 هرتز 2× أسبوعيًا.",
        "tip": "ترتبط الصدمات التي لم يتم حلها ببداية المناعة الذاتية - فالترددات العاطفية حاسمة.",
        "science": "528 هرتز يقلل من تنشيط مسار NF-κB. 432 هرتز يقلل من علامات IL-6.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: التحكم في الالتهاب",
            "effect": "يقلل الالتهاب الجهازي المزمن",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "المرحلة 2: تقليل تنظيم الإجهاد",
            "effect": "يقلل من فرط نشاط المناعة الناتج عن الإجهاد",
            "duration": 15
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "المرحلة 3: تجديد الأنسجة",
            "effect": "تجديد الخلايا - يشفي الأنسجة المتضررة من المناعة",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "المرحلة 4: التخلص من الصدمات",
            "effect": "إطلاق الصدمات - المحرك الرئيسي لخلل التنظيم المناعي",
            "duration": 5
          }
        ]
      },
      "ja": {
        "title": "自己免疫疾患",
        "sub": "免疫系調節不全",
        "instruments": "クリスタル ボウル (A=432 Hz) · アンビエント ドローン",
        "protocol": "毎日 30 ～ 60 分。 396 Hz の感情的なセッションを週に 2 回繰り返します。",
        "tip": "未解決のトラウマは自己免疫の発症に関連しています。感情の頻度が重要です。",
        "science": "528 Hz は NF-κB 経路の活性化を低下させます。 432 Hz では IL-6 マーカーが減少します。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: 炎症制御",
            "effect": "慢性全身性炎症を軽減",
            "duration": 20
          },
          {
            "hz": 432,
            "role": "HPA",
            "label": "フェーズ 2: ストレス下方制御",
            "effect": "ストレス免疫の過剰活性化を下方制御",
            "duration": 15
          },
          {
            "hz": 285,
            "role": "Regen",
            "label": "フェーズ 3: 組織再生",
            "effect": "細胞再生 — 免疫損傷組織の治癒",
            "duration": 5
          },
          {
            "hz": 396,
            "role": "Emotional",
            "label": "フェーズ 4: トラウマの解放",
            "effect": "トラウマの解放 — 免疫調節不全の主な要因",
            "duration": 5
          }
        ]
      }
    }
  },
  {
    "id": "respiratory",
    "cat": "Physical",
    "emoji": "🫁",
    "free": false,
    "title": "Respiratory Disorders",
    "sub": "Lungs · Bronchial airways",
    "duration": 20,
    "color": "#06b6d4",
    "freqs": [
      {
        "hz": 528,
        "role": "Primary",
        "label": "Phase 1: Airway Inflammation",
        "effect": "Reduces bronchial inflammation",
        "duration": 10
      },
      {
        "hz": 432,
        "role": "Breathing",
        "label": "Phase 2: Breath Expansion",
        "effect": "Slows breathing rate — expands capacity",
        "duration": 5
      },
      {
        "hz": 285,
        "role": "Tissue",
        "label": "Phase 3: Tissue Support",
        "effect": "Bronchial tissue regeneration",
        "duration": 2.5
      },
      {
        "hz": 174,
        "role": "Relax",
        "label": "Phase 4: Tension Release",
        "effect": "Deep diaphragmatic tension release",
        "duration": 2.5
      }
    ],
    "binaural": 7,
    "instruments": "Flute · Throat singing · Didgeridoo",
    "protocol": "528 Hz + pursed-lip breathing: inhale 2s, exhale 4–6s. 20 min, 2× daily.",
    "tip": "Even listening to wind instruments neurologically activates respiratory muscles.",
    "science": "528 Hz reduces bronchial mast cell degranulation. Didgeridoo training improves FEV1 in COPD.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/respiratory.mp3",
    "translations": {
      "hi": {
        "title": "श्वसन संबंधी विकार",
        "sub": "फेफड़े · ब्रोन्कियल वायुमार्ग",
        "instruments": "बांसुरी · गले से गाना · डिडगेरिडू",
        "protocol": "528 हर्ट्ज + होठों से सांस लेना: 2 सेकेंड में सांस लें, 4-6 सेकेंड में सांस छोड़ें। 20 मिनट, 2× प्रतिदिन।",
        "tip": "वायु वाद्य यंत्रों को सुनने से भी तंत्रिका संबंधी रूप से श्वसन मांसपेशियां सक्रिय हो जाती हैं।",
        "science": "528 हर्ट्ज ब्रोन्कियल मास्ट सेल गिरावट को कम करता है। डिडगेरिडू प्रशिक्षण सीओपीडी में एफईवी1 में सुधार करता है।",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "चरण 1: वायुमार्ग की सूजन",
            "effect": "ब्रोन्कियल सूजन को कम करता है",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Breathing",
            "label": "चरण 2: सांस का विस्तार",
            "effect": "सांस लेने की दर को धीमा करता है - क्षमता का विस्तार करता है",
            "duration": 5
          },
          {
            "hz": 285,
            "role": "Tissue",
            "label": "चरण 3: ऊतक समर्थन",
            "effect": "ब्रोन्कियल ऊतक पुनर्जनन",
            "duration": 2.5
          },
          {
            "hz": 174,
            "role": "Relax",
            "label": "चरण 4: तनाव मुक्ति",
            "effect": "गहरी डायाफ्रामिक तनाव मुक्ति",
            "duration": 2.5
          }
        ]
      },
      "es": {
        "title": "Trastornos respiratorios",
        "sub": "Pulmones · Vías respiratorias bronquiales",
        "instruments": "Flauta · Canto de garganta · Didgeridoo",
        "protocol": "528 Hz + respiración con labios fruncidos: inhala 2 s, exhala 4-6 s. 20 min, 2 veces al día.",
        "tip": "Incluso escuchar instrumentos de viento activa neurológicamente los músculos respiratorios.",
        "science": "528 Hz reduce la desgranulación de los mastocitos bronquiales. El entrenamiento con didgeridoo mejora el FEV1 en la EPOC.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Fase 1: Inflamación de las vías respiratorias",
            "effect": "Reduce la inflamación bronquial",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Breathing",
            "label": "Fase 2: Expansión de la respiración",
            "effect": "Disminuye la frecuencia respiratoria — expande la capacidad",
            "duration": 5
          },
          {
            "hz": 285,
            "role": "Tissue",
            "label": "Fase 3: Soporte del tejido",
            "effect": "Regeneración del tejido bronquial",
            "duration": 2.5
          },
          {
            "hz": 174,
            "role": "Relax",
            "label": "Fase 4: Liberación de tensión",
            "effect": "Liberación profunda de la tensión diafragmática",
            "duration": 2.5
          }
        ]
      },
      "fr": {
        "title": "Troubles respiratoires",
        "sub": "Poumons · Voies respiratoires bronchiques",
        "instruments": "Flûte · Chant de gorge · Didgeridoo",
        "protocol": "528 Hz + respiration à lèvres pincées : inspirez 2 s, expirez 4 à 6 s. 20 minutes, 2 fois par jour.",
        "tip": "Même l'écoute d'instruments à vent active neurologiquement les muscles respiratoires.",
        "science": "528 Hz réduit la dégranulation des mastocytes bronchiques. La formation au didgeridoo améliore le VEMS dans la BPCO.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "Phase 1 : Inflammation des voies respiratoires",
            "effect": "Réduit l'inflammation bronchique",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Breathing",
            "label": "Phase 2 : Expansion respiratoire",
            "effect": "Ralentit le rythme respiratoire — augmente la capacité",
            "duration": 5
          },
          {
            "hz": 285,
            "role": "Tissue",
            "label": "Phase 3 : Soutien des tissus",
            "effect": "Régénération du tissu bronchique",
            "duration": 2.5
          },
          {
            "hz": 174,
            "role": "Relax",
            "label": "Phase 4 : Relâchement de tension",
            "effect": "Relâchement de tension diaphragmatique profond",
            "duration": 2.5
          }
        ]
      },
      "ar": {
        "title": "اضطرابات الجهاز التنفسي",
        "sub": "الرئتان · الشعب الهوائية",
        "instruments": "الناي · غناء الحلق · ديدجيريدو",
        "protocol": "528 هرتز + التنفس بزم الشفاه: شهيق 2 ثانية، زفير 4-6 ثانية. 20 دقيقة، 2 × يوميا.",
        "tip": "حتى الاستماع إلى الآلات النفخية ينشط عضلات الجهاز التنفسي عصبيا.",
        "science": "528 هرتز يقلل من تحلل الخلايا البدينة في القصبات الهوائية. تدريب الديدجيريدو يحسن FEV1 في مرض الانسداد الرئوي المزمن.",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "المرحلة 1: التهاب مجرى الهواء",
            "effect": "يقلل التهاب الشعب الهوائية",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Breathing",
            "label": "المرحلة 2: تمدد التنفس",
            "effect": "إبطاء معدل التنفس - توسيع القدرة",
            "duration": 5
          },
          {
            "hz": 285,
            "role": "Tissue",
            "label": "المرحلة 3: دعم الأنسجة",
            "effect": "تجديد أنسجة الشعب الهوائية",
            "duration": 2.5
          },
          {
            "hz": 174,
            "role": "Relax",
            "label": "المرحلة 4: إطلاق التوتر",
            "effect": "إطلاق التوتر الحجابي العميق",
            "duration": 2.5
          }
        ]
      },
      "ja": {
        "title": "呼吸器疾患",
        "sub": "肺 · 気管支気道",
        "instruments": "フルート · 喉歌 · ディジュリドゥ",
        "protocol": "528 Hz + 口をすぼめた呼吸: 2 秒吸って、4 ～ 6 秒吐きます。 20分、毎日2回。",
        "tip": "管楽器を聴いているだけでも、神経的に呼吸筋が活性化されます。",
        "science": "528 Hz は気管支肥満細胞の脱顆粒を軽減します。ディジュリドゥトレーニングは COPD の FEV1 を改善します。",
        "freqs": [
          {
            "hz": 528,
            "role": "Primary",
            "label": "フェーズ 1: 気道の炎症",
            "effect": "気管支の炎症を軽減",
            "duration": 10
          },
          {
            "hz": 432,
            "role": "Breathing",
            "label": "フェーズ 2: 呼吸の拡張",
            "effect": "呼吸数を遅くする — 能力を拡大",
            "duration": 5
          },
          {
            "hz": 285,
            "role": "Tissue",
            "label": "フェーズ 3: 組織のサポート",
            "effect": "気管支組織の再生",
            "duration": 2.5
          },
          {
            "hz": 174,
            "role": "Relax",
            "label": "フェーズ 4: 緊張の解放",
            "effect": "深部横隔膜の緊張の解放",
            "duration": 2.5
          }
        ]
      }
    }
  },
  {
    "id": "heart-recovery-1",
    "cat": "Cardiovascular Disease",
    "emoji": "🩹",
    "free": false,
    "title": "Post-Cardiac Recovery — Phase 1 (Weeks 1–2)",
    "sub": "POST-CARDIAC EVENT RECOVERY · Phase 1 (Weeks 1–2)",
    "duration": 20,
    "color": "#ec4899",
    "freqs": [
      {
        "hz": 432,
        "role": "Primary",
        "label": "Phase 1: Safety-First Baseline",
        "effect": "Supports autonomic system rest, lowers vascular resistance",
        "duration": 20
      }
    ],
    "binaural": 6,
    "instruments": "Ambient drone · Slow bowls",
    "protocol": "Weeks 1-2 post-event. Safety-first focus. Listen in a comfortable lying position.",
    "tip": "Do not force deep breathing; let your breath settle naturally.",
    "science": "432 Hz resonance under low volume conditions downregulates panic response, stabilizing early recovery.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/Phase%201%20%E2%80%94%20Respiratory%20Entrainment%20(0%E2%80%938%20min).wav",
    "translations": {
      "hi": {
        "title": "पोस्ट-कार्डियक रिकवरी - चरण 1 (सप्ताह 1-2)",
        "sub": "पोस्ट-कार्डियक घटना रिकवरी · चरण 1 (सप्ताह 1-2)",
        "instruments": "एम्बिएंट ड्रोन · स्लो बाउल्स",
        "protocol": "सप्ताह 1-2 घटना के बाद। सुरक्षा-पहला फोकस. आरामदायक लेटकर सुनें।",
        "tip": "गहरी सांस लेने के लिए बाध्य न करें; अपनी सांस को स्वाभाविक रूप से स्थिर होने दें।",
        "science": "कम मात्रा की स्थिति में 432 हर्ट्ज प्रतिध्वनि घबराहट की प्रतिक्रिया को कम कर देती है, जल्दी ठीक होने को स्थिर कर देती है।",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "चरण 1: सुरक्षा-प्रथम आधार रेखा",
            "effect": "स्वायत्त प्रणाली के आराम का समर्थन करता है, संवहनी प्रतिरोध को कम करता है",
            "duration": 20
          }
        ]
      },
      "es": {
        "title": "Recuperación poscardíaca: Fase 1 (semanas 1 a 2)",
        "sub": "RECUPERACIÓN POST-EVENTO CARDIACO · Fase 1 (semanas 1 a 2)",
        "instruments": "Dron ambiental · Tazones lentos",
        "protocol": "Semanas 1 a 2 después del evento. Enfoque en la seguridad. Escuche en una posición cómoda acostada.",
        "tip": "No fuerces la respiración profunda; deja que tu respiración se calme naturalmente.",
        "science": "La resonancia de 432 Hz en condiciones de bajo volumen regula a la baja la respuesta de pánico, estabilizando la recuperación temprana.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Fase 1: Línea de base primero en la seguridad",
            "effect": "Favorece el descanso del sistema autónomo y reduce la resistencia vascular",
            "duration": 20
          }
        ]
      },
      "fr": {
        "title": "Récupération post-cardiaque – Phase 1 (semaines 1 à 2)",
        "sub": "RÉCUPÉRATION POST-ÉVÉNEMENT CARDIAQUE · Phase 1 (semaines 1 à 2)",
        "instruments": "Drone ambiant · Bols lents",
        "protocol": "Semaines 1 à 2 après l'événement. La sécurité avant tout. Écoutez dans une position allongée confortable.",
        "tip": "Ne forcez pas la respiration profonde ; laissez votre respiration se calmer naturellement.",
        "science": "La résonance de 432 Hz dans des conditions de faible volume régule à la baisse la réponse de panique, stabilisant ainsi une récupération précoce.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Phase 1 : Référence axée sur la sécurité avant tout",
            "effect": "Favorise le repos du système autonome, réduit la résistance vasculaire",
            "duration": 20
          }
        ]
      },
      "ar": {
        "title": "تعافي ما بعد القلب - المرحلة 1 (الأسابيع 1-2)",
        "sub": "التعافي من حدث ما بعد القلب · المرحلة 1 (الأسابيع 1-2)",
        "instruments": "طائرة بدون طيار محيطة · أوعية بطيئة",
        "protocol": "الأسابيع 1-2 بعد الحدث. التركيز على السلامة أولاً. استمع في وضعية استلقاء مريحة.",
        "tip": "لا تجبر على التنفس العميق؛ دع أنفاسك تستقر بشكل طبيعي.",
        "science": "الرنين 432 هرتز في ظل ظروف انخفاض مستوى الصوت يقلل من استجابة الذعر، مما يؤدي إلى استقرار التعافي المبكر.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "المرحلة الأولى: خط الأساس للسلامة أولاً",
            "effect": "يدعم راحة الجهاز اللاإرادي، ويقلل من مقاومة الأوعية الدموية",
            "duration": 20
          }
        ]
      },
      "ja": {
        "title": "心臓イベント後の回復 — フェーズ 1 (1 ～ 2 週間)",
        "sub": "心臓イベント後の回復 · フェーズ 1 (1 ～ 2 週間)",
        "instruments": "アンビエント ドローン · スローボウル",
        "protocol": "イベント後 1 ～ 2 週間。安全第一のこだわり。快適な寝姿勢で聞いてください。",
        "tip": "深呼吸を強制しないでください。呼吸が自然に落ち着くようにしてください。",
        "science": "低音量条件下での 432 Hz の共振はパニック反応を抑制し、早期回復を安定させます。",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "フェーズ 1: 安全第一のベースライン",
            "effect": "自律神経系の休息をサポートし、血管抵抗を低下させます",
            "duration": 20
          }
        ]
      }
    }
  },
  {
    "id": "heart-daily",
    "cat": "Cardiovascular Disease",
    "emoji": "❤️",
    "free": true,
    "title": "Daily Cardiovascular Maintenance",
    "sub": "PROTOCOL 1: DAILY CARDIOVASCULAR MAINTENANCE · Coherence",
    "duration": 30,
    "color": "#ec4899",
    "freqs": [
      {
        "hz": 432,
        "role": "Primary",
        "label": "Phase 1: Respiratory Entrainment",
        "effect": "Respiratory entrainment and nervous system settling",
        "duration": 8,
        "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/Phase%201%20%E2%80%94%20Respiratory%20Entrainment%20(0%E2%80%938%20min).wav"
      },
      {
        "hz": 528,
        "role": "Support",
        "label": "Phase 2: 528 Hz Anti-Inflammatory Core",
        "effect": "Cellular repair and cardiac inflammation reduction",
        "duration": 14,
        "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/Phase%202%20%E2%80%94%20528%20Hz%20Anti-Inflammatory%20Core%20(8%E2%80%9322%20min).wav"
      },
      {
        "hz": 7.83,
        "role": "Schumann",
        "label": "Phase 3: Cardiac Coherence Close",
        "effect": "Earth resonance and HRV stability",
        "duration": 8,
        "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/Phase%203%20%E2%80%94%20Cardiac%20Coherence%20Close.wav"
      }
    ],
    "binaural": 10,
    "instruments": "Harp · Soft piano · Nature",
    "protocol": "PROTOCOL 1: DAILY CARDIOVASCULAR MAINTENANCE — Listen for 30 min daily. Focus on cardiac coherence.",
    "tip": "Close your eyes, breathe with the 60 BPM rhythm.",
    "science": "528 Hz reduces ROS in H9c2 cardiac cells. 432 Hz lowers sympathetic nervous activity.",
    "audio_url": "https://pub-963621c2a93a4926af863b96398d4c46.r2.dev/hilling/music/Phase%201%20%E2%80%94%20Respiratory%20Entrainment%20(0%E2%80%938%20min).wav",
    "translations": {
      "hi": {
        "title": "दैनिक हृदय रखरखाव",
        "sub": "प्रोटोकॉल 1: दैनिक हृदय रखरखाव · सुसंगतता",
        "instruments": "हार्प · सॉफ्ट पियानो · प्रकृति",
        "protocol": "प्रोटोकॉल 1: दैनिक हृदय रखरखाव - प्रतिदिन 30 मिनट सुनें। हृदय सुसंगतता पर ध्यान दें.",
        "tip": "अपनी आंखें बंद करें, 60 बीपीएम लय के साथ सांस लें।",
        "science": "528 हर्ट्ज H9c2 हृदय कोशिकाओं में ROS को कम करता है। 432 हर्ट्ज सहानुभूति तंत्रिका गतिविधि को कम करता है।",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "चरण 1: श्वसन प्रवेश",
            "effect": "श्वसन प्रवेश और तंत्रिका तंत्र व्यवस्थित",
            "duration": 8
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "चरण 2: 528 हर्ट्ज एंटी-इंफ्लेमेटरी कोर",
            "effect": "सेलुलर मरम्मत और हृदय सूजन में कमी",
            "duration": 14
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "चरण 3: हृदय सुसंगतता बंद",
            "effect": "पृथ्वी प्रतिध्वनि और एचआरवी स्थिरता",
            "duration": 8
          }
        ]
      },
      "es": {
        "title": "Mantenimiento Cardiovascular Diario",
        "sub": "PROTOCOLO 1: MANTENIMIENTO CARDIOVASCULAR DIARIO · Coherencia",
        "instruments": "Arpa · Piano suave · Naturaleza",
        "protocol": "PROTOCOLO 1: MANTENIMIENTO CARDIOVASCULAR DIARIO — Escuche durante 30 min diarios. Centrarse en la coherencia cardíaca.",
        "tip": "Cierra los ojos, respira con el ritmo de 60 BPM.",
        "science": "528 Hz reduce las ROS en las células cardíacas H9c2. 432 Hz reduce la actividad nerviosa simpática.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Fase 1: Arranque respiratorio",
            "effect": "Arranque respiratorio y asentamiento del sistema nervioso",
            "duration": 8
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "Fase 2: Núcleo antiinflamatorio de 528 Hz",
            "effect": "Reparación celular y reducción de la inflamación cardíaca",
            "duration": 14
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "Fase 3: Coherencia cardíaca Cerrar",
            "effect": "Resonancia terrestre y estabilidad de la VFC",
            "duration": 8
          }
        ]
      },
      "fr": {
        "title": "Entretien cardiovasculaire quotidien",
        "sub": "PROTOCOLE 1 : ENTRETIEN CARDIOVASCULAIRE QUOTIDIEN · Cohérence",
        "instruments": "Harpe · Piano doux · Nature",
        "protocol": "PROTOCOLE 1 : ENTRETIEN CARDIOVASCULAIRE QUOTIDIEN — Écoutez pendant 30 minutes par jour. Focus sur la cohérence cardiaque.",
        "tip": "Fermez les yeux, respirez au rythme de 60 BPM.",
        "science": "528 Hz réduit les ROS dans les cellules cardiaques H9c2. 432 Hz diminue l'activité nerveuse sympathique.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "Phase 1 : entraînement respiratoire",
            "effect": "Entraînement respiratoire et stabilisation du système nerveux",
            "duration": 8
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "Phase 2 : Noyau anti-inflammatoire 528 Hz",
            "effect": "Réparation cellulaire et réduction de l’inflammation cardiaque",
            "duration": 14
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "Phase 3 : Clôture de la cohérence cardiaque",
            "effect": "Résonance terrestre et stabilité du VRC",
            "duration": 8
          }
        ]
      },
      "ar": {
        "title": "الصيانة اليومية للقلب والأوعية الدموية",
        "sub": "البروتوكول 1: الصيانة اليومية للقلب والأوعية الدموية · التماسك",
        "instruments": "القيثارة · البيانو الناعم · الطبيعة",
        "protocol": "البروتوكول 1: الصيانة اليومية للقلب والأوعية الدموية - استمع لمدة 30 دقيقة يوميًا. التركيز على تماسك القلب.",
        "tip": "أغمض عينيك، وتنفس بإيقاع 60 نبضة في الدقيقة.",
        "science": "528 هرتز يقلل ROS في خلايا القلب H9c2. 432 هرتز يقلل من النشاط العصبي الودي.",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "المرحلة 1: احتجاز الجهاز التنفسي",
            "effect": "حبس الجهاز التنفسي وتسوية الجهاز العصبي",
            "duration": 8
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "المرحلة 2: قلب مضاد للالتهابات بتردد 528 هرتز",
            "effect": "إصلاح الخلايا وتقليل التهاب القلب",
            "duration": 14
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "المرحلة 3: إغلاق تماسك القلب",
            "effect": "رنين الأرض واستقرار معدل ضربات القلب",
            "duration": 8
          }
        ]
      },
      "ja": {
        "title": "毎日の心血管メンテナンス",
        "sub": "プロトコル 1: 毎日の心血管メンテナンス · コヒーレンス",
        "instruments": "ハープ · ソフト ピアノ · 自然",
        "protocol": "プロトコル 1: 毎日の心血管メンテナンス — 毎日 30 分間聞いてください。心臓の一貫性に焦点を当てます。",
        "tip": "目を閉じて、60 BPM のリズムで呼吸してください。",
        "science": "528 Hz は、H9c2 心臓細胞の ROS を減少させます。 432 Hz は交感神経活動を低下させます。",
        "freqs": [
          {
            "hz": 432,
            "role": "Primary",
            "label": "フェーズ 1: 呼吸同調",
            "effect": "呼吸同調と神経系の安定",
            "duration": 8
          },
          {
            "hz": 528,
            "role": "Support",
            "label": "フェーズ 2: 528 Hz 抗炎症コア",
            "effect": "細胞修復と心臓炎症の軽減",
            "duration": 14
          },
          {
            "hz": 7.83,
            "role": "Schumann",
            "label": "フェーズ 3: 心臓のコヒーレンス 閉じる",
            "effect": "地球共鳴と HRV の安定性",
            "duration": 8
          }
        ]
      }
    }
  }
];

/* ═══════════════════════════════════════════════════════════
   SOLFEGGIO FREQUENCIES MAP
═══════════════════════════════════════════════════════════ */
export const SOLFEGGIO = [
  {
    "hz": 174,
    "note": "F",
    "name": "Foundation",
    "action": "Pain relief & anesthesia",
    "color": "#6366f1",
    "translations": {
      "hi": {
        "name": "फाउंडेशन",
        "action": "दर्द से राहत और एनेस्थीसिया"
      },
      "es": {
        "name": "Fundación",
        "action": "Alivio del dolor y anestesia"
      },
      "fr": {
        "name": "Fond de teint",
        "action": "Soulagement de la douleur et anesthésie"
      },
      "ar": {
        "name": "الأساس",
        "action": "تسكين الآلام والتخدير"
      },
      "ja": {
        "name": "基礎",
        "action": "鎮痛と麻酔"
      }
    }
  },
  {
    "hz": 285,
    "note": "D",
    "name": "Quantum",
    "action": "Tissue & cellular regeneration",
    "color": "#8b5cf6",
    "translations": {
      "hi": {
        "name": "क्वांटम",
        "action": "ऊतक और सेलुलर पुनर्जनन"
      },
      "es": {
        "name": "Quantum",
        "action": "Regeneración tisular y celular"
      },
      "fr": {
        "name": "Quantum",
        "action": "Régénération tissulaire et cellulaire"
      },
      "ar": {
        "name": "الكم",
        "action": "تجديد الأنسجة والخلايا"
      },
      "ja": {
        "name": "量子",
        "action": "組織と細胞の再生"
      }
    }
  },
  {
    "hz": 396,
    "note": "G",
    "name": "Liberation",
    "action": "Fear & guilt release",
    "color": "#a855f7",
    "translations": {
      "hi": {
        "name": "मुक्ति",
        "action": "भय और अपराध मुक्ति"
      },
      "es": {
        "name": "Liberación",
        "action": "Liberación del miedo y la culpa"
      },
      "fr": {
        "name": "Libération",
        "action": "Libération de la peur et de la culpabilité"
      },
      "ar": {
        "name": "التحرير",
        "action": "إطلاق سراح الخوف والشعور بالذنب"
      },
      "ja": {
        "name": "解放",
        "action": "恐怖と罪悪感の解放"
      }
    }
  },
  {
    "hz": 417,
    "note": "A",
    "name": "Change",
    "action": "Trauma & pattern clearing",
    "color": "#ec4899",
    "translations": {
      "hi": {
        "name": "परिवर्तन",
        "action": "आघात एवं पैटर्न समाशोधन"
      },
      "es": {
        "name": "Cambio",
        "action": "Trauma y limpieza de patrones"
      },
      "fr": {
        "name": "Changement",
        "action": "Traumatisme et effacement des schémas"
      },
      "ar": {
        "name": "التغيير",
        "action": "إزالة الصدمات والأنماط"
      },
      "ja": {
        "name": "変化",
        "action": "トラウマとパターンの解消"
      }
    }
  },
  {
    "hz": 528,
    "note": "C",
    "name": "Love / DNA",
    "action": "Cellular repair & love",
    "color": "#f59e0b",
    "translations": {
      "hi": {
        "name": "प्यार/डीएनए",
        "action": "सेलुलर मरम्मत और प्यार"
      },
      "es": {
        "name": "Amor / ADN",
        "action": "Reparación celular y amor"
      },
      "fr": {
        "name": "Amour / ADN",
        "action": "Réparation cellulaire & amour"
      },
      "ar": {
        "name": "الحب / الحمض النووي",
        "action": "إصلاح الخلايا والحب"
      },
      "ja": {
        "name": "愛 / DNA",
        "action": "細胞の修復と愛"
      }
    }
  },
  {
    "hz": 639,
    "note": "A",
    "name": "Connection",
    "action": "Interpersonal harmony",
    "color": "#10b981",
    "translations": {
      "hi": {
        "name": "संबंध",
        "action": "पारस्परिक सद्भाव"
      },
      "es": {
        "name": "Conexión",
        "action": "Armonía interpersonal"
      },
      "fr": {
        "name": "Connexion",
        "action": "Harmonie interpersonnelle"
      },
      "ar": {
        "name": "الاتصال",
        "action": "الانسجام بين الأشخاص"
      },
      "ja": {
        "name": "つながり",
        "action": "人間関係の調和"
      }
    }
  },
  {
    "hz": 741,
    "note": "G",
    "name": "Expression",
    "action": "Toxin clearing & throat",
    "color": "#06b6d4",
    "translations": {
      "hi": {
        "name": "अभिव्यक्ति",
        "action": "विष साफ़ करना और गला"
      },
      "es": {
        "name": "Expresión",
        "action": "Aclaramiento de toxinas y garganta"
      },
      "fr": {
        "name": "Expression",
        "action": "Élimination des toxines et de la gorge"
      },
      "ar": {
        "name": "التعبير",
        "action": "إزالة السموم والحلق"
      },
      "ja": {
        "name": "表情",
        "action": "毒素排出と喉"
      }
    }
  },
  {
    "hz": 852,
    "note": "A",
    "name": "Intuition",
    "action": "Third eye & intuition",
    "color": "#3b82f6",
    "translations": {
      "hi": {
        "name": "अंतर्ज्ञान",
        "action": "तीसरी आंख और अंतर्ज्ञान"
      },
      "es": {
        "name": "Intuición",
        "action": "Tercer ojo e intuición"
      },
      "fr": {
        "name": "Intuition",
        "action": "Troisième œil et intuition"
      },
      "ar": {
        "name": "الحدس",
        "action": "العين الثالثة والحدس"
      },
      "ja": {
        "name": "直感",
        "action": "第三の目と直感"
      }
    }
  },
  {
    "hz": 963,
    "note": "B",
    "name": "Unity",
    "action": "Pineal activation & oneness",
    "color": "#7c3aed",
    "translations": {
      "hi": {
        "name": "एकता",
        "action": "पीनियल सक्रियण एवं एकता"
      },
      "es": {
        "name": "Unidad",
        "action": "Activación pineal y unidad"
      },
      "fr": {
        "name": "Unité",
        "action": "Activation pinéale et unité"
      },
      "ar": {
        "name": "الوحدة",
        "action": "التنشيط الصنوبري والوحدة"
      },
      "ja": {
        "name": "Unity",
        "action": "松果体の活性化とワンネス"
      }
    }
  }
];

/* ═══════════════════════════════════════════════════════════
   BRAINWAVE RANGES
═══════════════════════════════════════════════════════════ */
export const BRAINWAVES = [
  {
    "name": "Delta",
    "range": "0.5–4 Hz",
    "state": "Deep sleep · Healing",
    "color": "#6366f1",
    "shape": [
      0.2,
      0.8,
      0.2,
      0.9,
      0.1,
      0.7,
      0.3,
      0.8
    ],
    "translations": {
      "hi": {
        "state": "गहरी नींद · उपचार"
      },
      "es": {
        "state": "Sueño profundo · Curación"
      },
      "fr": {
        "state": "Sommeil profond · Guérison"
      },
      "ar": {
        "state": "النوم العميق · الشفاء"
      },
      "ja": {
        "state": "深い眠り・癒し"
      }
    }
  },
  {
    "name": "Theta",
    "range": "4–8 Hz",
    "state": "Meditation · Creativity · REM",
    "color": "#8b5cf6",
    "shape": [
      0.4,
      0.9,
      0.2,
      0.8,
      0.5,
      0.9,
      0.3,
      0.7
    ],
    "translations": {
      "hi": {
        "state": "ध्यान · रचनात्मकता · REM"
      },
      "es": {
        "state": "Meditación · Creatividad · REM"
      },
      "fr": {
        "state": "Méditation · Créativité · REM"
      },
      "ar": {
        "state": "التأمل · الإبداع · حركة العين السريعة"
      },
      "ja": {
        "state": "瞑想・創造性・レム睡眠"
      }
    }
  },
  {
    "name": "Alpha",
    "range": "8–13 Hz",
    "state": "Calm · Flow · Learning",
    "color": "#10b981",
    "shape": [
      0.5,
      0.8,
      0.5,
      0.8,
      0.5,
      0.8,
      0.5,
      0.8
    ],
    "translations": {
      "hi": {
        "state": "शांत · प्रवाह · सीखना"
      },
      "es": {
        "state": "Calma · Fluir · Aprendizaje"
      },
      "fr": {
        "state": "Calme · Flux · Apprentissage"
      },
      "ar": {
        "state": "الهدوء · التدفق · التعلم"
      },
      "ja": {
        "state": "穏やか・流れ・学び"
      }
    }
  },
  {
    "name": "Beta",
    "range": "13–30 Hz",
    "state": "Alert · Focus · Active",
    "color": "#f59e0b",
    "shape": [
      0.6,
      0.4,
      0.7,
      0.3,
      0.6,
      0.4,
      0.7,
      0.3
    ],
    "translations": {
      "hi": {
        "state": "चेतावनी · फोकस · सक्रिय"
      },
      "es": {
        "state": "Alerta · Enfoque · Activo"
      },
      "fr": {
        "state": "Alerte · Concentration · Actif"
      },
      "ar": {
        "state": "تنبيه · التركيز · نشط"
      },
      "ja": {
        "state": "アラート・フォーカス・アクティブ"
      }
    }
  },
  {
    "name": "Gamma",
    "range": "30–100 Hz",
    "state": "Peak cognition · Insight",
    "color": "#ef4444",
    "shape": [
      0.5,
      0.9,
      0.1,
      0.9,
      0.5,
      0.9,
      0.1,
      0.9
    ],
    "translations": {
      "hi": {
        "state": "चरम अनुभूति · अंतर्दृष्टि"
      },
      "es": {
        "state": "Cognición máxima · Insight"
      },
      "fr": {
        "state": "Cognition maximale · Insight"
      },
      "ar": {
        "state": "ذروة الإدراك · البصيرة"
      },
      "ja": {
        "state": "ピークの認知力・洞察力"
      }
    }
  }
];

/* ═══════════════════════════════════════════════════════════
   UTILITY CONSTANTS
═══════════════════════════════════════════════════════════ */
export const FREE_IDS = new Set(["anxiety","depression","sleep","grief","selfesteem"]);
export const CATS = ["All","Mental","Physical","Chronic","Endocrine","Emotional","Cardiovascular Disease"];

/* ═══════════════════════════════════════════════════════════
   LANGUAGE STRINGS (TRANSLATIONS MATRIX)
═══════════════════════════════════════════════════════════ */
export const LANGS = {
  "en": {
    "code": "en",
    "flag": "🇬🇧",
    "name": "English",
    "dir": "ltr",
    "tagline": "Heal with Sound",
    "sub": "Ancient frequencies. Modern science.",
    "search": "Search conditions, frequencies…",
    "aiDiagnose": "AI Diagnose",
    "selectLang": "Choose your language",
    "free": "Free",
    "pro": "Pro",
    "divine": "Divine",
    "monthly": "/ mo",
    "yearly": "/ yr",
    "save": "Save 40%",
    "mostPop": "Most Popular",
    "bestVal": "Best Value",
    "upgrade": "Upgrade to Pro",
    "tryFree": "Try Free",
    "currentPlan": "Current Plan",
    "unlock": "Unlock All 22+ Conditions",
    "planLabel": "Your Plan",
    "sessLeft": "sessions left",
    "unlimited": "Unlimited",
    "home": "Home",
    "explore": "Explore",
    "library": "Library",
    "plans": "Plans",
    "you": "You",
    "featured": "Sound Remedies",
    "trending": "Trending",
    "goodMorn": "Good morning",
    "goodAft": "Good afternoon",
    "goodEve": "Good evening",
    "streakDays": "Day Streak 🔥",
    "protocol": "Protocol",
    "tip": "Expert Tip",
    "science": "Science",
    "instruments": "Instruments",
    "startSession": "Start Session",
    "pause": "Pause",
    "resume": "Resume",
    "stop": "Stop",
    "nowPlaying": "Now Playing",
    "frequencies": "Frequencies",
    "freqMap": "Solfeggio Map",
    "brainwaves": "Brainwaves",
    "allConditions": "All Conditions",
    "continue": "Continue",
    "binaural": "Binaural Beats",
    "volume": "Volume",
    "playing": "Playing",
    "selectFreq": "Tap to play individually",
    "tier_free": [
      "5 sessions / month",
      "5 healing conditions",
      "432 Hz + 528 Hz basics",
      "Standard audio quality",
      "Supported by ads"
    ],
    "tier_pro": [
      "Unlimited sessions",
      "All 22+ conditions",
      "Full Solfeggio library (174–963 Hz)",
      "Offline downloads",
      "Lossless HD audio",
      "Zero ads",
      "Sleep timer + reminders",
      "Progress tracking & streaks"
    ],
    "tier_divine": [
      "Everything in Pro",
      "AI-powered frequency diagnosis",
      "Personalized weekly programs",
      "Live group sound baths",
      "1:1 therapist sessions (2/mo)",
      "Family plan — 4 users",
      "Priority support 24/7"
    ],
    "priceM": "₹299",
    "priceY": "₹1,999",
    "divM": "₹799",
    "divY": "₹5,999",
    "freeP": "₹0",
    "todayRemedy": "Today's Remedy",
    "startRemedy": "Start Remedy",
    "sanctuaryHeader": "Select Healing Sanctuary",
    "programs": "Programs",
    "subCatsAvailable": "Sub-Categories Available",
    "backToSanctuaries": "Back to sanctuaries",
    "selectTargetProgram": "Select Target Program",
    "stopPreview": "Stop Preview",
    "nowPlayingPrefix": "Now Playing:",
    "quickSymptomScan": "Quick Symptom Scan",
    "therapistDialogue": "Therapist Dialogue",
    "recommendedSanctuaries": "RECOMMENDED SANCTUARIES",
    "startBtn": "Start",
    "describeSymptomPlaceholder": "Describe your pain, stress, or goals...",
    "scanningFrequencies": "Scanning Neural Frequencies...",
    "previewPrefix": "Preview:",
    "proGateFeatures": [
      "Real binaural beats — 9 Solfeggio frequencies",
      "Unlimited sessions for all 22+ conditions",
      "Individual frequency play in every session",
      "HD lossless audio sound output"
    ]
  ,
    "searchResults": "Search Results",
    "aiWelcome": "Welcome to your AI Sound Sanctuary. 🧘✨\n\nExplain what you are currently feeling—such as physical pain, mental stress, anxiety, or lack of focus—and I will scan our neurological audio databases to synthesize a customized Solfeggio and brainwave entrainment protocol.",
    "saveBtn": "Save",
    "cancelBtn": "Cancel",
    "guestUser": "Guest User",
    "enterName": "Enter name",
    "streakLabel": "Streak",
    "sessionsLabel": "Sessions",
    "minutesLabel": "Minutes",
    "favorites": "Favorites",
    "language": "Language",
    "signOut": "Sign Out",
    "signInOrCreate": "Sign In / Create Account",
    "backToExplore": "Back to Explore",
    "chooseProtocol": "Choose a target protocol pathway to begin your session",
    "beginProtocol": "Begin Protocol",
    "changeProtocol": "Change Protocol",
    "activeBeat": "active —",
    "hzBeat": "Hz beat",
    "left": "Left",
    "right": "Right",
    "headphonesRecommended": "Headphones recommended.",
    "tapToSynthesize": "Tap any frequency to synthesize preview",
    "binauralBeatsLabel": "Binaural beats:",
    "getDivine": "Get Divine",
    "chooseHealingPlan": "Choose Healing Plan",
    "plansDesc": "Select a sound sanctuary membership to unlock higher neural pathways and ancient frequency designs",
    "monthlyLabel": "Monthly",
    "yearlyLabel": "Yearly",
    "initializingSanctuary": "Initializing Sanctuary...",
    "acousticSoundSanctuary": "Acoustic Sound Sanctuary",
    "authDesc": "Sign in to save progress and unlock features",
    "emailPlaceholder": "Email Address",
    "passwordPlaceholder": "Password",
    "createAccount": "Create Account",
    "signIn": "Sign In",
    "hasAccountSignIn": "Already have an account? Sign In",
    "noAccountCreate": "Don't have an account? Create one",
    "continueAsGuest": "Continue as Guest",
    "verificationEmailSent": "Verification email sent! Check your inbox.",
    "sessionCompleted": "Session completed! 🧘✨\n\nYour healing streak is now {streak} days.",
    "sessionsEnabled": "Sessions Enabled",
    "paused": "Paused",
    "recentsLabel": "Recents",
    "notSignedIn": "Not signed in",
    "aiAnalysisComplete": "🔬 **NEURAL SOUND ANALYSIS COMPLETE**",
    "aiDetectedPattern": "🎯 Detected Pattern:",
    "patternPain": "Somatic pain activation",
    "patternSleep": "Melatonin & sleep cycle disruption",
    "patternFocus": "Prefrontal cortex dysregulation",
    "patternAnxiety": "Sympathetic nervous system overdrive",
    "patternSadness": "Limbic serotonin depletion",
    "patternDefault": "Autonomic nervous system imbalance",
    "aiPrescribedFrequencies": "🧠 Prescribed Frequencies:",
    "aiMatchedSanctuaries": "📋 {count} healing sanctuaries matched. Tap any below to begin your session."},
  "hi": {
    "code": "hi",
    "flag": "🇮🇳",
    "name": "हिंदी",
    "dir": "ltr",
    "tagline": "ध्वनि से उपचार",
    "sub": "प्राचीन आवृत्तियाँ। आधुनिक विज्ञान।",
    "search": "स्थिति, आवृत्तियाँ खोजें…",
    "aiDiagnose": "AI निदान",
    "selectLang": "भाषा चुनें",
    "free": "निःशुल्क",
    "pro": "प्रो",
    "divine": "दिव्य",
    "monthly": "/ माह",
    "yearly": "/ वर्ष",
    "save": "40% बचाएं",
    "mostPop": "सबसे लोकप्रिय",
    "bestVal": "सर्वश्रेष्ठ",
    "upgrade": "प्रो में अपग्रेड करें",
    "tryFree": "निःशुल्क आज़माएं",
    "currentPlan": "वर्तमान योजना",
    "unlock": "22+ स्थितियाँ अनलॉक करें",
    "planLabel": "आपकी योजना",
    "sessLeft": "सत्र शेष",
    "unlimited": "असीमित",
    "home": "होम",
    "explore": "अन्वेषण",
    "library": "पुस्तकालय",
    "plans": "योजनाएं",
    "you": "आप",
    "featured": "ध्वनि चिकित्सा",
    "trending": "लोकप्रिय",
    "goodMorn": "सुप्रभात",
    "goodAft": "शुभ अपराह्न",
    "goodEve": "शुभ संध्या",
    "streakDays": "दिन की श्रृंखला 🔥",
    "protocol": "प्रोटोकॉल",
    "tip": "विशेषज्ञ टिप",
    "science": "विज्ञान",
    "instruments": "वाद्ययंत्र",
    "startSession": "सत्र शुरू करें",
    "pause": "रोकें",
    "resume": "जारी रखें",
    "stop": "बंद करें",
    "nowPlaying": "अभी चल रहा है",
    "frequencies": "आवृत्तियाँ",
    "freqMap": "सोल्फेगियो मानचित्र",
    "brainwaves": "मस्तिष्क तरंगें",
    "allConditions": "सभी स्थितियाँ",
    "continue": "जारी रखें",
    "binaural": "बाइनॉरल बीट्स",
    "volume": "वॉल्यूम",
    "playing": "चल रहा है",
    "selectFreq": "व्यक्तिगत रूप से चलाएं",
    "tier_free": [
      "5 सत्र / माह",
      "5 उपचार स्थितियाँ",
      "432 Hz + 528 Hz मूल",
      "सामान्य ऑडियो",
      "विज्ञापन समर्थित"
    ],
    "tier_pro": [
      "असीमित सत्र",
      "सभी 22+ स्थितियाँ",
      "पूर्ण सोल्फेगियो",
      "ऑफलाइन डाउनलोड",
      "HD ऑडियो",
      "विज्ञापन मुक्त",
      "स्लीप टाइमर",
      "प्रगति ट्रैकिंग"
    ],
    "tier_divine": [
      "प्रो की सभी सुविधाएं",
      "AI निदान",
      "व्यक्तिगत कार्यक्रम",
      "लाइव साउंड बाथ",
      "1:1 थेरेपिस्ट",
      "पारिवारिक योजना",
      "प्राथमिकता सहायता"
    ],
    "priceM": "₹299",
    "priceY": "₹1,999",
    "divM": "₹799",
    "divY": "₹5,999",
    "freeP": "₹0",
    "todayRemedy": "आज का उपचार",
    "startRemedy": "उपचार शुरू करें",
    "sanctuaryHeader": "चिकित्सा अभयारण्य चुनें",
    "programs": "प्रोग्राम",
    "subCatsAvailable": "उप-श्रेणियाँ उपलब्ध",
    "backToSanctuaries": "अभयारण्यों पर वापस जाएं",
    "selectTargetProgram": "लक्षित प्रोग्राम चुनें",
    "stopPreview": "प्रिव्यू रोकें",
    "nowPlayingPrefix": "अभी चल रहा है:",
    "quickSymptomScan": "त्वरित लक्षण स्कैन",
    "therapistDialogue": "थेरेपिस्ट संवाद",
    "recommendedSanctuaries": "अनुशंसित चिकित्सा अभयारण्य",
    "startBtn": "शुरू करें",
    "describeSymptomPlaceholder": "अपने दर्द, तनाव या लक्ष्यों के बारे में बताएं...",
    "scanningFrequencies": "न्यूरल आवृत्तियों को स्कैन किया जा रहा है...",
    "previewPrefix": "प्रिव्यू:",
    "proGateFeatures": [
      "वास्तविक बाइनॉरल बीट्स - 9 सोल्फेगियो आवृत्तियाँ",
      "सभी 22+ रोगों के लिए असीमित सत्र",
      "प्रत्येक सत्र में व्यक्तिगत आवृत्ति चलाने की सुविधा",
      "एचडी दोषरहित ऑडियो ध्वनि आउटपुट"
    ]
  },
  "es": {
    "code": "es",
    "flag": "🇪🇸",
    "name": "Español",
    "dir": "ltr",
    "tagline": "Sana con el Sonido",
    "sub": "Frecuencias antiguas. Ciencia moderna.",
    "search": "Buscar condiciones…",
    "aiDiagnose": "Diagnóstico IA",
    "selectLang": "Elige tu idioma",
    "free": "Gratis",
    "pro": "Pro",
    "divine": "Divino",
    "monthly": "/ mes",
    "yearly": "/ año",
    "save": "Ahorra 40%",
    "mostPop": "Más Popular",
    "bestVal": "Mejor Valor",
    "upgrade": "Actualizar a Pro",
    "tryFree": "Prueba Gratis",
    "currentPlan": "Plan Actual",
    "unlock": "Desbloquear 22+ Condiciones",
    "planLabel": "Tu Plan",
    "sessLeft": "sesiones restantes",
    "unlimited": "Ilimitado",
    "home": "Inicio",
    "explore": "Explorar",
    "library": "Biblioteca",
    "plans": "Planes",
    "you": "Tú",
    "featured": "Remedios de Sonido",
    "trending": "Tendencias",
    "goodMorn": "Buenos días",
    "goodAft": "Buenas tardes",
    "goodEve": "Buenas noches",
    "streakDays": "Días seguidos 🔥",
    "protocol": "Protocolo",
    "tip": "Consejo Experto",
    "science": "Ciencia",
    "instruments": "Instrumentos",
    "startSession": "Iniciar",
    "pause": "Pausar",
    "resume": "Reanudar",
    "stop": "Detener",
    "nowPlaying": "Reproduciendo",
    "frequencies": "Frecuencias",
    "freqMap": "Mapa Solfeggio",
    "brainwaves": "Ondas Cerebrales",
    "allConditions": "Todas las Condiciones",
    "continue": "Continuar",
    "binaural": "Beats Binaurales",
    "volume": "Volumen",
    "playing": "Reproduciendo",
    "selectFreq": "Toca para reproducir",
    "tier_free": [
      "5 sesiones / mes",
      "5 condiciones",
      "Frecuencias básicas",
      "Calidad estándar",
      "Con anuncios"
    ],
    "tier_pro": [
      "Sesiones ilimitadas",
      "22+ condiciones",
      "Biblioteca Solfeggio",
      "Offline",
      "Audio HD",
      "Sin anuncios",
      "Temporizador",
      "Seguimiento"
    ],
    "tier_divine": [
      "Todo de Pro",
      "Diagnóstico IA",
      "Programas personalizados",
      "Baños sonoros",
      "Sesiones 1:1",
      "Plan familiar",
      "Soporte 24/7"
    ],
    "priceM": "€4.99",
    "priceY": "€34.99",
    "divM": "€9.99",
    "divY": "€69.99",
    "freeP": "€0",
    "todayRemedy": "El remedio de hoy",
    "startRemedy": "Iniciar remedio",
    "sanctuaryHeader": "Seleccione Santuario de curación",
    "programs": "Programas",
    "subCatsAvailable": "Subcategorías disponibles",
    "backToSanctuaries": "Volver a los santuarios",
    "selectTargetProgram": "Seleccione el programa objetivo",
    "stopPreview": "Detener vista previa",
    "nowPlayingPrefix": "Reproduciendo ahora:",
    "quickSymptomScan": "Escaneo rápido de síntomas",
    "therapistDialogue": "Diálogo del terapeuta",
    "recommendedSanctuaries": "SANTUARIOS RECOMENDADOS",
    "startBtn": "Comenzar",
    "describeSymptomPlaceholder": "Describe tu dolor, estrés u objetivos...",
    "scanningFrequencies": "Escaneando frecuencias neuronales...",
    "previewPrefix": "Avance:",
    "proGateFeatures": [
      "Ritmos binaurales reales: 9 frecuencias de solfeo",
      "Sesiones ilimitadas para todas las condiciones 22+",
      "Juego de frecuencia individual en cada sesión.",
      "Salida de sonido de audio HD sin pérdidas"
    ]
  },
  "fr": {
    "code": "fr",
    "flag": "🇫🇷",
    "name": "Français",
    "dir": "ltr",
    "tagline": "Guérissez par le Son",
    "sub": "Fréquences anciennes. Science moderne.",
    "search": "Rechercher…",
    "aiDiagnose": "Diagnostic IA",
    "selectLang": "Choisissez votre langue",
    "free": "Gratuit",
    "pro": "Pro",
    "divine": "Divin",
    "monthly": "/ mois",
    "yearly": "/ an",
    "save": "Économisez 40%",
    "mostPop": "Plus Populaire",
    "bestVal": "Meilleur Rapport",
    "upgrade": "Passer à Pro",
    "tryFree": "Essai Gratuit",
    "currentPlan": "Plan Actuel",
    "unlock": "Débloquer 22+ Conditions",
    "planLabel": "Votre Plan",
    "sessLeft": "séances restantes",
    "unlimited": "Illimité",
    "home": "Accueil",
    "explore": "Explorer",
    "library": "Bibliothèque",
    "plans": "Abonnements",
    "you": "Vous",
    "featured": "Remèdes Sonores",
    "trending": "Tendances",
    "goodMorn": "Bonjour",
    "goodAft": "Bon après-midi",
    "goodEve": "Bonsoir",
    "streakDays": "Jours consécutifs 🔥",
    "protocol": "Protocole",
    "tip": "Conseil Expert",
    "science": "Science",
    "instruments": "Instruments",
    "startSession": "Démarrer",
    "pause": "Pause",
    "resume": "Reprendre",
    "stop": "Arrêter",
    "nowPlaying": "En cours",
    "frequencies": "Fréquences",
    "freqMap": "Carte Solfeggio",
    "brainwaves": "Ondes Cérébrales",
    "allConditions": "Toutes les Conditions",
    "continue": "Continuer",
    "binaural": "Beats Binauraux",
    "volume": "Volume",
    "playing": "En lecture",
    "selectFreq": "Appuyer pour écouter",
    "tier_free": [
      "5 séances / mois",
      "5 conditions",
      "Fréquences de base",
      "Qualité standard",
      "Avec publicités"
    ],
    "tier_pro": [
      "Séances illimitées",
      "22+ conditions",
      "Bibliothèque complète",
      "Hors ligne",
      "HD",
      "Sans pub",
      "Minuterie",
      "Suivi"
    ],
    "tier_divine": [
      "Tout du Pro",
      "Diagnostic IA",
      "Programmes",
      "Bains sonores",
      "Sessions 1:1",
      "Famille",
      "Support 24/7"
    ],
    "priceM": "€4,99",
    "priceY": "€34,99",
    "divM": "€9,99",
    "divY": "€69,99",
    "freeP": "€0",
    "todayRemedy": "Le remède du jour",
    "startRemedy": "Démarrer le remède",
    "sanctuaryHeader": "Sélectionnez le sanctuaire de guérison",
    "programs": "Programmes",
    "subCatsAvailable": "Sous-catégories disponibles",
    "backToSanctuaries": "Retour aux sanctuaires",
    "selectTargetProgram": "Sélectionnez le programme cible",
    "stopPreview": "Arrêter l'aperçu",
    "nowPlayingPrefix": "Lecture en cours :",
    "quickSymptomScan": "Analyse rapide des symptômes",
    "therapistDialogue": "Dialogue thérapeute",
    "recommendedSanctuaries": "SANCTUAIRES RECOMMANDÉS",
    "startBtn": "Commencer",
    "describeSymptomPlaceholder": "Décrivez votre douleur, votre stress ou vos objectifs...",
    "scanningFrequencies": "Analyse des fréquences neuronales...",
    "previewPrefix": "Aperçu :",
    "proGateFeatures": [
      "De vrais battements binauraux — 9 fréquences de solfège",
      "Séances illimitées pour toutes les 22+ conditions",
      "Jeu de fréquence individuel à chaque session",
      "Sortie audio HD sans perte"
    ]
  },
  "ar": {
    "code": "ar",
    "flag": "🇸🇦",
    "name": "العربية",
    "dir": "rtl",
    "tagline": "الشفاء بالصوت",
    "sub": "ترددات قديمة. علم حديث.",
    "search": "ابحث عن الحالات…",
    "aiDiagnose": "تشخيص الذكاء الاصطناعي",
    "selectLang": "اختر لغتك",
    "free": "مجاني",
    "pro": "برو",
    "divine": "إلهي",
    "monthly": "/ شهر",
    "yearly": "/ سنة",
    "save": "وفر 40%",
    "mostPop": "الأكثر شعبية",
    "bestVal": "أفضل قيمة",
    "upgrade": "ترقية إلى برو",
    "tryFree": "جرب مجاناً",
    "currentPlan": "الخطة الحالية",
    "unlock": "فتح 22+ حالة",
    "planLabel": "خطتك",
    "sessLeft": "جلسات متبقية",
    "unlimited": "غير محدود",
    "home": "الرئيسية",
    "explore": "استكشاف",
    "library": "المكتبة",
    "plans": "الخطط",
    "you": "أنت",
    "featured": "العلاجات الصوتية",
    "trending": "رائج",
    "goodMorn": "صباح الخير",
    "goodAft": "مساء الخير",
    "goodEve": "مساء النور",
    "streakDays": "أيام متتالية 🔥",
    "protocol": "البروتوكول",
    "tip": "نصيحة الخبير",
    "science": "العلم",
    "instruments": "الآلات",
    "startSession": "بدء",
    "pause": "إيقاف",
    "resume": "استئناف",
    "stop": "إيقاف تام",
    "nowPlaying": "يعزف الآن",
    "frequencies": "الترددات",
    "freqMap": "خريطة سولفيجيو",
    "brainwaves": "موجات الدماغ",
    "allConditions": "جميع الحالات",
    "continue": "متابعة",
    "binaural": "نبضات ثنائية",
    "volume": "الصوت",
    "playing": "يعزف",
    "selectFreq": "اضغط للتشغيل",
    "tier_free": [
      "5 جلسات / شهر",
      "5 حالات",
      "ترددات أساسية",
      "جودة عادية",
      "مع إعلانات"
    ],
    "tier_pro": [
      "غير محدود",
      "22+ حالة",
      "مكتبة كاملة",
      "بدون إنترنت",
      "HD",
      "بدون إعلانات",
      "مؤقت",
      "تتبع"
    ],
    "tier_divine": [
      "كل برو",
      "ذكاء اصطناعي",
      "برامج مخصصة",
      "حمامات صوتية",
      "1:1",
      "عائلة",
      "دعم 24/7"
    ],
    "priceM": "$4.99",
    "priceY": "$34.99",
    "divM": "$9.99",
    "divY": "$69.99",
    "freeP": "$0",
    "todayRemedy": "علاج اليوم",
    "startRemedy": "ابدأ العلاج",
    "sanctuaryHeader": "حدد ملاذ الشفاء",
    "programs": "البرامج",
    "subCatsAvailable": "الفئات الفرعية المتاحة",
    "backToSanctuaries": "العودة إلى المقدسات",
    "selectTargetProgram": "حدد البرنامج المستهدف",
    "stopPreview": "إيقاف المعاينة",
    "nowPlayingPrefix": "التشغيل الآن:",
    "quickSymptomScan": "فحص سريع للأعراض",
    "therapistDialogue": "حوار المعالج",
    "recommendedSanctuaries": "المحميات الموصى بها",
    "startBtn": "يبدأ",
    "describeSymptomPlaceholder": "صف ألمك أو ضغوطك أو أهدافك...",
    "scanningFrequencies": "مسح الترددات العصبية...",
    "previewPrefix": "معاينة:",
    "proGateFeatures": [
      "دقات الأذنين الحقيقية - 9 ترددات سولفيجيو",
      "جلسات غير محدودة لجميع الشروط 22+",
      "اللعب بالتردد الفردي في كل جلسة",
      "إخراج صوت عالي الدقة بدون فقدان"
    ]
  },
  "ja": {
    "code": "ja",
    "flag": "🇯🇵",
    "name": "日本語",
    "dir": "ltr",
    "tagline": "音で癒す",
    "sub": "古代の周波数。現代の科学。",
    "search": "症状・周波数を検索…",
    "aiDiagnose": "AI診断",
    "selectLang": "言語を選択",
    "free": "無料",
    "pro": "プロ",
    "divine": "神聖",
    "monthly": "/ 月",
    "yearly": "/ 年",
    "save": "40%節約",
    "mostPop": "人気No.1",
    "bestVal": "最高コスパ",
    "upgrade": "Proにアップグレード",
    "tryFree": "無料で試す",
    "currentPlan": "現在のプラン",
    "unlock": "22+症状を解放",
    "planLabel": "あなたのプラン",
    "sessLeft": "セッション残り",
    "unlimited": "無制限",
    "home": "ホーム",
    "explore": "探索",
    "library": "ライブラリ",
    "plans": "プラン",
    "you": "あなた",
    "featured": "音響療法",
    "trending": "トレンド",
    "goodMorn": "おはようございます",
    "goodAft": "こんにちは",
    "goodEve": "こんばんは",
    "streakDays": "日連続 🔥",
    "protocol": "プロトコル",
    "tip": "専門家のヒント",
    "science": "科学",
    "instruments": "楽器",
    "startSession": "開始",
    "pause": "一時停止",
    "resume": "再開",
    "stop": "停止",
    "nowPlaying": "再生中",
    "frequencies": "周波数",
    "freqMap": "ソルフェジオマップ",
    "brainwaves": "脳波",
    "allConditions": "すべての症状",
    "continue": "続ける",
    "binaural": "バイノーラルビート",
    "volume": "音量",
    "playing": "再生中",
    "selectFreq": "タップして再生",
    "tier_free": [
      "5セッション / 月",
      "5つの症状",
      "基本周波数",
      "標準音質",
      "広告あり"
    ],
    "tier_pro": [
      "無制限",
      "22以上の症状",
      "全ライブラリ",
      "オフライン",
      "HD",
      "広告なし",
      "タイマー",
      "進捗"
    ],
    "tier_divine": [
      "Pro全機能",
      "AI診断",
      "個別プログラム",
      "ライブ音浴",
      "1対1",
      "ファミリー",
      "優先サポート"
    ],
    "priceM": "¥499",
    "priceY": "¥3,999",
    "divM": "¥1,299",
    "divY": "¥9,999",
    "freeP": "¥0",
    "todayRemedy": "今日の対処法",
    "startRemedy": "救済策を開始する",
    "sanctuaryHeader": "癒しの聖域を選択してください",
    "programs": "プログラム",
    "subCatsAvailable": "利用可能なサブカテゴリ",
    "backToSanctuaries": "聖域に戻る",
    "selectTargetProgram": "対象プログラムの選択",
    "stopPreview": "プレビューを停止",
    "nowPlayingPrefix": "現在プレイ中:",
    "quickSymptomScan": "症状のクイックスキャン",
    "therapistDialogue": "セラピストダイアログ",
    "recommendedSanctuaries": "推奨される保護区",
    "startBtn": "始める",
    "describeSymptomPlaceholder": "あなたの痛み、ストレス、目標について説明してください...",
    "scanningFrequencies": "神経周波数をスキャンしています...",
    "previewPrefix": "プレビュー:",
    "proGateFeatures": [
      "リアルなバイノーラルビート — 9 つのソルフェジオ周波数",
      "22 以上のすべての条件に対して無制限のセッション",
      "すべてのセッションでの個別の周波数再生",
      "HDロスレスオーディオサウンド出力"
    ]
  }
};
