// src/DropZone.tsx
import type { FC, Ref } from "react";
import { useDrop } from "react-dnd";

interface DropZoneProps {
  id: string;
  onDrop: (zoneId: string, labelId: string) => void;
  // Nous n'utilisons plus 'style' ici, mais nous créons un style de point
  x: number;
  y: number;
  isMatched: boolean; // Pour afficher en vert/rouge une fois trouvé
}

const DropZone: FC<DropZoneProps> = ({ id, onDrop, x, y, isMatched }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component-label",
    drop: (item: { id: string }) => onDrop(id, item.id),
    collect: (monitor: { isOver: () => any; }) => ({ isOver: monitor.isOver() }),
  }));

  // Styles pour le point de repère
  const size = 30; // Taille du cercle de la zone de chute
  const color = isMatched ? "lime" : isOver ? "yellow" : "rgba(255, 255, 255, 0.4)";

  return (
    <div
      ref={drop as unknown as Ref<HTMLDivElement>}
      style={{
        position: "absolute",
        left: `${x - size / 2}px`, // Centrer le cercle sur le point X
        top: `${y - size / 2}px`,  // Centrer le cercle sur le point Y
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: color,
        border: `2px solid ${isOver ? "white" : "transparent"}`,
        transition: "background-color 0.2s",
      }}
    />
  );
};

export default DropZone;