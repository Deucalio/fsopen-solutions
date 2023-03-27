import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "./features/blogs/blogSlice";
import { activeUser } from "./features/name/nameSlice";
import blogService from "./services/blogs";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((store) => store);
  const { blogs } = useSelector((store) => store);
  const [users, setUsers] = useState([]);

  const getBlogs = async (username) => {
    const users = await blogService.getAll();
    const blogs = users.find((u) => u.username === username);
    dispatch(activeUser(blogs.name));
    setUsers(users);
    dispatch(allBlogs(blogs.blogs));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const username = JSON.parse(localStorage.getItem("username"));
    if (token) {
      getBlogs(username);
    } else {
    }
  }, []);

  return (
    <div>
      <Link to="/">
        <p>home</p>
      </Link>
      <h1>blogs</h1>
      <p>{name} logged in</p>
      <br />
      <h1>Users</h1>
      <div style={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
        <p style={{ opacity: "0" }}>ff</p>
        <p style={{ fontWeight: "bold" }}>blogs created</p>
      </div>

      {users.map((u) => {
        return (
          <div
            key={u.name}
            style={{ display: "flex", flexDirection: "row", gap: "4rem" }}
          >
            <Link to={`/users/${u._id}`}>
              <p style={{ width: "5rem" }}> {u.name}</p>
            </Link>
            <p>{u.blogs.length}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
