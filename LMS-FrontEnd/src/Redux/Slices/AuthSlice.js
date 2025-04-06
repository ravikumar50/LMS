import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import {toast} from "react-hot-toast"

const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") || false,
    role : localStorage.getItem("role") || "",
    data : localStorage.getItem("data") || {},
}

export const createAccount = createAsyncThunk("/auth/signup", async (data, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.post("user/register", data);
  
      // Show toast inside the thunk
      const res = await toast.promise(promise, {
        loading: "Wait! Creating your account...",
        success: (res) => res?.data?.message || "Account created successfully!",
        error: (err) => err?.response?.data?.message || "Failed to create account",
      });
  
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
});
  

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {}
})

export const {} = authSlice.actions; 
export default authSlice.reducer;