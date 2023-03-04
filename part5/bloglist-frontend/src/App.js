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
  const [displayBlogForm, setDisplayBlogForm] = useState(false);
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

  const updateLike = async (blogId) => {
    const blog = blogs.map((b) => {
      if (b.id === blogId) {
        return {
          ...b,
          likes: b.likes + 1,
        };
      } else {
        return b;
      }
    });
    setBlogs([...blog]);
    try {
      const response = await axios.put(
        "http://localhost:3003/api/blogs/64031c133b008512cc03a95e",
        {
          likes: blogs.find((b) => b.id === blogId).likes + 1,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sortByLikes = () => {
    const sortedBlogs = [...blogs].sort(function (a, b) {
      if (a.likes > b.likes) return -1;
      if (a.likes < b.likes) return 1;
      return 0;
    });
    setBlogs(sortedBlogs);
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
      <h3 style={{ display: "inline" }}>{name} logged in</h3>
      <button onClick={logOut}>logout</button>
      <br />
      <button
        type="button"
        onClick={() => setDisplayBlogForm(!displayBlogForm)}
      >
        {displayBlogForm ? "cancel" : "new blog"}
      </button>
      <button type="button" onClick={sortByLikes}>
        Sort by likes
      </button>

      {/* allow user to create new blog */}
      {displayBlogForm && (
        <Form
          createBlog={createBlog}
          blogForm={blogForm}
          setBlogForm={setBlogForm}
        />
      )}
      <br />

      {blogs.map((blog) => (
        <Blog updateLike={updateLike} key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
