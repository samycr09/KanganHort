import { indigenousSeasons } from '../data/PlantData';
import { Calendar } from 'lucide-react';

export function SeasonInfo() {
  return (
    <div className="relative rounded-2xl shadow-xl overflow-hidden">
      {/* Aboriginal art background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1685344967764-785f77cba460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYm9yaWdpbmFsJTIwYXJ0JTIwcGFpbnRpbmd8ZW58MXx8fHwxNzY0MzgwOTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)'
        }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/85" />
      
      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-8 h-8 text-gray-600" />
          <h2 className="text-gray-800">Indigenous Seasons</h2>
        </div>

        <div className="space-y-4">
          {indigenousSeasons.map((season) => (
            <div
              key={season.name}
              className="border-l-4 border-gray-300 pl-4 py-2 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-1">
                <h3 className="text-gray-900">{season.name}</h3>
                <span className="text-gray-500">({season.period})</span>
              </div>
              <p className="text-gray-600">{season.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
