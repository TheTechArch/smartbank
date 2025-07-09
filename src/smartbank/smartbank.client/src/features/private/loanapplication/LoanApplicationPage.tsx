import React, { useState, useEffect } from 'react';
import { useGetConsentResourcesQuery } from '../../../rtk/features/resourceRegistry/resourceRegistryApi';
import { useCreateConsentRequestMutation } from '../../../rtk/features/resourceRegistry/consentApi';
import { Button, Textfield, Select, Fieldset, Link } from '@digdir/designsystemet-react';
import type {
  ServiceResource,
  ConsentRequestBff,
  ConsentRightBFF,
  ConsentRequestResultBff
} from '../../../rtk/types';

const SimplifiedConsentRequestPage: React.FC = () => {
  // Fetch available resources
  const { data: resources } = useGetConsentResourcesQuery({ environment: 'at22' });

  // Mutation hook
  const [createConsentRequest, { isLoading, isError }] = useCreateConsentRequestMutation();

  // Form state
  const [offeredBy, setOfferedBy] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [metadataValues, setMetadataValues] = useState<Record<string, string>>({});
  const [consentUrl, setConsentUrl] = useState<string | null>(null);

  // Find the full resource object when user selects one
  const selectedResource = resources?.find((r: ServiceResource) => r.identifier === resourceId);

  // (Re)initialize metadata inputs when resource changes, and clear the old URL
  useEffect(() => {
    if (selectedResource?.consentMetadata) {
      const init: Record<string, string> = {};
      Object.keys(selectedResource.consentMetadata).forEach((key) => {
        init[key] = '';
      });
      setMetadataValues(init);
    } else {
      setMetadataValues({});
    }
    setConsentUrl(null);
  }, [selectedResource]);

  // Track changes to each metadata field
  const handleMetadataChange = (key: string, value: string) => {
    setMetadataValues((prev) => ({ ...prev, [key]: value }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const right: ConsentRightBFF = {
      resourceId,
      metadata: metadataValues,
      action: 'consent',
    };

    const payload: ConsentRequestBff = {
      offeredBy,
      consentRightBFFs: [right],
      requestMessage: 'Please grant consent',
      environment: 'at22',
    };

    try {
      const result: ConsentRequestResultBff = await createConsentRequest(payload).unwrap();
      console.log('Consent API returned URL:', result.consentUrl);
      setConsentUrl(result.consentUrl);
    } catch (err) {
      console.error('Consent request failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg">
      <Fieldset>
        {/* National ID input */}
        <Textfield
          label="National ID"
          name="nationalId"
          value={offeredBy}
          onChange={(e) => setOfferedBy(e.target.value)}
        />

        {/* Resource selector */}
        <Select
          name="resourceId"
          value={resourceId}
          onChange={(e) => setResourceId(e.target.value)}
        >
          <option value="">-- Choose --</option>
          {resources?.map((res: ServiceResource) => (
            <option key={res.identifier} value={res.identifier}>
              {res.identifier}
            </option>
          ))}
        </Select>

        {/* Dynamic metadata fields */}
        {selectedResource?.consentMetadata &&
          Object.entries(selectedResource.consentMetadata).map(([key, meta]) => (
            <Textfield
              key={key}
              label={`${key}${meta.optional ? ' (optional)' : ''}`}
              name={`metadata-${key}`}
              required={!meta.optional}
              value={metadataValues[key] || ''}
              onChange={(e) => handleMetadataChange(key, e.target.value)}
            />
          ))}

        {/* Submit */}
        <div className="mt-4 flex justify-end">
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>

        {/* Show the returned consentUrl */}
        {consentUrl && (
          <div className="mt-4">
            <Link href={consentUrl} target="_blank">
              👉 Complete your consent here
            </Link>
          </div>
        )}

        {/* Error message */}
        {isError && (
          <p className="text-red-600 mt-2">Submission failed—please try again.</p>
        )}
      </Fieldset>
    </form>
  );
};

export default SimplifiedConsentRequestPage;
