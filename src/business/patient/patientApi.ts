import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {Patient} from "./models/patient.ts";

export const patientApi = createApi({
    reducerPath: 'patientApi',
    baseQuery: fetchBaseQuery({
        baseUrl: REACT_API_ROOT, // adapte à ton backend
    }),
    endpoints: (builder) => ({
        // GET /api/patients
        getPatients: builder.query<Patient[], void>({  // <-- void ici
            query: () => 'patients',
        }),

        // GET /api/patients/{id}
        getPatientById: builder.query({
            query: (id) => `patients/${id}`,
        }),

        // POST /api/patients
        createPatient: builder.mutation({
            query: (patient) => ({
                url: 'patients',
                method: 'POST',
                body: patient,
            }),
        }),

        // PUT /api/patients/{id}
        updatePatient: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `patients/${id}`,
                method: 'PUT',
                body,
            }),
        }),

        // DELETE /api/patients/{id}
        deletePatient: builder.mutation({
            query: (id) => ({
                url: `patients/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetPatientsQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,
} = patientApi;
