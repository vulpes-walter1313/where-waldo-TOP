import React from 'react';

type GameStartProps = {
  setGameSelected: React.Dispatch<React.SetStateAction<string>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

function GameStart({setGameSelected, setGameStarted}: GameStartProps) {
  return (
    <div>
      <div className='w-3/5 bg-slate-600 rounded-md mx-auto text-slate-50 p-8 flex flex-col items-center'>
        <p className='mb-4'>Choose a game!</p>
        <div className="flex gap-8">
          <button
            className="px-8 py-2 bg-slate-400 rounded-full font-bold text-lg"
            onClick={() => {
              setGameSelected("waldo-1");
              setGameStarted(true);
          }}
          >Easy</button>
          <button
            className="px-8 py-2 bg-slate-400 rounded-full font-bold text-lg"
            onClick={() => {
              setGameSelected("waldo-2");
              setGameStarted(true);
            }}
          >Hard</button>
        </div>
      </div>
    </div>
  )
};

export default GameStart;