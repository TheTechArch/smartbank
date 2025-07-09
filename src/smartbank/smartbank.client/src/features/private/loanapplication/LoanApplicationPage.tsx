import React, { useState } from 'react';
import { useGetConsentResourcesQuery } from '../../../rtk/features/resourceRegistry/resourceRegistryApi';
import { useCreateConsentRequestMutation } from '../../../rtk/features/resourceRegistry/consentApi';
import { Button, Textfield, Select, Fieldset } from '@digdir/designsystemet-react';

export type ConsentRequestBff = {
    offeredBy: string;
    onBehalfOf?: string;
    consentRightBFFs: ConsentRightBFF[];
    requestMessage: string;
    environment: string;
};

export type ConsentRightBFF = {
    resourceId: string;
    metadata: Record<string, string>;
    action?: string;
};

const SimplifiedConsentRequestPage: React.FC = () => {
    // Fetch available consent resources
    const { data: resources } = useGetConsentResourcesQuery({ environment: 'at22' });
    // Mutation hook
    const [createConsentRequest, { isLoading, isSuccess, error }] =
        useCreateConsentRequestMutation();

    // Local form state
    const [offeredBy, setOfferedBy] = useState('');
    const [resourceId, setResourceId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Construct payload
        const payload: ConsentRequestBff = {
            offeredBy,
            consentRightBFFs: [
                {
                    resourceId,
                    metadata: {},
                },
            ],
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
                    {resources?.map((res) => (
                        <option key={res.identifier} value={res.identifier}>
                            {res.identifier}
                        </option>
                    ))}
                </Select>

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
