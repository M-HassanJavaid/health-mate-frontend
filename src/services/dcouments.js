import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const documentApi = createApi({
    reducerPath: 'documentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/document`,
        credentials: 'include'
    }),
    tagTypes: ['Documents'],
    endpoints: (builder)=>({

        uploadDocument : builder.mutation({
            query: (data)=>({
                url: '/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Documents']
        }),

        getAllDocuments: builder.query({
            query: ()=>({
                url: '/all',
            }),
            providesTags: ['Documents']
        }),

        deleteDocument: builder.mutation({
            query: (id)=>({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Documents']
        }),

        getRecentDocument : builder.query({
            query: ()=>({
                url: '/recent',
            }),
            providesTags: ['Documents']
        })

    })
})

export default documentApi;
export const { 
    useUploadDocumentMutation,
    useGetAllDocumentsQuery,
    useDeleteDocumentMutation,
    useGetRecentDocumentQuery
} = documentApi;