import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

let initialState = {
  data: [],
  status: STATUSES.IDLE,
};

let ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setProducts: (state, action) => {    // method 1
    //   state.data = action.payload;
    // },
    // setStatus: (state, action) => {
    //   state.status = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
  },
});

export const { setProducts, setStatus } = ProductSlice.actions;

export default ProductSlice.reducer;

//Thunk - it is a piece of code that does some delayed work rather than execute some logic now, we can write a function body or code that can be used to perform the work later.(Middleware)

// method 1 - thunk
// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch, getstate) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const res = await fetch("https://fakestoreapi.com/products");
//       const data = await res.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }

// method 2 -
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});
