import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/auth`,
        credentials: 'include'
    }),
    endpoints: (builder)=>({

        getUser: builder.query({
            query: ()=>({
                url: '/getUser',
            })
        }),

        login: builder.mutation({
            query: (credentials)=>({
                url: '/login',
                method: "POST",
                body: credentials
            })
        }),

        signup: builder.mutation({
            query: (credentials)=>({
                url: '/signup',
                method: 'POST',
                body: credentials
            })
        })
        

        

    })
})

export default authApi;
export const { 
    useGetUserQuery,
    useLoginMutation,
    useSignupMutation
} = authApi;