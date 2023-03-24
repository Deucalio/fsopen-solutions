import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewAnecdote } from "./anecdotesSlice";

const AddAnecdote = () => {
  const dispatch = useDispatch();
  const [anecdote, setAnecdote] = useState("");

  const handleClick = () => {
    if (anecdote) {
      dispatch(addNewAnecdote(anecdote));
      setAnecdote("");
    }
  };

  return (
    <section>
      <h2>Add a new Anecdote</h2>
      <input
        type="text"
        placeholder="New anecdote"
        value={anecdote}
        onChange={(e) => setAnecdote(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
    </section>
  );
};

export default AddAnecdote;
