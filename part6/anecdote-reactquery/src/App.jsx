import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import CreateAnecdote from "./components/CreateAnecdote";
import Notification from "./components/Notification";

const reducer = (notification, action) => {
  switch (action.type) {
    case "vote":
      return `anecdote '${action.payload.anecdote}' voted`;
    case "hide":
      return "";
    case "error":
      return "too short anecdote, must have length of 5 or more"
    default:
      notification;
  }
};
export const NotificationContext = createContext([]);

function App() {
  const [notification, dispatch] = useReducer(reducer, "");

  useEffect(() => {
    let timeout = setTimeout(() => {
      dispatch({ type: "hide" });
    }, 5000);
    return () => clearTimeout(timeout);
  }, [notification]);

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
    dispatch({ type: "vote", payload: { anecdote: anecdote.content } });
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
      <NotificationContext.Provider value={[notification, dispatch]}>
        {notification !== "" && <Notification />}
        <CreateAnecdote />
      </NotificationContext.Provider>

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
