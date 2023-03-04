import React from "react";
import { useState } from "react";
import axios from "axios";
const Blog = ({ updateLike, blog }) => {
  const [displayDetails, setDisplayDetails] = useState(false);

  

  return (
    <div
      style={{
        margin: "0.5rem",
        padding: "0.4rem",
        fontSize: "1.2rem",
        border: "1.5px double grey ",
      }}
    >
      {blog.title}{" "}
      <button onClick={() => setDisplayDetails(!displayDetails)}>
        {displayDetails ? "hide" : "view"}
      </button>
      {displayDetails && (
        <>
          <div>
            <p>{blog.url}</p>
            likes: {blog.likes}
            <button type="button" onClick={() => updateLike(blog.id)}>
              like
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
