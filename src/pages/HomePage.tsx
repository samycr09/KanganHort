import { Link } from "react-router-dom";
import {
  Leaf,
  Calendar,
  Sprout,
  QrCode,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PlantInfo } from "../components/PlantInfo";
import { addLog } from "../data/LogsData";
import { demoPlants, indigenousSeasons, plantBioToView, getPlants } from "../data/PlantData";
import type { PlantView } from "../data/PlantData";

export function HomePage() {
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [showSeasons, setShowSeasons] = useState(false);

  const [showAboutMifgs, setShowAboutMifgs] = useState(false);

  useEffect(() => {
    addLog({ action: "page_view", page: "home" });
  }, []);

  const featuredPlants = useMemo(() => {
    const storedPlants = getPlants();
    const combinedPlants = [
      ...storedPlants,
      ...demoPlants.filter((dp) => !storedPlants.find((sp) => sp.id === dp.id)),
    ];
    return combinedPlants.filter((p) => p.featured ?? true);
  }, []);

  const totalPlants = Math.max(1, featuredPlants.length);

  const handleNextPlant = () => {
    setCurrentPlantIndex((prev) => (prev + 1) % totalPlants);
  };

  const handlePrevPlant = () => {
    setCurrentPlantIndex((prev) => (prev - 1 + totalPlants) % totalPlants);
  };

  const currentPlantBio = featuredPlants[currentPlantIndex] ?? demoPlants[0];
  const currentPlant: PlantView | null = currentPlantBio ? plantBioToView(currentPlantBio) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1695376686770-5480909cc1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600)",
          }}
        />
        <div className="absolute inset-0 bg-green-900/70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl mb-4">Kangan TAFE Horticulture</h1>
            <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
              Explore our comprehensive plant collection featuring detailed botanical information, indigenous seasonal
              classifications, and interactive QR codes.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-green-900 to-transparent pointer-events-none" />
      </div>

      {/* Plant Bio Display Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg shadow-lg -mt-8 relative z-10 mb-12 mx-4 sm:mx-6 lg:mx-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-10 w-10 text-green-700" />
            <h2 className="text-4xl text-green-800">Plant Biographies</h2>
          </div>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
            Discover detailed botanical information for Australian native plants.
            {currentPlant ? " Viewing plant details:" : " Click any plant to explore its comprehensive biography."}
          </p>

          {!currentPlant && (
            <div className="bg-green-50 border-l-4 border-green-600 p-4 max-w-2xl mx-auto">
              <p className="text-green-900 flex items-center justify-center gap-2">
                <QrCode className="w-8 h-8" />
                <span>At the garden show, visitors scan QR codes to view these plant details</span>
              </p>
            </div>
          )}
        </div>

        {currentPlant && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevPlant}
                className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-800 transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>

              <span className="text-gray-600">
                Plant {currentPlantIndex + 1} of {featuredPlants.length || demoPlants.length}
              </span>

              <button
                onClick={handleNextPlant}
                className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-800 transition-all duration-200"
              >
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <PlantInfo plant={currentPlant} onReset={() => {}} />
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/plants"
            className="inline-flex items-center gap-3 bg-green-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 transform hover:scale-105 transition-all duration-200"
          >
            <Sprout className="h-6 w-6" />
            <span className="text-lg">View Full Plant Gallery</span>
          </Link>
        </div>
      </div>

      {/* Dropdown Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Indigenous Seasons */}
        <div className="mb-4">
          <button
            onClick={() => setShowSeasons((v) => !v)}
            className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-green-700" />
              <div className="text-left">
                <h2 className="text-2xl text-green-800">Indigenous Seasonal Classifications</h2>
                <p className="text-gray-600">Discover the seven Australian indigenous seasons</p>
              </div>
            </div>

            {showSeasons ? (
              <ChevronUp className="h-6 w-6 text-green-700 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronDown className="h-6 w-6 text-green-700 group-hover:scale-110 transition-transform" />
            )}
          </button>

          <div
            className={`relative rounded-b-lg shadow-md mt-2 overflow-hidden transition-all duration-500 ease-out ${
              showSeasons ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`transition-transform duration-500 ease-out ${
                showSeasons ? "translate-y-0" : "-translate-y-4"
              }`}
            >
              <div
                className="absolute inset-0 min-h-full bg-cover bg-center pointer-events-none"
                style={{
                  backgroundImage:
                    "url(https://i.pinimg.com/originals/98/ee/4b/98ee4b9cd00680a227d5bc67a845bbff.jpg)",
                }}
              />
              <div className="absolute inset-0 min-h-full bg-gradient-to-br from-amber-900/50 via-orange-900/45 to-red-900/50 backdrop-blur-[1px] pointer-events-none" />

              <div className="relative z-10 p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {indigenousSeasons.map((season, index) => (
                    <div
                      key={season.name}
                      className={`bg-white/50 backdrop-blur-sm p-5 rounded-lg shadow-lg hover:shadow-xl hover:bg-white/85 transition-all duration-300 border-l-4 border-amber-600 transform hover:scale-[1.02] ${
                        showSeasons ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                      }`}
                      style={{ transitionDelay: showSeasons ? `${index * 50}ms` : "0ms" }}
                    >
                      <div className="mb-3">
                        <h3 className="text-xl text-amber-900 mb-1">{season.name}</h3>
                        <span className="text-sm text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-block">
                          {season.period}
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed">{season.description}</p>

                      <div className="space-y-2 mt-3 pt-3 border-t border-amber-200">
                        <div>
                          <p className="text-xs text-amber-800 mb-1">
                            <strong>Weather:</strong>
                          </p>
                          <p className="text-xs text-gray-600">{season.weather}</p>
                        </div>
                        <div>
                          <p className="text-xs text-amber-800 mb-1">
                            <strong>Plant Indicators:</strong>
                          </p>
                          <p className="text-xs text-gray-600">{season.plantIndicators}</p>
                        </div>
                        <div>
                          <p className="text-xs text-amber-800 mb-1">
                            <strong>Animal Behavior:</strong>
                          </p>
                          <p className="text-xs text-gray-600">{season.animalBehavior}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link
                    to="/seasons"
                    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-amber-900 px-6 py-3 rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-xl"
                  >
                    <span>Learn more about Indigenous Seasons</span>
                    <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* About MIFGS */}
        <div className="mb-4">
          <button
            onClick={() => setShowAboutMifgs((v) => !v)}
            className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <QrCode className="h-8 w-8 text-green-700" />
              <div className="text-left">
                <h2 className="text-2xl text-green-800">About MIFGS</h2>
                <p className="text-gray-600">Melbourne International Flower and Garden Show</p>
              </div>
            </div>

            {showAboutMifgs ? (
              <ChevronUp className="h-6 w-6 text-green-700 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronDown className="h-6 w-6 text-green-700 group-hover:scale-110 transition-transform" />
            )}
          </button>

          <div
            className={`bg-green-50 rounded-b-lg shadow-md mt-2 overflow-hidden transition-all duration-500 ease-out ${
              showAboutMifgs ? "max-h-[2000px] opacity-100 py-6 px-6" : "max-h-0 opacity-0 py-0 px-6"
            }`}
          >
            <div
              className={`transition-transform duration-500 ease-out ${
                showAboutMifgs ? "translate-y-0" : "-translate-y-4"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl text-green-900 mb-4">The Event</h3>
                  <p className="text-gray-700 mb-4">
                    The Melbourne International Flower and Garden Show (MIFGS) is one of Australia&apos;s most prestigious
                    horticultural events, showcasing stunning garden designs, rare plants, and innovative landscaping
                    from around the world.
                  </p>

                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                    <p className="text-gray-700">
                      <strong className="text-green-900">Location:</strong> Carlton Gardens &amp; Royal Exhibition Building,
                      Melbourne
                    </p>

                    <p className="text-gray-700 mt-2">
                      <strong className="text-green-900">Event:</strong>{" "}
                      <a
                        href="https://melbflowershow.com.au/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 hover:text-green-800 underline"
                      >
                        Melbourne International Flower and Garden Show
                      </a>
                    </p>

                    <p className="text-gray-700 mt-2">
                      <strong className="text-green-900">Description:</strong> Annual showcase of horticultural excellence
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl text-green-900 mb-4">Interactive QR Experience</h3>
                  <p className="text-gray-700 mb-4">
                    At the show, visitors can scan QR codes placed on plants throughout the Kangan TAFE display to access
                    comprehensive botanical information, including indigenous seasonal data and cultural significance.
                  </p>

                  <div className="bg-white p-4 rounded-lg flex items-start gap-3">
                    <QrCode className="h-12 w-12 text-green-700 flex-shrink-0" />
                    <div>
                      <p className="text-green-900 mb-2">Try it now!</p>
                      <p className="text-gray-700 text-sm">
                        Explore the plant biographies above to see exactly what visitors will experience when they scan
                        QR codes at the show.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors shadow-md"
                >
                  Learn more
                  <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
{/* About Kangan */}
<div className="mb-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md mt-2 relative overflow-hidden py-8 px-8">
  <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
    <Sprout className="h-48 w-48 text-green-800" />
  </div>
  <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none">
    <Leaf className="h-32 w-32 text-green-800" />
  </div>

  <div className="relative z-10">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl text-green-800 mb-3">About Kangan TAFE</h2>
        <p className="text-gray-700 mb-4">
          Kangan Institute&apos;s horticulture program is recognized as one of Victoria&apos;s premier training
          providers in horticultural education. Our students gain comprehensive knowledge of plant biology,
          sustainable practices, and indigenous plant species.
        </p>

        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border-l-4 border-green-600">
          <p className="text-green-900">
            <strong>Our Focus:</strong> Combining traditional botanical knowledge with indigenous perspectives
            on seasonal cycles and plant relationships.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl text-green-900 mb-4">Why Choose Kangan?</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Sprout className="h-5 w-5 text-green-700 flex-shrink-0 mt-1" />
            <span className="text-gray-700">Industry-standard facilities and equipment</span>
          </li>
          <li className="flex items-start gap-3">
            <Sprout className="h-5 w-5 text-green-700 flex-shrink-0 mt-1" />
            <span className="text-gray-700">Experienced instructors with industry connections</span>
          </li>
          <li className="flex items-start gap-3">
            <Sprout className="h-5 w-5 text-green-700 flex-shrink-0 mt-1" />
            <span className="text-gray-700">Hands-on learning with native Australian plants</span>
          </li>
          <li className="flex items-start gap-3">
            <Sprout className="h-5 w-5 text-green-700 flex-shrink-0 mt-1" />
            <span className="text-gray-700">Focus on indigenous seasonal knowledge</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="text-center mt-6 space-y-6">
      <Link
        to="/about"
        className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors shadow-md"
      >
        Learn more about Kangan
        <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <h3 className="text-gray-900 mb-4">For More Information on Courses</h3>

        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div className="text-center">
            <div className="text-gray-800 font-semibold mb-3">Bendigo TAFE</div>
            <a
              href="https://www.bendigotafe.edu.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
              aria-label="Visit Bendigo TAFE"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="https://www.bendigotafe.edu.au/content/experience-fragments/bendigokangan/bendigo/en/header/master/_jcr_content/root/header_copy_copy/logo.coreimg.png/1712189851753/bt-tv-logos-colour-370.png"
                alt="Bendigo TAFE"
                className="h-14 w-auto object-contain mx-auto"
                onClick={(e) => e.stopPropagation()}
              />
            </a>
          </div>

          <div className="text-center">
            <div className="text-gray-800 font-semibold mb-3">Kangan Institute (Cremorne)</div>
            <a
              href="https://www.kangan.edu.au/campuses/cremorne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
              aria-label="Visit Kangan Institute Cremorne"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="https://www.kangan.edu.au/content/experience-fragments/bendigokangan/kangan/en/header/master/_jcr_content/root/header_copy_copy/logo.coreimg.png/1712189728044/ki-tv-logos-colour-370.png"
                alt="Kangan Institute"
                className="h-14 w-auto object-contain mx-auto"
                onClick={(e) => e.stopPropagation()}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      </div>


    </div>
  );
}
