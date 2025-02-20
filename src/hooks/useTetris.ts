// import { useEffect, useState, useCallback } from 'react';
// import { tetrominoes, upNextTetrominoes, colors, width } from '../utils/tetrominoes';

// export interface GameState {
//   grid: { taken: boolean; colour: string | null }[];
//   score: number;
//   level: number;
//   currentTetromino: number[];
//   currentPosition: number;
//   currentRotation: number;
//   nextTetromino: number[];
//   nextIndex: number;
//   timerId: number | null;
// }

// export const useTetris = () => {
//   const gridSize = 200; // 10 x 20 grid
//   const [grid, setGrid] = useState(
//     Array.from({ length: gridSize }, () => ({ taken: false, colour: null }))
//   );
//   const [score, setScore] = useState(0);
//   const [level, setLevel] = useState(1);
//   const [currentPosition, setCurrentPosition] = useState(4);
//   const [currentRotation, setCurrentRotation] = useState(0);
//   const [currentTetromino, setCurrentTetromino] = useState<number[]>([]);
//   const [nextIndex, setNextIndex] = useState(Math.floor(Math.random() * tetrominoes.length));
//   const [timerId, setTimerId] = useState<number | null>(null);

//   // Initialise current tetromino from tetrominoes array
//   const initTetromino = useCallback(() => {
//     const random = Math.floor(Math.random() * tetrominoes.length);
//     setCurrentTetromino(tetrominoes[random][0]);
//     setCurrentRotation(0);
//     setCurrentPosition(4);
//     setNextIndex(Math.floor(Math.random() * tetrominoes.length));
//   }, []);

//   useEffect(() => {
//     initTetromino();
//   }, [initTetromino]);

//   // Draw a tetromino on the grid
//   const draw = useCallback(
//     (position: number, tetromino: number[], colour: string) => {
//       setGrid((prevGrid) => {
//         const newGrid = [...prevGrid];
//         tetromino.forEach((index) => {
//           const pos = position + index;
//           newGrid[pos] = { taken: newGrid[pos].taken, colour };
//         });
//         return newGrid;
//       });
//     },
//     []
//   );

//   // Undraw: remove tetromino colour from grid
//   const undraw = useCallback(
//     (position: number, tetromino: number[]) => {
//       setGrid((prevGrid) => {
//         const newGrid = [...prevGrid];
//         tetromino.forEach((index) => {
//           const pos = position + index;
//           newGrid[pos] = { taken: newGrid[pos].taken, colour: null };
//         });
//         return newGrid;
//       });
//     },
//     []
//   );

//   // Movement functions & game loop logic
//   const moveDown = useCallback(() => {
//     undraw(currentPosition, currentTetromino);
//     const newPosition = currentPosition + width;
//     setCurrentPosition(newPosition);
//     // Here you would check for collisions and call freeze if needed
//     draw(newPosition, currentTetromino, colors[nextIndex % colors.length]);
//   }, [currentPosition, currentTetromino, undraw, draw, nextIndex]);

//   // freeze: if tetromino reaches bottom or hits another tetromino
//   const freeze = useCallback(() => {
//     // Simple collision detection: check if any cell in grid below is taken.
//     // (For a full game, this logic would be more complete.)
//     const collision = currentTetromino.some((index) => {
//       const pos = currentPosition + index + width;
//       return grid[pos] && grid[pos].taken;
//     });
//     if (collision) {
//       setGrid((prevGrid) => {
//         const newGrid = [...prevGrid];
//         currentTetromino.forEach((index) => {
//           const pos = currentPosition + index;
//           newGrid[pos] = { taken: true, colour: colors[nextIndex % colors.length] };
//         });
//         return newGrid;
//       });
//       initTetromino();
//     }
//   }, [currentTetromino, currentPosition, grid, initTetromino, nextIndex]);

//   // Key Controls: left, right, rotate
//   const moveLeft = useCallback(() => {
//     undraw(currentPosition, currentTetromino);
//     const atLeftEdge = currentTetromino.some((index) => (currentPosition + index) % width === 0);
//     if (!atLeftEdge) {
//       setCurrentPosition((prev) => prev - 1);
//     }
//     draw(currentPosition - 1, currentTetromino, colors[nextIndex % colors.length]);
//   }, [currentPosition, currentTetromino, undraw, draw, nextIndex]);

//   // Similarly add moveRight and rotate functions...

//   // Game Loop Start/Pause
//   const toggleStartPause = useCallback(() => {
//     if (timerId) {
//       clearInterval(timerId);
//       setTimerId(null);
//     } else {
//       const id = window.setInterval(() => {
//         moveDown();
//         freeze();
//       }, 1000);
//       setTimerId(id);
//     }
//   }, [timerId, moveDown, freeze]);

//   return {
//     grid,
//     score,
//     level,
//     currentTetromino,
//     currentPosition,
//     timerId,
//     nextIndex,
//     draw,
//     undraw,
//     moveDown,
//     moveLeft,
//     toggleStartPause,
//     // Other game functions can be added here...
//   };
// };
