import { configureStore } from "@reduxjs/toolkit";
// import authApi from "../services/authApi";
import authReducer from '../features/authSlice';
import anylaticsApi from "../services/anylatics";
import authApi from "../services/auth";
import vitalsApi from "../services/vitals";
import documentApi from "../services/dcouments";
import aiReportApi from "../services/aiReports";


const store = configureStore({
    reducer:{
        auth: authReducer,
        [anylaticsApi.reducerPath] : anylaticsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [vitalsApi.reducerPath]: vitalsApi.reducer,
        [documentApi.reducerPath]: documentApi.reducer,
        [aiReportApi.reducerPath]: aiReportApi.reducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            anylaticsApi.middleware,
            authApi.middleware,
            vitalsApi.middleware,
            documentApi.middleware,
            aiReportApi.middleware
        )
});


export default store