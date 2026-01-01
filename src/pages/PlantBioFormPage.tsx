import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { savePlant, getPlantById, indigenousSeasons } from '../data/PlantData';
import type { PlantBio } from '../data/PlantData';
import { addLog } from '../data/LogsData';
import { Save, AlertCircle, Leaf, QrCode, Download } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import QRCode from "qrcode";



export function PlantBioFormPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'identifying' | 'cultural' | 'qr'>('basic');

  const [formData, setFormData] = useState({
    family: '',
    botanicalName: '',
    commonName: '',
    habitGrowthCharacteristics: '',
    lifeCycle: '',
    identifyingCharacteristics: '',
    leavesStemsMemristems: '',
    flowers: '',
    floweringTimeSeason: '',
    fruitSeed: '',
    seedCollectionTimeSeason: '',
    additionalPropagationRequirements: '',
    trunk: '',
    rootSystem: '',
    vascularSystem: '',
    additionalInformation: '',
    spottingCharacteristics: '',
    familyLevel: '',
    culturalInformationAndUses: '',
    references: '',
    horticulturalLandscapeInfo: '',
    ethnobotanicalInformationUses: '',
    indigenousSeason: indigenousSeasons[0].name,
    images: [] as string[]
  });

  useEffect(() => {
    if (id) {
      const plant = getPlantById(id);
      if (plant) {
        if (user?.role !== 'admin' && plant.studentId !== user?.id) {
          navigate('/dashboard');
          return;
        }
        
        setFormData({
          family: plant.family,
          botanicalName: plant.botanicalName,
          commonName: plant.commonName,
          habitGrowthCharacteristics: plant.habitGrowthCharacteristics,
          lifeCycle: plant.lifeCycle,
          identifyingCharacteristics: plant.identifyingCharacteristics,
          leavesStemsMemristems: plant.leavesStemsMemristems,
          flowers: plant.flowers,
          floweringTimeSeason: plant.floweringTimeSeason,
          fruitSeed: plant.fruitSeed,
          seedCollectionTimeSeason: plant.seedCollectionTimeSeason,
          additionalPropagationRequirements: plant.additionalPropagationRequirements,
          trunk: plant.trunk,
          rootSystem: plant.rootSystem,
          vascularSystem: plant.vascularSystem,
          additionalInformation: plant.additionalInformation,
          spottingCharacteristics: plant.spottingCharacteristics,
          familyLevel: plant.familyLevel,
          culturalInformationAndUses: plant.culturalInformationAndUses,
          references: plant.references,
          horticulturalLandscapeInfo: plant.horticulturalLandscapeInfo,
          ethnobotanicalInformationUses: plant.ethnobotanicalInformationUses,
          indigenousSeason: plant.indigenousSeason,
          images: plant.images
        });

        if (plant.qrCode) {
          setQrCodeUrl(plant.qrCode);
        }
      }
    }

    addLog({ 
      action: 'page_view', 
      page: id ? 'plant_edit' : 'plant_create',
      userId: user?.id,
      userName: user?.name
    });
  }, [id, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generateQRCode = async (plantId: string) => {
    const url = `${window.location.origin}/plant/${plantId}`;
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#166534',
        light: '#ffffff'
      }
    });
    return qrDataUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) throw new Error('User not authenticated');

      const plantId = id || `plant-${Date.now()}`;
      const qrCode = await generateQRCode(plantId);
      setQrCodeUrl(qrCode);

      const plant: PlantBio = {
        id: plantId,
        ...formData,
        studentId: user.id,
        studentName: user.name,
        createdAt: id ? getPlantById(id)?.createdAt || new Date().toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        qrCode
      };

      savePlant(plant);

      addLog({ 
        action: id ? 'plant_updated' : 'plant_created', 
        page: 'plant_form',
        userId: user.id,
        userName: user.name,
        plantId: plant.id,
        plantName: plant.commonName
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save plant');
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = `${formData.commonName.replace(/\s+/g, '_')}_QRCode.png`;
    link.href = qrCodeUrl;
    link.click();

    addLog({ 
      action: 'qr_downloaded', 
      page: 'plant_form',
      userId: user?.id,
      userName: user?.name,
      plantName: formData.commonName
    });
  };

  const tabs = [
    { id: 'basic' as const, label: 'Basic Information' },
    { id: 'identifying' as const, label: 'Identifying Characteristics' },
    { id: 'cultural' as const, label: 'Cultural Information' },
    { id: 'qr' as const, label: 'QR Code' }
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <BackButton to="/dashboard" />
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-white/20 rounded-lg">
                <Leaf className="w-8 h-8" />
              </div>
              <h1 className="text-white">
                {id ? 'Edit Plant Biography' : 'Create New Plant Biography'}
              </h1>
            </div>
            <p className="text-green-50">
              Complete plant documentation for MIFGUS display
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-green-700 text-green-700 bg-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="m-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-8">
              {/* Basic Information Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <h2 className="text-green-800 pb-4 border-b border-gray-200">Basic Plant Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="family" className="block text-gray-700 mb-2">
                        Family *
                      </label>
                      <input
                        id="family"
                        name="family"
                        type="text"
                        value={formData.family}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., Proteaceae"
                      />
                    </div>

                    <div>
                      <label htmlFor="botanicalName" className="block text-gray-700 mb-2">
                        Botanical Name *
                      </label>
                      <input
                        id="botanicalName"
                        name="botanicalName"
                        type="text"
                        value={formData.botanicalName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., Banksia integrifolia"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="commonName" className="block text-gray-700 mb-2">
                      Common Name *
                    </label>
                    <input
                      id="commonName"
                      name="commonName"
                      type="text"
                      value={formData.commonName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Coast Banksia"
                    />
                  </div>

                  <div>
                    <label htmlFor="habitGrowthCharacteristics" className="block text-gray-700 mb-2">
                      Habit / Growth Characteristics
                    </label>
                    <textarea
                      id="habitGrowthCharacteristics"
                      name="habitGrowthCharacteristics"
                      value={formData.habitGrowthCharacteristics}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe growth habit, form, size, and growth rate..."
                    />
                  </div>

                  <div>
                    <label htmlFor="lifeCycle" className="block text-gray-700 mb-2">
                      Life Cycle
                    </label>
                    <input
                      id="lifeCycle"
                      name="lifeCycle"
                      type="text"
                      value={formData.lifeCycle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Perennial, Annual, Biennial"
                    />
                  </div>

                  <div>
                    <label htmlFor="indigenousSeason" className="block text-gray-700 mb-2">
                      Indigenous Season *
                    </label>
                    <select
                      id="indigenousSeason"
                      name="indigenousSeason"
                      value={formData.indigenousSeason}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {indigenousSeasons.map(season => (
                        <option key={season.name} value={season.name}>
                          {season.name} ({season.period})
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-gray-600">
                      {indigenousSeasons.find(s => s.name === formData.indigenousSeason)?.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Identifying Characteristics Tab */}
              {activeTab === 'identifying' && (
                <div className="space-y-6">
                  <h2 className="text-green-800 pb-4 border-b border-gray-200">Identifying Characteristics</h2>
                  
                  <div>
                    <label htmlFor="identifyingCharacteristics" className="block text-gray-700 mb-2">
                      Identifying Characteristics
                    </label>
                    <textarea
                      id="identifyingCharacteristics"
                      name="identifyingCharacteristics"
                      value={formData.identifyingCharacteristics}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Key features that help identify this plant..."
                    />
                  </div>

                  <div>
                    <label htmlFor="leavesStemsMemristems" className="block text-gray-700 mb-2">
                      Leaves, Stems and Meristems
                    </label>
                    <textarea
                      id="leavesStemsMemristems"
                      name="leavesStemsMemristems"
                      value={formData.leavesStemsMemristems}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe leaf shape, arrangement, stem characteristics, growth points..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="flowers" className="block text-gray-700 mb-2">
                        Flowers
                      </label>
                      <textarea
                        id="flowers"
                        name="flowers"
                        value={formData.flowers}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Flower color, structure, arrangement..."
                      />
                    </div>

                    <div>
                      <label htmlFor="floweringTimeSeason" className="block text-gray-700 mb-2">
                        Flowering Time/Season
                      </label>
                      <input
                        id="floweringTimeSeason"
                        name="floweringTimeSeason"
                        type="text"
                        value={formData.floweringTimeSeason}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., Spring to Summer, Year-round"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fruitSeed" className="block text-gray-700 mb-2">
                        Fruit / Seed
                      </label>
                      <textarea
                        id="fruitSeed"
                        name="fruitSeed"
                        value={formData.fruitSeed}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Description of fruit or seed structures..."
                      />
                    </div>

                    <div>
                      <label htmlFor="seedCollectionTimeSeason" className="block text-gray-700 mb-2">
                        Seed Collection Time/Season
                      </label>
                      <input
                        id="seedCollectionTimeSeason"
                        name="seedCollectionTimeSeason"
                        type="text"
                        value={formData.seedCollectionTimeSeason}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., Autumn, After flowering"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="additionalPropagationRequirements" className="block text-gray-700 mb-2">
                      Additional Propagation Requirements
                    </label>
                    <textarea
                      id="additionalPropagationRequirements"
                      name="additionalPropagationRequirements"
                      value={formData.additionalPropagationRequirements}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Special requirements for propagation..."
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="trunk" className="block text-gray-700 mb-2">
                        Trunk
                      </label>
                      <textarea
                        id="trunk"
                        name="trunk"
                        value={formData.trunk}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Bark type, trunk characteristics..."
                      />
                    </div>

                    <div>
                      <label htmlFor="rootSystem" className="block text-gray-700 mb-2">
                        Root System
                      </label>
                      <textarea
                        id="rootSystem"
                        name="rootSystem"
                        value={formData.rootSystem}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Root type and characteristics..."
                      />
                    </div>

                    <div>
                      <label htmlFor="vascularSystem" className="block text-gray-700 mb-2">
                        Vascular System
                      </label>
                      <textarea
                        id="vascularSystem"
                        name="vascularSystem"
                        value={formData.vascularSystem}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Vascular tissue information..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="spottingCharacteristics" className="block text-gray-700 mb-2">
                      Spotting Characteristics
                    </label>
                    <textarea
                      id="spottingCharacteristics"
                      name="spottingCharacteristics"
                      value={formData.spottingCharacteristics}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="How to spot this plant in the wild..."
                    />
                  </div>

                  <div>
                    <label htmlFor="familyLevel" className="block text-gray-700 mb-2">
                      Family Level
                    </label>
                    <textarea
                      id="familyLevel"
                      name="familyLevel"
                      value={formData.familyLevel}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Family-level characteristics..."
                    />
                  </div>

                  <div>
                    <label htmlFor="additionalInformation" className="block text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInformation"
                      name="additionalInformation"
                      value={formData.additionalInformation}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Any other relevant botanical information..."
                    />
                  </div>
                </div>
              )}

              {/* Cultural Information Tab */}
              {activeTab === 'cultural' && (
                <div className="space-y-6">
                  <h2 className="text-green-800 pb-4 border-b border-gray-200">Cultural & Horticultural Information</h2>
                  
                  <div>
                    <label htmlFor="culturalInformationAndUses" className="block text-gray-700 mb-2">
                      Cultural Information and Uses
                    </label>
                    <textarea
                      id="culturalInformationAndUses"
                      name="culturalInformationAndUses"
                      value={formData.culturalInformationAndUses}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Traditional and contemporary cultural uses..."
                    />
                  </div>

                  <div>
                    <label htmlFor="ethnobotanicalInformationUses" className="block text-gray-700 mb-2">
                      Ethnobotanical Information/Uses
                    </label>
                    <textarea
                      id="ethnobotanicalInformationUses"
                      name="ethnobotanicalInformationUses"
                      value={formData.ethnobotanicalInformationUses}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Traditional indigenous uses, medicinal properties, food sources..."
                    />
                  </div>

                  <div>
                    <label htmlFor="horticulturalLandscapeInfo" className="block text-gray-700 mb-2">
                      Horticultural / Landscape Information/Uses
                    </label>
                    <textarea
                      id="horticulturalLandscapeInfo"
                      name="horticulturalLandscapeInfo"
                      value={formData.horticulturalLandscapeInfo}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Growing conditions, soil requirements, watering needs, landscape applications..."
                    />
                  </div>

                  <div>
                    <label htmlFor="references" className="block text-gray-700 mb-2">
                      References
                    </label>
                    <textarea
                      id="references"
                      name="references"
                      value={formData.references}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Books, websites, experts consulted..."
                    />
                  </div>
                </div>
              )}

              {/* QR Code Tab */}
              {activeTab === 'qr' && (
                <div className="space-y-6">
                  <h2 className="text-green-800 pb-4 border-b border-gray-200">QR Code Generation</h2>
                  
                  {qrCodeUrl ? (
                    <div className="text-center">
                      <div className="inline-block p-8 bg-gray-50 rounded-2xl border-2 border-gray-200">
                        <img
                          src={qrCodeUrl}
                          alt="Plant QR Code"
                          className="w-64 h-64 mx-auto mb-6"
                        />
                        <div className="space-y-3">
                          <p className="text-gray-700">
                            Scan to view: <strong>{formData.commonName || 'This Plant'}</strong>
                          </p>
                          <button
                            type="button"
                            onClick={downloadQRCode}
                            className="flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors mx-auto"
                          >
                            <Download className="w-5 h-5" />
                            Download QR Code
                          </button>
                        </div>
                      </div>
                      <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
                        This QR code will link visitors at MIFGUS directly to your plant's complete biography. 
                        Print and display it alongside your plant!
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        QR Code will be generated when you save the plant biography
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 p-8 bg-gray-50 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Saving...' : (id ? 'Update Plant Biography' : 'Create Plant Biography & Generate QR')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
