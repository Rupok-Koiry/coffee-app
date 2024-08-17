import { Tables } from "@/constants/database.types";
import { CartType, PriceType } from "@/constants/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state of the cart
const initialState: CartType = {
  items: [],
  total_price: 0.0,
};

// Calculate total price for a specific cart item
const calculateItemTotalPrice = (item: { prices: PriceType[] }): number => {
  return item.prices.reduce(
    (total, price) => total + price.price * price.quantity,
    0
  );
};

// Calculate total price for all items in the cart
const calculateTotalPrice = (items: { prices: PriceType[] }[]): number => {
  return items.reduce(
    (total, item) => total + calculateItemTotalPrice(item),
    0
  );
};

// Format price to two decimal places
const formatPrice = (price: number): number => {
  return parseFloat(price.toFixed(2));
};

// Slice for cart management
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add or update an item in the cart
    addItemToCart(
      state,
      action: PayloadAction<{
        product: Tables<"products">;
        prices: PriceType[];
      }>
    ) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === newItem.product.id
      );

      if (existingItem) {
        // Update quantity if item already exists in cart
        newItem.prices.forEach((newPrice) => {
          const existingPrice = existingItem.prices.find(
            (price) => price.size === newPrice.size
          );
          if (existingPrice) {
            existingPrice.quantity += newPrice.quantity;
          } else {
            existingItem.prices.push(newPrice);
          }
        });
        // Update total price of the existing item
        existingItem.total_price = formatPrice(
          calculateItemTotalPrice(existingItem)
        );
      } else {
        // Add new item to the cart
        const newItemWithTotal = {
          ...newItem,
          total_price: formatPrice(calculateItemTotalPrice(newItem)),
        };
        state.items.push(newItemWithTotal);
      }

      // Update total price of the entire cart
      state.total_price = formatPrice(calculateTotalPrice(state.items));
    },
    // Remove an item from the cart by product ID
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      state.total_price = formatPrice(calculateTotalPrice(state.items));
    },
    // Update the quantity of a specific item in the cart
    updateItemQuantity(
      state,
      action: PayloadAction<{ id: number; size: string; quantity: number }>
    ) {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === id);

      if (item) {
        const priceIndex = item.prices.findIndex(
          (price) => price.size === size
        );
        if (priceIndex !== -1) {
          if (quantity > 0) {
            item.prices[priceIndex].quantity = quantity;
          } else {
            // Remove the size if quantity is zero
            item.prices.splice(priceIndex, 1);
            // Remove the item if no sizes remain
            if (item.prices.length === 0) {
              state.items = state.items.filter(
                (cartItem) => cartItem.product.id !== id
              );
            }
          }
          // Update total price if item still exists
          if (item.prices.length > 0) {
            item.total_price = formatPrice(calculateItemTotalPrice(item));
          }
        }
        // Update total price of the entire cart
        state.total_price = formatPrice(calculateTotalPrice(state.items));
      }
    },
    // Clear the entire cart
    clearCart(state) {
      state.items = [];
      state.total_price = 0.0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
