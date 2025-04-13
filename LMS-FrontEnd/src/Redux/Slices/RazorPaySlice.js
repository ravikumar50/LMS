import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import { act } from "react";
import toast from "react-hot-toast";

const initialState = {
    key : '',
    subscription_id : '',
    isPaymentVerified : false,
    allPayments : {},
    finalMonths : {},
    monthlySalesRecord : []
}

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async(_,{rejectWithValue})=>{
    try{
        const res = await axiosInstance.get("/payements/razorpayKey");
        return res.data;
    }catch(error){
        return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
})


export const purchaseCourseBundle = createAsyncThunk("/razorpay/purchase", async(data,{rejectWithValue})=>{
    try{
        const res = await axiosInstance.post("/payements/subscribe",data);
        return res.data;
    }catch(error){
        return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
})

export const verifyUserPayment = createAsyncThunk("/razorpay/verifypayment", async(data,{rejectWithValue})=>{
    try{
        const res = await axiosInstance.post("/payements/verify",{
            razorpay_payment_id : data.razorpay_payment_id,
            razorpay_signature : data.razorpay_signature,
            razorpay_subscription_id : data.razorpay_subscription_id
        });
        return res.data;
    }catch(error){
        return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
})

export const getPaymentRecords = createAsyncThunk("/razorpay/paymentrecord", async(_,{rejectWithValue})=>{
    try{
        const res = await axiosInstance.get("/payements?count==20");

        toast.promise(res,{
            loading: "Wait! Getting the payment Details...",
            success: (res) => res?.data?.message || "Fetched payment details successfully!",
            error: (err) => err?.response?.data?.message || "Failed to fetch details",
          })
        return res.data;
    }catch(error){
        return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
})



export const cancelCourseBundle = createAsyncThunk("/razorpay/cancel", async(data,{rejectWithValue})=>{
    try{
        const res = await axiosInstance.post("/payements/unsubscribe",data);

        toast.promise(res,{
            loading: "Wait! Unsubscribing the Bundle...",
            success: (res) => res?.data?.message || "Unsubscribing successfully!",
            error: (err) => err?.response?.data?.message || "Failed to Unsubscribing",
          })
        return res.data;
    }catch(error){
        return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
})


const rajorPaySlice = createSlice({
    name : 'rajorpoy',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder

            .addCase(getRazorPayId.fulfilled,(state,action)=>{
                toast.success(action?.payload?.message)
                state.key = action?.payload?.key
            })

            .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
                toast.success(action?.payload?.message)
                state.subscription_id = action?.payload?.subscription_id
            })

           .addCase(cancelCourseBundle.fulfilled,(state,action)=>{
                toast.success(action?.payload?.message)
                state.isPaymentVerified = action?.payload?.success
            })

           .addCase(verifyUserPayment.fulfilled,(state,action)=>{
                toast.success(action?.payload?.message)
                state.isPaymentVerified = action?.payload?.success
           })

           .addCase(verifyUserPayment.rejected,(state,action)=>{
                toast.success(action?.payload?.message)
                state.isPaymentVerified = action?.payload?.success
           })

           .addCase(getPaymentRecords.fulfilled,(state,action)=>{
                toast.success(action?.payload?.message)
                state.allPayments = action?.payload?.allPayments
                state.finalMonths = action?.payload?.finalMonths
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord
           })
    }
})

export default rajorPaySlice.reducer;