import { useState } from "react";
import Gameboard from "./components/Gameboard";
import GameStart from "./components/GameStart";
import GameStats from "./components/GameStats";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSelected, setGameSelected] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [lastTimeScore, setLastTimeScore] = useState(0);

  return (
    <div className="p-8">
      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Where's Waldo?</h1>
        <p>
          Made by Vosram as a practice from{" "}
          <a href="https://www.theodinproject.com">The Odin Project</a>
        </p>
      </header>
      <main>
        {!gameStarted && !gameEnded && (
          <GameStart
            setGameSelected={setGameSelected}
            setGameStarted={setGameStarted}
          />
        )}
        {gameStarted && !gameEnded && (
          <Gameboard
            gameSelected={gameSelected as "waldo-1" | "waldo-2"}
            setGameEnded={setGameEnded}
            setLastTimeScore={setLastTimeScore}
          />
        )}
        {gameSelected && gameEnded && <GameStats lastTimeScore={lastTimeScore}/>}
      </main>
    </div>
  );
}

export default App;
