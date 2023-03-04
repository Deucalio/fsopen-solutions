import React from "react";
import { useState } from "react";
const Blog = ({ blog }) => {
  const [displayDetails, setDisplayDetails] = useState(false);
  return (
    <div style={{ padding: "0.2rem", fontSize: "1.2rem" }}>
      {blog.title}{" "}
      <button onClick={() => setDisplayDetails(!displayDetails)}>
        {displayDetails ? "hide" : "view"}
      </button>
      {displayDetails && (
        <>
          <p>{blog.url}</p>
          <p>likes: {blog.likes}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
