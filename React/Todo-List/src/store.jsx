import { configureStore } from '@reduxjs/toolkit';
import TodoReducer from "./slices/TodoSlice"



const store = configureStore({
    reducer : {
        todo : TodoReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store
