import { useState } from "react";
import AddAnecdote from "../features/anecdotes/AddAnecdote";
import AnecdoteList from "../features/anecdotes/AnecdoteList";

function App() {
  const [filter, setFilter] = useState("");
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
