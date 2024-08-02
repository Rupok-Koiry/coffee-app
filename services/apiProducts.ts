import { PAGE_LIMIT } from "@/constants/constants";
import { Enums } from "@/constants/database.types";
import supabase from "./supabase";

type getProductsParams = {
  type?: Enums<"product_type_enum">;
  filter?: string;
  search?: string;
  page?: number;
};
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts({
  type,
  filter,
  search,
  page = 1,
}: getProductsParams) {
  const from = (page - 1) * PAGE_LIMIT;
  const to = from + PAGE_LIMIT - 1;

  const query = supabase
    .from("products")
    .select(
      `
      *,
      prices (
        size,
        price,
        stock
      )
    `
    )
    .range(from, to);

  if (type) {
    query.eq("type", type);
  }

  if (filter) {
    query.eq("name", filter);
  }
  if (search) {
    query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function getProduct(productId: number, userId: string) {
  // Run both queries in parallel
  const [productResponse, wishlistResponse] = await Promise.all([
    supabase
      .from("products")
      .select("*, prices(*)")
      .eq("id", productId)
      .single(),
    supabase
      .from("wishlist")
      .select("product_id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single(),
  ]);

  // Destructure data and errors from the responses
  const { data: productData, error: productError } = productResponse;
  const { data: wishlistData, error: wishlistError } = wishlistResponse;

  // Handle product fetch error
  if (productError) {
    console.error(productError);
    throw new Error("Product not found");
  }

  // Handle wishlist fetch error (excluding no rows returned error)
  if (wishlistError && wishlistError.code !== "PGRST116") {
    // PGRST116 indicates no rows returned
    console.error(wishlistError);
    throw new Error("Could not check favorite status");
  }

  // Determine if the product is in the wishlist
  const is_favorite = !!wishlistData;

  return { ...productData, is_favorite };
}
