import { useState, useEffect } from "react";
import "./motsmeles.css";

type Word = {
  id: string;
  label: string;   // texte affiché dans la liste
  pattern: string; // forme dans la grille (sans accents, en majuscules, sans espaces)
  def: string;    // indice pour aider
};

// Liste des mots liés au numérique
const WORDS: Word[] = [
  { id: "internet", label: "INTERNET", pattern: "INTERNET", def: "Réseau mondial d'ordinateurs" },
  { id: "algorithme", label: "ALGORITHME", pattern: "ALGORITHME", def: "Suite d'instructions pour résoudre un problème" },
  { id: "pixel", label: "PIXEL", pattern: "PIXEL", def: "Plus petit élément d'une image numérique" },
  { id: "cryptage", label: "CRYPTAGE", pattern: "CRYPTAGE", def: "Chiffrement de données pour les protéger" },
  { id: "reseau", label: "RÉSEAU", pattern: "RESEAU", def: "Ensemble d'ordinateurs connectés" },
  { id: "logiciel", label: "LOGICIEL", pattern: "LOGICIEL", def: "Programme informatique" },
  { id: "numerique", label: "NUMÉRIQUE", pattern: "NUMERIQUE", def: "Relatif aux technologies digitales" },
  { id: "securite", label: "SÉCURITÉ", pattern: "SECURITE", def: "Protection des systèmes informatiques" },
  { id: "wifi", label: "WIFI", pattern: "WIFI", def: "Connexion internet sans fil" },
  { id: "opensource", label: "OPEN SOURCE", pattern: "OPENSOURCE", def: "Code source accessible à tous" },
];

const GRID_SIZE = 12;

// Directions: horizontal, vertical, diagonal (8 directions)
const DIRECTIONS = [
  { dr: 0, dc: 1 },   // horizontal right
  { dr: 1, dc: 0 },   // vertical down
  { dr: 1, dc: 1 },   // diagonal down-right
  { dr: 1, dc: -1 },  // diagonal down-left
  { dr: 0, dc: -1 },  // horizontal left
  { dr: -1, dc: 0 },  // vertical up
  { dr: -1, dc: -1 }, // diagonal up-left
  { dr: -1, dc: 1 },  // diagonal up-right
];

// Generate a random letter
const randomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
};

// Check if word can be placed at position with direction
const canPlaceWord = (grid: string[][], word: string, row: number, col: number, dir: { dr: number; dc: number }): boolean => {
  for (let i = 0; i < word.length; i++) {
    const r = row + i * dir.dr;
    const c = col + i * dir.dc;
    
    // Out of bounds
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) {
      return false;
    }
    
    // Cell is occupied by a different letter
    if (grid[r][c] !== "" && grid[r][c] !== word[i]) {
      return false;
    }
  }
  return true;
};

// Place word in grid
const placeWord = (grid: string[][], word: string, row: number, col: number, dir: { dr: number; dc: number }): void => {
  for (let i = 0; i < word.length; i++) {
    const r = row + i * dir.dr;
    const c = col + i * dir.dc;
    grid[r][c] = word[i];
  }
};

// Generate word search grid
const generateGrid = (): string[][] => {
  // Initialize empty grid
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => "")
  );

  // Try to place each word
  for (const word of WORDS) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

      if (canPlaceWord(grid, word.pattern, row, col, dir)) {
        placeWord(grid, word.pattern, row, col, dir);
        placed = true;
      }
      attempts++;
    }
  }

  // Fill remaining empty cells with random letters
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = randomLetter();
      }
    }
  }

  return grid;
};

// Generate the grid once
const GRID: string[][] = generateGrid();

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
  
  // Timer
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  
  // Hints
  const [showHints, setShowHints] = useState(false);
  
  // Last found word for animation
  const [lastFoundWord, setLastFoundWord] = useState<string | null>(null);
  
  // Already found word message
  const [alreadyFoundMessage, setAlreadyFoundMessage] = useState<string | null>(null);

  const total = WORDS.length;
  const foundCount = Object.values(foundWords).filter(Boolean).length;
  
  // Timer effect
  useEffect(() => {
    if (isGameComplete) return;
    
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isGameComplete]);
  
  // Check if game is complete
  useEffect(() => {
    if (foundCount === total && foundCount > 0) {
      setIsGameComplete(true);
    }
  }, [foundCount, total]);
  
  // Clear last found word animation after delay
  useEffect(() => {
    if (lastFoundWord) {
      const timer = setTimeout(() => setLastFoundWord(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastFoundWord]);
  
  // Clear already found message after delay
  useEffect(() => {
    if (alreadyFoundMessage) {
      const timer = setTimeout(() => setAlreadyFoundMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alreadyFoundMessage]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startSelection = (row: number, col: number) => {
    setIsSelecting(true);
    setSelection([{ row, col }]);
  };

  const extendSelection = (row: number, col: number) => {
    if (!isSelecting) return;
    setSelection((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.row === row && last.col === col) return prev;
      
      // If this is the first cell, just add it
      if (prev.length === 0) return [{ row, col }];
      
      const first = prev[0];
      
      // If this is the second cell, determine the direction and add it
      if (prev.length === 1) {
        return [...prev, { row, col }];
      }
      
      // For third cell and beyond, constrain to the established line
      const second = prev[1];
      const deltaRow = second.row - first.row;
      const deltaCol = second.col - first.col;
      
      // Normalize direction to -1, 0, or 1
      const dirRow = deltaRow === 0 ? 0 : deltaRow / Math.abs(deltaRow);
      const dirCol = deltaCol === 0 ? 0 : deltaCol / Math.abs(deltaCol);
      
      // Check if the new cell is on the same line
      const expectedRow = last.row + dirRow;
      const expectedCol = last.col + dirCol;
      
      // Only add if it's the next cell in the established direction
      if (row === expectedRow && col === expectedCol) {
        return [...prev, { row, col }];
      }
      
      return prev;
    });
  };

  const endSelection = () => {
    if (!isSelecting || selection.length === 0) {
      setIsSelecting(false);
      setSelection([]);
      return;
    }

    // Get letters from selection in order
    const letters = selection.map((p) => GRID[p.row][p.col]).join("");
    const reversed = letters.split("").reverse().join("");

    // Check if the selected letters match any word (forward or backward)
    const match = WORDS.find(
      (w) => w.pattern === letters || w.pattern === reversed
    );

    if (match) {
      // Check if word was already found
      if (foundWords[match.id]) {
        setAlreadyFoundMessage(match.label);
      } else {
        // Mark word as found
        setFoundWords((prev) => ({ ...prev, [match.id]: true }));

        // Highlight all cells in the selection
        setFoundCells((prev) => {
          const updated = { ...prev };
          for (const p of selection) {
            updated[posKey(p.row, p.col)] = true;
          }
          return updated;
        });
        
        // Show success animation
        setLastFoundWord(match.label);
      }
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
        <div className="mm-stats">
          <p className="mm-progress">
            Mots trouvés : <strong>{foundCount}</strong> / {total}
          </p>
          <p className="mm-timer">
            ⏱️ Temps : <strong>{formatTime(timeElapsed)}</strong>
          </p>
          <button 
            className="mm-hint-button"
            onClick={() => setShowHints(!showHints)}
          >
            {showHints ? '🔍 Masquer' : '📖 Définitions'}
          </button>
        </div>
        {lastFoundWord && (
          <div className="mm-found-animation">
            ✨ {lastFoundWord} trouvé !
          </div>
        )}
        {alreadyFoundMessage && (
          <div className="mm-already-found-animation">
            ⚠️ {alreadyFoundMessage} déjà trouvé !
          </div>
        )}
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
                  <div>
                    <span className="mm-word-label">{word.label}</span>
                    {showHints && !foundWords[word.id] && (
                      <span className="mm-word-hint">{word.def}</span>
                    )}
                  </div>
                  {foundWords[word.id] && (
                    <span className="mm-word-check">✓</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {isGameComplete && (
            <div className="mm-complete">
              <div className="mm-complete-header">🎉 Félicitations !</div>
              <p>Tu as trouvé tous les mots en <strong>{formatTime(timeElapsed)}</strong> !</p>
              <p className="mm-complete-message">
                Tu peux maintenant explorer les thématiques :
                <br />
                <strong>Numérique, Inclusif, Responsable, Durable.</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}