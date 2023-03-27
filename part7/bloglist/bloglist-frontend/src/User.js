import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allBlogs } from "./features/blogs/blogSlice";
import { activeUser } from "./features/name/nameSlice";
import blogService from "./services/blogs";

const User = () => {
  const dispatch = useDispatch();
  //   const { name } = useSelector((store) => store);
  //   const { blogs } = useSelector((store) => store);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const users = await blogService.getAll();
        const filteredUser = users.find((user) => user._id === id);
        setUser(filteredUser);
        setBlogs(filteredUser.blogs);
      } catch (err) {
        console.error(err);
      }
    };
    getBlogs();
    console.log("id", id);
  }, []);

  if (!user) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((b) => {
          return <li key={b.id}>{b.title}</li>;
        })}
      </ul>
    </>
  );
};

export default User;
