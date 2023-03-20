import React from "react";

type GameStatsProps = {
  lastTimeScore: number;
};

function GameStats({ lastTimeScore }: GameStatsProps) {
  return (
    <div className="border border-red-500 w-3/4 my-0 mx-auto">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl">Time:</h2>
        <p>Your time {lastTimeScore} seconds!</p>
      </div>
    </div>
  );
}

export default GameStats;
