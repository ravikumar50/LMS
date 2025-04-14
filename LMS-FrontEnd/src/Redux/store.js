import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import razorPaySliceReducer from "./Slices/RazorPaySlice";
const store = configureStore({
  reducer: {
    auth : authSliceReducer,
    courses : courseSliceReducer,
    razorpay : razorPaySliceReducer
  },
  devTools: true,
});

export default store;
