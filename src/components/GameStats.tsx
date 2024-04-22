import React from "react";
import RecordScore from "./RecordScore";
import { useQuery } from "@tanstack/react-query";
import { fetchGameStats } from "../lib/queryfunctions";

type GameStatsProps = {
  gameSelected: "waldo-1" | "waldo-2";
};

function GameStats({ gameSelected }: GameStatsProps) {
  const gameStatsQuery = useQuery({
    queryKey: ["gamestats"],
    queryFn: fetchGameStats,
  });

  return (
    <div className="mx-auto w-[35rem] rounded-md bg-slate-600 p-8">
      {gameStatsQuery.isLoading ? <p>Loading game stats...</p> : null}
      {gameStatsQuery.isError ? <p>There was an error fetching data</p> : null}
      {gameStatsQuery.data && gameStatsQuery.status === "success" ? (
        <div className="flex flex-col items-center text-slate-100">
          <p className="text-4xl">
            Your time {(gameStatsQuery.data.score / 1000).toString()} seconds!
          </p>
        </div>
      ) : null}
      {gameStatsQuery.data && gameStatsQuery.data.isTopScore && (
        <RecordScore gameSelected={gameSelected} />
      )}
    </div>
  );
}

export default GameStats;
