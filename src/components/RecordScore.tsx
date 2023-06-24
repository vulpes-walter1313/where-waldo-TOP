import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../lib/firebase";

type RecordScoreProps = {
  lastTimeScore: number;
  scoreToDeleteId?: string | null;
};
function RecordScore({ lastTimeScore, scoreToDeleteId }: RecordScoreProps) {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function recordScore(
    lastTimeScore: number,
    scoreToDeleteId: string | null | undefined
  ) {
    if (scoreToDeleteId == null) {
      // addDoc
      const newScoreRef = await addDoc(collection(firestore, "top-scores"), {
        score: lastTimeScore,
        username: username,
      });
      console.log(newScoreRef.id);
    } else {
      // delete the score to be deleted
      await deleteDoc(doc(firestore, "top-scores", scoreToDeleteId));
      // addDoc with new score
      const newScoreRef = await addDoc(collection(firestore, "top-scores"), {
        score: lastTimeScore,
        username: username,
      });
      console.log(`Added score to ${newScoreRef.id}`);
      
    }
    setSubmitted(true);
  }
  return (
    <div className="mx-auto flex flex-col items-center my-8">
      <h3 className="text-slate-100 text-xl">You're in the Top Ten!</h3>
      { submitted ? null : 
      <div>
        <p className="text-slate-100 capitalize">Enter a name to submit your score!</p>
        <div className="flex flex-col my-4 gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-neutral-900 text-slate-800 bg-slate-200 rounded-md p-2"
          />
          <button
            type="button"
            className="bg-zinc-100 text-zinc-800 py-2 px-4 rounded-sm"
            onClick={() => recordScore(lastTimeScore, scoreToDeleteId)}
          >
            Submit
          </button>
        </div>
      </div>
      }
    </div>
  );
}

export default RecordScore;
