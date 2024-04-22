import React from "react";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import { fetchScores } from "../lib/queryfunctions";

type ScoreBoardProps = {
  gameSelected: "waldo-1" | "waldo-2";
  className?: string;
};

function ScoreBoard({ gameSelected, className }: ScoreBoardProps) {
  const scoresQuery = useQuery({
    queryKey: ["scores", gameSelected],
    queryFn: async () => {
      const data = await fetchScores(gameSelected);
      return data;
    },
  });

  const containerStyles = "bg-slate-700 px-8 py-4 rounded-md";
  const styles = twMerge(containerStyles, `${className ? className : ""}`);

  return (
    <div className={styles}>
      <p className="mb-2 text-lg text-slate-50">
        {gameSelected === "waldo-1" ? "Top Scores - Easy" : "Top Scores - Hard"}
      </p>
      <hr className="mb-2 border-slate-50" />
      <ol className="list-inside list-decimal text-slate-50">
        {scoresQuery.data &&
          scoresQuery.data.topScores.map(
            (score: { _id: string; username: string; scoreMillis: number }) => (
              <li key={score._id}>
                {score.username} - {(score.scoreMillis / 1000).toString()}s
              </li>
            )
          )}
      </ol>
    </div>
  );
}

export default ScoreBoard;
