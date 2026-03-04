import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const documentApi = createApi({
    reducerPath: 'documentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/document`,
        credentials: 'include'
    }),
    endpoints: (builder)=>({

        uploadDocument : builder.mutation({
            query: (data)=>({
                url: '/add',
                method: 'POST',
                body: data
            })
        }),

        getAllDocuments: builder.query({
            query: ()=>({
                url: '/all',
            })
        })

    })
})

export default documentApi;
export const { 
    useUploadDocumentMutation,
    useGetAllDocumentsQuery
} = documentApi;