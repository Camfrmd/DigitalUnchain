import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

const MondeReconditionne: React.FC = () => (
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
    <div className="flex items-center space-x-4 mb-6">
      <RefreshCw className="w-10 h-10 text-indigo-600" />
      <h1 className="text-3xl font-extrabold">Monde Reconditionnement — Réparer et Réutiliser</h1>
    </div>

    <p className="text-gray-700 mb-6">
      Le reconditionnement permet de prolonger la vie du matériel et de lutter contre l'obsolescence programmée.
      Vous trouverez ici des guides pour diagnostiquer, réparer et optimiser vos appareils.
    </p>

    <ul className="list-disc ml-6 text-gray-700 mb-6">
      <li>Diagnostic matériel et logiciel</li>
      <li>Remplacement de composants courants</li>
      <li>Optimisation pour allonger la durée de vie</li>
    </ul>

    <div className="flex space-x-4">
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Retour à l'accueil</Link>
      <a href="https://fr.wikipedia.org/wiki/Reconditionnement" target="_blank" rel="noreferrer" className="px-4 py-2 border border-gray-300 rounded-lg">En savoir plus</a>
    </div>
  </div>
);

export default MondeReconditionne;
