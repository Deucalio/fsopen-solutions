import AddAnecdote from "../features/anecdotes/AddAnecdote";
import AnecdoteList from "../features/anecdotes/AnecdoteList";

function App() {
  return (
    <div className="App">
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AddAnecdote />
    </div>
  );
}

export default App;
