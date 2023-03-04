import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Form from "./components/Form";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [blogForm, setBlogForm] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [notification, setNotification] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async (username) => {
    const users = await blogService.getAll();
    const blogs = users.find((u) => u.username === username);
    setName(blogs.name);
    setBlogs(blogs.blogs);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const username = JSON.parse(localStorage.getItem("username"));
    if (token) {
      getBlogs(username);
      setUser(true);
      console.log("exists");
    } else {
      console.log("doesn't exists");
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  }, [notification]);

  const handleLoginForm = async (e) => {
    e.preventDefault();

    // log user in

    const req = await axios.post(
      "http://localhost:3003/api/login",
      loginFormData
    );
    const { token, username } = req.data;
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("username", JSON.stringify(username));
      getBlogs(username);
      setUser(true);
    }
  };

  const logOut = () => {
    localStorage.clear();
    setUser(null);
  };

  const createBlog = async (e) => {
    setNotification(true);
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };

    const data = JSON.stringify({
      ...blogForm,
      likes: 0,
    });

    try {
      const response = await axios.post(
        "http://localhost:3003/api/blogs",
        data,
        {
          headers: headers,
        }
      );
      console.log(response.data);
      setBlogs([...blogs, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  if (user === null) {
    return (
      <Login
        handleLoginForm={handleLoginForm}
        loginFormData={loginFormData}
        setLoginFormData={setLoginFormData}
      />
    );
  }

  return (
    <div>
      {notification && <h1>A new blog has been added</h1>}
      <h2>blogs</h2>
      <h3>{name} logged in</h3>
      <button onClick={logOut}>logout</button>

      {/* allow user to create new blog */}
      <Form
        createBlog={createBlog}
        blogForm={blogForm}
        setBlogForm={setBlogForm}
      />
      <br />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
