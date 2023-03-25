import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AddAnecdote from "../features/anecdotes/AddAnecdote";
import AnecdoteList from "../features/anecdotes/AnecdoteList";
import anecdoteService from "../features/anecdotes/anecdoteService";
import { setAnecdotes } from "../features/anecdotes/anecdotesSlice";

function App() {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getAnecdotes = async () => {
      const res = await anecdoteService.getAll();
      dispatch(setAnecdotes(res));
    };
    getAnecdotes();
  }, []);

  

  return (
    <div className="App">
      <h2>Anecdotes</h2>
      <label>filter</label>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <AnecdoteList filter={filter} />
      <AddAnecdote />
    </div>
  );
}

export default App;
