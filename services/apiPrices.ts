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
export async function updatePrices(newPrices: InsertTables<"prices">[]) {
  // Separate prices with id (existing) and without id (new)
  const existingPrices = newPrices.filter((price) => price.id !== undefined);
  const newPricesWithoutId = newPrices.filter(
    (price) => price.id === undefined
  );

  try {
    // Upsert existing prices
    if (existingPrices.length > 0) {
      const { error: updateError } = await supabase
        .from("prices")
        .upsert(existingPrices);

      if (updateError) {
        console.error("Failed to update existing prices:", updateError);
        throw new Error("Failed to update existing prices");
      }
    }

    // Insert new prices
    if (newPricesWithoutId.length > 0) {
      const { error: insertError } = await supabase
        .from("prices")
        .insert(newPricesWithoutId);

      if (insertError) {
        console.error("Failed to insert new prices:", insertError);
        throw new Error("Failed to insert new prices");
      }
    }

    // Fetch all prices for the given product_id to identify deleted ones
    const productIds = [...new Set(newPrices.map((price) => price.product_id))];
    const { data: existingData, error: fetchError } = await supabase
      .from("prices")
      .select()
      .in("product_id", productIds);

    if (fetchError) {
      console.error("Failed to fetch existing prices:", fetchError);
      throw new Error("Failed to fetch existing prices");
    }

    if (!existingData) {
      console.error("No existing prices found");
      throw new Error("No existing prices found");
    }

    // Identify prices to delete
    const newPriceIds = newPrices
      .map((price) => price.id)
      .filter((id) => id !== undefined);
    const pricesToDelete = existingData.filter(
      (price) => !newPriceIds.includes(price.id)
    );

    // Delete prices that are no longer in the newPrices list
    if (pricesToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from("prices")
        .delete()
        .in(
          "id",
          pricesToDelete.map((price) => price.id)
        );

      if (deleteError) {
        console.error("Failed to delete old prices:", deleteError);
        throw new Error("Failed to delete old prices");
      }
    }

    // Fetch and return the updated list of prices
    const { data, error } = await supabase
      .from("prices")
      .select()
      .in("product_id", productIds);

    if (error) {
      console.error("Failed to fetch updated prices:", error);
      throw new Error("Failed to fetch updated prices");
    }

    return data;
  } catch (error) {
    console.error("Error updating prices:", error);
    throw new Error("Prices could not be updated");
  }
}
