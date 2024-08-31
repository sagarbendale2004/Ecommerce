import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  items: [],
};

let CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }
    },

    remove: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrease quantity by 1
        } else {
          state.items = state.items.filter((i) => i.id !== id); // Remove item if quantity is 0
        }
      }
    },

    clearCart: (state) => {
      state.items = []; // Clear the cart items
    },
  },
});

export const { add, remove, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
