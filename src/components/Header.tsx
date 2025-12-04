import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, BookOpen } from 'lucide-react';

interface DependencyScoreProps {
  score: number;
}

/**
 * Affiche le score de dépendance.
 */
const DependencyScore: React.FC<DependencyScoreProps> = ({ score }) => {
  const colorClass = score > 75 ? 'bg-red-500' : score > 40 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="flex items-center space-x-2 p-2 bg-white rounded-full shadow-inner border border-gray-200">
      <Gauge className="text-gray-600 w-5 h-5" />
      <span className="text-sm font-semibold text-gray-700">
        Score de Dépendance :
      </span>
      <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${colorClass}`}>
        {score}%
      </span>
    </div>
  );
};

interface HeaderProps {
  dependencyScore: number;
}

/**
 * Composant du bandeau de navigation principal.
 */
const Header: React.FC<HeaderProps> = ({ dependencyScore }) => {
  return (
    <header className="bg-gray-900 shadow-xl sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo/Titre */}
        <Link to="/" className="text-2xl font-extrabold text-white tracking-widest uppercase hover:text-blue-400 transition duration-300 mb-4 md:mb-0">
          Digital Unchain
        </Link>
        
        {/* Navigation principale (Bandeau d'accès) */}
        <nav className="flex space-x-4 md:space-x-8">
          <NavLink to="/quiz" icon={Gauge}>Quizz</NavLink>
          <NavLink to="/blog" icon={BookOpen}>Blog & Articles</NavLink>
        </nav>

        {/* Affichage du Score */}
        <div className="mt-4 md:mt-0">
          <DependencyScore score={dependencyScore} />
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

// Composant utilitaire pour les liens de navigation
const NavLink: React.FC<NavLinkProps> = ({ to, icon: Icon, children }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-blue-400 transition duration-200"
  >
    <Icon className="w-4 h-4" />
    <span>{children}</span>
  </Link>
);

export default Header;
