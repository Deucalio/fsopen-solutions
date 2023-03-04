import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async (username) => {
    const users = await blogService.getAll();
    const blogs = users.find((u) => u.username === username).blogs;
    setBlogs(blogs);
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();

    // log user in

    const req = await axios.post(
      "http://localhost:3003/api/login",
      loginFormData
    );
    const { token, username } = req.data;
    if (token) {
      getBlogs(username);
      setUser(true);
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
