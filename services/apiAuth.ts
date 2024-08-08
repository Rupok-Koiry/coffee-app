import { UpdateTables } from "@/constants/types";
import supabase from "./supabase";

export async function signup({
  full_name,
  email,
  password,
  phone,
  address,
  avatar,
}: UpdateTables<"profiles"> & { password: string; email: string }) {
  // Sign up the user with Supabase authentication
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        username: email.split("@")[0],
        phone,
        address,
        avatar,
      },
    },
  });

  console.log(authData, authError);
  
  if (authError) throw new Error(authError.message);

  return authData;

}

export async function updateCurrentUser({
  full_name,
  password,
  phone,
  address,
  avatar,
}: UpdateTables<"profiles"> & { password?: string }) {
    if (password) {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw new Error(error.message);
    }
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name,
        phone,
        address,
        avatar,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!avatar || !avatar.startsWith("file")) return data;

    const fileName = `avatar-${data.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    const { data: updatedUser, error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar: fileName,
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

