import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import About from "./components/About";
import Anecdote from "./components/Anecdote";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
            <li style={{ cursor: "pointer" }}>{anecdote.content}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,

    },
  ]);

  const [notification, setNotification] = useState("");
  useEffect(() => {
    let timeout = setTimeout(() => {
      setNotification("");
    }, 8000);
    return () => clearTimeout(timeout);
  }, [notification]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes([{ ...anecdote, id: anecdote.id }, ...anecdotes]);
  };

  return (
    <>
      <h1>Software anecdotes</h1>
      {notification !== "" && (
        <p>a new anecdote {anecdotes[0].content} created</p>
      )}
      <Menu />
      
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />

        <Route
          path="/create"
          element={
            <CreateNew setNotification={setNotification} addNew={addNew} />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
