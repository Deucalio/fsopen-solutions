import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "./anecdotesSlice";
import Notification from "../notifications/Notification";
import { showNotification } from "../notifications/notificationSlice";

const AnecdoteList = ({ filter }) => {
  const dispatch = useDispatch();
  let { anecdotes, votes } = useSelector((store) => store.anecdotes);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setNotify(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [notify]);

  anecdotes = anecdotes.filter((a) => a.includes(filter.toLowerCase()));

  return (
    <div>
      {notify && <Notification />}

      {anecdotes.map((a, i) => (
        <div key={a}>
          <p>
            {a}
            <br />
            has {votes[i]}
            <button
              onClick={() => {
                setNotify(true);
                dispatch(showNotification(a));
                dispatch(vote(i));
              }}
            >
              vote
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
