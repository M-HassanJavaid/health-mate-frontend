import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const anylaticsApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/anylatics`,
        credentials: 'include'
    }),
    tagTypes: ['Anylatics'],
    endpoints: (builder)=>({

        getAnylatics: builder.query({
            query: ()=>({
                url: '/kpis',
            }),
            providesTags: ['Anylatics']
        }),

        

    })
})

export default anylaticsApi;
export const { 
    useGetAnylaticsQuery
} = anylaticsApi;