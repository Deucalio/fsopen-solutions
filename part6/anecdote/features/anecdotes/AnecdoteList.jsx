import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "./anecdotesSlice";

const AnecdoteList = ({ filter }) => {
  const dispatch = useDispatch();
  let { anecdotes, votes } = useSelector((store) => store.anecdotes);
  anecdotes = anecdotes.filter((a) => a.includes(filter.toLowerCase()));

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
