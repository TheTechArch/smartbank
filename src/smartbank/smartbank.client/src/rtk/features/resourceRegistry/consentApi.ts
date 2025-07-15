import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ConsentRequestResultBff } from '../../types';
import type { ConsentRequestBff } from '../../types';
import { getApiBaseUrl } from '../../../resources/utils/ApiUrlUtil';

const apiUrl = getApiBaseUrl();

export const consentApi = createApi({
  reducerPath: 'consentApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ['consentRequests', 'consentStatus'],
  endpoints: (builder) => ({
    CreateConsentRequest: builder.mutation<ConsentRequestResultBff, ConsentRequestBff>({
      query: (arg) => ({ url: `consent`, method: 'POST', body: arg }),
      invalidatesTags: ['consentRequests'],
    }),
    GetConsentRequest: builder.query<ConsentRequestResultBff, { id: string, environment: string}>({
      query: ({ id, environment }) => ({url: `consent/${id}?environment=${environment}`, method: 'GET'}),
       providesTags: ['consentStatus'],
    }),
  }),
});

export const {
  useCreateConsentRequestMutation,
  useGetConsentRequestQuery,        
} = consentApi;

export const { endpoints, reducerPath, reducer, middleware } = consentApi;