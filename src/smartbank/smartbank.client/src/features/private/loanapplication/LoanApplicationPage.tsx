import React, { useState, useEffect } from 'react';
import { useGetConsentResourcesQuery } from '../../../rtk/features/resourceRegistry/resourceRegistryApi';
import { useCreateConsentRequestMutation } from '../../../rtk/features/resourceRegistry/consentApi';
import { Button, Textfield, Select, Fieldset } from '@digdir/designsystemet-react';
import type { ServiceResource, ConsentRequestBff, ConsentRightBFF } from '../../../rtk/types';


export type ContactPoint = { category: string; email: string; telephone: string; contactPage: string; };
export type ResourceReference = { referenceSource?: string; reference?: string; referenceType?: string; };
export type CompetentAuthorityReference = { organization: string; orgcode: string; };
export type CompetentAuthority = CompetentAuthorityReference & { name: Record<string, string>; };
export type Keyword = { word: string; language: string; };
export type ConsentMetadata = { optional: boolean; };
export type AuthorizationReferenceAttribute = { id: string; value: string; };

    const SimplifiedConsentRequestPage: React.FC = () => {
  const { data: resources } = useGetConsentResourcesQuery({ environment: 'at22' });
  const [createConsentRequest, { isLoading, isSuccess, error }] = useCreateConsentRequestMutation();

  const [offeredBy, setOfferedBy] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [metadataValues, setMetadataValues] = useState<Record<string, string>>({});

  // Find selected resource
  const selectedResource = resources?.find((r: ServiceResource) => r.identifier === resourceId);

  // Initialize metadata inputs when resource changes
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
  }, [selectedResource]);

  const handleMetadataChange = (key: string, value: string) => {
    setMetadataValues((prev) => ({ ...prev, [key]: value }));
  };

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
      await createConsentRequest(payload).unwrap();
    } catch {
      // handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg">
      <Fieldset>
        <Textfield
          label="National ID"
          name="nationalId"
          value={offeredBy}
          onChange={(e) => setOfferedBy(e.target.value)}
        />

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

        <div className="mt-4 flex justify-end">
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>

        {isSuccess && <p className="text-green-600 mt-2">Submitted successfully!</p>}
        {error && <p className="text-red-600 mt-2">Submission failed.</p>}
      </Fieldset>
    </form>
  );
};

export default SimplifiedConsentRequestPage;
