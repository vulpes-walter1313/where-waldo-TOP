import React from "react";

type GameStartProps = {
  setGameSelected: React.Dispatch<React.SetStateAction<string>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

function GameStart({ setGameSelected, setGameStarted }: GameStartProps) {
  return (
    <div>
      <div className="mx-auto flex w-3/5 flex-col items-center rounded-md bg-slate-600 p-8 text-slate-50">
        <p className="mb-4">Choose a game!</p>
        <div className="flex gap-8">
          <button
            className="rounded-full bg-slate-400 px-8 py-2 text-lg font-bold"
            onClick={() => {
              setGameSelected("waldo-1");
              setGameStarted(true);
            }}
          >
            Easy
          </button>
          <button
            className="rounded-full bg-slate-400 px-8 py-2 text-lg font-bold"
            onClick={() => {
              setGameSelected("waldo-2");
              setGameStarted(true);
            }}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameStart;
