import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ServiceResource } from '../../types';
import { getApiBaseUrl } from '../../../resources/utils/ApiUrlUtil';

const apiUrl = getApiBaseUrl();

export const resourceRegistryApi = createApi({
  reducerPath: 'resourceRegistryApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ['consentResourcs'],
  endpoints: (builder) => ({
    getConsentResources: builder.query<ServiceResource[], void>({
      query: (body) => ({ url: 'evs/search', method: 'POST', body }),
      providesTags: ['consentResourcs'],
    }),
  }),
});

export const {
  useGetConsentResourcesQuery
} = resourceRegistryApi;

export const { endpoints, reducerPath, reducer, middleware } = resourceRegistryApi;