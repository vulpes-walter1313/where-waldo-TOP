import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
    url: "/scoreboard",
  },
];
function Root() {
  const queryClient = new QueryClient();
  return (
    <div className="bg-slate-800 py-4">
      <QueryClientProvider client={queryClient}>
        <nav>
          <ul className="flex justify-center gap-4 pt-4">
            {links.map((link) => (
              <li
                className="text-lg text-slate-50 underline hover:text-amber-300"
                key={link.id}
              >
                <Link to={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </div>
  );
}

export default Root;
