import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import CreateAnecdote from "./components/CreateAnecdote";

function App() {
  const anecdotesQuery = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => {
      return axios
        .get("http://localhost:3001/anecdotes")
        .then((res) => res.data);
    },
  });
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async ({ anecdote }) => {
      const res = await axios.put(
        `http://localhost:3001/anecdotes/${anecdote.id}`,
        {
          ...anecdote,
          votes: anecdote.votes + 1,
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["anecdotes"], { exact: true });
    },
  });

  const increaseVote = async (anecdote) => {
    createPostMutation.mutate({
      anecdote,
    });
  };

  if (anecdotesQuery.status === "loading") return <h1>Loading</h1>;
  if (anecdotesQuery.status === "loading")
    return <h1>{JSON.stringify(anecdotesQuery.error)}</h1>;

  return (
    <div className="App">
      <h1>Anecdotes app</h1>

      {/* <form onSubmit={handleSubmit}>
        <label>Create New</label>
        <input type="text" />
        <button>Create</button>
      </form> */}
      <CreateAnecdote />

      {anecdotesQuery.data.map((a) => {
        return (
          <p key={a.id}>
            {a.content}
            <br />
            <span>has {a.votes}</span>
            <button onClick={() => increaseVote(a)}>vote</button>
          </p>
        );
      })}
    </div>
  );
}

export default App;
