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
    // console.error("Error fetching wishlist for user:", userId, error);
    throw new Error("There was an issue loading your wishlist.");
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
    // console.error("Error creating wishlist entry:", newWishlist, error);
    throw new Error("There was an issue creating your wishlist.");
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
    // console.error(
    //   `Error checking wishlist status for user: ${userId}, product: ${productId}`,
    //   error
    // );
    throw new Error("There was an issue checking your wishlist status.");
  }

  return data ? data.id : null;
}

export async function deleteWishlist(wishlistId: number) {
  const { data, error } = await supabase
    .from("wishlist")
    .delete()
    .eq("id", wishlistId);

  if (error) {
    // console.error("Error deleting wishlist with ID:", wishlistId, error);
    throw new Error(
      "There was an issue removing this item from your wishlist."
    );
  }
  return data;
}
