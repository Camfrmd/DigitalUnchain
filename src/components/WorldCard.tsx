import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Zap, Cpu, BookOpen } from 'lucide-react';

interface WorldCardProps {
  title: string;
  description: string;
  path: string;
  isLocked?: boolean;
  progress?: number;
}

const GAFAM_LOGOS: Record<string, { name: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  linux: { name: 'JoogleOS', icon: Zap, color: 'text-green-500' },
  reconditionnement: { name: 'Faceblock', icon: Cpu, color: 'text-indigo-500' },
  'logiciels-libres': { name: 'Amason', icon: BookOpen, color: 'text-yellow-500' },
};

/**
 * Affiche une carte représentant un monde de jeu.
 */
const WorldCard: React.FC<WorldCardProps> = ({ title, description, path, isLocked = false, progress = 0 }) => {
  const worldKey = title.toLowerCase().replace(/\s/g, '-');
  const logo = GAFAM_LOGOS[worldKey] || { name: title, icon: Zap, color: 'text-gray-500' };
  const IconComponent = logo.icon;

  return (
    <div 
      className={`relative w-full max-w-sm m-4 p-6 rounded-2xl shadow-xl transition transform duration-300 
                  ${isLocked ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:shadow-2xl hover:-translate-y-1'}`}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
          <div className="text-white text-center">
            <Lock className="w-8 h-8 mx-auto mb-2" />
            <p className="font-bold text-lg">Verrouillé</p>
            <p className="text-sm">Faites le Quizz pour débloquer !</p>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4 mb-4">
        <IconComponent className={`w-10 h-10 ${logo.color} flex-shrink-0`} />
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 italic">"Contre {logo.name}"</p>
        </div>
      </div>

      <p className="text-gray-700 mb-6">{description}</p>
      
      {/* Barre de progression (Pourcentage de dépendance au monde) */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>Dépendance Numérique</span>
          <span>{100 - progress}% Libéré</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${progress < 30 ? 'bg-red-500' : progress < 70 ? 'bg-yellow-500' : 'bg-teal-500'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <Link 
        to={path} 
        className={`block text-center py-2 rounded-lg font-semibold transition duration-300 
                    ${isLocked ? 'bg-gray-400 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        onClick={(e) => isLocked && e.preventDefault()}
      >
        {isLocked ? 'Mini-Jeu Verrou' : 'Entrer dans le Monde'}
      </Link>
    </div>
  );
};

export default WorldCard;
