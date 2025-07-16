import React from 'react';
import { useLocation } from 'react-router-dom';        // if you’re using react-router
import { useGetConsentRequestQuery, useGetConsentTokenQuery } from '../../../rtk/features/resourceRegistry/consentApi';

const ConsentResultPage: React.FC = () => {
  // 1. grab the raw query string
  const { search } = useLocation();                    // React Router
  // const search = window.location.search;             // plain React, no router

  // 2. parse out the params
  const params = React.useMemo(() => new URLSearchParams(search), [search]);
  const requestId   = params.get('requestId')   ?? ''; // will be '9d5b0ff2-…' in your example URL
  const environment = params.get('environment') ?? 'at22'; // default to 'at22' if not provided

  console.log('Parsed requestId:', requestId);

  // 3. call your RTK Query hook
  const { data, isLoading, isError, error } = useGetConsentRequestQuery({
    id: requestId,
    environment,
  }, {
    // optional: skip the query if we don’t have an id yet
    skip: !requestId,
  });

  const { data: tokenData } = useGetConsentTokenQuery({
    id: requestId,
    environment,
  }, {
    // optional: skip the query if we don’t have an id yet
    skip: !requestId,
  });


  // 4. render your loading / error / data states
  if (!requestId) {
    return <p style={{ color: 'red' }}>No requestId provided in URL.</p>;
  }
  if (isLoading) {
    return <p>Loading consent result…</p>;
  }
  if (isError) {
    return <p>Error fetching consent: {(error as any)?.message || 'Unknown error'}</p>;
  }

  return (
    <div>
      <h1>Consent Result</h1>
      <p>Your consent request has been processed.</p>
      {/* present whatever data shape your API returns */}
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <pre>{JSON.stringify(tokenData, null, 2)}</pre>
    </div>
  );
};

export default ConsentResultPage;
