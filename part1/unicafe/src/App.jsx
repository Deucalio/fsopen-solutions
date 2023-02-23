import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ data: [text, value] }) => {
  return (
    <p>
      {text} {value} {text == "positive" && "%"}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <div>
          <h1>Give feedback</h1>
          <Button text="good" handleClick={() => setGood(good + 1)} />
          <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
          <Button text="bad" handleClick={() => setBad(bad + 1)} />
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics data={["good", good]} />
        <Statistics data={["neutral", neutral]} />
        <Statistics data={["bad", bad]} />
        <Statistics data={["all", good + neutral + bad]} />
        <Statistics data={["average", (good - bad) / (good + neutral + bad)]} />
        <Statistics data={["positive", (good / 9) * 100]} />
      </div>
    </>
  );
};

export default App;
