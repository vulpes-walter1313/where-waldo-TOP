// useQuery Function
// queryKey: ["gamestates"]
export const fetchGameStats = async () => {
  const rawRes = await fetch("http://localhost:3010/gamestats", {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });

  const res = await rawRes.json();
  if (res.success) {
    return res;
  } else {
    throw new Error("something when wrong in fetching gamestats");
  }
};

export const fetchScores = async (game: "waldo-1" | "waldo-2") => {
  const rawRes = await fetch(
    `http://localhost:3010/scoreboard?limit=50&gameName=${game}`,
    {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const res = await rawRes.json();
  if (res.success) {
    return res;
  } else {
    throw new Error("Error fetching scores");
  }
};
