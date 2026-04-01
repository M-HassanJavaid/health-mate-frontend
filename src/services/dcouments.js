import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const documentApi = createApi({
    reducerPath: 'documentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/document`,
        credentials: 'include'
    }),
    tagTypes: ['Documents'],
    endpoints: (builder) => ({

        uploadDocument: builder.mutation({
            query: (data) => ({
                url: '/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{ type: 'Documents', id: 'LIST' }]
        }),

        getAllDocuments: builder.query({
            query: () => ({
                url: '/all',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.documents.map(({ _id }) => ({ type: 'Documents', id: _id })),
                        { type: 'Documents', id: 'LIST' }
                    ]
                    : [{ type: 'Documents', id: 'LIST' }]
        }),

        deleteDocument: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Documents', id },
                { type: 'Documents', id: 'LIST' }
            ]
        }),

        getRecentDocument: builder.query({
            query: () => ({
                url: '/recent',
            }),
            providesTags: (result) =>
                result?.document
                    ? [{ type: 'Documents', id: result.document._id }, { type: 'Documents', id: 'RECENT' }]
                    : [{ type: 'Documents', id: 'RECENT' }]
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