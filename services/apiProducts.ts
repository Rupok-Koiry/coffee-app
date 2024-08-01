import { PAGE_LIMIT } from "@/constants/constants";
import { Enums } from "@/constants/database.types";
import supabase from "./supabase";

type getProductsParams = {
  type: Enums<"product_type_enum">;
  filter?: string;
  searchText?: string;
  page?: number;
};
export async function getProducts({
  type,
  filter,
  searchText,
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
        quantity
      )
    `
    )
    .eq("type", type)
    .range(from, to);

  if (filter) {
    query.eq("name", filter);
  }
  if (searchText) {
    query.ilike("name", `%${searchText}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function getProduct(productId: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("id", productId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product not found");
  }

  return data;
}
