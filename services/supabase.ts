import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

// Secure Store Adapter
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

const SUPABASE_URL = "https://ufhlgxxhlsmrrkxildzo.supabase.co";
const SUPABASE_PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmaGxneHhobHNtcnJreGlsZHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzNjUxMTQsImV4cCI6MjAzNzk0MTExNH0.ZgB2HTRri3y6a6n4MFpPRIcubHopKomQW4IiHxfT9Ts";

// Initialize Supabase Client
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_API_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
  },
});

export default supabase;
