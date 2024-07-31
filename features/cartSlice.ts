import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Price {
  size: string;
  price: number;
  currency: string;
  quantity: number;
}

interface CartItem {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: string;
  imagelink_portrait: string;
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  average_rating: number;
  ratings_count: number;
  is_favorite: boolean;
  type: string;
  total_price: number;
}

interface CartState {
  items: CartItem[];
  total_price: number;
}

const initialState: CartState = {
  items: [],
  total_price: 0,
};

const calculateItemTotalPrice = (item: CartItem): number => {
  return item.prices.reduce(
    (total, price) => total + price.price * price.quantity,
    0
  );
};

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce(
    (total, item) => total + calculateItemTotalPrice(item),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

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
        newItem.total_price = calculateItemTotalPrice(newItem);
        state.items.push(newItem);
      }

      state.total_price = calculateTotalPrice(state.items);
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total_price = calculateTotalPrice(state.items);
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ id: string; size: string; quantity: number }>
    ) {
      const { id, size, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);

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
