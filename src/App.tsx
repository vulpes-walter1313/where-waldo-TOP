import { useState } from "react";
import Gameboard from "./components/Gameboard";
import GameStart from "./components/GameStart";
import GameStats from "./components/GameStats";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSelected, setGameSelected] = useState("");
  const [gameEnded, setGameEnded] = useState(false);

  return (
    <div className="min-h-screen bg-slate-800 p-8">
      <header className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-slate-50">Where's Waldo?</h1>
        <p className="text-slate-100">
          Made by Vosram as a practice from{" "}
          <a
            href="https://www.theodinproject.com"
            rel="noreferrer"
            className="text-amber-500 underline"
            target="_blank"
          >
            The Odin Project
          </a>
        </p>
        <p className="mb-8 mt-4 max-w-sm rounded-md bg-slate-600 py-2 text-center text-lg text-slate-50">
          The game is simple. Can you find both Waldo and the Wizard in the
          images?
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
          />
        )}
        {gameSelected && gameEnded && (
          <GameStats
            gameSelected={gameSelected as "waldo-1" | "waldo-2"}
          />
        )}
      </main>
    </div>
  );
}

export default App;
