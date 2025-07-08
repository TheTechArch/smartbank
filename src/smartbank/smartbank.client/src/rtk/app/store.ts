import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';


import { resourceRegistryApi } from '../features/resourceRegistry/resourceRegistryApi';

const store = configureStore({
    reducer: {
  
      [resourceRegistryApi.reducerPath]: resourceRegistryApi.reducer,

     },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        resourceRegistryApi.middleware,
      ),
  });
  
  setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;