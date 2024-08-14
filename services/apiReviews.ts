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
      throw new Error(
        `Error fetching reviews for product ID ${productId}: ${error.message}`
      );
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
        `Error updating product ratings for product ID ${productId}: ${updateError.message}`
      );
      // Here, we log the error instead of throwing it, so that other products still get updated.
    }
  });

  try {
    await Promise.all(updatePromises);
  } catch (e) {
    console.error("Error in updating some product ratings:", e);
  }
};

export const getReviews = async (productId: number) => {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId);

  if (error) {
    throw new Error(
      `Error fetching reviews for product ID ${productId}: ${error.message}`
    );
  }

  return reviews;
};

export const createReviews = async (reviews: InsertTables<"reviews">[]) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert(reviews)
    .select();

  if (error) {
    throw new Error(`Error creating review: ${error.message}`);
  }

  // Assuming the `product_id` is present in the review data.
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
    throw new Error(
      `Error checking if user ${userId} can submit review for order ${orderId}: ${error.message}`
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
    throw new Error(
      `Error fetching order reviews for order ID ${orderId}: ${error.message}`
    );
  }

  return reviews;
};
export const updateReviews = async (reviews: Tables<"reviews">[]) => {
  const { data, error } = await supabase
    .from("reviews")
    .upsert(reviews)
    .select();

  if (error) {
    throw new Error(`Error updating review: ${error.message}`);
  }

  const productIds = data.map((review) => review.product_id);
  await updateProductRatings(productIds);
  return data;
};
