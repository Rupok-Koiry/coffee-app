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
      throw new Error("Unable to fetch products.");
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
      throw new Error(`Unable to update product ratings.`);
    }
  });

  try {
    await Promise.all(updatePromises);
  } catch (e) {
    throw new Error("Unable to update some product ratings.");
  }
};

export const getReviews = async (productId: number) => {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*, user:profiles(*)")
    .eq("product_id", productId);

  if (error) {
    throw new Error(`Unable to fetch reviews for product`);
  }

  return reviews;
};

export const createReviews = async (reviews: InsertTables<"reviews">[]) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert(reviews)
    .select();

  if (error) {
    throw new Error(`Unable to create reviews.`);
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
    throw new Error(`Unable to check if user can submit review for order.`);
  }

  return data?.length === 0;
};

export const getOrderReviews = async (orderId: number) => {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("order_id", orderId);

  if (error) {
    throw new Error(`Unable to fetch order reviews.`);
  }

  return reviews;
};
export const updateReviews = async (reviews: Tables<"reviews">[]) => {
  const { data, error } = await supabase
    .from("reviews")
    .upsert(reviews)
    .select();

  if (error) {
    throw new Error(`Unable to update reviews.`);
  }

  const productIds = data.map((review) => review.product_id);
  await updateProductRatings(productIds);
  return data;
};
