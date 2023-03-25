import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useContext, useRef } from "react";
import axios from "axios";
import { NotificationContext } from "../App";

export default function CreatePost() {
  const anecdoteRef = useRef();
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

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
      queryClient.invalidateQueries(["anecdotes"], { exact: true });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const anecdote = anecdoteRef.current.value;
    if (anecdote.length < 5) {
      return dispatch({ type: "error" });
    }
    createPostMutation.mutate({
      anecdote: anecdote,
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
