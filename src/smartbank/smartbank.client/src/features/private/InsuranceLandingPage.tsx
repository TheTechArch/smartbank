
import HeroImage from '../../assets/insurance-hero.jpg'; // Bytt ut med din faktiske hero-bildebane
import { Button } from '@digdir/designsystemet-react';

export default function InsuranceLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero-seksjon */}
      <header className="w-full bg-yellow-100 py-16 flex flex-col items-center text-center px-4">
        <img
          src={HeroImage}
          alt="Hero Forsikring"
          className="w-240 object-contain mb-6"
        />
        <h1 className="text-5xl font-extrabold mb-4">
          Er du ekstra uheldig?
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Hvis du tror du har flaks, ta en titt her. Hvis ikke, vel, vi vil faktisk ikke ha deg som kunde.
        </p>
        <Button variant="primary">
          Fortell oss om din neste ulykke
        </Button>
      </header>

      {/* Funksjoner / Uhellseksempler */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Er du virkelig så uheldig?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">Knust mobil i toalettet</h3>
            <p className="text-gray-600">
              Gratulerer – du har kastet telefonen i do før, ikke sant?
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">Svidd mat hver dag</h3>
            <p className="text-gray-600">
              Brenner alltid suppa? Vi kjenner den følelsen alltför godt.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">Sykdom midt i ferien</h3>
            <p className="text-gray-600">
              Feber på stranden? Skjønner du ikke planlegger uflaks?
            </p>
          </div>
          {/* Flere eksempler kan legges til her */}
        </div>
      </section>

      {/* Call-to-action på bunn */}
      <footer className="w-full bg-gray-200 py-12 text-center px-4">
        <p className="text-lg mb-6">
          Er du fortsatt interessert? Ikke si at vi ikke advarte deg.
        </p>
        <Button variant="primary">
          Fremdeles uheldig? Snakk med oss
        </Button>
      </footer>
    </div>
  );
}
