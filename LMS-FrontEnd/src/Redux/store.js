import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import razorPaySliceReducer from "./Slices/RazorPaySlice";
import lectureSliceReducer from "./Slices/LectureSlice";
const store = configureStore({
  reducer: {
    auth : authSliceReducer,
    courses : courseSliceReducer,
    razorpay : razorPaySliceReducer,
    lecture : lectureSliceReducer
  },
  devTools: true,
});

export default store;
