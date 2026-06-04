import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },

  },
});

export const {
  setProducts,
} = productsSlice.actions;

export default productsSlice.reducer;