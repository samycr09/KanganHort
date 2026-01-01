import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPlants} from '../data/PlantData';
import type { PlantBio } from '../data/PlantData';
import { addLog } from '../data/LogsData';
import { Leaf, Search, Calendar } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function PlantsGalleryPage() {
  const [plants, setPlants] = useState<PlantBio[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  useEffect(() => {
    const allPlants = getPlants();
    setPlants(allPlants);

    addLog({ 
      action: 'page_view', 
      page: 'plants_gallery'
    });
  }, []);

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.botanicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.family.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeason = selectedSeason === 'all' || plant.indigenousSeason === selectedSeason;
    
    return matchesSearch && matchesSeason;
  });

  const seasons = ['all', ...Array.from(new Set(plants.map(p => p.indigenousSeason)))];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-green-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <BackButton to="/" label="Back to Home" className="text-green-100 hover:text-white" />
          </div>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Leaf className="w-16 h-16" />
            </div>
            <div>
              <h1 className="text-white mb-3">Plant Information Gallery</h1>
              <p className="text-green-100 text-xl">
                Explore our collection of native plants documented by Kangan Institute students
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-gray-700 mb-2">
                <Search className="inline w-5 h-5 mr-2" />
                Search Plants
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or family..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="season" className="block text-gray-700 mb-2">
                <Calendar className="inline w-5 h-5 mr-2" />
                Filter by Season
              </label>
              <select
                id="season"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {seasons.map(season => (
                  <option key={season} value={season}>
                    {season === 'all' ? 'All Seasons' : season}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-gray-600">
            Showing {filteredPlants.length} plant{filteredPlants.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Plants Grid */}
        {filteredPlants.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-gray-800 mb-3">No Plants Found</h2>
            <p className="text-gray-600">
              {plants.length === 0 
                ? "Our students haven't added any plant biographies yet. Check back soon!"
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map(plant => (
              <Link
                key={plant.id}
                to={`/plant/${plant.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 flex items-center justify-center h-32">
                  <Leaf className="w-16 h-16 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {plant.commonName}
                  </h3>
                  <p className="text-gray-600 italic mb-3">{plant.botanicalName}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {plant.family}
                    </span>
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                      {plant.indigenousSeason}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-sm">
                    Documented by {plant.studentName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
