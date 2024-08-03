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

export async function getProduct(productId: number) {
  // Fetch product data
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("id", productId)
    .single();

  // Handle product fetch error
  if (error) {
    console.error(error);
    throw new Error("Product not found");
  }
  return data;
}
