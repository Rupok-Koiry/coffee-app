import { InsertTables } from "@/constants/types";
import supabase from "./supabase";

export async function createPrices(newPrices: InsertTables<"prices">[]) {
  const { data, error } = await supabase
    .from("prices")
    .insert(newPrices)
    .select();

  if (error) {
    console.log(error);

    throw new Error("Failed to create prices");
  }
  return data;
}

export async function updatePrices(prices: InsertTables<"prices">[]) {
  //Later we will implement this function
}
