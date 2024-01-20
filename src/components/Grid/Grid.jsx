import Node from "../Node/Node.jsx";
import "./Grid.css";
import { Context } from "../Contex/Context.jsx";
import { useContext, useEffect, useState } from "react";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../Algorithm/Algorithm.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let visitedNodesInOrder = [];
let nodesInShortestPathOrder = [];

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const [PRE_START_NODE_ROW, setPre_Start_row] = useState(0);
  const [PRE_START_NODE_COL, setPre_Start_col] = useState(0);
  const [PRE_FINISH_NODE_ROW, setPre_Finish_row] = useState(0);
  const [PRE_FINISH_NODE_COL, setPre_Finish_col] = useState(0);

  const [START_NODE_ROW, setStart_row] = useState(10);
  const [START_NODE_COL, setStart_col] = useState(15);
  const [FINISH_NODE_ROW, setFinish_row] = useState(10);
  const [FINISH_NODE_COL, setFinish_col] = useState(35);

  const [
    Algorithm,
    setAlgorithm,
    Visualize,
    setVisualize,
    clear,
    setClear,
    cursor,
    setCursor,
  ] = useContext(Context);
  // console.log(Algorithm);
  // console.log(Visualize);
  // console.log(clear);

  //useEffect to set the grid
  useEffect(() => {
    const Initialgrid = getInitialGrid(
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    );
    setGrid(Initialgrid);
  }, []);

  useEffect(() => {
    if (Algorithm === "Dijkstra") {
      clearGrid(visitedNodesInOrder, nodesInShortestPathOrder);
      visualizeDijkstra();
    }
  }, [START_NODE_COL, START_NODE_ROW, FINISH_NODE_COL, FINISH_NODE_ROW]);

  //usEffect to clear the grid
  useEffect(() => {
    if (clear) {
      setGrid(
        getInitialGrid(
          START_NODE_ROW,
          START_NODE_COL,
          FINISH_NODE_ROW,
          FINISH_NODE_COL
        )
      );
      clearGrid(visitedNodesInOrder, nodesInShortestPathOrder);
      setAlgorithm(null);
      setClear(false);
    }
  }, [clear]);

  //mouse events
  const handleMouseClicked = (row, col) => {
    if (cursor === "weightCursor") {
      const newGrid = getNewGridWithWeight(
        grid,
        row,
        col,
        START_NODE_ROW,
        START_NODE_COL,
        FINISH_NODE_ROW,
        FINISH_NODE_COL
      );
      setGrid(newGrid);
    } else if (cursor === "startCursor") {
      const newGrid = getNewGridWithNewStart(
        grid,
        row,
        col,
        PRE_START_NODE_COL,
        PRE_START_NODE_ROW
      );
      setGrid(newGrid);
      setStart_row(row);
      setStart_col(col);
    } else if (cursor === "endCursor") {
      const newGrid = getNewGridWithNewFinish(
        grid,
        row,
        col,
        PRE_FINISH_NODE_COL,
        PRE_FINISH_NODE_ROW
      );
      setGrid(newGrid);
      setFinish_row(row);
      setFinish_col(col);
    }
  };

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(
      grid,
      row,
      col,
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    );
    setMouseIsPressed(true);
    setGrid(newGrid);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(
      grid,
      row,
      col,
      START_NODE_ROW,
      START_NODE_COL,
      FINISH_NODE_ROW,
      FINISH_NODE_COL
    );
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  //clear the grid

  const clearGrid = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      if (!node.isWall) {
        const nodeId = `node-${node.row}-${node.col}`;
        document.getElementById(nodeId).className = "node";
      }
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const node = nodesInShortestPathOrder[i];
      if (!node.isWall) {
        const nodeId = `node-${node.row}-${node.col}`;
        document.getElementById(nodeId).className = "node";
      }
    }
    setCursor("Cursor");
  };

  //animate the visited nodes and shortest path
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeId = `node-${node.row}-${node.col}`;
        document.getElementById(nodeId).className = "node node-visited";
      }, 10 * i);
    }
    setTimeout(() => {
      animateShortestPath(nodesInShortestPathOrder);
    }, 10 * visitedNodesInOrder.length);
    if (clear) {
      clearGrid(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    let distance = 0;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const node = nodesInShortestPathOrder[i];
      distance += node.weight;
      setTimeout(() => {
        const nodeId = `node-${node.row}-${node.col}`;
        document.getElementById(nodeId).className = "node node-shortest-path";
      }, 50 * i);
    }
    toast("Total Distance: " + distance + " km");
  };
  //visualize the algorithm
  const visualizeDijkstra = () => {
    const newgrid = grid;
    const startNode = newgrid[START_NODE_ROW][START_NODE_COL];
    const finishNode = newgrid[FINISH_NODE_ROW][FINISH_NODE_COL];
    visitedNodesInOrder = dijkstra(newgrid, startNode, finishNode);
    nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // console.log(nodesInShortestPathOrder);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  if (Visualize) {
    if (Algorithm === "Dijkstra") {
      // clearGrid(visitedNodesInOrder, nodesInShortestPathOrder);
      visualizeDijkstra();
    } else if (Algorithm !== null) {
      toast("Coming Soon!");
    } else {
      toast("Please Select an Algorithm");
    }
    setVisualize(false);
  }

  return (
    <>
      <div className="grid" id={cursor}>
        {grid.map((row, rowIdx) => (
          <div className="node_row" key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall, isWeight, weight } =
                node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  isWeight={isWeight}
                  weight={weight}
                  onMouseClick={(row, col) => handleMouseClicked(row, col)}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseUp={() => handleMouseUp()}
                  setPre_Finish_col={setPre_Finish_col}
                  setPre_Finish_row={setPre_Finish_row}
                  setPre_Start_col={setPre_Start_col}
                  setPre_Start_row={setPre_Start_row}
                  row={row}
                />
              );
            })}
          </div>
        ))}
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default Grid;

const getInitialGrid = (
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL
) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(
        createNode(
          col,
          row,
          START_NODE_ROW,
          START_NODE_COL,
          FINISH_NODE_ROW,
          FINISH_NODE_COL
        )
      );
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (
  col,
  row,
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL
) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWeight: false,
    weight: 1,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (
  grid,
  row,
  col,
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL
) => {
  if (row === START_NODE_ROW && col === START_NODE_COL) return grid;
  if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) return grid;

  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  console.log(newNode);
  return newGrid;
};

const getNewGridWithWeight = (
  grid,
  row,
  col,
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL
) => {
  if (row === START_NODE_ROW && col === START_NODE_COL) return grid;
  if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) return grid;
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const weight = node.weight;
  const newNode = {
    ...node,
    isWeight: true,
    weight: weight + 1,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithNewStart = (
  grid,
  row,
  col,
  PRE_START_NODE_COL,
  PRE_START_NODE_ROW
) => {
  if (row === PRE_START_NODE_ROW && col === PRE_START_NODE_COL) return grid;
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const PreNode = newGrid[PRE_START_NODE_ROW][PRE_START_NODE_COL];
  const newNode = {
    ...node,
    isStart: true,
  };
  const newPreNode = {
    ...PreNode,
    isStart: false,
  };

  newGrid[row][col] = newNode;
  newGrid[PRE_START_NODE_ROW][PRE_START_NODE_COL] = newPreNode;
  return newGrid;
};

const getNewGridWithNewFinish = (
  grid,
  row,
  col,
  PRE_FINISH_NODE_COL,
  PRE_FINISH_NODE_ROW
) => {
  if (row === PRE_FINISH_NODE_ROW && col === PRE_FINISH_NODE_COL) return grid;
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const PreNode = newGrid[PRE_FINISH_NODE_ROW][PRE_FINISH_NODE_COL];
  const newNode = {
    ...node,
    isFinish: true,
  };
  const newPreNode = {
    ...PreNode,
    isFinish: false,
  };
  newGrid[row][col] = newNode;
  newGrid[PRE_FINISH_NODE_ROW][PRE_FINISH_NODE_COL] = newPreNode;
  return newGrid;
};
