import React from "react";
import { useState } from "react";
const Blog = ({ deleteBlog, updateLike, blog }) => {
  const [displayDetails, setDisplayDetails] = useState(false);

  return (
    <div
      className="box"
      style={{
        margin: "0.5rem",
        padding: "0.4rem",
        fontSize: "1.2rem",
        border: "1.5px double grey ",
      }}
    >
      {blog.title}{" "}
      <button className="displayInfo" onClick={() => setDisplayDetails(!displayDetails)}>
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
            <button
              onClick={() => deleteBlog(blog.id)}
              style={{
                cursor: "pointer",
                backgroundColor: "Tomato",
                padding: "0.3rem 0.5rem",
                border: "0",
                margin: "0 0.5rem",
              }}
            >
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
