import type { PlantView } from '../data/PlantData';

import { ArrowLeft, Leaf, Flower, Circle, TreePine, Sprout } from 'lucide-react';
import type { PlantBio as Plant } from '../data/PlantData';

interface PlantInfoProps {
  plant: PlantView;
  onReset: () => void;
}


export function PlantInfo({ plant, onReset }: PlantInfoProps) {
  const InfoField = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
    <div className="border-b border-gray-100 py-3 last:border-0">
      <div className="flex items-start gap-2">
        {icon && <div className="mt-1 text-green-600">{icon}</div>}
        <div className="flex-1">
          <dt className="text-gray-600">{label}</dt>
          <dd className="text-gray-900 mt-1">{value || 'N/A'}</dd>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="rounded-2xl shadow-xl overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${plant.imageUrl})` }}
    >
      <div 
        className="bg-gradient-to-r from-amber-800 to-amber-900 p-6 text-white relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(21, 94, 117, 0.92), rgba(20, 83, 45, 0.92)), url(${plant.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <button
          onClick={onReset}
          className="flex items-center gap-2 mb-4 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors relative z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Scan Another Plant</span>
        </button>
        <h2 className="mb-2 relative z-10">{plant.commonName}</h2>
        <p className="text-green-50 italic relative z-10">{plant.botanicalName}</p>
      </div>

      <div className="p-6 bg-white/95 backdrop-blur-sm">
        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
          <p className="text-green-900">
            <span>Plant ID: </span>
            <span>{plant.plantId}</span>
          </p>
        </div>

        <dl className="space-y-1">
          <InfoField 
            label="Leaves" 
            value={plant.leaves} 
            icon={<Leaf className="w-5 h-5" />}
          />
          <InfoField label="Stem" value={plant.stem} />
          <InfoField label="Meristems" value={plant.meristems} />
          <InfoField 
            label="Flower" 
            value={plant.flower} 
            icon={<Flower className="w-5 h-5" />}
          />
          <InfoField 
            label="Flower Season" 
            value={plant.flowerSeason}
            icon={<Circle className="w-5 h-5" />}
          />
          <InfoField label="Fruit/Seed" value={plant.fruitSeed} />
          <InfoField label="Fruit/Seed Season" value={plant.fruitSeedSeason} />
          <InfoField 
            label="Trunk" 
            value={plant.trunk}
            icon={<TreePine className="w-5 h-5" />}
          />
          <InfoField 
            label="Root System" 
            value={plant.rootSystem}
            icon={<Sprout className="w-5 h-5" />}
          />
          <InfoField label="Vascular System" value={plant.vascularSystem} />
        </dl>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-green-800 mb-3">Propagation Required</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
            {plant.propagationRequired}
          </p>
        </div>

        {plant.additionalComment && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-green-800 mb-3">Additional Information</h3>
            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              {plant.additionalComment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
