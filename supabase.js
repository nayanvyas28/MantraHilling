import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wvzxmbxhpebrkpciobuu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ImtxeA4OvHh4yxd75dFH8A_Ii5pJLPd';

// Resilient memory-fallback storage to prevent crashes on startup when native modules are unbuilt
const memoryStorage = {};

const safeStorage = {
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log(`[Supabase Storage] getItem: ${key} = ${value ? "found (length " + value.length + ")" : "null"}`);
      return value;
    } catch (e) {
      console.warn('Supabase Storage Warning: AsyncStorage native module is not available. Falling back to memory storage.', e.message);
      return memoryStorage[key] || null;
    }
  },
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log(`[Supabase Storage] setItem: ${key} success`);
    } catch (e) {
      console.warn('Supabase Storage Set Warning: Failed to setItem. Falling back to memory storage.', e.message);
      memoryStorage[key] = value;
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`[Supabase Storage] removeItem: ${key} success`);
    } catch (e) {
      console.warn('Supabase Storage Remove Warning: Failed to removeItem. Falling back to memory storage.', e.message);
      delete memoryStorage[key];
    }
  },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: safeStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});


