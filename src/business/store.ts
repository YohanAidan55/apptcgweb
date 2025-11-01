import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {patientApi} from "./patient/patientApi.ts";

export const store = configureStore({
    reducer: {
        [patientApi.reducerPath]: patientApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(patientApi.middleware),
});

setupListeners(store.dispatch);
