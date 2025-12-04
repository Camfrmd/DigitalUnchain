import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const MondeLogicielLibre = () => (
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
    <div className="flex items-center space-x-4 mb-6">
      <Bookmark className="w-10 h-10 text-yellow-600" />
      <h1 className="text-3xl font-extrabold">Monde Logiciels Libres — Outils éthiques</h1>
    </div>

    <p className="text-gray-700 mb-6">
      Explorez des alternatives libres pour la bureautique, la communication et la création. 
      Adopter des logiciels libres, c'est reprendre le contrôle et respecter la vie privée.
    </p>

    <ul className="list-disc ml-6 text-gray-700 mb-6">
      <li>Suites bureautiques et outils collaboratifs libres</li>
      <li>Messagerie et protection de la vie privée</li>
      <li>Création multimédia avec logiciels libres</li>
    </ul>

    <div className="flex space-x-4">
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Retour à l'accueil</Link>
      <a href="https://www.gnu.org/" target="_blank" rel="noreferrer" className="px-4 py-2 border border-gray-300 rounded-lg">En savoir plus</a>
    </div>
  </div>
);

export default MondeLogicielLibre;
