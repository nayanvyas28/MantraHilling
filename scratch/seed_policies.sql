-- Insert default metadata rows for Privacy Policy, Terms of Service, and Refund Policy
INSERT INTO public.conditions (
  id, cat, emoji, free, title, sub, duration, color, freqs, binaural, instruments, protocol, tip, science, audio_url, translations
) VALUES
(
  'category_meta:privacy_policy',
  'Metadata',
  '🛡️',
  false,
  'Privacy Policy',
  'Category · Metadata',
  30,
  '#8B5CF6',
  '[]'::jsonb,
  10.0,
  '',
  '',
  '',
  'This is the default Privacy Policy. You can edit this text from the Admin Panel.',
  '',
  '{"hi": {"title": "गोपनीयता नीति", "science": "यह डिफ़ॉल्ट गोपनीयता नीति है। आप इसे व्यवस्थापक पैनल से संपादित कर सकते हैं।"}, "en": {"title": "Privacy Policy", "science": "This is the default Privacy Policy. You can edit this text from the Admin Panel."}}'::jsonb
),
(
  'category_meta:terms_of_service',
  'Metadata',
  '📄',
  false,
  'Terms of Service',
  'Category · Metadata',
  30,
  '#00D1FF',
  '[]'::jsonb,
  10.0,
  '',
  '',
  '',
  'This is the default Terms of Service. You can edit this text from the Admin Panel.',
  '',
  '{"hi": {"title": "सेवा की शर्तें", "science": "यह डिफ़ॉल्ट सेवा की शर्तें हैं। आप इसे व्यवस्थापक पैनल से संपादित कर सकते हैं।"}, "en": {"title": "Terms of Service", "science": "This is the default Terms of Service. You can edit this text from the Admin Panel."}}'::jsonb
),
(
  'category_meta:refund_policy',
  'Metadata',
  '🔄',
  false,
  'Refund Policy',
  'Category · Metadata',
  30,
  '#F5B041',
  '[]'::jsonb,
  10.0,
  '',
  '',
  '',
  'This is the default Refund Policy. You can edit this text from the Admin Panel.',
  '',
  '{"hi": {"title": "धनवापसी नीति", "science": "यह डिफ़ॉल्ट धनवापसी नीति है। आप इसे व्यवस्थापक पैनल से संपादित कर सकते हैं।"}, "en": {"title": "Refund Policy", "science": "This is the default Refund Policy. You can edit this text from the Admin Panel."}}'::jsonb
)
ON CONFLICT (id) DO NOTHING;
