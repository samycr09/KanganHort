import { useEffect } from 'react';
import { indigenousSeasons } from '../data/PlantData';
import { addLog } from '../data/LogsData';
import { Calendar, Leaf } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import aboriginalRockArtBg from '../assets/94b1c10d9d5f97e28896476f08bd4873.jpg';
import aboriginalArtHero from '../assets/9d1b21e14d4bb86b5b42636ac3e785f9.jpg';

export function SeasonPage() {
  useEffect(() => {
    addLog({ action: "page_view", page: "seasons" });
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-green-50 to-white">
      {/* Hero */}
      <div className="relative bg-green-800 text-white py-16 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboriginalArtHero})` }}
        />
        {/* Subtle dark overlay for text readability only */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative max-w-5xl mx-auto px-4">
          <div className="mb-6">
            <BackButton to="/" label="Back to Home" className="text-green-100 hover:text-white" />
          </div>
          <div className="text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-white mb-4">Indigenous Seasons</h1>
            <p className="text-green-100 text-xl max-w-3xl mx-auto">
              Understanding the traditional six seasons of indigenous Australian culture and their connection to native plant life
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="relative rounded-2xl shadow-lg p-8 mb-12 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${aboriginalRockArtBg})` }}
          />
          {/* Semi-transparent overlay for readability */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px]" />

          {/* Content */}
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-100/90 rounded-lg backdrop-blur-sm">
                <Leaf className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <h2 className="text-green-800 mb-3">The Six Seasons</h2>
                <p className="text-gray-900 leading-relaxed mb-4">
                  Indigenous Australians traditionally recognize six seasons based on the Noongar calendar from Western Australia.
                  Each season is characterized by distinctive weather patterns, plant behaviors, and natural phenomena.
                  Understanding these seasons helps us better appreciate and care for native Australian plants.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-green-200">
              <h2 className="text-green-800 mb-4">Learning from Indigenous Knowledge</h2>
              <p className="text-gray-700 mb-6">
                These seasonal classifications represent thousands of years of careful observation and deep understanding
                of the Australian landscape. By learning and applying this traditional knowledge in horticulture,
                we can better understand plant cycles and create more sustainable growing practices.
              </p>
              <p className="text-gray-700 text-sm">
                Aboriginal art featured on this page from{" "}
                <a
                  href="https://www.aboriginal-art-australia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-900 underline decoration-green-600/50 hover:decoration-green-900"
                >
                  Aboriginal Art Australia
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Season Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {indigenousSeasons.map((season) => (
            <div
              key={season.name}
              className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-600 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-green-800 mb-2">{season.name}</h3>
                <p className="text-gray-600">{season.period}</p>
              </div>
              <p className="text-gray-700 leading-relaxed">{season.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
