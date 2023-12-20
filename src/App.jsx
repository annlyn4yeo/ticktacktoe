import { useState } from "react";
import GameBoard from "./Components/Gameboard";
import Player from "./Components/Player";
import Log from "./Components/Log";
import { winning_combos } from "./winning_combinations";
import GameOver from "./Components/GameOver";

const initPlayers = {
  X: "Player One",
  O: "Player Two",
};

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const derivedGameBoard = (gameTurns) => {
  let gameBoardArray = [...initialBoard].map((array) => [...array]);
  for (const turn of gameTurns) {
    const { player, square } = turn;
    const { row, column } = square;
    gameBoardArray[row][column] = player;
  }
  return gameBoardArray;
};

const derivedWinner = (gameBoardArray, players) => {
  let winner;
  for (const combination of winning_combos) {
    const firstSquareSymbol =
      gameBoardArray[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoardArray[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoardArray[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
};

function App() {
  const [players, setPlayers] = useState(initPlayers);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoardArray = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoardArray, players);
  const isdraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, columnIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurn = [
        {
          square: { row: rowIndex, column: columnIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurn;
    });
  };

  const handleRematch = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={initPlayers.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={initPlayers.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || isdraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoardArray} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
