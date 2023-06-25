import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../lib/firebase";
import RecordScore from "./RecordScore";

type GameStatsProps = {
  lastTimeScore: number;
  gameSelected: "waldo-1" | "waldo-2";
};

function GameStats({ lastTimeScore, gameSelected }: GameStatsProps) {
  const [isInTopTen, setIsInTopTen] = useState(false);
  const [scoreToDeleteId, setScoreToDeleteId] = useState<string | null>(null);
  const scoreBoardName = `top-scores-${
    gameSelected === "waldo-1" ? "easy" : "hard"
  }`;

  useEffect(() => {
    async function getScores() {
      const snapshot = await getDocs(collection(firestore, scoreBoardName));
      const topTen: { id: string; score: number; username: string }[] = [];
      snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const { score, username } = doc.data();
        topTen.push({ id: doc.id, score, username });
      });
      // find out how to traverse the docs and find out if lastTimeScore
      // is in top ten.
      console.log(topTen);
      if (topTen.length < 10) {
        setIsInTopTen(true);
      } else {
        topTen.push({
          id: "this-score-id",
          score: lastTimeScore,
          username: "this-user",
        });
        topTen.sort((a, b) => a.score - b.score);
        console.log("top ten with this score in there");
        console.log(topTen);
        if (topTen.findIndex((item) => item.id === "this-score-id") < 10) {
          console.log("this user is in the top 10");
          setIsInTopTen(true);
          setScoreToDeleteId(topTen[10].id);
          console.log(`Score to be deleted is ${topTen[10].id}`);
        } else {
          console.log("this user is not in the top 10");
          setIsInTopTen(false);
        }
      }
    }
    getScores();
  }, []);

  return (
    <div className="mx-auto w-[35rem] bg-slate-600 p-8">
      <div className="flex flex-col items-center text-slate-100">
        <h2 className="text-xl font-bold">Time:</h2>
        <p className="text-lg">Your time {lastTimeScore} seconds!</p>
      </div>
      {isInTopTen && (
        <RecordScore
          lastTimeScore={lastTimeScore}
          scoreToDeleteId={scoreToDeleteId}
          gameSelected={gameSelected}
        />
      )}
    </div>
  );
}

export default GameStats;
