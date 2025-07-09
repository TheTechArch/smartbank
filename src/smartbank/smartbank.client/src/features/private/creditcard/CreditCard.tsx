import CardImage from '../../../assets/creditcardproposal.png'; // Bytt ut med din faktiske kredittkort-bildebane
import { Button } from '@digdir/designsystemet-react';

export default function CreditCardPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-16 flex flex-col items-center text-center px-4">
        <img
          src={CardImage}
          alt="Vårt utrolige kredittkort"
          className="w-240 object-contain mb-6"
        />
        <h1 className="text-5xl font-extrabold mb-4">
          Møt Norges kuleste kredittkort
        </h1>
        <p className="text-xl mb-8 max-w-xl">
          Med dette kortet får du ikke bare tilgang til penger du ikke har, du får også superkrefter til å bruke dem på helt unødvendige ting!
        </p>
        <Button variant="primary">
          Søk og sløs i vei
        </Button>
      </header>

      {/* Fordeler-seksjon */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Hvorfor du trenger dette kortet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">Uendelig kreditt</h3>
            <p className="text-gray-700">
              Hvorfor stoppe ved lommepenger? Med uendelig kreditt er bare fantasien (og rentene) grensen.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">Eksklusive rabatter</h3>
            <p className="text-gray-700">
              Spar 5% på alt du ikke trenger – fra designer-kaffekopper til gullbelagte tannbørster.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">Points for nonsense</h3>
            <p className="text-gray-700">
              Tjen poeng hver gang du bruker kortet til noe totalt unyttig.
            </p>
          </div>
        </div>
      </section>

      {/* Stupide måter å sløse penger på */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">
            7 smarte måter å bruke kortet ditt på
          </h2>
          <ol className="list-decimal list-inside text-left max-w-2xl mx-auto space-y-4 text-gray-800">
            <li>Kjøp en personlig drone som følger deg på jobben – for å vise at du kan.
            </li>
            <li>Bestill en månedlig leveranse av eksotiske stearinlys som lukter som 'tropisk grillfest'.
            </li>
            <li>Leie en standup-komiker for ditt kjæledyrs bursdag.
            </li>
            <li>Delta i alle online auksjoner av antikke lynavledere.
            </li>
            <li>Kjøp en årsforsyning av gullgodteri – spis før andre får tak i det.
            </li>
            <li>Bestill takeaway i verdensrommet (astronautlevering foreløpig i beta).
            </li>
            <li>Lei en Viking-ropesupporter til å heie på deg hver gang du ringer kundeservice.
            </li>
          </ol>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="w-full bg-blue-700 text-white py-12 text-center px-4">
        <p className="text-lg mb-6">
          Klar for å sløse med stil? Ikke la sjansen gå fra deg!
        </p>
        <Button variant="tertiary">
          Få mitt kredittkort nå!
        </Button>
      </footer>
    </div>
  );
}
