import { Link } from 'react-router-dom';
import { Leaf, Calendar, Mail, Phone, MapPin, Sprout, QrCode, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
//import { SeasonInfo } from '../components/SeasonInfo';
import { PlantInfo } from '../components/PlantInfo';
import { useEffect, useState } from 'react';
import { addLog } from '../data/LogsData';
import { demoPlants, indigenousSeasons, plantBioToView } from '../data/PlantData';
import type { PlantView, } from '../data/PlantData';

export function HomePage() {
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const [showSeasons, setShowSeasons] = useState(false);
  const [showAboutKangan, setShowAboutKangan] = useState(false);
  const [showAboutMIFGS, setShowAboutMIFGS] = useState(false);

  useEffect(() => {
    addLog({ action: 'page_view', page: 'home' });
  }, []);

  const handleNextPlant = () => {
    setCurrentPlantIndex((prev) => (prev + 1) % demoPlants.length);
  };

  const handlePrevPlant = () => {
    setCurrentPlantIndex((prev) => (prev - 1 + demoPlants.length) % demoPlants.length);
  };

const currentPlantBio = demoPlants[currentPlantIndex]; // PlantBio
const currentPlant: PlantView | null = currentPlantBio ? plantBioToView(currentPlantBio) : null;
{currentPlant && (
  <PlantInfo plant={currentPlant} onReset={() => {}} />
)}


  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section - Styled as a Plant */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20">
        {/* Background flower image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1695376686770-5480909cc1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXN0cmFsaWFuJTIwbmF0aXZlJTIwZmxvd2VyJTIwYm90YW5pY2FsfGVufDF8fHx8MTc2NTMyNzM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`
          }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-green-900/70" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl mb-4">
              Kangan TAFE Horticulture
            </h1>
            <p className="text-2xl mb-6 max-w-2xl mx-auto">
              Melbourne International Flower and Garden Show
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
              Explore our comprehensive plant collection featuring detailed botanical information, 
              indigenous seasonal classifications, and interactive QR codes.
            </p>
          </div>
        </div>
        
        {/* Plant stem effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-green-900 to-transparent"></div>
      </div>

      {/* Plant Bio Display Section - Primary Featured Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg shadow-lg -mt-8 relative z-10 mb-12 mx-4 sm:mx-6 lg:mx-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-10 w-10 text-green-700" />
            <h2 className="text-4xl text-green-800">
              Plant Biographies
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
            Discover detailed botanical information for Australian native plants. 
            {currentPlant ? ' Viewing plant details:' : ' Click any plant to explore its comprehensive biography.'}
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
            {/* Navigation buttons */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevPlant}
                className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-800 transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>
              <span className="text-gray-600">
                Plant {currentPlantIndex + 1} of {demoPlants.length}
              </span>
              <button
                onClick={handleNextPlant}
                className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-800 transition-all duration-200"
              >
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            {/* Plant Info */}
            <PlantInfo plant={currentPlant} onReset={() => {}} />
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link 
            to="/plants"
            className="inline-flex items-center gap-3 bg-green-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-green-800 transform hover:scale-105 transition-all duration-200"
          >
            <Sprout className="h-6 w-6" />
            <span className="text-lg">
              View Full Plant Gallery
            </span>
          </Link>
        </div>
      </div>

      {/* Dropdown Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Indigenous Seasons Dropdown */}
        <div className="mb-4">
          <button
            onClick={() => setShowSeasons(!showSeasons)}
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
              showSeasons ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className={`transition-transform duration-500 ease-out ${
              showSeasons ? 'translate-y-0' : '-translate-y-4'
            }`}>
              {/* Beautiful indigenous background */}
              <div 
                className="absolute inset-0 min-h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://i.pinimg.com/originals/98/ee/4b/98ee4b9cd00680a227d5bc67a845bbff.jpg)`
                }}
              />
              {/* Overlay for readability */}
              <div className="absolute inset-0 min-h-full bg-gradient-to-br from-amber-900/50 via-orange-900/45 to-red-900/50 backdrop-blur-[1px]" />
              
              <div className="relative z-10 p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {indigenousSeasons.map((season, index) => (
                    <div
                      key={season.name}
                      className={`bg-white/50 backdrop-blur-sm p-5 rounded-lg shadow-lg hover:shadow-xl hover:bg-white/85 transition-all duration-300 border-l-4 border-amber-600 transform hover:scale-[1.02] ${
                        showSeasons ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}
                      style={{ 
                        transitionDelay: showSeasons ? `${index * 50}ms` : '0ms'
                      }}
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
                          <p className="text-xs text-amber-800 mb-1"><strong>Weather:</strong></p>
                          <p className="text-xs text-gray-600">{season.weather}</p>
                        </div>
                        <div>
                          <p className="text-xs text-amber-800 mb-1"><strong>Plant Indicators:</strong></p>
                          <p className="text-xs text-gray-600">{season.plantIndicators}</p>
                        </div>
                        <div>
                          <p className="text-xs text-amber-800 mb-1"><strong>Animal Behavior:</strong></p>
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

        {/* About Kangan TAFE Dropdown */}
        <div className="mb-4">
          <button
            onClick={() => setShowAboutKangan(!showAboutKangan)}
            className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <Leaf className="h-8 w-8 text-green-700" />
              <div className="text-left">
                <h2 className="text-2xl text-green-800">About Kangan TAFE</h2>
                <p className="text-gray-600">Leading horticulture education in Victoria</p>
              </div>
            </div>
            {showAboutKangan ? (
              <ChevronUp className="h-6 w-6 text-green-700 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronDown className="h-6 w-6 text-green-700 group-hover:scale-110 transition-transform" />
            )}
          </button>
          
          <div 
            className={`bg-gradient-to-br from-green-50 to-green-100 rounded-b-lg shadow-md mt-2 relative overflow-hidden transition-all duration-500 ease-out ${
              showAboutKangan ? 'max-h-[2000px] opacity-100 py-8 px-8' : 'max-h-0 opacity-0 py-0 px-8'
            }`}
          >
            <div className={`transition-transform duration-500 ease-out ${
              showAboutKangan ? 'translate-y-0' : '-translate-y-4'
            }`}>
              {/* Plant decorative elements */}
              <div className="absolute top-0 right-0 opacity-10">
                <Sprout className="h-48 w-48 text-green-800" />
              </div>
              <div className="absolute bottom-0 left-0 opacity-10">
                <Leaf className="h-32 w-32 text-green-800" />
              </div>
              
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl text-green-900 mb-4">Our Horticulture Program</h3>
                    <p className="text-gray-700 mb-4">
                      Kangan Institute's horticulture program is recognized as one of Victoria's 
                      premier training providers in horticultural education. Our students gain 
                      comprehensive knowledge of plant biology, sustainable practices, and 
                      indigenous plant species.
                    </p>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border-l-4 border-green-600">
                      <p className="text-green-900">
                        <strong>Our Focus:</strong> Combining traditional botanical knowledge 
                        with indigenous perspectives on seasonal cycles and plant relationships.
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
                
                <div className="text-center mt-6">
                  <Link 
                    to="/about"
                    className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors shadow-md"
                  >
                    <span>Learn More About Kangan TAFE</span>
                    <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About MIFGS Dropdown */}
        <div className="mb-4">
          <button
            onClick={() => setShowAboutMIFGS(!showAboutMIFGS)}
            className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <QrCode className="h-8 w-8 text-green-700" />
              <div className="text-left">
                <h2 className="text-2xl text-green-800">About MIFGS</h2>
                <p className="text-gray-600">Melbourne International Flower and Garden Show</p>
              </div>
            </div>
            {showAboutMIFGS ? (
              <ChevronUp className="h-6 w-6 text-green-700 group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronDown className="h-6 w-6 text-green-700 group-hover:scale-110 transition-transform" />
            )}
          </button>
          
          <div 
            className={`bg-green-50 rounded-b-lg shadow-md mt-2 overflow-hidden transition-all duration-500 ease-out ${
              showAboutMIFGS ? 'max-h-[2000px] opacity-100 py-6 px-6' : 'max-h-0 opacity-0 py-0 px-6'
            }`}
          >
            <div className={`transition-transform duration-500 ease-out ${
              showAboutMIFGS ? 'translate-y-0' : '-translate-y-4'
            }`}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl text-green-900 mb-4">The Event</h3>
                  <p className="text-gray-700 mb-4">
                    The Melbourne International Flower and Garden Show (MIFGS) is one of 
                    Australia's most prestigious horticultural events, showcasing stunning 
                    garden designs, rare plants, and innovative landscaping from around the world.
                  </p>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                    <p className="text-gray-700">
                      <strong className="text-green-900">Location:</strong> Carlton Gardens & Royal Exhibition Building, Melbourne
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong className="text-green-900">Event:</strong> Annual showcase of horticultural excellence
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl text-green-900 mb-4">Interactive QR Experience</h3>
                  <p className="text-gray-700 mb-4">
                    At the show, visitors can scan QR codes placed on plants throughout the 
                    Kangan TAFE display to access comprehensive botanical information, including 
                    indigenous seasonal data and cultural significance.
                  </p>
                  <div className="bg-white p-4 rounded-lg flex items-start gap-3">
                    <QrCode className="h-12 w-12 text-green-700 flex-shrink-0" />
                    <div>
                      <p className="text-green-900 mb-2">Try it now!</p>
                      <p className="text-gray-700 text-sm">
                        Explore the plant biographies below to see exactly what visitors 
                        will experience when they scan QR codes at the show.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl text-center mb-8 text-green-800">
            Visit Us at MIFGS
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4 text-green-700">
                Event Information
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-700 flex-shrink-0 mt-1" />
                  <span>
                    <strong>Location:</strong><br />
                    Carlton Gardens & <br />Royal Exhibition Building<br />
                    Melbourne, Victoria
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-green-700 flex-shrink-0 mt-1" />
                  <span>
                    <strong>When:</strong><br />
                    Melbourne International<br /> Flower and Garden Show<br />  March 25th - 29th, 2026<br />
                    (Annual Event)
                  </span>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl mb-4 text-green-700">
                Contact Kangan TAFE
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-700" />
                  <span>1300 542 642</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-700" />
                  <span>info@kangan.edu.au</span>
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-700 flex-shrink-0 mt-1" />
                  <span>
                    Multiple campuses <br />across Melbourne<br />
                    <Link to="/contact" className="text-green-700 hover:text-green-800 underline">
                      View all locations
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">
            Join Our Horticulture Program
          </h2>
          <p className="text-xl mb-8">
            Learn from industry experts and gain hands-on experience with Australia's diverse flora
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/about"
              className="bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Learn More
            </Link>
            <Link 
              to="/contact"
              className="bg-green-800 text-white px-8 py-3 rounded-lg hover:bg-green-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}