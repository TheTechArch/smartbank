import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';


import { resourceRegistryApi } from '../features/resourceRegistry/resourceRegistryApi';
import { consentApi } from '../features/resourceRegistry/consentApi';

const store = configureStore({
    reducer: {
  
      [resourceRegistryApi.reducerPath]: resourceRegistryApi.reducer,
      [consentApi.reducerPath]: consentApi.reducer,
     },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        resourceRegistryApi.middleware,
        consentApi.middleware,  
      ),
  });
  
  setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;