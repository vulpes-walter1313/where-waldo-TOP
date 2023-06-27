import React from "react";
import ScoreBoard from "../components/ScoreBoard";

export default function ScoreBoardPage() {
  return (
    <div className="min-h-screen bg-slate-800 p-8">
      <h1 className="text-slate-50 text-4xl text-center mb-6">Score Boards</h1>
      <section className="flex gap-8 mx-auto max-w-7xl justify-center">
        <div>
          <ScoreBoard scoreBoard="top-scores-easy"/>
        </div>
        <div>
          <ScoreBoard scoreBoard="top-scores-hard"/>
        </div>
      </section>
      <section className="flex flex-col items-center m-8">
        <a href="/" className="text-slate-50 bg-slate-700 rounded-md py-2 px-4 block">Back to Game?</a>
      </section>
    </div>
  );
}
