import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

function App() {
  const anecdotesQuery = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => {
      return axios
        .get("http://localhost:3001/anecdotes")
        .then((res) => res.data);
    },
  });

  if (anecdotesQuery.status === "loading") return <h1>Loading</h1>;
  if (anecdotesQuery.status === "loading")
    return <h1>{JSON.stringify(anecdotesQuery.error)}</h1>;

  return (
    <div className="App">
      <h1>Anecdotes app</h1>
      <div>
        {anecdotesQuery.data.map((a) => {
          return (
            <>
              <p>
                {a.content}
                <br />
                <span>has {a.votes}</span>
                <button>vote</button>
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
