import { PAGE_LIMIT } from "@/constants/constants";
import { Enums } from "@/constants/database.types";
import supabase from "./supabase";

type getOrdersParams = {
  status?: Enums<"order_status_enum">;
  page?: number;
};

export async function getOrders({ status, page = 1 }: getOrdersParams) {
  const from = (page - 1) * PAGE_LIMIT;
  const to = from + PAGE_LIMIT - 1;

  let query = supabase
    .from("orders")
    .select(
      `
      *,
      order_items(*, product:products(*))
    `
    )
    .range(from, to);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }

  // Group order items by order ID
  const orderMap = new Map();
  data.forEach((order) => {
    if (!orderMap.has(order.id)) {
      orderMap.set(order.id, { ...order, order_items: [] });
    }
    order.order_items.forEach((item) => {
      orderMap.get(order.id).order_items.push({
        ...item,
        product: item.product,
        total_price: item.total_price,
        quantity: item.quantity,
      });
    });
  });

  const processedData = Array.from(orderMap.values());

  return processedData;
}
