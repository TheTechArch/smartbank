import React from 'react';
import { Button, Heading, Card } from '@digdir/designsystemet-react';
import heroImg from '../../assets/hero.jpg';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">Smart Bank</div>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-900">
              Funksjoner
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-900">
              Priser
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-900">
              Kontakt
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-6 py-16 flex flex-col items-center text-center">
        {/* Hero Image */}
        <img
          src={heroImg}
          alt="Folk som bruker Smart Bank-tjenester"
          className="w-full max-w-3xl mb-8 rounded-lg shadow-md object-cover"
        />

        <Heading className="mb-4 text-4xl md:text-5xl">
          Velkommen til Smart Bank
        </Heading>
        <Card className="mb-8 max-w-2xl">
          Din pålitelige partner for moderne banktjenester. Raske, sikre og pålitelige finansielle tjenester rett ved fingertuppene dine.
        </Card>
        <Button variant="primary">
          Kom i gang
        </Button>
      </main>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <Heading className="text-center mb-12 text-3xl">
          Våre funksjoner
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">
                Sikker bank
              </Heading>
            </Card.Block>
            <Card.Block>
              Avansert kryptering og tofaktorautentisering holder pengene dine trygge.
            </Card.Block>
          </Card>

          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">
                Vi dobler pengene dine
              </Heading>
            </Card.Block>
            <Card.Block>
              På vår unike lønnskonto tjener du pengene raskere enn noen gang.
              Vi matcher innskuddet fra din arbeidsgiver. Du får mao dobbel lønn!
            </Card.Block>
          </Card>

          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">
                Døgnåpen kundestøtte
              </Heading>
            </Card.Block>
            <Card.Block>
              Vårt kundeserviceteam er her for deg døgnet rundt.
            </Card.Block>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600">&copy; {new Date().getFullYear()} Smart Bank. Alle rettigheter reservert.</div>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-900">
              Personvern
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-900">
              Vilkår for bruk
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
