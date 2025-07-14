import React, { useState, useEffect } from 'react';
import { useGetConsentResourcesQuery } from '../../../rtk/features/resourceRegistry/resourceRegistryApi';
import { useCreateConsentRequestMutation } from '../../../rtk/features/resourceRegistry/consentApi';
import {
  Button,
  Textfield,
  Select,
  Fieldset,
  Link,
  Details,
  Field,
  Label
} from '@digdir/designsystemet-react';
import type {
  ServiceResource,
  ConsentRequestBff,
  ConsentRightBFF
} from '../../../rtk/types';

const SimplifiedConsentRequestPage: React.FC = () => {
  // form state
  const [offeredBy, setOfferedBy] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [environment, setEnvironment] = useState('at22');
  const [metadataValues, setMetadataValues] = useState<Record<string, string>>({});

  // 1) fetch the list of resources
  const { data: resources } = useGetConsentResourcesQuery({ environment });

  // 2) our createConsentRequest hook — note that we now pull `data`, `isSuccess`, etc.
  const [
    createConsentRequest,
    { data: result, isLoading, isError, isSuccess },
  ] = useCreateConsentRequestMutation();

  // find the full resource so we can render its metadata fields
  const selectedResource = resources?.find((r) => r.identifier === resourceId);

  // whenever resource changes, reset metadata inputs
  useEffect(() => {
    if (selectedResource?.consentMetadata) {
      const init: Record<string, string> = {};
      Object.keys(selectedResource.consentMetadata).forEach((k) => {
        init[k] = '';
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
      environment: environment,
    };

    // fire & forget — the hook will populate `result` & flip `isSuccess`
    await createConsentRequest(payload).unwrap();
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg" onSubmit={handleSubmit}>
      <Fieldset>
        <Textfield
          label="National ID"
          name="nationalId"
          value={offeredBy}
          onChange={(e) => setOfferedBy(e.target.value)}
        />

       <Details>
        <Details.Summary>Consent Request Details</Details.Summary>

          <Details.Content>


    <Field>
      <Label>Samtykkeressurs</Label>
        <Select
          name="environment"
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
        >
          <option value="at22">AT22</option>
          <option value="at23">AT23</option>
          <option value="at24">AT24</option>
          <option value="tt02">TT02</option>
        </Select>
    </Field>

    <Field>
      <Label>Samtykkeressurs som brukes i samtykke</Label>
        <Select
          name="resourceId"
          value={resourceId}
          onChange={(e) => setResourceId(e.target.value)}
        >
          <option value="">-- Velg samtykkeresssurs --</option>
          {resources?.map((res: ServiceResource) => (
            <option key={res.identifier} value={res.identifier}>
              {res.identifier}
            </option>
          ))}
        </Select>
    </Field>

    <Fieldset className="mt-4">
        {selectedResource?.consentMetadata &&
          Object.entries(selectedResource.consentMetadata).map(([key, meta]) => (
            <Textfield
              key={key}
              label={`${key}${meta.optional ? ' (optional)' : ''}`}
              name={key}
              required={!meta.optional}
              value={metadataValues[key] ?? ''}
              onChange={(e) => handleMetadataChange(key, e.target.value)}
            />
          ))}

    </Fieldset>
          </Details.Content>
        </Details> 

        <div className="mt-4 flex justify-end">
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting…' : 'Submit'}
          </Button>
        </div>

        {isError && (
          <p className="text-red-600 mt-2">Submission failed—please try again.</p>
        )}
      </Fieldset>

      {/* only once the hook tells us it succeeded & we actually have result.consentUrl */}
      {isSuccess && result?.consentUrl && (
        <div className="mt-6 text-center">
          <Link href={result.consentUrl} target="_blank">
            👉 Complete your consent here
          </Link>
        </div>
      )}
    </form>
  );
};

export default SimplifiedConsentRequestPage;
