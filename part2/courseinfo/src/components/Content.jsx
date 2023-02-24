import React from "react";

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Sum = ({ parts }) => {
  const sum = parts.reduce((acc, currentVal) => acc + currentVal.exercises, 0);
  return <h3>Total of {sum} exercises</h3>;
};

const Content = ({ content: { parts } }) => {
  return (
    <>
      {parts.map((p) => (
        <Part key={p.id} part={p} />
      ))}
      <Sum parts={parts} />
    </>
  );
};

export default Content;
