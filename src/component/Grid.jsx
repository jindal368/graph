import React, { useEffect, useState } from "react";
import Dfs from "./utils/Dfs";
import "./grid.css";

const Grid = ({ row, col }) => {
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [startRowCol, setStartRowCol] = useState({ rowI: "", colI: "" });
  const [endRowCol, setEndRowCol] = useState({ rowD: "", colD: "" });
  const [path, setPath] = useState([]);
  const [obs, setObs] = useState([]);

  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < row; i++) {
      tempArray.push(i + 1);
    }
    setRows(tempArray);
    tempArray = [];
    for (let i = 0; i < col; i++) {
      tempArray.push(i + 1);
    }
    setCols(tempArray);
  }, [row, col, path]);

  const commandDisplay = () => {
    const { rowI, colI } = startRowCol;
    const { rowD, colD } = endRowCol;

    if (!rowI && !colI) return "Select Starting Block";
    else if (!rowD && !colD) return "Select Ending Block";
    else if (!obs.length) return "Add Multiple Obstacles";
    else
      return (
        <button onClick={() => initDFs([rowI, colI], [rowD, colD])}>
          <span className="bg-yellow-200 p-4 rounded-2xl cursor-pointer hover:bg-yellow-600">
            Click to find Path
          </span>
        </button>
      );
  };

  const setBlocks = ({ row, col }) => {
    const { rowI, colI } = startRowCol;
    const { rowD, colD } = endRowCol;
    let obsArray = [...obs];
    if (!rowI && !colI) setStartRowCol({ rowI: row, colI: col });
    else if (!rowD && !colD) setEndRowCol({ rowD: row, colD: col });
    else {
      const ifAlreadySelected = obsArray.findIndex(
        (ele) => JSON.stringify(ele) === JSON.stringify([row, col])
      );
      if (ifAlreadySelected === -1) {
        obsArray.push([row, col]);
      } else {
        obsArray.splice(ifAlreadySelected, 1);
      }
      setObs(obsArray);
    }
  };

  const showColorGrid = (currentRow, currentCol) => {
    const { rowD, colD } = endRowCol;
    const { rowI, colI } = startRowCol;
    if (currentRow === rowI && currentCol === colI) return "yellow";
    if (currentRow === rowD && currentCol === colD) return "green";
    if (obs.length) {
      for (let ele in obs) {
        if (
          JSON.stringify(obs[ele]) === JSON.stringify([currentRow, currentCol])
        )
          return "red";
      }
    }
    if (path && path.length) {
      for (let ele in path) {
        if (
          JSON.stringify(path[ele]) ===
          JSON.stringify([currentRow - 1, currentCol - 1])
        )
          return "orange";
      }
    }
  };

  const initDFs = (start, end) => {
    // serialize in array
    const pathArray = Dfs(start, end, row, obs);
    setPath(pathArray);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-center mt-4 space-x-2 m-4s h-full">
        {cols.map((col, index) => {
          return (
            <div key={index} className="h-16 w-16  border-black">
              {rows.map((row, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setBlocks({ row, col })}
                    style={{
                      backgroundColor: showColorGrid(row, col),
                      animation:
                        showColorGrid(row, col) === "orange" &&
                        "fadeIn 0.5s forwards",
                      transition: "background-color 0.5s ease-in-out",
                    }}
                    className="h-16 w-16 border-black bg-sky-400 p-4 m-4"
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      {/* hefe we weill show commands  */}
      <div className="flex flex-1 justify-between align-middle -mt-80">
        <h1 className="text-center max-w-fit max-h-fit m-auto font-bold text-xl ">
          {commandDisplay()}
        </h1>
      </div>
    </div>
  );
};

export default Grid;
