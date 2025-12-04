import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';

import QuizPage from './components/Quizz/QuizPage';
import Blog from './components/pages/Blog';

import MondeLinux from './components/mondeLinux/MondeLinux';
import MondeReconditionne from './components/mondeReconditionne/MondeReconditionne';
import MondeLogicielLibre from './components/mondeLogicielLibre/MondeLogicielLibre';
// Footer: declared outside of App to avoid creating components during render
const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-8">
    <p>Digital Unchain &copy; 2024 | Lutter contre la dépendance technologique.</p>
  </footer>
);

// GlobalLayout: declared outside of App. Accepts dependencyScore as prop.
const GlobalLayout: React.FC<{ dependencyScore: number; children: React.ReactNode }> = ({ dependencyScore, children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Header dependencyScore={dependencyScore} />
    <main className="container mx-auto p-4 md:p-8 flex-grow">{children}</main>
    <Footer />
  </div>
);

// --- Composant Principal de l'Application ---
const App: React.FC = () => {
  // État pour le score de dépendance, partagé avec Header et Home
  const [dependencyScore, setDependencyScore] = useState(65);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route de la Page d'Accueil */}
        <Route
          path="/"
          element={
            <GlobalLayout dependencyScore={dependencyScore}>
              <Home setDependencyScore={setDependencyScore} dependencyScore={dependencyScore} />
            </GlobalLayout>
          }
        />

        {/* Routes du Bandeau de Navigation (Quizz, Blog) */}
        <Route path="/quiz" element={<GlobalLayout dependencyScore={dependencyScore}><QuizPage /></GlobalLayout>} />
        <Route path="/blog" element={<GlobalLayout dependencyScore={dependencyScore}><Blog /></GlobalLayout>} />

        {/* Routes des Mondes */}
        <Route path="/worlds/linux" element={<GlobalLayout dependencyScore={dependencyScore}><MondeLinux /></GlobalLayout>} />
        <Route path="/worlds/reconditionnement" element={<GlobalLayout dependencyScore={dependencyScore}><MondeReconditionne /></GlobalLayout>} />
        <Route path="/worlds/logiciels-libres" element={<GlobalLayout dependencyScore={dependencyScore}><MondeLogicielLibre /></GlobalLayout>} />

        {/* Route de secours (Page 404) */}
        <Route
          path="*"
          element={
            <GlobalLayout dependencyScore={dependencyScore}>
              <div className="text-center p-20 bg-white rounded-xl shadow-lg">
                <h1 className="text-4xl font-extrabold text-red-600">404 - NON TROUVÉ</h1>
                <p className="text-xl mt-4 text-gray-700">La voie vers cette alternative n'est pas encore tracée. Revenez à l'accueil pour choisir votre chemin.</p>
                <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                  Retourner au Portail
                </Link>
              </div>
            </GlobalLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;