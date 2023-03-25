import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRef } from "react";
import axios from "axios";

export default function CreatePost() {
  const anecdoteRef = useRef();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async ({ anecdote }) => {
      const res = await axios.post("http://localhost:3001/anecdotes", {
        content: anecdote,
        id: Date.now(),
        votes: 0,
      });
      return res.data;
    },
    onSuccess: (data) => {
      //   queryClient.setQueryData(["anecdotes", data.id], data);
      queryClient.invalidateQueries(["anecdotes"], { exact: true });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createPostMutation.mutate({
      anecdote: anecdoteRef.current.value,
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="Anecdote">Create new</label>
        <input type="text" id="Anecdote" ref={anecdoteRef} />
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
