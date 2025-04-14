import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import {toast} from "react-hot-toast"
import axios from "axios";
import SignUp from "../../Pages/SignUp";



const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") || false,
    role : localStorage.getItem('role') || "",
    data: (() => {
      const raw = localStorage.getItem("data");
      try {
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    })()
  }

export const createAccount = createAsyncThunk("/auth/signup", async (data,{rejectWithValue}) => {
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


export const loginToAccount = createAsyncThunk("/auth/login", async (data,{rejectWithValue}) => {
    try {
      const promise = axiosInstance.post("user/login", data);

      // Show toast inside the thunk
      const res = await toast.promise(promise, {
        loading: "Wait! Login to your account...",
        success: (res) => res?.data?.message || "Login successfully!",
        error: (err) => err?.response?.data?.message || "Failed to Login",
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
});

export const logoutFromAccount = createAsyncThunk("/auth/logout", async (_,{rejectWithValue}) => {
  try {
    const promise = axiosInstance.get("user/logout");

    // Show toast inside the thunk
    const res = await toast.promise(promise, {
      loading: "Wait! Signing out...",
      success: (res) => res?.data?.message || "Logout successfully!",
      error: (err) => err?.response?.data?.message || "Failed to Logout",
    });

    return res.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || "Something went wrong");
  }
});

export const updateProfile = createAsyncThunk("/auth/update", async (data,{rejectWithValue}) => {
  try {
    const promise = axiosInstance.put("user/update",data);

    // Show toast inside the thunk
    const res = await toast.promise(promise, {
      loading: "Wait! Updating Details...",
      success: (res) => res?.data?.message || "Details updated successfully!",
      error: (err) => err?.response?.data?.message || "Failed to Update",
    });

    return res.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || "Something went wrong");
  }
});



export const getUserData = createAsyncThunk("/auth/details", async (data,{rejectWithValue}) => {
  try {
    const promise = axiosInstance.get("user/me",data);

    // Show toast inside the thunk
    const res = await toast.promise(promise, {
      loading: "Wait! Updating Details...",
      success: (res) => res?.data?.message || "Details updated successfully!",
      error: (err) => err?.response?.data?.message || "Failed to Update",
    });

    return res.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || "Something went wrong");
  }
});


export const updatePassword = createAsyncThunk("/auth/updatepassword", async (data,{rejectWithValue}) =>{
  try{
    const promise = axiosInstance.post("/user/changePassword",data);

    const res = await toast.promise(promise,{
      loading: "Wait! Changing Password...",
      success: (res) => res?.data?.message || "Password changed successfully!",
      error: (err) => err?.response?.data?.message || "Failed to Changed Password",
    })
    return res.data;
  }catch (err) {
    return rejectWithValue(err?.response?.data?.message || "Something went wrong");
  }
})


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
      builder

        .addCase(createAccount.fulfilled,(state,action)=>{
          localStorage.setItem("data",JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role;
        })
        .addCase(loginToAccount.fulfilled, (state, action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logoutFromAccount.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role ="";
        })
        .addCase(updateProfile.fulfilled, (state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(updatePassword.fulfilled, (state,action)=>{
          localStorage.setItem("data",JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role;
        })
    }
})



export const {} = authSlice.actions; 
export default authSlice.reducer;