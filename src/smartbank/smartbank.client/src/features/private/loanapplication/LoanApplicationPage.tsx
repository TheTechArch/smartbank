import React, { useState } from 'react';


import { useGetConsentResourcesQuery } from '../../../rtk/features/resourceRegistry/resourceRegistryApi';

import {
  Button,
  Heading,
  Textfield,
  Select,
  Checkbox,
  Fieldset,
  ErrorSummary,
  Details
} from '@digdir/designsystemet-react';

import { GearSixIcon } from '@phosphor-icons/react';

const LoanApplicationPage: React.FC = () => {
  
  const { data: options } = useGetConsentResourcesQuery({environment: 'at22'});
  
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    address: '',
    amount: '',
    purpose: '',
    term: '',
    agree: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {


    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.nationalId) newErrors.nationalId = 'National ID is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.amount) newErrors.amount = 'Loan amount is required';
    if (!formData.purpose) newErrors.purpose = 'Select a purpose';
    if (!formData.term) newErrors.term = 'Select a term';
    if (!formData.agree) newErrors.agree = 'You must agree to terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: handle submission logic
    console.log('Submitting loan application', formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <Heading className="text-center mb-8 text-3xl">Loan Application</Heading>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          <Fieldset>
            <Textfield
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            <Textfield
              label="National ID"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              error={errors.nationalId}
            />

            <Textfield
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Textfield
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <Textfield
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <Textfield
              label="Loan Amount (NOK)"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              error={errors.amount}
            />

            <Select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
            >
              <option value="">Select purpose</option>
              <option value="home">Home Improvement</option>
              <option value="car">Car Purchase</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </Select>

            <Select
              name="term"
              value={formData.term}
              onChange={handleChange}
            >
              <option value="">Select term</option>
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </Select>

            <Checkbox
              aria-label="I agree to the terms and conditions"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            >
              I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
            </Checkbox>
            {errors.agree && <ErrorSummary>{errors.agree}</ErrorSummary>}

            <div className="flex justify-end">
              <Button variant="primary" type="submit">
                Submit Application
              </Button>
            </div>
          </Fieldset>

                  <Details>
          <Details.Summary>
            <GearSixIcon size={28} /> Innstillinger for samtykke
          </Details.Summary>
            <Details.Content>

              <Select>
                <option value="">Velg samtykkeressurs</option>
                {options?.map((option) => (
                  <option key={option.identifier} value={option.identifier}>
                    {option.identifier}
                  </option>
                ))}
              </Select>
            </Details.Content>

        </Details>
        </form>



      </div>
    </div>
  );
};

export default LoanApplicationPage;
