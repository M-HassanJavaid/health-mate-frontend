import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import anylaticsApi from "./anylatics";


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
            invalidatesTags: [{ type: 'Vitals', id: 'LIST' }],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(anylaticsApi.util.invalidateTags(['Anylatics']));
                } catch {
                    // Silently fail if analytics update fails
                }
            }
        }),

        getVitals : builder.query({
            query: ()=>({
                url: '/getVitals'
            }),
            providesTags: (result) => 
                result 
                ? [
                    ...result.vitals.map(({ _id }) => ({ type: 'Vitals', id: _id })),
                    { type: 'Vitals', id: 'LIST' }
                ] 
                : [{ type: 'Vitals', id: 'LIST' }]
        }),

        deleteVitals: builder.mutation({
            query: (id)=>({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Vitals', id },
                { type: 'Vitals', id: 'LIST' }
            ]
        })

        

    })
})

export default vitalsApi;
export const { 
    useAddVitalsMutation,
    useGetVitalsQuery,
    useDeleteVitalsMutation
} = vitalsApi;