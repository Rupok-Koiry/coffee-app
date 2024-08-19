import { UpdateTables } from "@/constants/types";
import supabase from "./supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
// Reusable function to fetch user profile by user ID
async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("Fetch profile error:", error);
    throw new Error(error.message);
  }
  return data;
}

export async function signup({
  full_name,
  email,
  password,
  phone,
}: UpdateTables<"profiles"> & { password: string; email: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        phone,
      },
    },
  });

  if (error) {
    console.log("Signup error:", error);
    throw new Error(error.message);
  }
  if (!data.user) return null;

  return await fetchUserProfile(data.user.id);
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.log("Update password error:", error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateCurrentUser({
  full_name,
  phone,
  address,
  avatar,
}: UpdateTables<"profiles">) {
  // Update authentication data if necessary
  const { error: authUpdateError } = await supabase.auth.updateUser({
    data: { full_name, phone },
  });
  if (authUpdateError) {
    console.log("Update auth error:", authUpdateError);
    throw new Error(authUpdateError.message);
  }

  // Get the current session
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError || !session?.session) {
    console.log("Session error:", sessionError);
    throw new Error("Unable to retrieve user session");
  }

  const userId = session.session.user.id;

  // Update the profile data
  const { data: profile, error: profileUpdateError } = await supabase
    .from("profiles")
    .update({ full_name, phone, address, avatar })
    .eq("id", userId)
    .select()
    .single();

  if (profileUpdateError) {
    console.log("Update profile error:", profileUpdateError);
    throw new Error(profileUpdateError.message);
  }
  // Handle avatar upload if needed
  if (!avatar || !avatar.startsWith("file")) return profile;
  const fileName = `avatar-${profile.id}-${Math.random()}`;
  const base64 = await FileSystem.readAsStringAsync(avatar, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, decode(base64), {
      contentType: "image/*",
    });

  if (storageError) {
    console.log("Avatar Storage error:", storageError);
    throw new Error(storageError.message);
  }

  // Update the avatar field with the new file name
  const { data: updatedProfile, error: avatarUpdateError } = await supabase
    .from("profiles")
    .update({ avatar: fileName })
    .eq("id", userId)
    .select()
    .single();

  if (avatarUpdateError) {
    console.log("Update avatar error:", avatarUpdateError);
    throw new Error(avatarUpdateError.message);
  }
  return updatedProfile;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Login error:", error);
    throw new Error(error.message);
  }
  if (!data?.user) return null;

  return await fetchUserProfile(data.user.id);
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (error) {
    console.log("Get session error:", error);
    throw new Error(error.message);
  }
  if (!session?.session) return null;

  return await fetchUserProfile(session.session.user.id);
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("Logout error:", error);
    throw new Error(error.message);
  }
}
