import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ data: [text, value] }) => {
  return (
    <p>
      {text} {value} {text == "positive" && "%"}
    </p>
  );
};

const Statistics = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
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
        <StatisticsLine data={["good", good]} />
        <StatisticsLine data={["neutral", neutral]} />
        <StatisticsLine data={["bad", bad]} />
        <StatisticsLine data={["all", good + neutral + bad]} />
        <StatisticsLine
          data={["average", (good - bad) / (good + neutral + bad)]}
        />
        <StatisticsLine data={["positive", (good / 9) * 100]} />
      </div>
    </>
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
    <Statistics
      good={good}
      setGood={setGood}
      neutral={neutral}
      setNeutral={setNeutral}
      bad={bad}
      setBad={setBad}
    />
  );
};

export default App;
