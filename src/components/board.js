import React from "react";
import Cell from "./cell.js";
import { useState, useEffect } from "react";

const Board = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [gameState, setGameState] = useState("running");
  const [playerTurn, setPlayerTurn] = useState(true);

  useEffect(() => {
    if (game_over(board) !== "running") {
      setGameState(game_over(board));
      return;
    }
    if (!playerTurn) {
      computerMove();
    }
  }, [playerTurn, board]);

  const nextMove = (index, val) => {
    if (val === "X" || val === "O") {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setPlayerTurn(false);
  };

  const computerMove = () => {
    setTimeout(() => {
      const step = minimax(board, 9, true);
      //console.log(step);
      const newBoard = [...board];
      newBoard[step.move] = "O";
      setBoard(newBoard);
      setPlayerTurn(true);
    }, 80);
  };

  const minimax = (board, depth, isComputerTurn) => {
    let score = game_over(board);
    if (score === +1) return { move: -1, score: +1 };
    if (score === -1) return { move: -1, score: -1 };
    if (score === "draw") return { move: -1, score: 0 };
    // return { move: -1, score: isComputerTurn ? -Infinity : +Infinity };
    if (depth === 0)
      return { move: undefined, score: isComputerTurn ? -Infinity : +Infinity };

    let bestMove = undefined;
    let bestScore = isComputerTurn ? -Infinity : +Infinity;

    for (let i = 0; i < 9; i++) {
      if (isComputerTurn) {
        // computer's turn
        if (board[i] === "") {
          board[i] = "O";
          let obj = minimax(board, depth - 1, false);
          board[i] = "";

          if (obj.score > bestScore) {
            bestScore = obj.score;
            bestMove = i;
          }
        }
      } else {
        // player's turn
        if (board[i] === "") {
          board[i] = "X";
          let obj = minimax(board, depth - 1, true);
          board[i] = "";

          if (obj.score < bestScore) {
            bestScore = obj.score;
            bestMove = i;
          }
        }
      }
    }

    return { move: bestMove, score: bestScore };
  };

  const game_over = (board) => {
    // top-row
    if (board[0] === board[1] && board[1] === board[2]) {
      if (board[0] === "X") return -1;
      if (board[0] === "O") return +1;
    }

    // mid-row
    if (board[3] === board[4] && board[4] === board[5]) {
      if (board[3] === "X") return -1;
      if (board[3] === "O") return +1;
    }

    // last-row
    if (board[6] === board[7] && board[7] === board[8]) {
      if (board[6] === "X") return -1;
      if (board[6] === "O") return +1;
    }

    // left-col
    if (board[0] === board[3] && board[3] === board[6]) {
      if (board[0] === "X") return -1;
      if (board[0] === "O") return +1;
    }

    // mid-col
    if (board[1] === board[4] && board[4] === board[7]) {
      if (board[1] === "X") return -1;
      if (board[1] === "O") return +1;
    }

    // right-col
    if (board[2] === board[5] && board[5] === board[8]) {
      if (board[2] === "X") return -1;
      if (board[2] === "O") return +1;
    }

    // main-diagonal
    if (board[0] === board[4] && board[4] === board[8]) {
      if (board[0] === "X") return -1;
      if (board[0] === "O") return +1;
    }

    // secondary-diagonal
    if (board[2] === board[4] && board[4] === board[6]) {
      if (board[2] === "X") return -1;
      if (board[2] === "O") return +1;
    }

    if (board.every((v) => v === "O" || v === "X")) {
      return "draw";
    }

    return "running";
  };

  const restart = () => {
    setGameState("running");
    setBoard(["", "", "", "", "", "", "", "", ""]);
  };

  return (
    <>
      {/* BOARD */}
      <div className="board">
        {board.map((val, index) => {
          return (
            <Cell key={index} val={val} index={index} nextMove={nextMove} />
          );
        })}
      </div>
      {/* MESSAGE */}
      <div className={"message " + (gameState !== "running" ? "show" : "")}>
        {gameState === "draw" && <p>DRAW</p>}
        {gameState === -1 && <p>Player Wins</p>}
        {gameState === 1 && <p>Computer Wins</p>}
        <button className="ripple" id="restartButton" onClick={restart}>
          Restart
        </button>
      </div>
    </>
  );
};

export default Board;
