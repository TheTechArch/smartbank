import React from 'react';
import { Button, Heading, Card } from '@digdir/designsystemet-react';
import heroImg from '../../assets/business-hero.jpg'; // Bytt ut med faktisk bilde

const BusinessLandingPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-900">Smart Bank Bedrift</div>
                    <nav className="space-x-6">
                        <a href="#accounts" className="text-gray-600 hover:text-blue-900">Bedriftskontoer</a>
                        <a href="#loans" className="text-gray-600 hover:text-blue-900">Bedriftslån</a>
                        <a href="#payments" className="text-gray-600 hover:text-blue-900">Betaling & Portal</a>
                        <a href="#treasury" className="text-gray-600 hover:text-blue-900">Kjedelige Treasury-tjenester</a>
                        <a href="#support" className="text-gray-600 hover:text-blue-900">Dedikert Support (kanskje)</a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow container mx-auto px-6 py-16 flex flex-col items-center text-center">
                <img
                    src={heroImg}
                    alt="Bedriftsøkonomi på sitt beste"
                    className="w-full max-w-4xl mb-8 rounded-lg shadow-md object-cover"
                />
                <Heading className="mb-4 text-4xl md:text-5xl">Bedriftsbank – Fordi noen må gjøre det</Heading>
                <p className="mb-8 max-w-3xl text-gray-700">
                    Skreddersydde finansielle produkter og tjenester for bedrifter i alle størrelser. Håndter kontantstrøm, betalinger og vekst – eller bare lat som!
                </p>
                <Button variant="primary">Lær Mer (eller ikke)</Button>
            </main>

            {/* Services Section */}
            <section id="accounts" className="container mx-auto px-6 py-16">
                <Heading className="text-center mb-12 text-3xl">Våre (litt for mange) Bedriftstjenester</Heading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <Card.Block>
                            <Heading className="mb-2 text-xl">Bedriftskontoer</Heading>
                        </Card.Block>
                        <Card.Block>
                            Fler-valuta kontoer, renter (kanskje), og nettbank for deg som liker tall.
                        </Card.Block>
                    </Card>

                    <Card>
                        <Card.Block>
                            <Heading className="mb-2 text-xl">Bedriftslån</Heading>
                        </Card.Block>
                        <Card.Block>
                            Konkurransedyktig finansiering, kredittlinjer og leasing – så du kan kjøpe enda flere kaffemaskiner.
                        </Card.Block>
                    </Card>

                    <Card>
                        <Card.Block>
                            <Heading className="mb-2 text-xl">Betaling & Portal</Heading>
                        </Card.Block>
                        <Card.Block>
                            Lynrask betaling, fakturaverktøy og e-handel – så du slipper å bruke Vipps privat.
                        </Card.Block>
                    </Card>

                    <Card>
                        <Card.Block>
                            <Heading className="mb-2 text-xl">Kjedelige Treasury-tjenester</Heading>
                        </Card.Block>
                        <Card.Block>
                            Kontantstyring, valutahåndtering og likviditetsløsninger – for deg som elsker Excel.
                        </Card.Block>
                    </Card>

                    <Card>
                        <Card.Block>
                            <Heading className="mb-2 text-xl">Firmakort</Heading>
                        </Card.Block>
                        <Card.Block>
                            Utgiftskontroll, tilpassede grenser og rapportering – så du kan bruke penger med stil.
                        </Card.Block>
                    </Card>

                    <Card>
                        <Card.Block>
                            <Heading className="mb-2 text-xl">Dedikert Support (kanskje)</Heading>
                        </Card.Block>
                        <Card.Block>
                            Din egen kontaktperson og 24/7 support – hvis vi tar telefonen, da.
                        </Card.Block>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white shadow-inner">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-600">&copy; {new Date().getFullYear()} Smart Bank Bedrift. Alle rettigheter forbeholdt (tror vi).</div>
                    <div className="space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-600 hover:text-blue-900">Personvern (vi bryr oss litt)</a>
                        <a href="#" className="text-gray-600 hover:text-blue-900">Vilkår & Betingelser (leses aldri)</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BusinessLandingPage;
