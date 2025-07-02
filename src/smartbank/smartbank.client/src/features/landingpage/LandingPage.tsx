import React from 'react';
import { Button, Heading, Card } from '@digdir/designsystemet-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">Smart Bank</div>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-900">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-900">
              Pricing
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-900">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-6 py-16 flex flex-col items-center text-center">
        <Heading className="mb-4">
          Welcome to Smart Bank
        </Heading>
        <Card className="mb-8 max-w-2xl">
          Your trusted partner for modern banking. Fast, secure, and reliable financial services at your fingertips.
        </Card>
        <Button variant="primary">
          Get Started
        </Button>
      </main>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <Heading className="text-center mb-12">
          Our Features
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Card.Block>
              <Heading className="mb-2">
                Secure Banking
              </Heading>
            </Card.Block>
            <Card.Block>
              Advanced encryption and multi-factor authentication keep your money safe.
            </Card.Block>
          </Card>
          <Card>
              <Card.Block>
              <Heading className="mb-2">
                Instant Transfers
              </Heading>
              </Card.Block>
              <Card.Block>
                Send and receive money instantly with minimal fees.
              </Card.Block>
          </Card>

          <Card>
            <Card.Block>
              <Heading className="mb-2">
                24/7 Support
              </Heading>
              </Card.Block>
              <Card.Block>
                Our customer service team is here for you around the clock.
              </Card.Block>
            </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600">� {new Date().getFullYear()} Smart Bank. All rights reserved.</div>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-900">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-900">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
