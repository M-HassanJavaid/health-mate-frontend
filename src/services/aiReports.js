import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


const aiReportApi = createApi({
    reducerPath: 'aiReportApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/ai`,
        credentials: 'include'
    }),
    endpoints: (builder)=>({

        generateAiReport : builder.mutation({
            query: (id)=>({
                url: '/generateAiReport',
                method: 'POST',
                body: {
                    documentId: id
                }
            })
        }),

        getAiReportById: builder.query({
            query: (id)=>({
                url: `id/${id}`,
            })
        })

        

    })
})

export default aiReportApi;
export const { 
    useGenerateAiReportMutation,
    useGetAiReportByIdQuery
} = aiReportApi;