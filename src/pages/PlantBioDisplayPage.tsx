import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlantById, indigenousSeasons } from '../data/PlantData';
import type { PlantBio } from '../data/PlantData';
import { addLog } from '../data/LogsData';
import { Leaf, Calendar, User, AlertCircle, Flower, Sprout, BookOpen, Globe } from 'lucide-react';
import { BackButton } from '../components/BackButton';

export function PlantBioDisplayPage() {
  const { id } = useParams();
  const [plant, setPlant] = useState<PlantBio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundPlant = getPlantById(id);
      setPlant(foundPlant || null);
      setLoading(false);

      if (foundPlant) {
        addLog({ 
          action: 'plant_view', 
          page: 'plant_display',
          plantId: foundPlant.id,
          plantName: foundPlant.commonName
        });
      }
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-[calc(100vh-5rem)] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-gray-800 mb-4">Plant Not Found</h1>
            <p className="text-gray-600 mb-6">
              The plant biography you're looking for doesn't exist or has been removed.
            </p>
            <BackButton to="/" label="Back to Home" className="inline-flex" />
          </div>
        </div>
      </div>
    );
  }

  const season = indigenousSeasons.find(s => s.name === plant.indigenousSeason);

  const InfoSection = ({ title, content, icon }: { title: string; content: string; icon: React.ReactNode }) => {
    if (!content) return null;
    return (
      <div className="bg-yellow-400 rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            {icon}
          </div>
          <h3 className="text-green-800">{title}</h3>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
      </div>
    );
  };

  const InfoField = ({ label, content }: { label: string; content: string }) => {
    if (!content) return null;
    return (
      <div>
        <div className="text-gray-600 mb-2">{label}</div>
        <div className="text-gray-900 whitespace-pre-line">{content}</div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-800 to-green-700 text-white py-16 overflow-hidden">
        {/* Background Image - if plant has images, use the first one */}
        {plant.images && plant.images.length > 0 && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${plant.images[0]})` }}
            />
            {/* Very light overlay for better image visibility */}
            <div className="absolute inset-0 bg-green-900/20" />
          </>
        )}
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <BackButton to="/" label="Back to Home" className="text-green-100 hover:text-white" />
          </div>
          <div className="flex items-start gap-6">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Leaf className="w-16 h-16" />
            </div>
            <div className="flex-1">
              <h1 className="text-white mb-3">{plant.commonName}</h1>
              <p className="text-green-100 italic text-2xl mb-4">{plant.botanicalName}</p>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-green-50">
                  Family: {plant.family}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8">
          {/* Indigenous Season - Prominent Display */}
          {season && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-600 rounded-xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-amber-900">
                    Indigenous Season: {season.name}
                  </h2>
                  <p className="text-amber-700">{season.period}</p>
                </div>
              </div>
              <p className="text-gray-800 text-lg leading-relaxed">
                {season.description}
              </p>
            </div>
          )}

          {/* Growth & Life Cycle */}
          {(plant.habitGrowthCharacteristics || plant.lifeCycle) && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sprout className="w-7 h-7 text-green-700" />
                <h2 className="text-green-800">Growth & Life Cycle</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoField label="Habit / Growth Characteristics" content={plant.habitGrowthCharacteristics} />
                <InfoField label="Life Cycle" content={plant.lifeCycle} />
              </div>
            </div>
          )}

          {/* Identifying Characteristics */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Flower className="w-7 h-7 text-green-700" />
              <h2 className="text-green-800">Identifying Characteristics</h2>
            </div>
            <div className="space-y-6">
              <InfoField label="General Identifying Characteristics" content={plant.identifyingCharacteristics} />
              <InfoField label="Leaves, Stems and Meristems" content={plant.leavesStemsMemristems} />
              
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <InfoField label="Flowers" content={plant.flowers} />
                <InfoField label="Flowering Time/Season" content={plant.floweringTimeSeason} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoField label="Fruit / Seed" content={plant.fruitSeed} />
                <InfoField label="Seed Collection Time/Season" content={plant.seedCollectionTimeSeason} />
              </div>

              <InfoField label="Additional Propagation Requirements" content={plant.additionalPropagationRequirements} />

              <div className="grid md:grid-cols-3 gap-6 pt-4">
                <InfoField label="Trunk" content={plant.trunk} />
                <InfoField label="Root System" content={plant.rootSystem} />
                <InfoField label="Vascular System" content={plant.vascularSystem} />
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <InfoField label="Spotting Characteristics" content={plant.spottingCharacteristics} />
                <InfoField label="Family Level" content={plant.familyLevel} />
              </div>

              <InfoField label="Additional Information" content={plant.additionalInformation} />
            </div>
          </div>

          {/* Cultural & Ethnobotanical Information */}
          {(plant.culturalInformationAndUses || plant.ethnobotanicalInformationUses) && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-7 h-7 text-purple-700" />
                <h2 className="text-purple-900">Cultural & Ethnobotanical Information</h2>
              </div>
              <div className="space-y-6">
                <InfoField label="Cultural Information and Uses" content={plant.culturalInformationAndUses} />
                <InfoField label="Ethnobotanical Information/Uses" content={plant.ethnobotanicalInformationUses} />
              </div>
            </div>
          )}

          {/* Horticultural Information */}
          {plant.horticulturalLandscapeInfo && (
            <InfoSection
              title="Horticultural / Landscape Information"
              content={plant.horticulturalLandscapeInfo}
              icon={<BookOpen className="w-6 h-6 text-green-700" />}
            />
          )}

          {/* References */}
          {plant.references && (
            <div className="bg-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-3">References</h3>
              <p className="text-gray-700 whitespace-pre-line">{plant.references}</p>
            </div>
          )}

          {/* Student Attribution */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-600">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <User className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="text-gray-900">Documented By</h3>
                <p className="text-gray-700">{plant.studentName}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <div className="text-gray-600">Institution</div>
                <div className="text-gray-900">Kangan Institute Horticulture</div>
              </div>
              <div>
                <div className="text-gray-600">Last Updated</div>
                <div className="text-gray-900">{new Date(plant.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* MIFGUS Info */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg p-8 text-center border border-purple-200">
            <img 
              src="https://melbflowershow.com.au/wp-content/uploads/2024/09/logo-footer.png" 
              alt="Melbourne International Flower And Garden Show"
              className="h-20 object-contain mx-auto mb-6"
            />
            <h3 className="text-gray-900 mb-3">Part of MIFGUS Display</h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              This plant is part of the Kangan Institute display at the Melbourne International Flower and Garden Show. 
              Students have carefully cultivated and documented these specimens as part of their horticultural education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}