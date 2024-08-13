import { Tables } from '@/constants/types';
import supabase  from './supabase';

// Define constants for statuses
const ORDER_STATUS_DELIVERED = 'DELIVERED';

export const canUserSubmitReview = async (userId: string, productId: number): Promise<boolean> => {
  try {
    // Retrieve order items with the given product that have been delivered to the user
    const { data: orderItems, error: orderItemsError } = await supabase
      .from('order_items')
      .select('id, order_id')
      .eq('product_id', productId)
      .in('order_id', (query) =>
        query
          .from('orders')
          .select('id')
          .eq('user_id', userId)
          .eq('status', ORDER_STATUS_DELIVERED)
      );

    if (orderItemsError) {
      console.error('Error fetching order items for review access:', orderItemsError);
      return false;
    }

    if (orderItems.length === 0) {
      return false; // User hasn't purchased the product or the order isn't delivered
    }

    const orderId = orderItems[0].order_id;

    // Check if the user has already reviewed this product in the given order
    const alreadyReviewed = await hasAlreadyReviewed(orderId, productId, userId);
    return !alreadyReviewed;

  } catch (error) {
    console.error('Unexpected error when checking review submission eligibility:', error);
    return false;
  }
};

async function hasAlreadyReviewed(orderId: number, productId: number, userId: string): Promise<boolean> {
    // Check if there's already a review for the product by this user in the specific order
    const { data , error } = await supabase
      .from('reviews')
      .select('id')
      .eq('order_id', orderId)
      .eq('product_id', productId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { 
      console.log('Error checking review existence:', error);
      
      throw new Error('Error checking review existence');
    }

    return !!data;
  
}
const updateProductRatings = async (productId: number) => {
  const { data: reviews, error: createError } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId);

  if (createError) {
    console.error('Error fetching reviews for rating update:', createError);
     throw new Error('Product ratings could not be fetched');
  }

  const ratingsCount = reviews?.length || 0;
  const averageRating =
    ratingsCount > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / ratingsCount
      : 0;

  const { error: updateError } = await supabase
    .from('products')
    .update({
      average_rating: averageRating,
      ratings_count: ratingsCount,
    })
    .eq('id', productId);

  if (updateError) {
    console.error('Error updating product ratings:', updateError);
    throw new Error('Product ratings could not be updated');
  }
};

export const getReviews = async (productId: number) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId);

  if (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Reviews could not be fetched');
  }

  return data;
};
export const createReview = async (review:Tables<'reviews'>) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review);

  if (error) {
    console.error('Error creating review:', error);
    throw new Error('Review could not be created');
  }
   await updateProductRatings(review.product_id);
    return data;
};
