import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    allUserCount : 0,
    subscribedCounts : 0,
}


export const getStatData = createAsyncThunk("/stats/get", async(_,{rejectWithValue})=>{
    try{
        const promise = axiosInstance.get("admin/stats/user");

        const res = await toast.promise(promise,{
            loading: "Wait! Loading the stats...",
            success: (res) => res?.data?.message || "Stats Loaded successfully!",
            error: (err) => err?.response?.data?.message || "Failed to load stats",
        })

        return res.data;
    }catch(error){
        return rejectWithValue(error?.response?.data?.message || "Something Went Wrong");
    }
})
const StatSlice = createSlice({
    name : 'stats',
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder
           .addCase(getStatData.fulfilled, (state,action)=>{
                state.allUserCount = action?.payload?.allUserCount;
                state.subscribedCounts = action?.payload?.subscribedCounts;
           })
    }
})


export default StatSlice.reducer;