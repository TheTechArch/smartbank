import React from 'react';
import { useLocation } from 'react-router-dom';        // if you’re using react-router
import { useGetConsentRequestQuery, useGetConsentTokenQuery } from '../../../rtk/features/resourceRegistry/consentApi';
import { Details } from '@digdir/designsystemet-react';

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
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Samtykke resultat</h1>
      <p>Samtykket har nå blitt bekreftet eller avvist. Nedenfor finner du detaljer om samtykkeforsel og token hvis akseptert og samtykket er</p>
      {/* present whatever data shape your API returns */}
      <Details>
        <Details.Summary>Request Details</Details.Summary>
        <Details.Content>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Details.Content>
      </Details>
    <Details>
        <Details.Summary>Token details</Details.Summary>
        <Details.Content>
            <pre>{JSON.stringify(tokenData, null, 2)}</pre>
        </Details.Content>
      </Details>

 
    </div>
  );
};

export default ConsentResultPage;
