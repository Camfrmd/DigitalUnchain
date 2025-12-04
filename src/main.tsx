import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Assurez-vous d'avoir un fichier index.css ou utilisez App.css

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      {/* BrowserRouter est déplacé dans App.tsx pour plus de flexibilité */}
      <App />
    </React.StrictMode>
  );
}