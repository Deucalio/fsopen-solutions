import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState("");
  const inputRef = useRef();

  const getBlogs = async () => {
    const users = await axios.get("http://localhost:3003/api/blogs");
    let blog = await users.data;
    blog = blog.find((b) => b.id === id);
    // console.log("b", blog);
    setPost(blog);
  };

  const addComment = async () => {
    const comment = inputRef.current.value;
    setPost({
      ...post,
      comments: [...post.comments, { comment, id: 1000 * Math.random() }],
    });
    const req = await axios.post("http://localhost:3003/api/comment", {
      comment,
      blogId: id,
    });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  if (!post) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      {post.likes} likes
      <p>added by {post.author}</p>
      <h2>comments</h2>
      <input type="text" ref={inputRef} />{" "}
      <button onClick={addComment}>add a comment</button>
      <ul>
        {post.comments.map((c) => (
          <li key={c.id}>{c.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPost;
