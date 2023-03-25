import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    padding: "2rem",
  };
  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        listStyle: "none",
        gap: "1rem",
      }}
    >
      <li>
        <Link to="/">anecdotes</Link>
      </li>
      <li>
        <Link to="/create">create new</Link>
      </li>
      <li>
        <Link to="/about">about</Link>
      </li>
    </div>
  );
};

export default Menu;
