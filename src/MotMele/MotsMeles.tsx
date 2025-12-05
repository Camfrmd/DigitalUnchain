import { useState } from "react";
import "./motsmeles.css";

type Word = {
  id: string;
  label: string;   // texte affiché dans la liste
  pattern: string; // forme dans la grille (sans accents, en majuscules, sans espaces)
};

// Liste des mots liés au numérique
const WORDS: Word[] = [
  { id: "linux", label: "LINUX", pattern: "LINUX" },
  { id: "libre", label: "LIBRE (logiciel libre)", pattern: "LIBRE" },
  { id: "donnees", label: "DONNÉES", pattern: "DONNEES" },
  { id: "cloud", label: "CLOUD", pattern: "CLOUD" },
  { id: "code", label: "CODE", pattern: "CODE" },
  { id: "ethique", label: "ÉTHIQUE", pattern: "ETHIQUE" },
  { id: "vieprivee", label: "VIE PRIVÉE", pattern: "VIEPRIVEE" },
  { id: "serveur", label: "SERVEUR", pattern: "SERVEUR" },
  { id: "firefox", label: "FIREFOX", pattern: "FIREFOX" },
  { id: "backup", label: "BACKUP (sauvegarde)", pattern: "BACKUP" },
];

// Grille 12x12 : les mots sont cachés horizontalement
const GRID: string[][] = [
  ["L", "I", "N", "U", "X", "A", "B", "C", "D", "E", "F", "G"], // LINUX
  ["H", "L", "I", "B", "R", "E", "J", "K", "L", "M", "N", "O"], // LIBRE
  ["P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A"],
  ["D", "O", "N", "N", "E", "E", "S", "B", "C", "D", "E", "F"], // DONNEES
  ["C", "L", "O", "U", "D", "G", "H", "I", "J", "K", "L", "M"], // CLOUD
  ["C", "O", "D", "E", "N", "O", "P", "Q", "R", "S", "T", "U"], // CODE
  ["E", "T", "H", "I", "Q", "U", "E", "A", "B", "C", "D", "E"], // ETHIQUE
  ["V", "I", "E", "P", "R", "I", "V", "E", "E", "F", "G", "H"], // VIEPRIVEE
  ["S", "E", "R", "V", "E", "U", "R", "A", "B", "C", "D", "E"], // SERVEUR
  ["F", "I", "R", "E", "F", "O", "X", "G", "H", "I", "J", "K"], // FIREFOX
  ["B", "A", "C", "K", "U", "P", "C", "D", "E", "F", "G", "H"], // BACKUP
  ["I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
];

type CellPos = { row: number; col: number };

const posKey = (r: number, c: number) => `${r}-${c}`;

export default function MotsMelesNumerique() {
  // mots trouvés (pour la liste)
  const [foundWords, setFoundWords] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(WORDS.map((w) => [w.id, false]))
  );

  // cases appartenant à des mots trouvés (pour surlignage persistant dans la grille)
  const [foundCells, setFoundCells] = useState<Record<string, boolean>>({});

  // sélection en cours (drag)
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<CellPos[]>([]);

  const total = WORDS.length;
  const foundCount = Object.values(foundWords).filter(Boolean).length;

  const startSelection = (row: number, col: number) => {
    setIsSelecting(true);
    setSelection([{ row, col }]);
  };

  const extendSelection = (row: number, col: number) => {
    if (!isSelecting) return;
    setSelection((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.row === row && last.col === col) return prev;
      return [...prev, { row, col }];
    });
  };

  const endSelection = () => {
    if (!isSelecting || selection.length === 0) {
      setIsSelecting(false);
      setSelection([]);
      return;
    }

    const letters = selection.map((p) => GRID[p.row][p.col]).join("");
    const reversed = letters.split("").reverse().join("");

    const match = WORDS.find(
      (w) => w.pattern === letters || w.pattern === reversed
    );

    if (match) {
      // 1) On marque le mot comme trouvé dans la liste
      setFoundWords((prev) => ({ ...prev, [match.id]: true }));

      // 2) On surligne définitivement les cases de ce mot dans la grille
      setFoundCells((prev) => {
        const updated = { ...prev };
        for (const p of selection) {
          updated[posKey(p.row, p.col)] = true;
        }
        return updated;
      });
    }

    setIsSelecting(false);
    setSelection([]);
  };

  const isCellSelected = (row: number, col: number) =>
    selection.some((p) => p.row === row && p.col === col);

  const isCellFound = (row: number, col: number) =>
    !!foundCells[posKey(row, col)];

  return (
    <div className="mm-container">
      <div className="mm-header">
        <h2>Mots mêlés &quot;Numérique&quot;</h2>
        <p>
          Clique sur une lettre, maintiens le clic et fais glisser pour
          surligner un mot dans la grille. S&apos;il fait partie de la liste,
          il restera surligné et sera coché automatiquement.
        </p>
        <p className="mm-progress">
          Mots trouvés : <strong>{foundCount}</strong> / {total}
        </p>
      </div>

      <div className="mm-layout">
        {/* Grille */}
        <div
          className="mm-grid"
          onMouseLeave={endSelection}
          onMouseUp={endSelection}
        >
          {GRID.map((row, rowIndex) => (
            <div key={rowIndex} className="mm-row">
              {row.map((cell, colIndex) => {
                const selected = isCellSelected(rowIndex, colIndex);
                const found = isCellFound(rowIndex, colIndex);

                const classes = [
                  "mm-cell",
                  selected ? "mm-cell-selected" : "",
                  found ? "mm-cell-found" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <span
                    key={colIndex}
                    className={classes}
                    onMouseDown={() => startSelection(rowIndex, colIndex)}
                    onMouseEnter={() => extendSelection(rowIndex, colIndex)}
                  >
                    {cell}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Liste des mots */}
        <div className="mm-word-panel">
          <h3>Mots à retrouver</h3>
          <p className="mm-help">
            Dès qu&apos;un mot est correctement surligné dans la grille, il
            apparaît comme trouvé dans cette liste.
          </p>

          <ul className="mm-word-list">
            {WORDS.map((word) => (
              <li key={word.id}>
                <div
                  className={
                    "mm-word-tag" +
                    (foundWords[word.id] ? " mm-word-tag-found" : "")
                  }
                >
                  <span>{word.label}</span>
                  {foundWords[word.id] && (
                    <span className="mm-word-check">✓</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {foundCount === total && (
            <div className="mm-complete">
              🎉 Bravo ! Tu as retrouvé tous les mots liés au numérique.  
              Tu peux maintenant aller plus loin avec les thématiques :
              <br />
              <strong>Numérique, Inclusif, Responsable, Durable.</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
