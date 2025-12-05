

import { useEffect, useState } from "react";
import "./pacman.css";

type Pos = { row: number; col: number };
type Tile = "wall" | "pellet" | "empty";
type GameState = "running" | "win" | "gameover";

type SpecialId = "windos" | "googel" | "amazone" | "faceworld" | "icloudy";

type SpecialInfo = {
  id: SpecialId;
  displayName: string; // nom affiché dans la liste
  type: string;        // système, recherche, cloud, etc.
  description: string; // pourquoi c'est problématique
  alternatives: string[]; // suggestions
};

// Objets à manger : GAFAM renommés
const SPECIAL_INFOS: SpecialInfo[] = [
  {
    id: "windos",
    displayName: "WindOS",
    type: "Système d’exploitation propriétaire",
    description:
      "Tu viens de manger un système imposé par défaut sur beaucoup d’ordinateurs. Pratique, mais très dépendant d’un seul éditeur, avec peu de transparence.",
    alternatives: [
      "Essayer une distribution GNU/Linux accessible : Linux Mint, Ubuntu, Elementary OS.",
      "Tester Linux en clé USB « live » sans toucher à ton installation actuelle.",
      "Découvrir les environnements libres : Firefox, LibreOffice, GIMP…",
    ],
  },
  {
    id: "googel",
    displayName: "Googel",
    type: "Recherche + mail + services connectés",
    description:
      "Tu viens d’avaler un moteur de recherche qui centralise aussi mails, vidéos, cloud… Beaucoup de données, peu de contrôle.",
    alternatives: [
      "Moteur de recherche : DuckDuckGo, Qwant, ou un métamoteur libre (SearxNG).",
      "Mail plus sobre : Proton Mail, Mailbox.org, Posteo.",
      "Utiliser plusieurs services plutôt que tout confier au même acteur.",
    ],
  },
  {
    id: "amazone",
    displayName: "Amazone",
    type: "Commerce + cloud géant",
    description:
      "Plateforme ultra pratique, mais qui pousse à la surconsommation et concentre une grande partie de l’infrastructure du web.",
    alternatives: [
      "Privilégier le reconditionné, l’occasion locale et les réparateurs de quartier.",
      "Acheter des livres en librairies indépendantes ou les emprunter en médiathèque.",
      "Pour le cloud : choisir des hébergeurs plus modestes, des assos ou des services publics.",
    ],
  },
  {
    id: "faceworld",
    displayName: "FaceWorld",
    type: "Réseau social centralisé",
    description:
      "Réseau qui capte ton attention, trie les contenus et collecte énormément de données sur tes relations.",
    alternatives: [
      "Découvrir le fediverse : Mastodon (réseau social décentralisé), Mobilizon (événements).",
      "Limiter les notifications et le temps passé sur les réseaux.",
      "Privilégier les échanges en petits groupes, outils libres ou espaces pédagogiques.",
    ],
  },
  {
    id: "icloudy",
    displayName: "iCloudy",
    type: "Cloud lié à un écosystème fermé",
    description:
      "Stockage en ligne très intégré à un fabricant précis : pratique, mais difficile à quitter.",
    alternatives: [
      "Tester Nextcloud (auto-hébergé ou proposé par ton établissement).",
      "Garder une copie locale de tes données importantes (disque dur, sauvegardes).",
      "Séparer ton stockage (cloud) de tes appareils pour rester plus libre.",
    ],
  },
];

const SPECIAL_BY_ID: Record<SpecialId, SpecialInfo> = {
  windos: SPECIAL_INFOS[0],
  googel: SPECIAL_INFOS[1],
  amazone: SPECIAL_INFOS[2],
  faceworld: SPECIAL_INFOS[3],
  icloudy: SPECIAL_INFOS[4],
};

/**
 * Level :
 * # = mur
 * . = pastille
 * chiffres = cases spéciales GAFAM renommées
 * 1 = WindOS, 2 = Googel, 3 = Amazone, 4 = FaceWorld, 5 = iCloudy
 */
const LEVEL_LAYOUT = [
  "###############",
  "#..1....2.....#",
  "#.###.###.###.#",
  "#.............#",
  "#.###.#.#.###.#",
  "#..3..#.#.4...#",
  "###.#.#.#.#.###",
  "#...#.....#...#",
  "#.#.###.###.#.#",
  "#.....5.......#",
  "###############",
];

const ROWS = LEVEL_LAYOUT.length;
const COLS = LEVEL_LAYOUT[0].length;

type BoardBuild = {
  tiles: Tile[][];
  specials: Record<string, SpecialId>;
};

const posKey = (r: number, c: number) => `${r}-${c}`;

function buildInitialBoard(): BoardBuild {
  const specials: Record<string, SpecialId> = {};

  const tiles: Tile[][] = LEVEL_LAYOUT.map((row, r) =>
    row.split("").map((ch, c) => {
      if (ch === "#") return "wall";
      if (ch === ".") return "pellet";

      if (ch === "1") {
        specials[posKey(r, c)] = "windos";
        return "pellet";
      }
      if (ch === "2") {
        specials[posKey(r, c)] = "googel";
        return "pellet";
      }
      if (ch === "3") {
        specials[posKey(r, c)] = "amazone";
        return "pellet";
      }
      if (ch === "4") {
        specials[posKey(r, c)] = "faceworld";
        return "pellet";
      }
      if (ch === "5") {
        specials[posKey(r, c)] = "icloudy";
        return "pellet";
      }

      return "empty";
    })
  );

  return { tiles, specials };
}

function isWall(level: Tile[][], pos: Pos) {
  if (pos.row < 0 || pos.row >= ROWS) return true;
  if (pos.col < 0 || pos.col >= COLS) return true;
  return level[pos.row][pos.col] === "wall";
}

export default function Pacman() {
  const initial = buildInitialBoard();

  const [level, setLevel] = useState<Tile[][]>(initial.tiles);
  const [specialCells, setSpecialCells] = useState<Record<string, SpecialId>>(
    initial.specials
  );

  const [pacman, setPacman] = useState<Pos>({ row: 1, col: 1 });
  const [ghost, setGhost] = useState<Pos>({ row: 8, col: 13 });
  const [score, setScore] = useState(0);
  const [pelletsLeft, setPelletsLeft] = useState<number>(() =>
    initial.tiles.flat().filter((t) => t === "pellet").length
  );
  const [state, setState] = useState<GameState>("running");

  const [eatenSpecials, setEatenSpecials] = useState<Record<SpecialId, boolean>>(
    () => ({
      windos: false,
      googel: false,
      amazone: false,
      faceworld: false,
      icloudy: false,
    })
  );
  const [lastEaten, setLastEaten] = useState<SpecialId | null>(null);

  // Réinitialiser tout proprement
  const resetGame = () => {
    const fresh = buildInitialBoard();
    setLevel(fresh.tiles);
    setSpecialCells(fresh.specials);
    setPacman({ row: 1, col: 1 });
    setGhost({ row: 8, col: 13 });
    setScore(0);
    setPelletsLeft(
      fresh.tiles.flat().filter((t) => t === "pellet").length
    );
    setState("running");
    setEatenSpecials({
      windos: false,
      googel: false,
      amazone: false,
      faceworld: false,
      icloudy: false,
    });
    setLastEaten(null);
  };

  // Déplacements clavier + gestion pastilles & GAFAM
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state !== "running") return;

      let dir: Pos | null = null;
      if (e.key === "ArrowUp") dir = { row: -1, col: 0 };
      if (e.key === "ArrowDown") dir = { row: 1, col: 0 };
      if (e.key === "ArrowLeft") dir = { row: 0, col: -1 };
      if (e.key === "ArrowRight") dir = { row: 0, col: 1 };
      if (!dir) return;

      let next: Pos = {
        row: pacman.row + dir.row,
        col: pacman.col + dir.col,
      };

      // wrap horizontal
      if (next.col < 0) next.col = COLS - 1;
      if (next.col >= COLS) next.col = 0;

      if (isWall(level, next)) return;

      const newLevel = level.map((row) => [...row]);
      let newScore = score;
      let newPelletsLeft = pelletsLeft;
      let newSpecialCells = { ...specialCells };
      let newEatenSpecials = { ...eatenSpecials };
      let newLast: SpecialId | null = lastEaten;

      // Pastille classique
      if (newLevel[next.row][next.col] === "pellet") {
        newLevel[next.row][next.col] = "empty";
        newScore += 10;
        newPelletsLeft -= 1;
      }

      // Case GAFAM spéciale ?
      const key = posKey(next.row, next.col);
      const specialId = newSpecialCells[key];
      if (specialId && !newEatenSpecials[specialId]) {
        newEatenSpecials[specialId] = true;
        delete newSpecialCells[key];
        newScore += 40; // bonus pour un géant
        newLast = specialId;
      }

      setLevel(newLevel);
      setPacman(next);
      setScore(newScore);
      setPelletsLeft(newPelletsLeft);
      setSpecialCells(newSpecialCells);
      setEatenSpecials(newEatenSpecials);
      setLastEaten(newLast);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, pacman, level, score, pelletsLeft, specialCells, eatenSpecials, lastEaten]);

  // Mouvement du fantôme
 useEffect(() => {
    if (state !== "running") return;

    const interval = setInterval(() => {
      setGhost((prev) => {
        const dirs: Pos[] = [
          { row: -1, col: 0 },
          { row: 1, col: 0 },
          { row: 0, col: -1 },
          { row: 0, col: 1 },
        ];

        // Toutes les positions possibles (sans mur)
        const candidates = dirs
          .map((d) => ({ row: prev.row + d.row, col: prev.col + d.col }))
          .filter((p) => !isWall(level, p));

        if (candidates.length === 0) return prev;

        // Fantôme un peu plus "intelligent" :
        // il privilégie les cases qui rapprochent de Pac-Man
        const sorted = [...candidates].sort((a, b) => {
          const da =
            Math.abs(a.row - pacman.row) + Math.abs(a.col - pacman.col);
          const db =
            Math.abs(b.row - pacman.row) + Math.abs(b.col - pacman.col);
          return da - db;
        });

        // On ajoute une petite part d'aléatoire pour ne pas être trop prévisible
        const chooseIndex =
          Math.random() < 0.7
            ? 0 // 70% du temps : meilleure case (plus proche de Pac-Man)
            : Math.floor(Math.random() * sorted.length); // sinon au hasard

        return sorted[chooseIndex];
      });
    }, 150); // 👈 plus rapide qu'avant (300 ms)

    return () => clearInterval(interval);
  }, [state, level, pacman]);


  // Vérifier collisions + victoire
  useEffect(() => {
    if (state !== "running") return;

    if (pacman.row === ghost.row && pacman.col === ghost.col) {
      setState("gameover");
      return;
    }

    if (pelletsLeft === 0) {
      setState("win");
      return;
    }
  }, [pacman, ghost, pelletsLeft, state]);

  const totalSpecials = SPECIAL_INFOS.length;
  const eatenCount = SPECIAL_INFOS.filter((s) => eatenSpecials[s.id]).length;

  return (
    <div className="pac-container">
      <div className="pac-header">
        <h2>Pac-Man &amp; les géants du numérique</h2>
        <p>
          Utilise les flèches du clavier pour déplacer Pac-Man. Mange les
          pastilles et les logos rouges des grandes plateformes pour découvrir
          des alternatives plus libres et durables.
        </p>
        <div className="pac-info">
          <span>Score : {score}</span>
          <span>Pastilles : {pelletsLeft}</span>
          <span>
            Géants mangés : {eatenCount} / {totalSpecials}
          </span>
        </div>
      </div>

      <div className="pac-layout">
        {/* Plateau du jeu */}
        <div className="pac-board-wrapper">
          <div
            className={
              "pac-board" +
              (state !== "running" ? " pac-board-dimmed" : "")
            }
          >
            {level.map((row, r) => (
              <div key={r} className="pac-row">
                {row.map((tile, c) => {
                  const isPac = pacman.row === r && pacman.col === c;
                  const isGhost = ghost.row === r && ghost.col === c;
                  const key = posKey(r, c);
                    const specialId = specialCells[key];

                    const classes = ["pac-cell"];

                    if (tile === "wall") classes.push("pac-wall");
                    if (tile === "pellet") classes.push("pac-pellet");
                    if (specialId) {
                    classes.push("pac-special-cell", `pac-special-${specialId}`);
                    }
                    if (isPac) classes.push("pac-pacman");
                    if (isGhost) classes.push("pac-ghost");

                  return <div key={c} className={classes.join(" ")} />;
                })}
              </div>
            ))}
          </div>

          {state !== "running" && (
            <div className="pac-overlay">
              {state === "win" ? (
                <h3>🎉 Bravo, tu as tout mangé !</h3>
              ) : (
                <h3>👻 Game Over</h3>
              )}
              <button onClick={resetGame}>Rejouer</button>
            </div>
          )}
        </div>

        {/* Panneau à droite : textes & alternatives */}
        <aside className="pac-side">
          <h3>Géants & alternatives</h3>
          <p className="pac-side-intro">
            Les symboles rouges dans le labyrinthe représentent des géants du
            numérique renommés. Quand Pac-Man en mange un, tu découvres des
            pistes pour t&apos;en rendre moins dépendant·e.
          </p>

          <ul className="pac-side-list">
            {SPECIAL_INFOS.map((s) => (
              <li
                key={s.id}
                className={
                  "pac-side-item" +
                  (eatenSpecials[s.id] ? " pac-side-item-eaten" : "")
                }
              >
                <div className="pac-side-item-main">
                  <span className="pac-side-name">{s.displayName}</span>
                  <span className="pac-side-type">{s.type}</span>
                </div>
                {eatenSpecials[s.id] && (
                  <span className="pac-side-check">✓</span>
                )}
              </li>
            ))}
          </ul>

          {lastEaten && (
            <div className="pac-side-detail">
              <h4>{SPECIAL_BY_ID[lastEaten].displayName}</h4>
              <p>{SPECIAL_BY_ID[lastEaten].description}</p>
              <p className="pac-side-alt-title">
                À la place, tu peux explorer :
              </p>
              <ul>
                {SPECIAL_BY_ID[lastEaten].alternatives.map((alt, i) => (
                  <li key={i}>{alt}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
