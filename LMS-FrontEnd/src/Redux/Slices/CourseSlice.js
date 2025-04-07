import { createAsyncThunk } from "@reduxjs/toolkit";
import reducer from "./AuthSlice"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseData : []
}

export const getAllCourses = createAsyncThunk("/courses/", async(_,{rejectWithValue})=>{
    try{
        const promise = axiosInstance.get("courses/");

        const res = await toast.promise(promise, {
            loading: "Wait! Loading Courses Data...",
            success: (res) => res?.data?.message || "Loded successfully!",
            error: (err) => err?.response?.data?.message || "Failed to Load",
          });
          return res.data;
    }catch(error){
        return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
})

const courseSlice = createSlice({
    name : 'courses',
    initialState,
    reducers : {},
    extraReducers : (builder) => {

    }
})

export default courseSlice.reducer;