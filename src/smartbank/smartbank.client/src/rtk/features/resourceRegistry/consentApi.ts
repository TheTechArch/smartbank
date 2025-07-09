import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ConsentRequestResultBff } from '../../types';
import type { ConsentRequestBff } from '../../types';
import { getApiBaseUrl } from '../../../resources/utils/ApiUrlUtil';

const apiUrl = getApiBaseUrl();

export const resourceRegistryApi = createApi({
  reducerPath: 'resourceRegistryApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ['consentRequests'],
  endpoints: (builder) => ({
    CreateConsentRequest: builder.mutation<ConsentRequestResultBff, ConsentRequestBff>({
      query: (arg) => ({ url: `consent`, method: 'POST', body: arg }),
      invalidatesTags: ['consentRequests'],
    }),
  }),
});

export const {
  useCreateConsentRequestMutation
} = resourceRegistryApi;

export const { endpoints, reducerPath, reducer, middleware } = resourceRegistryApi;