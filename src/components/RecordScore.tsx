import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../lib/firebase";

type RecordScoreProps = {
  lastTimeScore: number;
  scoreToDeleteId?: string | null;
  gameSelected: "waldo-1" | "waldo-2";
};
function RecordScore({
  lastTimeScore,
  scoreToDeleteId,
  gameSelected,
}: RecordScoreProps) {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const scoreBoardName = `top-scores-${
    gameSelected === "waldo-1" ? "easy" : "hard"
  }`;

  async function recordScore(
    lastTimeScore: number,
    scoreToDeleteId: string | null | undefined
  ) {
    if (scoreToDeleteId == null) {
      // addDoc
      const newScoreRef = await addDoc(collection(firestore, scoreBoardName), {
        score: lastTimeScore,
        username: username,
      });
      console.log(newScoreRef.id);
    } else {
      // delete the score to be deleted
      await deleteDoc(doc(firestore, scoreBoardName, scoreToDeleteId));
      // addDoc with new score
      const newScoreRef = await addDoc(collection(firestore, scoreBoardName), {
        score: lastTimeScore,
        username: username,
      });
      console.log(`Added score to ${newScoreRef.id}`);
    }
    setSubmitted(true);
  }
  return (
    <div className="mx-auto my-8 flex flex-col items-center">
      <h3 className="text-xl text-slate-100">You're in the Top Ten!</h3>
      {submitted ? (
        <a href="/">Play Again</a>
      ) : (
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
              onClick={() => recordScore(lastTimeScore, scoreToDeleteId)}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordScore;
