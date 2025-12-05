

import { useState } from "react";
import "./App.css";

import Quiz from "./component/Quiz";
import MotsMelesNumerique from "./MotMele/MotsMeles";
import Pacman from "./pacman/pacman";
import ArticleList from './ArticleList';
import SnakeGame from "./snake/SnakeGame";
import CardGrid from "./OngletArticle/CardGrid";

type WorldKey = "numérique" | "inclusif" | "libres" | "durable" | "articles";
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

// 👇 map pour avoir des noms de classes CSS propres
const WORLD_THEME_CLASS: Record<WorldKey, string> = {
  numérique: "world-theme-numerique",
  inclusif: "world-theme-inclusif",
  libres: "world-theme-responsable",
  durable: "world-theme-durable",
  articles: "world-theme-articles",
};




const WORLDS: Record<WorldKey, WorldConfig> = {
  numérique: {
    label: "Monde Numérique",
    description:
      "Mieux comprendre tes outils, sortir des réglages par défaut et gagner en autonomie (systèmes, logiciels, sauvegardes, alternatives libres).",
    games: [
      {
        id: "motsMeles",
        title: "Mots mêlés Responsable",
        description:
          "Repère les notions clés autour des données, du traçage, de la sobriété et des alternatives plus responsables.",
      },
    ],
    

    
  },
  inclusif: {
    label: "Monde Inclusif",
    description:
      "Rendre le numérique plus accessible, compréhensible et rassurant pour toutes et tous, quel que soit le niveau de départ.",
    games: [
      {
        id: "motsMeles",
        title: "Mots mêlés Inclusif",
        description:
          "Retrouve les mots liés à l’accessibilité, à l’accompagnement, aux difficultés numériques et aux bonnes pratiques pédagogiques.",
      },
    ],
  },
  libres: {
    label: "Monde Responsable",
    description:
      "Comprendre les enjeux de responsabilité numérique : données, GAFAM, clouds, souveraineté et choix d’outils plus éthiques.",
    games: [
      // {
      //   id: "quiz",
      //   title: "Rejouer le quiz (facultatif)",
      //   description:
      //     "Repasser le quiz pour voir si ton profil évolue après avoir exploré les différents mondes.",
      // },
      {
        id: "motsMeles",
        title: "Mots mêlés Responsable",
        description:
          "Repère les notions clés autour des données, du traçage, de la sobriété et des alternatives plus responsables.",
      },
      {
        id: "pacman",
        title: "Pac-Man alternatif",
        description:
          "Relis les plateformes mangées à des logiciels et services plus respectueux de tes données et de l’environnement.",
      },
    ],
  },
  durable: {
    label: "Monde Durable",
    description:
      "Penser sobriété numérique, réemploi, reconditionnement et prolongation de la durée de vie du matériel plutôt que le renouvellement systématique.",
    games: [
      {
        id: "pacman",
        title: "Pac-Man Sobriété",
        description:
          "Associe les géants mangés à des pratiques plus durables : réparation, reconditionnement, hébergeurs plus modestes, etc.",
      },
    ],
  },
  articles: {
    label: "Articles",
    description:
      "Un espace pour lire, approfondir et relier les expériences de jeu à des contenus plus structurés (fiches, ressources, exemples).",
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


  const [secretInput, setSecretInput] = useState("");
  const [snakeVisible, setSnakeVisible] = useState(false);

  // tant que c'est false, on affiche seulement le quiz en plein écran
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  const [currentWorld, setCurrentWorld] = useState<WorldKey>("numérique");
  const [activeGameId, setActiveGameId] = useState<GameId | null>(null);

    const handleSecretInput = (value: string) => {
    setSecretInput(value);
    if (value.toUpperCase() === "DURABLE") {
      setSnakeVisible(true);
    } else {
      setSnakeVisible(false);
    }
  };


  const world = WORLDS[currentWorld];

  // === ÉTAPE 1 : écran "Quiz uniquement" ===
  if (!hasCompletedQuiz) {
    return (
    <div className={`app-root ${WORLD_THEME_CLASS["numérique"]}`}>
        <header className="app-header">
          <h1>Commence par ton profil numérique</h1>
          <p className="app-subtitle">
            Réponds au quiz pour voir sur quelles thématiques{" "}
            <strong>(Numérique, Inclusif, Responsable, Durable)</strong> tu as
            le plus intérêt à te concentrer.
          </p>
        </header>

        <main className="world-main">
          <section className="world-active-game">
            <Quiz onComplete={() => setHasCompletedQuiz(true)} />
          </section>
        </main>
      </div>
    );
  }

  // === ÉTAPE 2 : une fois le quiz terminé, on affiche les mondes + onglets ===
  return (
  <div className={`app-root ${WORLD_THEME_CLASS[currentWorld]}`}>
      <header className="app-header">
        <h1>Différents mondes du numérique</h1>
        <p className="app-subtitle">
          Explore les mondes <strong>Numérique</strong>,{" "}
          <strong>Inclusif</strong>, <strong>Responsable</strong> et{" "}
          <strong>Durable</strong>, puis complète avec l’onglet{" "}
          <strong>Articles</strong> pour aller plus loin.
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

    {/* ---- SECTION 1 : Femmes pionnières ---- */}
    <h3>Femmes pionnières du numérique</h3>
    <p>
      Découvrez les femmes qui ont marqué l’histoire du numérique.  
      Cliquez sur une carte pour lire leur parcours !
    </p>
    <CardGrid />

    <hr style={{ margin: "2rem 0", opacity: 0.4 }} />

    {/* ---- SECTION 2 : Articles classiques ---- */}
    <h3>Articles & ressources</h3>
    <p>
      Approfondis les thématiques abordées dans les différents mondes :
      numérique, inclusif, responsable, durable.
    </p>
    <ArticleList />

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

            {/* Zone d’affichage du jeu sélectionné */}
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
            <div className="secret-input-section">
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
