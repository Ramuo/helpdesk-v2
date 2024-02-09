import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constant";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/register`,
                method: 'POST',
                body: data
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST'
            }),
        }),
        getUserById: builder.query({
            query: (userId) => ({
                url: `${USER_URL}/${userId}`,  
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.userId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Users']
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation
} = userApiSlice;