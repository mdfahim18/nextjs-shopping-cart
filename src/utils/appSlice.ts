import { ProductProps } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface initialStateProps {
  isSidebarOpen: boolean;
  amount: number;
  cart: ProductProps[];
  totalPrice: number;
}
const initialState: initialStateProps = {
  isSidebarOpen: false,
  amount: 0,
  cart: [],
  totalPrice: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },

    increment: (state, action: PayloadAction<ProductProps>) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      state.amount += 1;
      state.totalPrice += product.price;
    },
    decrement: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const productIndex = state.cart.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        const product = state.cart[productIndex];
        if (product.quantity > 1) {
          product.quantity -= 1;
          state.amount -= 1;
          state.totalPrice -= product.price;
        } else {
          state.cart.splice(productIndex, 1);
          state.amount -= 1;
          state.totalPrice -= product.price;
        }
      }
    },

    removeItem: (state, action: PayloadAction<ProductProps>) => {
      const removedProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (removedProduct) {
        state.cart = state.cart.filter((item) => item.id !== removedProduct.id);
        state.amount -= removedProduct.quantity;
        state.totalPrice -= removedProduct.price * removedProduct.quantity; // Decrease totalPrice by removed product price multiplied by its quantity
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.amount = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  increment,
  decrement,
  removeItem,
  clearCart,
} = appSlice.actions;
export default appSlice.reducer;
