import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/constants/database.types";

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

// Supabase configuration
export const SUPABASE_URL = "https://pdyzjtsgpvcbxmxapxsr.supabase.co";
const SUPABASE_PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkeXpqdHNncHZjYnhteGFweHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNjA0MTEsImV4cCI6MjAzOTczNjQxMX0.LDldy2TA74Sdtl-7RfbeoWc5uTVA-mh-X8Q-PVqFjwI";

// Initialize Supabase Client
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLIC_API_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
  },
});

export default supabase;
