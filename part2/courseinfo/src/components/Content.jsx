import React from "react";

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ content: { parts } }) => {
  return parts.map((p) => <Part key={p.id} part={p} />);
};

export default Content;
