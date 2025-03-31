import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") || false,
    role : localStorage.getItem("role") || "",
    data : localStorage.getItem("data") || {},
}


export const createNewAccount = createAsyncThunk("/auth/signup", async(data)=>{
    try{
        const response = axiosInstance.post()
    }catch(err){
        return toast.error(err?.response?.data?.message);    
    }
})

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {}
})

export const {} = authSlice.actions; 
export default authSlice.reducer;