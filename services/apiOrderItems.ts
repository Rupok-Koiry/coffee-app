import { InsertTables } from "@/constants/types";
import supabase from "./supabase";

export const createOrderItems = async (
  orderItems: InsertTables<"order_items">[]
) => {
  const { data, error } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select();
  if (error) {
    throw new Error("Failed to create order item");
  }
  return data;
};
