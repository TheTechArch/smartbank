import React from 'react';
import { Button, Heading, Card } from '@digdir/designsystemet-react';
import heroImg from '../../../assets/private-hero.jpg'; // Replace with your actual image path

const PrivateLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">Smart Bank</div>
          <nav className="space-x-6">
            <a href="#accounts" className="text-gray-600 hover:text-blue-900">Accounts</a>
            <a href="#loans" className="text-gray-600 hover:text-blue-900">Loans</a>
            <a href="#insurance" className="text-gray-600 hover:text-blue-900">Insurance</a>
            <a href="#offers" className="text-gray-600 hover:text-blue-900">Offers</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-6 py-16 flex flex-col items-center text-center">
        <img src={heroImg} alt="Happy person managing finances" className="w-full max-w-3xl mb-8 rounded-lg shadow-md object-cover" />
        <Heading className="mb-4 text-4xl md:text-5xl">Personal Banking Tailored for You</Heading>
        <p className="mb-8 max-w-2xl text-gray-700">
          Discover salary accounts, loans, insurance, and services that help you manage and grow your wealth effortlessly.
        </p>
        <Button variant="primary">Explore Products</Button>
      </main>

      {/* Products Section */}
      <section id="accounts" className="container mx-auto px-6 py-16">
        <Heading className="text-center mb-12 text-3xl">Our Services</Heading>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">Salary Account</Heading>
            </Card.Block>
            <Card.Block>
              No monthly fees, instant transfers, and contactless payments. Manage your salary with ease.
            </Card.Block>
          </Card>

          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">Personal Loans</Heading>
            </Card.Block>
            <Card.Block>
              Flexible terms, competitive interest rates, and fast approval process for your financial needs.
            </Card.Block>
          </Card>

          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">Insurance</Heading>
            </Card.Block>
            <Card.Block>
              Secure your health, home, and travel with our comprehensive insurance plans.
            </Card.Block>
          </Card>

          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">Credit Cards & More</Heading>
            </Card.Block>
            <Card.Block>
              Enjoy reward points, cashback, and special offers on everyday spending.
            </Card.Block>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600">&copy; {new Date().getFullYear()} Smart Bank. All rights reserved.</div>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-900">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-blue-900">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivateLandingPage;
