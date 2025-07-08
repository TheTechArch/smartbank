import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ServiceResource } from '../../types';
import { getApiBaseUrl } from '../../../resources/utils/ApiUrlUtil';

const apiUrl = getApiBaseUrl();

export const resourceRegistryApi = createApi({
  reducerPath: 'resourceRegistryApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ['consentResources'],
  endpoints: (builder) => ({
    getConsentResources: builder.query<ServiceResource[], { environment: string }>({
      query: (arg) => ({ url: `resourceregistry/consent-resources/${arg.environment}`, method: 'GET' }),
      providesTags: ['consentResources'],
    }),
  }),
});

export const {
  useGetConsentResourcesQuery
} = resourceRegistryApi;

export const { endpoints, reducerPath, reducer, middleware } = resourceRegistryApi;