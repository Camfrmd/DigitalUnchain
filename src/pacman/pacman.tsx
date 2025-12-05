import { useEffect, useState } from "react";
import "./pacman.css";

type Pos = { row: number; col: number };
type Tile = "wall" | "pellet" | "empty";
type GameState = "running" | "win" | "gameover";

const LEVEL_LAYOUT = [
  "###############",
  "#.............#",
  "#.###.###.###.#",
  "#.............#",
  "#.###.#.#.###.#",
  "#.....#.#.....#",
  "###.#.#.#.#.###",
  "#...#.....#...#",
  "#.#.###.###.#.#",
  "#.............#",
  "###############",
];

const ROWS = LEVEL_LAYOUT.length;
const COLS = LEVEL_LAYOUT[0].length;

function parseLevel(): Tile[][] {
  return LEVEL_LAYOUT.map((row) =>
    row.split("").map((c) => {
      if (c === "#") return "wall";
      if (c === ".") return "pellet";
      return "empty";
    })
  );
}

function isWall(level: Tile[][], pos: Pos) {
  if (pos.row < 0 || pos.row >= ROWS) return true;
  // wrap horizontal
  if (pos.col < 0 || pos.col >= COLS) return true;
  return level[pos.row][pos.col] === "wall";
}

export default function Pacman() {
  const [level, setLevel] = useState<Tile[][]>(() => parseLevel());
  const [pacman, setPacman] = useState<Pos>({ row: 1, col: 1 });
  const [ghost, setGhost] = useState<Pos>({ row: 8, col: 13 });
  const [score, setScore] = useState(0);
  const [pelletsLeft, setPelletsLeft] = useState<number>(() =>
    parseLevel()
      .flat()
      .filter((t) => t === "pellet").length
  );
  const [state, setState] = useState<GameState>("running");

  // Réinitialiser tout proprement
  const resetGame = () => {
    const parsed = parseLevel();
    setLevel(parsed);
    setPacman({ row: 1, col: 1 });
    setGhost({ row: 8, col: 13 });
    setScore(0);
    setPelletsLeft(
      parsed.flat().filter((t) => t === "pellet").length
    );
    setState("running");
  };

  // Gestion des déplacements clavier (version robuste : tout se base sur l'état précédent)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state !== "running") return;

      let dir: Pos | null = null;
      if (e.key === "ArrowUp") dir = { row: -1, col: 0 };
      if (e.key === "ArrowDown") dir = { row: 1, col: 0 };
      if (e.key === "ArrowLeft") dir = { row: 0, col: -1 };
      if (e.key === "ArrowRight") dir = { row: 0, col: 1 };
      if (!dir) return;

      setPacman((prevPac) => {
        // calcul du prochain mouvement à partir de l'ancien état
        let next: Pos = {
          row: prevPac.row + dir!.row,
          col: prevPac.col + dir!.col,
        };

        // wrap horizontal
        if (next.col < 0) next.col = COLS - 1;
        if (next.col >= COLS) next.col = 0;

        // on lit le level actuel à l'intérieur du setLevel, pas via un vieux "level" capturé
        setLevel((prevLevel) => {
          if (isWall(prevLevel, next)) {
            // mur → ne pas bouger, ne pas manger
            return prevLevel;
          }

          const copy = prevLevel.map((row) => [...row]);
          if (copy[next.row][next.col] === "pellet") {
            copy[next.row][next.col] = "empty"; // 🔴 important : on enlève la pastille
            setScore((s) => s + 10);
            setPelletsLeft((p) => p - 1);
          }
          return copy;
        });

        // Si c'est un mur, on ne bouge pas Pacman
        // (on re-check ici en lisant le level "actuel")
        if (isWall(level, next)) {
          return prevPac;
        }

        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, level]); // level est juste utilisé pour le check mur, pas pour les pastilles

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
        const candidates = dirs
          .map((d) => ({ row: prev.row + d.row, col: prev.col + d.col }))
          .filter((p) => !isWall(level, p));

        if (candidates.length === 0) return prev;
        return candidates[Math.floor(Math.random() * candidates.length)];
      });
    }, 300);

    return () => clearInterval(interval);
  }, [state, level]);

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

  return (
    <div className="pac-container">
      <div className="pac-header">
        <h2>Mini Pac-Man numérique</h2>
        <p>
          Utilise les flèches du clavier pour déplacer Pac-Man et manger toutes
          les pastilles. Attention au fantôme !
        </p>
        <div className="pac-info">
          <span>Score : {score}</span>
          <span>Pastilles : {pelletsLeft}</span>
        </div>
      </div>

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
                const classes = ["pac-cell"];

                if (tile === "wall") classes.push("pac-wall");
                if (tile === "pellet") classes.push("pac-pellet");
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
    </div>
  );
}
