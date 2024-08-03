import { PAGE_LIMIT } from "@/constants/constants";
import supabase from "./supabase";
import { InsertTables, Tables } from "@/constants/types";

type getWishlistParams = {
  userId: string;
  page?: number;
};
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getWishlist({ userId, page = 1 }: getWishlistParams) {
  const from = (page - 1) * 2;
  const to = from + 2 - 1;

  const query = supabase
    .from("wishlist")
    .select(`*, product:products(*)`)
    .eq("user_id", userId)
    .range(from, to);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Wishlist could not be loaded");
  }

  return data;
}

export async function createWishlist(newWishlist: InsertTables<"wishlist">) {
  const { data, error } = await supabase
    .from("wishlist")
    .insert([newWishlist])
    .select()
    .single();

  if (error) {
    throw new Error("Failed to create wishlist");
  }
  return data;
}

export async function getWishlistStatus(productId: number, userId: string) {
  const { data, error } = await supabase
    .from("wishlist")
    .select("id")
    .eq("product_id", productId)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error(error);
    throw new Error("Could not get wishlist status");
  }

  return data ? data.id : null;
}

export async function deleteWishlist(wishlistId: number) {
  const { data, error } = await supabase
    .from("wishlist")
    .delete()
    .eq("id", wishlistId);

  if (error) {
    throw new Error("Wishlist could not be deleted");
  }
  return data;
}
