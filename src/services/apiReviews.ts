import { InsertTables, Tables } from "@/constants/types";
import supabase from "./supabase";

const updateProductRatings = async (productIds: number[]): Promise<void> => {
  const uniqueProductIds = [...new Set(productIds)];

  const updatePromises = uniqueProductIds.map(async (productId) => {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("rating")
      .eq("product_id", productId);

    if (error) {
      console.error(
        `Error fetching ratings for product ID ${productId}:`,
        error
      );
      throw new Error("There was an issue fetching product ratings.");
    }

    const ratingsCount = reviews?.length ?? 0;
    const averageRating =
      ratingsCount > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / ratingsCount
        : 0;

    const { error: updateError } = await supabase
      .from("products")
      .update({
        average_rating: averageRating,
        ratings_count: ratingsCount,
      })
      .eq("id", productId);

    if (updateError) {
      console.error(
        `Error updating ratings for product ID ${productId}:`,
        updateError
      );
      throw new Error("There was an issue updating product ratings.");
    }
  });

  try {
    await Promise.all(updatePromises);
  } catch (e) {
    console.error("Error updating product ratings:", e);
    throw new Error("There was an issue updating some product ratings.");
  }
};

export const getReviews = async (productId: number) => {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*, user:profiles(*)")
    .eq("product_id", productId);

  if (error) {
    console.error(`Error fetching reviews for product ID ${productId}:`, error);
    throw new Error("There was an issue fetching reviews for this product.");
  }

  return reviews;
};

export const createReviews = async (reviews: InsertTables<"reviews">[]) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert(reviews)
    .select();

  if (error) {
    console.error("Error creating reviews:", error);
    throw new Error("There was an issue creating your reviews.");
  }

  const productIds = data.map((review) => review.product_id);
  await updateProductRatings(productIds);
  return data;
};

export const checkReviewEligibility = async ({
  userId,
  orderId,
}: {
  userId: string;
  orderId: number;
}) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("id")
    .eq("user_id", userId)
    .eq("order_id", orderId);

  if (error) {
    console.error(
      `Error checking review eligibility for user ID ${userId} and order ID ${orderId}:`,
      error
    );
    throw new Error(
      "There was an issue checking review eligibility for this order."
    );
  }

  return data?.length === 0;
};

export const getOrderReviews = async (orderId: number) => {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("order_id", orderId);

  if (error) {
    console.error(`Error fetching reviews for order ID ${orderId}:`, error);
    throw new Error("There was an issue fetching reviews for this order.");
  }

  return reviews;
};

export const updateReviews = async (reviews: Tables<"reviews">[]) => {
  const { data, error } = await supabase
    .from("reviews")
    .upsert(reviews)
    .select();

  if (error) {
    console.error("Error updating reviews:", error);
    throw new Error("There was an issue updating your reviews.");
  }

  const productIds = data.map((review) => review.product_id);
  await updateProductRatings(productIds);
  return data;
};
