// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Quiz from './component/Quiz'
// import MotsMelesNumerique from './MotMele/MotsMeles'
// import Pacman from './pacman/pacman'

// function App() {
//   const [count, setCount] = useState(0)
//   // return <Quiz />;
//   return (
//     <>
//       {/* <Quiz /> */}
//       {/* <MotsMelesNumerique /> */}
//       <Pacman />
//     </>
//   );
// }

// export default App


import { useState } from "react";
import "./App.css";

import Quiz from "./component/Quiz";
import MotsMelesNumerique from "./MotMele/MotsMeles";
import Pacman from "./pacman/pacman";
import SnakeGame from "./components/SnakeGame";

type WorldKey = "linux" | "reconditionnement" | "libres" | "articles";
type GameId = "quiz" | "motsMeles" | "pacman";

type WorldGame = {
  id: GameId;
  title: string;
  description: string;
};

type WorldConfig = {
  label: string;
  description: string;
  games: WorldGame[];
};

const WORLDS: Record<WorldKey, WorldConfig> = {
  linux: {
    label: "Monde Linux",
    description:
      "Découvre l’univers des systèmes libres, de l’autonomie et des usages qui sortent des chemins tout tracés.",
    games: [
      {
        id: "quiz",
        title: "Quiz profil numérique",
        description:
          "Fais le point sur ta relation au numérique, aux clouds et aux logiciels libres.",
      },
      {
        id: "pacman",
        title: "Pac-Man des plateformes",
        description:
          "Chasse les plateformes géantes renommées et découvre des alternatives plus libres et responsables.",
      },
    ],
  },
  reconditionnement: {
    label: "Monde Reconditionnement",
    description:
      "Penser sobriété, durée de vie du matériel, réemploi et lutte contre l’obsolescence.",
    games: [
      {
        id: "motsMeles",
        title: "Mots mêlés Reconditionnement",
        description:
          "Retrouve dans la grille les concepts liés au matériel, au cloud, aux données et à la sobriété.",
      },
    ],
  },
  libres: {
    label: "Monde Logiciels libres",
    description:
      "Comprendre pourquoi les logiciels libres comptent pour l’autonomie, la souveraineté et la durabilité.",
    games: [
      {
        id: "quiz",
        title: "Rejouer le quiz (facultatif)",
        description:
          "Repasser le quiz pour voir si ton profil évolue au fil des explorations.",
      },
      {
        id: "motsMeles",
        title: "Mots mêlés Logiciels libres",
        description:
          "Repère les termes clés de l’écosystème libre et open source.",
      },
      {
        id: "pacman",
        title: "Pac-Man alternatif",
        description:
          "Relis les plateformes mangées à des logiciels et services libres.",
      },
    ],
  },
  articles: {
    label: "Onglet Articles",
    description:
      "Un espace pour lire, approfondir et relier les expériences de jeu à des contenus plus structurés.",
    games: [],
  },
};

const GAME_LABELS: Record<GameId, string> = {
  quiz: "Quiz",
  motsMeles: "Mots mêlés",
  pacman: "Pac-Man",
};

function renderGame(gameId: GameId) {
  switch (gameId) {
    case "quiz":
      return <Quiz />;
    case "motsMeles":
      return <MotsMelesNumerique />;
    case "pacman":
      return <Pacman />;
    default:
      return null;
  }
}

function App() {
  const [currentWorld, setCurrentWorld] = useState<WorldKey>("linux");
  const [activeGameId, setActiveGameId] = useState<GameId | null>(null);
  const [secretInput, setSecretInput] = useState("");
  const [snakeVisible, setSnakeVisible] = useState(false);

  const world = WORLDS[currentWorld];

  const handleSecretInput = (value: string) => {
    setSecretInput(value);
    if (value.toUpperCase() === "DURABLE") {
      setSnakeVisible(true);
    } else {
      setSnakeVisible(false);
    }
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Différents mondes du numérique</h1>
        <p className="app-subtitle">
          Explore les mondes Linux, Reconditionnement, Logiciels libres… et
          lance les jeux librement.
        </p>
      </header>

      {/* Onglets de mondes */}
      <nav className="world-tabs">
        {(Object.keys(WORLDS) as WorldKey[]).map((key) => (
          <button
            key={key}
            className={
              "world-tab" + (currentWorld === key ? " world-tab-active" : "")
            }
            onClick={() => {
              setCurrentWorld(key);
              setActiveGameId(null);
            }}
          >
            {WORLDS[key].label}
          </button>
        ))}
      </nav>

      <main className="world-main">
        <section className="world-info">
          <h2>{world.label}</h2>
          <p>{world.description}</p>
        </section>

        {currentWorld === "articles" ? (
          <section className="world-articles">
            <h3>Contenus & articles</h3>
            <p>
              Ici, tu pourras retrouver des articles, fiches ou ressources qui
              prolongent ce que tu as expérimenté dans les jeux des autres
              mondes.
            </p>
          </section>
        ) : (
          <section className="world-games">
            <h3>Jeux de ce monde</h3>
            <div className="world-games-grid">
              {world.games.map((game) => {
                const isActive = activeGameId === game.id;

                return (
                  <article
                    key={game.id + game.title}
                    className={
                      "game-card" + (isActive ? " game-card-active" : "")
                    }
                  >
                    <header className="game-card-header">
                      <div className="game-card-title">
                        <span className="game-card-badge">
                          {GAME_LABELS[game.id]}
                        </span>
                        <h4>{game.title}</h4>
                      </div>
                    </header>

                    <p className="game-card-description">
                      {game.description}
                    </p>

                    <button
                      type="button"
                      className="game-card-button"
                      onClick={() => setActiveGameId(game.id)}
                    >
                      {isActive ? "Revenir au jeu" : "Lancer le jeu"}
                    </button>
                  </article>
                );
              })}
            </div>

            {/* Zone d'affichage du jeu sélectionné */}
            {activeGameId && (
              <section className="world-active-game">
                {renderGame(activeGameId)}
              </section>
            )}
          </section>
        )}

        {/* Secret Word Input */}
        {currentWorld !== "articles" && !snakeVisible && (
          <section className="secret-input-section">
            <div className="secret-input-header">
              <h3>🔐 Jeu Secret</h3>
              <p>Entre le mot secret pour déverrouiller un jeu caché...</p>
              <p>Indice: Je ne cède ni à l'usure ni à l'instantané, je m'inscris au fil des ans ;</p>
              <p>On me lie à une pratique qui préserve ressources et héritage humain,</p>
              <p>Mon composé trahit mon sens : l'un parle du temps, l'autre qualifie.
              Qui suis-je ?</p>
            </div>
            <input
              type="text"
              className="secret-input"
              placeholder="Mot secret..."
              value={secretInput}
              onChange={(e) => handleSecretInput(e.target.value)}
              maxLength={10}
            />
          </section>
        )}

        {/* Snake Game - Visible Only With Secret Word */}
        {currentWorld !== "articles" && snakeVisible && (
          <section className="snake-section">
            <div className="snake-section-header">
              <h3>🐍 Snake du Libre</h3>
              <p>Guide le serpent avec les flèches ou ZQSD et mange le plus de pommes possible.</p>
            </div>
            <SnakeGame />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
