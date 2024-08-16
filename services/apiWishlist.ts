import { PAGE_LIMIT } from "@/constants/constants";
import supabase from "./supabase";
import { InsertTables, Tables } from "@/constants/types";

type getWishlistParams = {
  userId: string;
  page?: number;
};

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
    throw new Error("Unable to fetch wishlist.");
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
    throw new Error("Unable to create wishlist.");
  }
  return data;
}

export async function getWishlistStatus(productId: number, userId?: string) {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("wishlist")
    .select("id")
    .eq("product_id", productId)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error(error);
    throw new Error("Unable to get wishlist status.");
  }

  return data ? data.id : null;
}

export async function deleteWishlist(wishlistId: number) {
  const { data, error } = await supabase
    .from("wishlist")
    .delete()
    .eq("id", wishlistId);

  if (error) {
    throw new Error("Unable to delete wishlist.");
  }
  return data;
}
