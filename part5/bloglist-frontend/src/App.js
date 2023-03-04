import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
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
    localStorage.clear()
    setUser(null)
  }

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
      <h2>blogs</h2>
      <h3>{name} logged in</h3>
      <button onClick={logOut}>logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
