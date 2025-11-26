import { Token } from '@mui/icons-material';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/users" }),
    endpoints: (builder) => ({

        // GET /api/users/me
        getUserMe: builder.query<void, void>({
            query: () => 'users/me',
        }),

        // POST /api/auth/register
        createUser: builder.mutation({
            query: (user) => ({
                url: 'auth/register',
                method: 'POST',
                body: user,
            }),
        }),

        // POST /api/auth/confirm
        confirm: builder.mutation({
            query: (token: string) => ({
                url: 'auth/confirm',
                method: 'POST',
                body: { token },
            }),
        }),


        // POST /api/auth/login
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // POST /api/auth/forgot-password
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body: data,  // { email }
            }),
        }),

        // ✅ POST /api/auth/reset-password
        resetPassword: builder.mutation({
            query: (data) => ({
                url: 'auth/reset-password',
                method: 'POST',
                body: data, // { token, newPassword }
            }),
        }),
    }),
});

export const {
    useGetUserMeQuery,
    useCreateUserMutation,
    useConfirmMutation,
    useLoginUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = userApi;
