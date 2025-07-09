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
            <a href="#accounts" className="text-gray-600 hover:text-blue-900">Kontoer</a>
            <a href="/private/loanapplication" className="text-gray-600 hover:text-blue-900">Lån</a>
            <a href="/private/insurance" className="text-gray-600 hover:text-blue-900">Forsikring</a>
            <a href="/private/creditcard" className="text-gray-600 hover:text-blue-900">Kredittkort</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-6 py-16 flex flex-col items-center text-center">
        <img src={heroImg} alt="Glad person som later som de har kontroll på økonomien" className="w-full max-w-3xl mb-8 rounded-lg shadow-md object-cover" />
        <Heading className="mb-4 text-4xl md:text-5xl">Personlig bank – akkurat passe seriøs</Heading>
        <p className="mb-8 max-w-2xl text-gray-700">
          Oppdag lønnskonto, lån, forsikring og tjenester som gjør deg (nesten) rik over natten. Vi lover ingenting, men det høres jo bra ut!
        </p>
        <Button variant="primary">Utforsk våre (helt ekte) produkter</Button>
      </main>

      {/* Products Section */}
      <section id="accounts" className="container mx-auto px-6 py-16">
        <Heading className="text-center mb-12 text-3xl">Våre (nesten magiske) tjenester</Heading>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">Lønnskonto</Heading>
            </Card.Block>
            <Card.Block>
              Ingen månedlige gebyrer, lynraske overføringer og kontaktløs betaling. Perfekt for deg som liker å late som du har kontroll.
            </Card.Block>
          </Card>

          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">Forbrukslån</Heading>
            </Card.Block>
            <Card.Block>
              Fleksible vilkår, konkurransedyktige renter og lynrask (nesten mistenkelig rask) behandling. Fordi du fortjener å drømme stort!
            </Card.Block>
          </Card>

          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">Forsikring</Heading>
            </Card.Block>
            <Card.Block>
              Sikre helse, hjem og reise – eller i det minste få oss til å føle oss nyttige. Alt på ett sted!
            </Card.Block>
          </Card>

          <Card>
            <Card.Block>
              <Heading className="mb-2 text-xl">Kredittkort & mer</Heading>
            </Card.Block>
            <Card.Block>
              Samle bonuspoeng, cashback og eksklusive tilbud – eller bare bruk kortet til å kjøpe mer kaffe.
            </Card.Block>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600">&copy; {new Date().getFullYear()} Smart Bank. Alle rettigheter forbeholdt (nesten).</div>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-900">Personvern</a>
            <a href="#" className="text-gray-600 hover:text-blue-900">Vilkår og betingelser</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivateLandingPage;
