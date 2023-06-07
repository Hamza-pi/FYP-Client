import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import  productReducer  from "../features/products/productSlice";
import categoryReducer from "../features/category/categorySlice";
import colorReducer from "../features/color/colorSlice";
export const store = configureStore({
  reducer: {
    auth:authReducer,
    product:productReducer,
    category:categoryReducer,
    color:colorReducer
  },
});
