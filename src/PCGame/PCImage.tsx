import type { FC } from "react";
import DropZone from "./DropZone";
import { components, type PCComponent } from "./pcComponents";
import pcImage from "../assets/pc-open.png";

interface PCImageProps {
  onDrop: (zoneId: string, labelId: string) => void;
  matches: Record<string, string>;
}

const PCImage: FC<PCImageProps> = ({ onDrop, matches }) => {
  const dropZoneSize = 30; // Taille des DropZones

  return (
    <div style={{ position: "relative", width: "1024px", height: "1024px" }}>
      <img
        src={pcImage}
        alt="PC ouvert"
        style={{ width: "1024px", height: "1024px", display: "block" }}
      />
      {components.map((c: PCComponent) => (
        <DropZone
          key={c.id}
          id={c.id}
          onDrop={onDrop}
          x={c.x}  // Plus besoin de scale
          y={c.y}  // Plus besoin de scale
          isMatched={matches[c.id] === c.id}
        />
      ))}
    </div>
  );
};

export default PCImage;
