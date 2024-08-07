import { UpdateTables } from "@/constants/types";
import supabase from "./supabase";

export async function signup({
  full_name,
  email,
  password,
  phone_number,
  address,
  avatar_url,
}: UpdateTables<"profiles"> & { password: string; email: string }) {
    const {  error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(error);
    
    if (error) throw new Error(error.message);

    return await updateCurrentUser({ full_name, phone_number, address, avatar_url });
}

export async function updateCurrentUser({
  full_name,
  password,
  phone_number,
  address,
  avatar_url,
}: UpdateTables<"profiles"> & { password?: string }) {
    if (password) {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw new Error(error.message);
    }
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name,
        phone_number,
        address,
        avatar_url,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!avatar_url || !avatar_url.startsWith("file")) return data;

    const fileName = `avatar-${data.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar_url);

    if (storageError) throw new Error(storageError.message);

    const { data: updatedUser, error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar_url: fileName,
      })
      .select()
      .single();

    if (updateError) throw new Error(updateError.message);
    return updatedUser;
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

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

