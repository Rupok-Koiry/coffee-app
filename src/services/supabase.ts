import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/constants/database.types";
import pako from "pako";

// Constants
const MAX_SECURE_STORE_SIZE = 2048;

// Utility function to convert a Uint8Array to a base64 string
const uint8ArrayToBase64 = (array: Uint8Array): string => {
  return btoa(String.fromCharCode(...array));
};

// Utility function to convert a base64 string back to a Uint8Array
const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Compress data using pako
const compressData = (data: string): string => {
  const compressed = pako.deflate(data);
  return uint8ArrayToBase64(compressed);
};

// Decompress data using pako
const decompressData = (data: string): string => {
  const decoded = base64ToUint8Array(data);
  return pako.inflate(decoded, { to: "string" });
};

// Secure Store Adapter with compression
const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    const storedValue = await SecureStore.getItemAsync(key);
    if (storedValue) {
      try {
        return decompressData(storedValue);
      } catch (error) {
        console.error("Failed to decompress data:", error);
        return storedValue; // Return raw data if decompression fails
      }
    }
    return null;
  },
  setItem: async (key: string, value: string) => {
    try {
      const compressedValue = compressData(value);
      if (compressedValue.length > MAX_SECURE_STORE_SIZE) {
        throw new Error(
          "Compressed value still too large to store in SecureStore"
        );
      }
      await SecureStore.setItemAsync(key, compressedValue);
    } catch (error) {
      console.error("Failed to compress or store data:", error);
    }
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
