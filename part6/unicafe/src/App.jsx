import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { feedback } from "./features/stats/statsSlice";

function App() {
  const { stats } = useSelector((store) => store);
  const dispatch = useDispatch();

  return (
    <div className="App">
      {Object.keys(stats).map((k) => {
        return (
          <button onClick={() => dispatch(feedback(k))} key={k}>
            {k}
          </button>
        );
      })}

      <p>good {stats.good}</p>
      <p>ok {stats.ok}</p>
      <p>bad {stats.bad}</p>
    </div>
  );
}

export default App;
