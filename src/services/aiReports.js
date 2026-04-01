import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const aiReportApi = createApi({
    reducerPath: 'aiReportApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/ai`,
        credentials: 'include'
    }),
    tagTypes: ['AiReport'],
    endpoints: (builder)=>({

        generateAiReport : builder.mutation({
            query: (id)=>({
                url: '/generateAiReport',
                method: 'POST',
                body: {
                    documentId: id
                }
            }),
            invalidatesTags: (result) => 
                result?.aiReport 
                ? [{ type: 'AiReport', id: result.aiReport._id }, { type: 'AiReport', id: 'LIST' }]
                : [{ type: 'AiReport', id: 'LIST' }]
        }),

        getAiReportById: builder.query({
            query: (id)=>({
                url: `id/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'AiReport', id }]
        })

        

    })
})

export default aiReportApi;
export const { 
    useGenerateAiReportMutation,
    useGetAiReportByIdQuery
} = aiReportApi;