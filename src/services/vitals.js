import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const vitalsApi = createApi({
    reducerPath: 'vitalsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/vitals`,
        credentials: 'include'
    }),
    tagTypes: ['Vitals'],
    endpoints: (builder)=>({

        addVitals: builder.mutation({
            query: (vitals)=>({
                url: '/add',
                body: vitals,
                method: 'POST'
            }),
            invalidatesTags: ['Vitals']
        }),

        getVitals : builder.query({
            query: ()=>({
                url: '/getVitals'
            }),
            providesTags: ['Vitals']
        }),

        deleteVitals: builder.mutation({
            query: (id)=>({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Vitals']
        })

        

    })
})

export default vitalsApi;
export const { 
    useAddVitalsMutation,
    useGetVitalsQuery,
    useDeleteVitalsMutation
} = vitalsApi;