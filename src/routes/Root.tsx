import React from "react";
import { Link, Outlet } from "react-router-dom";

const links = [
  {
    id: 1,
    text: "Game",
    url: "/",
  },
  {
    id: 2,
    text: "Scoreboard",
    url: "/scoreboard"
  }
];
function Root() {
  return (
    <div className="bg-slate-800 py-4">
      <nav>
        <ul className="flex gap-4 justify-center">
          {links.map(link => <li className="text-slate-50 underline hover:text-amber-300 text-lg" key={link.id}><Link to={link.url}>{link.text}</Link></li>)}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Root;
