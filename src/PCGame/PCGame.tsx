// src/PCGame.tsx
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./DragItem";
import PCImage from "./PCImage";
import { components } from "./pcComponents";
import Confetti from "react-confetti";

// Hook maison pour récupérer la taille de la fenêtre (pas besoin de react-use)
import { useEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

const PCGame = () => {
  const [matches, setMatches] = useState<Record<string, string>>({});

  const handleDrop = (zoneId: string, labelId: string) => {
    setMatches((prev) => ({ ...prev, [zoneId]: labelId }));
  };

  const correctlyPlacedIds = Object.keys(matches).filter(
    (zoneId) => matches[zoneId] === zoneId
  );

  const draggableComponents = components.filter(
    (c) => !correctlyPlacedIds.includes(c.id)
  );

  const allCorrect = components.every(c => matches[c.id] === c.id);
  const { width, height } = useWindowSize();

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "20px", position: "relative" }}>
        {/* Étiquettes à gauche */}
        <div>
          <h3 style={{ color: "white" }}>Étiquettes à placer :</h3>
          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "200px", color: "white" }}>
            {draggableComponents.map((c) => (
              <DragItem key={c.id} id={c.id} label={c.label} />
            ))}
          </div>
        </div>

        {/* Image PC */}
        <PCImage onDrop={handleDrop} matches={matches} />

        {/* Feedback */}
        <div style={{ color: "white" }}>
          <h3>Résultats :</h3>
          {components.map((c) => (
            <div key={c.id}>
              •{c.label}:{" "}
              {matches[c.id] === c.id ? "✅" : matches[c.id] ? "❌" : "⏳"}
            </div>
          ))}
        </div>

        {/* Confettis et message gagné */}
        {allCorrect && (
          <>
            <Confetti width={width} height={height} />
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                color: "yellow",
                fontWeight: "bold",
                textAlign: "center",
                textShadow: "2px 2px 10px black",
                zIndex: 1000,
              }}
            >
              🎉 Gagné ! Tu as passé le cap du reconditionnement 🎉
            </div>
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default PCGame;
