import type { FC, Ref } from "react";
import { useDrag } from "react-dnd";

interface DragItemProps {
  id: string;
  label: string;
}

const DragItem: FC<DragItemProps> = ({ id, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component-label",
    item: { id },
    collect: (monitor: { isDragging: () => any; }) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as Ref<HTMLDivElement>}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: "rgba(10, 132, 255, 0.4)",
        borderRadius: "4px",
        cursor: "grab",
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      {label}
    </div>
  );
};

export default DragItem;
