import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Blog = () => (
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
    <div className="flex items-center space-x-4 mb-6">
      <BookOpen className="w-10 h-10 text-indigo-600" />
      <h1 className="text-3xl font-extrabold">Blog & Articles</h1>
    </div>

    <p className="text-gray-700 mb-6">Retrouvez des articles, guides et retours d'expérience pour vous accompagner dans votre transition.</p>

    <ul className="list-disc ml-6 text-gray-700 mb-6">
      <li>Pourquoi choisir des logiciels libres ?</li>
      <li>Guide pas à pas pour migrer vers Linux</li>
      <li>Astuces pour prolonger la durée de vie de votre matériel</li>
    </ul>

    <div className="flex space-x-4">
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Retour à l'accueil</Link>
    </div>
  </div>
);

export default Blog;
