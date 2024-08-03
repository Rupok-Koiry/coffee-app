import { Tables } from "@/constants/database.types";
import { PricesType } from "@/constants/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: {
    product: Tables<"products">;
    prices: PricesType[];
    total_price: number;
  }[];
  total_price: number;
}

const initialState: CartState = {
  items: [],
  total_price: 0,
};

const calculateItemTotalPrice = (item: { prices: PricesType[] }): number => {
  return item.prices.reduce(
    (total, price) => total + price.price * price.quantity,
    0
  );
};

const calculateTotalPrice = (items: { prices: PricesType[] }[]): number => {
  return items.reduce(
    (total, item) => total + calculateItemTotalPrice(item),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(
      state,
      action: PayloadAction<{
        product: Tables<"products">;
        prices: PricesType[];
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
        existingItem.total_price = calculateItemTotalPrice(existingItem);
      } else {
        const newItemWithTotal = {
          ...newItem,
          total_price: calculateItemTotalPrice(newItem),
        };
        state.items.push(newItemWithTotal);
      }

      state.total_price = calculateTotalPrice(state.items);
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      state.total_price = calculateTotalPrice(state.items);
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ id: number; size: string; quantity: number }>
    ) {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === id);

      if (item) {
        const price = item.prices.find((price) => price.size === size);
        if (price && quantity >= 0) {
          price.quantity = quantity;
          item.total_price = calculateItemTotalPrice(item);
          state.total_price = calculateTotalPrice(state.items);
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.total_price = 0;
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
