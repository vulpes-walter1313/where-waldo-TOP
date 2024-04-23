import React, { useState } from "react";
import ScoreBoard from "./ScoreBoard";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchGameStats } from "../lib/queryfunctions";

type RecordScoreProps = {
  gameSelected: "waldo-1" | "waldo-2";
};

function RecordScore({ gameSelected }: RecordScoreProps) {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const gameStatsQuery = useQuery({
    queryKey: ["gamestats"],
    queryFn: fetchGameStats,
  });

  const scoreMutation = useMutation({
    mutationFn: async () => {
      const rawRes = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_BE_PROD_ADDR
            : import.meta.env.VITE_BE_DEV_ADDR
        }/scoreboard`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          body: JSON.stringify({ username: username }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await rawRes.json();
      if (res.success) {
        return res;
      } else {
        throw new Error("Error occured in trying to add new score");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scores", gameSelected] });
      queryClient.invalidateQueries({ queryKey: ["gamestats"] });
    },
  });

  return (
    <div className="mx-auto my-8 flex flex-col items-center">
      <h3 className="text-xl text-slate-100">You're in the Top Ten!</h3>
      {gameStatsQuery.data && gameStatsQuery.data.scoreSubmitted ? (
        <div className="mt-4 flex flex-col items-center gap-4">
          <div>
            <ScoreBoard gameSelected={gameSelected} />
          </div>
          <a
            href="/"
            className="rounded-md bg-slate-100 py-1 px-4 text-slate-800"
          >
            Play Again
          </a>
        </div>
      ) : null}
      {scoreMutation.isLoading ? <p>Score is being submitted...</p> : null}
      {gameStatsQuery.data && gameStatsQuery.data.scoreSubmitted === false ? (
        <div>
          <p className="capitalize text-slate-100">
            Enter a name to submit your score!
          </p>
          <div className="my-4 flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md border border-neutral-900 bg-slate-200 p-2 text-slate-800"
            />
            <button
              type="button"
              className="rounded-sm bg-zinc-100 py-2 px-4 text-zinc-800"
              onClick={() => scoreMutation.mutate()}
            >
              Submit
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RecordScore;
