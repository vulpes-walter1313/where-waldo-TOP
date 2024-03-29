import React, { useEffect, useState } from "react";
import type { ScoresBoardDataType } from "../types/types";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import useGetScores from "../hooks/useGetScores";

type ScoreBoardProps = {
  scoreBoard: "top-scores-easy" | "top-scores-hard";
  className?: string;
};

function ScoreBoard({ scoreBoard, className }: ScoreBoardProps) {
  const { data, isInitialLoading, isLoading, isError, error } = useGetScores(scoreBoard);
  
  const containerStyles = "bg-slate-700 px-8 py-4 rounded-md";
  const styles = twMerge(containerStyles, `${className ? className : ""}`);

  if (isInitialLoading || isLoading) {
    return <p className="text-slate-50">Loading...</p>;
  }

  if (isError) {
    return (
      <p>
        Error:{" "}
        {error instanceof Error ? error.message : "Some error in React Query"}
      </p>
    );
  }

  return (
    <div className={styles}>
      <p className="mb-2 text-lg text-slate-50">
        {scoreBoard.includes("easy")
          ? "Top Scores - Easy"
          : "Top Scores - Hard"}
      </p>
      <hr className="mb-2 border-slate-50" />
      <ol className="list-inside list-decimal text-slate-50">
        {data
          .sort((a, b) => a.score - b.score)
          .map((score) => (
            <li key={score.score}>
              {score.username} - {score.score}s
            </li>
          ))}
      </ol>
    </div>
  );
}

export default ScoreBoard;
