import { Tables } from "@/constants/database.types";
import { CartType, PriceType } from "@/constants/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartType = {
  items: [],
  total_price: 0.0,
};

const calculateItemTotalPrice = (item: { prices: PriceType[] }): number => {
  return item.prices.reduce(
    (total, price) => total + price.price * price.quantity,
    0
  );
};

const calculateTotalPrice = (items: { prices: PriceType[] }[]): number => {
  return items.reduce(
    (total, item) => total + calculateItemTotalPrice(item),
    0
  );
};

const formatPrice = (price: number): number => {
  return parseFloat(price.toFixed(2));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
        existingItem.total_price = formatPrice(
          calculateItemTotalPrice(existingItem)
        );
      } else {
        const newItemWithTotal = {
          ...newItem,
          total_price: formatPrice(calculateItemTotalPrice(newItem)),
        };
        state.items.push(newItemWithTotal);
      }

      state.total_price = formatPrice(calculateTotalPrice(state.items));
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      state.total_price = formatPrice(calculateTotalPrice(state.items));
    },
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
            item.prices.splice(priceIndex, 1);
            // If the prices array is empty, remove the item from the cart
            if (item.prices.length === 0) {
              state.items = state.items.filter(
                (cartItem) => cartItem.product.id !== id
              );
            }
          }
          if (item.prices.length > 0) {
            item.total_price = formatPrice(calculateItemTotalPrice(item));
          }
        }
        state.total_price = formatPrice(calculateTotalPrice(state.items));
      }
    },
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
