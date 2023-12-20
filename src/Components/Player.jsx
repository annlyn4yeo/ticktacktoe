import { useState } from "react";

export default function ({ initialName, symbol, isActive, onNameChange }) {
  const [playerName, setPlayerName] = useState(initialName);

  const [isEditing, setIsediting] = useState(false);

  const handleEdit = () => {
    setIsediting((editing) => !editing);
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  };

  const handleInput = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <>
      <li className={isActive ? "active" : ""}>
        <span className="player">
          {!isEditing && <span className="player-name">{playerName}</span>}
          {isEditing && (
            <input
              type="text"
              required
              value={playerName}
              onChange={handleInput}
            ></input>
          )}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
