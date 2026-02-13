import { createAsyncThunk } from "@reduxjs/toolkit";
import reducer from "./AuthSlice"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseData : []
}

export const getAllCourses = createAsyncThunk("/courses/get", async(_,{rejectWithValue})=>{
    try{
        const promise = axiosInstance.get("/courses");

        const res = await toast.promise(promise, {
            loading: "Wait! Loading Courses Data...",
            success: (res) => res?.data?.message || "Loaded successfully!",
            error: (err) => err?.response?.data?.message || "Failed to Load",
          });
          return res.data.courses;
    }catch(error){
        return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
})

export const createNewCourse = createAsyncThunk("/courses/createCourse", async(data,{rejectWithValue})=>{
    try{
        const promise = axiosInstance.post("/courses/createCourse",data);
        const res = await toast.promise(promise,{
            loading : "Wait! Creating Course...",
            success : (res) => res?.data?.message || "Course Created Successfully!",
            error : (err) => err?.response?.data?.message || "Failed to Create Course",
        })
        return res.data;
    }catch(error){
        return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }    
})


export const deleteCourse = createAsyncThunk("/courses/delete", async(cid,{rejectWithValue})=>{
    try{
        const promise = axiosInstance.get(`/courses/deleteCourse/${cid}`);

        const res = await toast.promise(promise, {
            loading: "Wait! Deleting Course...",
            success: (res) => res?.data?.message || "Deleted successfully!",
            error: (err) => err?.response?.data?.message || "Failed to Delete",
          });
          return res.data;
    }catch(error){
        return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
})

const courseSlice = createSlice({
    name : 'courses',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        
        .addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action.payload){
                state.courseData = [...action.payload];
            }
        })
        .addCase(createNewCourse.fulfilled,(state,action)=>{
            if(action.payload){
                state.courseData.push(action.payload);
            }
        })
    }
})

export default courseSlice.reducer;