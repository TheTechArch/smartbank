import React, { useState, useEffect } from 'react';
import { useGetConsentResourcesQuery } from '../../../rtk/features/resourceRegistry/resourceRegistryApi';
import { useCreateConsentRequestMutation } from '../../../rtk/features/resourceRegistry/consentApi';
import {
  Button,
  Heading,
  Textfield,
  Select,
  Checkbox,
  Fieldset,
  ErrorSummary,
  Details,
} from '@digdir/designsystemet-react';
import { GearSixIcon } from '@phosphor-icons/react';

// Define the shape of our combined form + consent request state
interface ConsentRightBFF {
  identifier: string;
}

interface ConsentFormState {
  // Form fields
  fullName: string;
  nationalId: string;
  email: string;
  phone: string;
  address: string;
  amount: string;
  purpose: string;
  term: string;
  agree: boolean;

  // Consent API fields
  From: string;
  offeredBy: string;
  consentRightBFFs: ConsentRightBFF[];
  requestMessage: string;
  environment: string;
}

const LoanApplicationPage: React.FC = () => {
  // Fetch available consent resources
  const { data: options } = useGetConsentResourcesQuery({ environment: 'at22' });
  // RTK mutation for creating a consent request
  const [createConsentRequest, { isLoading, isSuccess, error }] =
    useCreateConsentRequestMutation();

  // Combined state for form inputs and consent payload
  const [data, setData] = useState<ConsentFormState>({
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    address: '',
    amount: '',
    purpose: '',
    term: '',
    agree: false,
    From: '',
    offeredBy: 'SmartBank',
    consentRightBFFs: [],
    requestMessage:
      'Vær så snill å samtykke til at SmartBank kan behandle din lånesøknad ',
    environment: 'at22',
  });

  // Validation error messages
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Single change handler for all inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setData((prev) => {
      const next = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      } as ConsentFormState;
      // keep 'From' in sync with nationalId
      if (name === 'nationalId') {
        next.From = type === 'checkbox' ? prev.From : value;
      }
      return next;
    });
  };

  // Simple validation logic
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!data.fullName) newErrors.fullName = 'Full name is required';
    if (!data.nationalId) newErrors.nationalId = 'National ID is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.phone) newErrors.phone = 'Phone number is required';
    if (!data.address) newErrors.address = 'Address is required';
    if (!data.amount) newErrors.amount = 'Loan amount is required';
    if (!data.purpose) newErrors.purpose = 'Purpose is required';
    if (!data.term) newErrors.term = 'Term is required';
    if (data.consentRightBFFs.length === 0)
      newErrors.consentRightBFFs = 'Select at least one consent resource';
    if (!data.agree) newErrors.agree = 'You must agree to continue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createConsentRequest(data).unwrap();
      // TODO: clear form or show toast
    } catch {
      // error state is managed by RTK
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <Heading className="text-center mb-8 text-3xl">
          Loan Application
        </Heading>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow"
        >
          <Fieldset>
            <Textfield
              label="Full Name"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            <Textfield
              label="National ID"
              name="nationalId"
              value={data.nationalId}
              onChange={handleChange}
              error={errors.nationalId}
            />

            <Textfield
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Textfield
              label="Phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <Textfield
              label="Address"
              name="address"
              value={data.address}
              onChange={handleChange}
              error={errors.address}
            />

            <Textfield
              label="Amount"
              name="amount"
              value={data.amount}
              onChange={handleChange}
              error={errors.amount}
            />

            <Textfield
              label="Purpose"
              name="purpose"
              value={data.purpose}
              onChange={handleChange}
              error={errors.purpose}
            />

            <Textfield
              label="Term"
              name="term"
              value={data.term}
              onChange={handleChange}
              error={errors.term}
            />

            <Checkbox
              aria-label="I agree to the terms and conditions"
              name="agree"
              checked={data.agree}
              onChange={handleChange}
            >
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
            </Checkbox>
            {errors.agree && <ErrorSummary>{errors.agree}</ErrorSummary>}

            <Details>
              <Details.Summary>
                <GearSixIcon size={28} /> Innstillinger for samtykke
              </Details.Summary>
              <Details.Content>
                <Select
                  name="consentRightBFFs"
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      consentRightBFFs: [{ identifier: e.target.value }],
                    }))
                  }
                  value={data.consentRightBFFs[0]?.identifier || ''}
                  error={errors.consentRightBFFs}
                >
                  <option value="">Velg samtykkeressurs</option>
                  {options?.map((opt) => (
                    <option key={opt.identifier} value={opt.identifier}>
                      {opt.identifier}
                    </option>
                  ))}
                </Select>
              </Details.Content>
            </Details>

            <div className="flex justify-end">
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>

            {isSuccess && (
              <div className="text-green-600 mt-4">
                Application submitted!
              </div>
            )}
            {error && (
              <div className="text-red-600 mt-4">Submission failed.</div>
            )}
          </Fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoanApplicationPage;
