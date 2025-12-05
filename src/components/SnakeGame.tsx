import { useEffect, useMemo, useState } from "react";

type Cell = {
  x: number;
  y: number;
};

const GRID_SIZE = 16;
const INITIAL_SNAKE: Cell[] = [
  { x: 7, y: 8 },
  { x: 6, y: 8 },
  { x: 5, y: 8 },
];

const createFoodCell = (snake: Cell[]): Cell => {
  const used = new Set(snake.map((cell) => `${cell.x}-${cell.y}`));
  let candidate: Cell;
  do {
    candidate = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (used.has(`${candidate.x}-${candidate.y}`));
  return candidate;
};

const SnakeGame = () => {
  const [snake, setSnake] = useState<Cell[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Cell>({ x: 1, y: 0 });
  const [food, setFood] = useState<Cell>(() => createFoodCell(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);

  const grid = useMemo(() => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => ({
      x: index % GRID_SIZE,
      y: Math.floor(index / GRID_SIZE),
    }));
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
        case "z":
        case "Z":
          event.preventDefault();
          if (direction.y === 1) return;
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          event.preventDefault();
          if (direction.y === -1) return;
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "q":
        case "Q":
        case "a":
        case "A":
          event.preventDefault();
          if (direction.x === 1) return;
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          event.preventDefault();
          if (direction.x === -1) return;
          setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) {
      return;
    }
    const move = () => {
      setSnake((previous) => {
        const head = previous[0];
        const nextHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        // Check wall collision
        if (nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE) {
          setGameOver(true);
          return previous;
        }

        // Check self collision
        const collided = previous.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);
        if (collided) {
          setGameOver(true);
          return previous;
        }

        const ateFood = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = [nextHead, ...previous];
        if (!ateFood) {
          nextSnake.pop();
        }
        if (ateFood) {
          setFood(createFoodCell(nextSnake));
          setScore((value) => value + 1);
          setSpeed((value) => Math.max(70, value - 8));
        }

        return nextSnake;
      });
    };

    const timer = setInterval(move, speed);
    return () => clearInterval(timer);
  }, [direction, food, gameOver, speed]);

  const restart = () => {
    setSnake(INITIAL_SNAKE);
    setDirection({ x: 1, y: 0 });
    setFood(createFoodCell(INITIAL_SNAKE));
    setScore(0);
    setSpeed(200);
    setGameOver(false);
  };

  return (
    <div className="snake-game">
      <div className="snake-meta">
        <span>Score: {score}</span>
        <button type="button" onClick={restart}>
          {gameOver ? "Rejouer" : "Redémarrer"}
        </button>
      </div>
      <div className="snake-grid" role="presentation">
        {grid.map((cell) => {
          const isHead = snake[0].x === cell.x && snake[0].y === cell.y;
          const isBody = snake.some((segment, index) => index !== 0 && segment.x === cell.x && segment.y === cell.y);
          const isFood = food.x === cell.x && food.y === cell.y;

          const classNames = ["snake-cell"];
          if (isBody) {
            classNames.push("snake-body");
          }
          if (isHead) {
            classNames.push("snake-head");
          }
          if (isFood) {
            classNames.push("snake-food");
          }

          return <div key={`${cell.x}-${cell.y}`} className={classNames.join(" ")} />;
        })}
      </div>
      {gameOver && <p className="snake-message">Game Over !</p>}
    </div>
  );
};

export default SnakeGame;
