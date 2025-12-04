import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

const MondeLinux = () => (
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
    <div className="flex items-center space-x-4 mb-6">
      <Terminal className="w-10 h-10 text-green-600" />
      <h1 className="text-3xl font-extrabold">Monde Linux — Alternatives Libres</h1>
    </div>

    <p className="text-gray-700 mb-6">
      Bienvenue dans le monde Linux. Ici vous apprendrez à installer, configurer et utiliser
      des systèmes d'exploitation libres pour réduire votre dépendance aux systèmes propriétaires.
    </p>

    <ul className="list-disc ml-6 text-gray-700 mb-6">
      <li>Introduction à une distribution libre (Ubuntu, Fedora, etc.)</li>
      <li>Gestion des paquets, sécurité et bonnes pratiques</li>
      <li>Migration depuis des environnements propriétaires</li>
    </ul>

    <div className="flex space-x-4">
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Retour à l'accueil</Link>
      <a href="https://www.kernel.org" target="_blank" rel="noreferrer" className="px-4 py-2 border border-gray-300 rounded-lg">En savoir plus</a>
    </div>
  </div>
);

export default MondeLinux;
