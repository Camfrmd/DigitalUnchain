import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const QuizPage = () => (
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
    <CheckCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
    <h1 className="text-3xl font-extrabold mb-2">Quizz — Évaluez votre dépendance</h1>
    <p className="text-gray-700 mb-6">Le quizz vous permet de mesurer votre niveau actuel et débloquer des mondes.</p>

    <p className="text-gray-600 mb-6">(Page de démonstration — le quizz complet sera ajouté plus tard.)</p>

    <div className="flex justify-center space-x-4">
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Retour à l'accueil</Link>
      <Link to="/worlds/linux" className="px-4 py-2 border border-gray-300 rounded-lg">Voir le Monde Linux</Link>
    </div>
  </div>
);

export default QuizPage;
