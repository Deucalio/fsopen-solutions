import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../features/anecdotes/anecdotesSlice";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { anecdotes, votes } = useSelector((store) => store.anecdotes);

  return (
    <div className="App">
      {anecdotes.map((a, i) => (
        <>
          <div>
            <p>
              {a}
              <br />
              has {votes[i]}
              <button onClick={() => dispatch(vote(i))}>vote</button>
            </p>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;
