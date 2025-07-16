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
  Label,
  Paragraph
} from '@digdir/designsystemet-react';
import type {
  ServiceResource,
  ConsentRequestBff,
  ConsentRightBFF
} from '../../../rtk/types';

const SimplifiedConsentRequestPage: React.FC = () => {
  // form state
  const [offeredBy, setOfferedBy] = useState('');
  const [environment, setEnvironment] = useState('at22');

  // support multiple consent rights
  const [consentRights, setConsentRights] = useState<ConsentRightBFF[]>([
    { resourceId: '', metadata: {}, action: 'consent' }
  ]);

  // fetch the list of resources
  const { data: resources } = useGetConsentResourcesQuery({ environment });

  // create consent request mutation
  const [
    createConsentRequest,
    { data: result, isLoading, isError, isSuccess }
  ] = useCreateConsentRequestMutation();

  // handle adding a new resource
  const addConsentRight = () => {
    setConsentRights(prev => [...prev, { resourceId: '', metadata: {}, action: 'consent' }]);
  };

  // handle removing a resource by index
  const removeConsentRight = (index: number) => {
    setConsentRights(prev => prev.filter((_, i) => i !== index));
  };

  // handle selecting a resource for a given consent right
  const handleResourceChange = (index: number, resourceId: string) => {
    setConsentRights(prev => {
      return prev.map((right, i) => {
        if (i !== index) return right;
        // find selected resource metadata keys
        const selected = resources?.find(r => r.identifier === resourceId);
        const initMeta: Record<string,string> = {};
        if (selected?.consentMetadata) {
          Object.keys(selected.consentMetadata).forEach(key => {
            initMeta[key] = '';
          });
        }
        return { ...right, resourceId, metadata: initMeta };
      });
    });
  };

  // handle metadata field change for a given consent right
  const handleMetadataChange = (index: number, key: string, value: string) => {
    setConsentRights(prev => prev.map((right, i) => {
      if (i !== index) return right;
      return { ...right, metadata: { ...right.metadata, [key]: value } };
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ConsentRequestBff = {
      offeredBy,
      consentRightBFFs: consentRights,
      requestMessage: 'Please grant consent',
      environment
    };

    await createConsentRequest(payload).unwrap();
  };

  return (
    <form className="max-w-3xl mx-auto p-6 bg-white rounded-lg" onSubmit={handleSubmit}>
      <Paragraph className="mb-4">
        Denne siden demonstrerer bruk av Altinn-samtykke i Altinn 3-plattformen. Du kan:
        <ul className="list-disc list-inside mb-2">
          <li className="mb-1">Opprette en samtykkeforespørsel for en tjeneste som krever samtykke.</li>
          <li className="mb-1">Velge hvilket miljø (test eller produksjon) forespørselen skal sendes til.</li>
          <li className="mb-1">Angi fødselsnummer eller organisasjonsnummer for den parten som skal gi samtykke.</li>
        </ul>
        Når forespørselen er sendt, får du en lenke som åpnes i et nytt vindu. Der bekrefter du samtykket i Altinn for det valgte miljøet. Etter at samtykket er gitt, sendes du tilbake til denne applikasjonen, som:
        <ul className="list-disc list-inside mb-2">
          <li className="mb-1">Sjekker status på forespørselen</li>
          <li className="mb-1">Henter ut samtykketoken</li>
        </ul>
        Hvis alt er i orden, brukes tokenet til å kalle et API som validerer samtykket.
      </Paragraph>

      <Fieldset>
        <Textfield
          label="Personnummer eller organisasjonsnummer for den som skal gi samtykke"
          name="nationalId"
          value={offeredBy}
          onChange={e => setOfferedBy(e.target.value)}
        />

        <Details>
          <Details.Summary>Samtykke detaljer</Details.Summary>
          <Details.Content>
            <Field>
              <Label>Miljø</Label>
              <Select
                name="environment"
                value={environment}
                onChange={e => setEnvironment(e.target.value)}
              >
                <option value="at22">AT22</option>
                <option value="at23">AT23</option>
                <option value="at24">AT24</option>
                <option value="tt02">TT02</option>
              </Select>
            </Field>

            {/* render multiple consent rights */}
            {consentRights.map((right, index) => {
              const selectedRes = resources?.find(r => r.identifier === right.resourceId);
              return (
                <Fieldset key={index} className="mt-4 border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg">Ressurs {index + 1}</Label>
                    <Button variant="secondary" type="button" onClick={() => removeConsentRight(index)}>
                      Slett
                    </Button>
                  </div>
                  <Field className="mt-2">
                    <Label>Velg ressurs</Label>
                    <Select
                      value={right.resourceId}
                      onChange={e => handleResourceChange(index, e.target.value)}
                    >
                      <option value="">-- Velg ressurs --</option>
                      {resources?.map(res => (
                        <option key={res.identifier} value={res.identifier}>
                          {res.identifier}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  {/* render metadata inputs */}
                  {selectedRes?.consentMetadata && (
                    <Fieldset className="mt-2">
                      {Object.entries(selectedRes.consentMetadata).map(([key, meta]) => (
                        <Textfield
                          key={key}
                          label={`${key}${meta.optional ? ' (optional)' : ''}`}
                          name={key}
                          required={!meta.optional}
                          value={right.metadata[key] || ''}
                          onChange={e => handleMetadataChange(index, key, e.target.value)}
                        />
                      ))}
                    </Fieldset>
                  )}
                </Fieldset>
              );
            })}

            <div className="mt-4">
              <Button variant="secondary" type="button" onClick={addConsentRight}>
                Legg til ressurs
              </Button>
            </div>
          </Details.Content>
        </Details>

        <div className="mt-4 flex justify-end">
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Sender…' : 'Send forespørsel'}
          </Button>
        </div>

        {isError && (
          <p className="text-red-600 mt-2">Sending feilet—prøv igjen.</p>
        )}
      </Fieldset>

      {isSuccess && result?.consentUrl && (
        <div className="mt-6 text-center">
          <Link href={result.consentUrl} target="_blank">
            👉 Fullfør samtykke her
          </Link>
        </div>
      )}
    </form>
  );
};

export default SimplifiedConsentRequestPage;
