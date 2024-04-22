import React from "react";
import ScoreBoard from "../components/ScoreBoard";

export default function ScoreBoardPage() {
  return (
    <div className="min-h-screen bg-slate-800 p-8">
      <h1 className="mb-6 text-center text-4xl text-slate-50">Score Boards</h1>
      <section className="mx-auto flex max-w-7xl justify-center gap-8">
        <div>
          <ScoreBoard gameSelected="waldo-1" />
        </div>
        <div>
          <ScoreBoard gameSelected="waldo-2" />
        </div>
      </section>
      <section className="m-8 flex flex-col items-center">
        <a
          href="/"
          className="block rounded-md bg-slate-700 py-2 px-4 text-slate-50"
        >
          Back to Game?
        </a>
      </section>
    </div>
  );
}
