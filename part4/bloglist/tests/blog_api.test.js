const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);
const initialBlogs = [
  {
    title: "The fault in our stars",
    author: "John Green",
    url: "ayyyyyyyyy",
    likes: 101,
    id: "63ff7573dbdaaf30c73efb85",
  },
];

const getBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
  //   return blogs.toJSON();
};

// test("notes are returned as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// });

// test("test if a blog has id or _id", async () => {
//   const blogs = await getBlogs();
//   expect(blogs[0]._id).toBe(undefined);
//   expect(blogs[0].id).toBeDefined();
// });

test("A new blog is added", async () => {
  const initialBlogsCount = initialBlogs.length;
  const newBlog = {
    title: "Normal People",
    author: "Salley Rooney",
    url: "kkkk",
    likes: 2,
    id: "5f343dbgsdgggaf30c73e141",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const blogs = response.body;

  expect(blogs).toHaveLength(initialBlogsCount + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
