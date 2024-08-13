import { InsertTables, Tables } from "@/constants/types";
import supabase from "./supabase";

const updateProductRatings = async (productIds: number[]): Promise<void> => {
  const uniqueProductIds = [...new Set(productIds)];

  const updatePromises = uniqueProductIds.map(async (productId) => {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("rating")
      .eq("product_id", productId);
    console.log(reviews, "😂");

    if (error) {
      throw new Error(
        `Error fetching reviews for rating update: ${error.message}`
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
      throw new Error(`Error updating product ratings: ${updateError.message}`);
    }
  });

  await Promise.all(updatePromises);
};

export const getReviews = async (productId: number) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId);

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }

  return data;
};

export const createReviews = async (reviews: InsertTables<"reviews">[]) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert(reviews)
    .select();

  if (error) {
    throw new Error(`Error creating review: ${error.message}`);
  }
  await updateProductRatings(data.map((review) => review.id));
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
    .eq("order_id", orderId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Error checking if user can submit review: ${error.message}`
    );
  }

  return data === null;
};

export const getOrderReview = async (orderId: number) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("order_id", orderId);

  if (error) {
    throw new Error(`Error fetching order reviews: ${error.message}`);
  }

  return data;
};
