import React, { useEffect, useState } from "react";
import { ScoresBoardDataType } from "../types/types";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { twMerge } from "tailwind-merge";

type ScoreBoardProps = {
  scoreBoard: "top-scores-easy" | "top-scores-hard";
  className?: string;
};

function ScoreBoard({scoreBoard, className}: ScoreBoardProps) {
  const [scores, setScores] = useState<ScoresBoardDataType[] | null>(null);
  const containerStyles = "bg-slate-700 px-8 py-4 rounded-md"
  const styles = twMerge(containerStyles, `${containerStyles} ${className}`);
  
  useEffect(() => {
    const getData = async () => {
      const snapshot = await getDocs(collection(firestore, scoreBoard));
      const topTen: ScoresBoardDataType[] = [];
      snapshot.forEach((doc) => topTen.push(doc.data() as ScoresBoardDataType));
      setScores(topTen);
    }
    getData()
  }, [])
  if (scores === null) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles}>
      <p className="text-lg text-slate-50 mb-2">{scoreBoard.includes("easy") ? "Top Scores - Easy" : "Top Scores - Hard"}</p>
      <hr className="border-slate-50 mb-2"/>
      <ol className="list-decimal text-slate-50 list-inside">
        {scores
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
