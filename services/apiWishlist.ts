import { PAGE_LIMIT } from "@/constants/constants";
import supabase from "./supabase";

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
