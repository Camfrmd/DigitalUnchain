// src/PCGame.tsx
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./DragItem";
import PCImage from "./PCImage";
import { components } from "./pcComponents";

const PCGame = () => {
  // matches: { [zoneId: string]: labelId }
  const [matches, setMatches] = useState<Record<string, string>>({});

  const handleDrop = (zoneId: string, labelId: string) => {
    // La zone de chute (zoneId) reçoit l'étiquette (labelId)
    setMatches((prev) => ({ ...prev, [zoneId]: labelId }));
  };

  // Liste des IDs des étiquettes qui ont déjà été correctement placées
  const correctlyPlacedIds = Object.keys(matches).filter(
    (zoneId) => matches[zoneId] === zoneId
  );
  
  // Les étiquettes non encore correctement placées restent dans la liste
  const draggableComponents = components.filter(
    (c) => !correctlyPlacedIds.includes(c.id)
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Étiquettes à gauche : Seulement celles qui n'ont pas encore été correctement placées */}
        <div>
          <h3>Étiquettes à placer :</h3>
          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "200px" }}>
            {draggableComponents.map((c) => (
              <DragItem key={c.id} id={c.id} label={c.label} />
            ))}
          </div>
        </div>

        {/* Image PC */}
        <PCImage onDrop={handleDrop} matches={matches} />

        {/* Feedback */}
        <div>
          <h3>Résultats :</h3>
          {components.map((c) => (
            <div key={c.id}>
              •{c.label}:{" "}
              {matches[c.id] === c.id
                ? "✅​"
                : matches[c.id]
                ? `❌`
                : "⏳​"}
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default PCGame;