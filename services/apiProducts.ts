import supabase from "./supabase";
type getProductsParams = {
  type: string;
  filter?: string;
  page?: number;
  limit?: number;
};
export async function getProducts({
  type,
  filter,
  page = 1,
  limit = 10,
}: getProductsParams) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
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
    .eq("name", filter || "")
    .range(from, to);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}
