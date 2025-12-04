import React, { useEffect, useState } from 'react';
import WorldCard from '../WorldCard';
import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Définition des mondes
const WORLDS = [
  { 
    title: 'Linux', 
    description: "Apprenez les alternatives aux systèmes d'exploitation propriétaires. Libérez-vous de JoogleOS.", 
    path: '/worlds/linux', 
    isLocked: false, // Démarrer déverrouillé pour l'exemple
    progress: 45 // 45% de progression dans le monde (vs 100% de dépendance initiale)
  },
  { 
    title: 'Reconditionnement', 
    description: "Découvrez comment réparer et optimiser votre matériel. Contrez l'obsolescence programmée de Faceblock.", 
    path: '/worlds/reconditionnement', 
    isLocked: true, // Verrouillé au début
    progress: 10 
  },
  { 
    title: 'Logiciels Libres', 
    description: "Adoptez des outils libres et éthiques pour vos usages quotidiens. Échappez à la mainmise d'Amason.", 
    path: '/worlds/logiciels-libres', 
    isLocked: true, 
    progress: 75 
  },
  { 
    title: 'Numérique Responsable', 
    description: "Testez votre pollution numérique et réduisez votre empreinte écologique (Monde INCLUSIF/DURABLE).", 
    path: '/worlds/responsable', 
    isLocked: true, 
    progress: 20 
  },
];

/**
 * Affiche le score de dépendance et l'évolution.
 * @param {object} props - Props du composant.
 * @param {number} props.dependencyScore - Score de dépendance global.
 * @param {Function} props.setDependencyScore - Fonction pour mettre à jour le score (pour le test).
 */
const DependencyScoreWidget = ({ dependencyScore, setDependencyScore }) => {
  // Simuler une évolution
  const handleRecalculate = () => {
    const newScore = Math.floor(Math.random() * (90 - 20 + 1)) + 20; // Nouveau score entre 20 et 90
    setDependencyScore(newScore);
    alert(`Votre nouveau score de dépendance est de ${newScore}%.`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-blue-500" />
          <span>Score Global de Dépendance</span>
        </h2>
        <Link to="/quiz" onClick={handleRecalculate} className="flex items-center space-x-1 text-sm text-blue-600 font-semibold hover:text-blue-800 transition">
          <Clock className="w-4 h-4" />
          <span>Refaire le Quizz</span>
        </Link>
      </div>

      <div className="text-center">
        <p className="text-6xl font-extrabold text-red-600">{dependencyScore}%</p>
        <p className="mt-2 text-lg text-gray-600">
          Un score élevé indique une forte dépendance aux technologies propriétaires.
        </p>
      </div>
      
      {dependencyScore > 70 && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
          <p className="text-sm">
            Votre score est critique. Il est fortement suggéré de commencer par le monde 
            <span className="font-bold"> Linux</span> pour réduire rapidement votre dépendance !
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Composant de la Page d'Accueil
 * @param {object} props - Props du composant.
 * @param {Function} props.setDependencyScore - Fonction pour mettre à jour le score.
 * @param {number} props.dependencyScore - Score de dépendance global.
 */
const Home = ({ setDependencyScore, dependencyScore }) => {
  // Ici, la logique pour déterminer l'ordre suggéré des mondes
  // Pour l'instant, nous affichons les 3 premiers.

  return (
    <div className="animate-fadeIn">
      {/* Section 1: Score de Dépendance et Appel à l'Action */}
      <DependencyScoreWidget 
        dependencyScore={dependencyScore} 
        setDependencyScore={setDependencyScore} 
      />

      {/* Section 2: Sélection des Mondes */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 pb-2">
        Partez à la Libération Numérique
      </h2>
      <div className="flex flex-wrap justify-center lg:justify-start -m-4">
        {WORLDS.slice(0, 3).map((world) => (
          <WorldCard 
            key={world.title} 
            title={world.title} 
            description={world.description} 
            path={world.path} 
            isLocked={world.isLocked} 
            progress={world.progress}
          />
        ))}
      </div>

      {/* Section 3: Section du Blog/Info (Complément au bandeau) */}
      <div className="mt-12 p-8 bg-purple-50 rounded-xl shadow-inner border-l-8 border-purple-400">
        <h3 className="text-2xl font-bold text-purple-800 mb-3">
          📚 Lire pour s'armer de Connaissances
        </h3>
        <p className="text-gray-700 mb-4">
          Nos articles de blog sont des compléments aux jeux. Ils offrent des informations détaillées 
          sur les alternatives et des conseils d'ergonomie pour une utilisation plus saine.
        </p>
        <Link 
          to="/blog" 
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Accéder au Blog
        </Link>
      </div>
    </div>
  );
};

export default Home;