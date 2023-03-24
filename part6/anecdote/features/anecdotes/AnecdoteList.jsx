import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "./anecdotesSlice";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const { anecdotes, votes } = useSelector((store) => store.anecdotes);
  return (
    <div>
      {anecdotes.map((a, i) => (
        <div key={a}>
          <p>
            {a}
            <br />
            has {votes[i]}
            <button onClick={() => dispatch(vote(i))}>vote</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
