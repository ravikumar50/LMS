import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";
import { act } from "react";

const initialState = {
    lectures : []
}


export const getCourseLectures = createAsyncThunk("/courses/lecture/get",async(cid,{rejectWithValue})=>{
    try{
        
        
        const promise = axiosInstance.get(`/courses/${cid}`)
        

        const res = await toast.promise(promise,{
            loading : "Wait! Getting Lecture...",
            success : (res) => res?.data?.message || "Lecture fetched Successfully!",
            error : (err) => err?.response?.data?.message || "Failed to fetch Lecture",
        })
        
        

        return res.data;
    }catch(error){
        return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
})


export const addCourseLectures = createAsyncThunk("/courses/lecture/add",async(data,{rejectWithValue})=>{
    try{

        const formData = new FormData();
        formData.append('lecture', data.lecture);
        formData.append('title', data.title);
        formData.append('description', data.description);

        const promise = axiosInstance.post(`/courses/addLecture/${data.id}`,formData)

        const res = await toast.promise(promise,{
            loading : "Wait! Adding Course Lecture...",
            success : (res) => res?.data?.message || "Lecture added Successfully!",
            error : (err) => err?.response?.data?.message || "Failed to add Lecture",
        })

        return res.data;
    }catch(error){
        return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
})


export const deleteCourseLectures = createAsyncThunk("/courses/lecture/delete",async(data,{rejectWithValue})=>{
    try{
        const promise = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`)

        const res = await toast.promise(promise,{
            loading : "Wait! Deleting Course Lecture...",
            success : (res) => res?.data?.message || "Lecture deleted Successfully!",
            error : (err) => err?.response?.data?.message || "Failed to delete Lecture",
        })
        return res.data;
    }catch(error){
        return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
})




const lectureSlice = createSlice({
    name : 'lecture',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
          .addCase(getCourseLectures.fulfilled, (state,action)=>{
               if(action.payload.lecture){
                state.lectures = action.payload.lecture;
               }
          })

          .addCase(addCourseLectures.fulfilled, (state,action)=>{
            if(action.payload.course){
             state.lectures.push(action.payload.course);
            }
          })
    }
})


export default lectureSlice.reducer;