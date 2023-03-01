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

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("test if a blog has id or _id", async () => {
  const blogs = await getBlogs();
  expect(blogs[0]._id).toBe(undefined);
  expect(blogs[0].id).toBeDefined();
});

test("A new blog is added", async () => {
  const initialBlogsCount = initialBlogs.length;
  const newBlog = {
    title: "Normal People",
    author: "Salley Rooney",
    url: "kkkk",
    likes: 2,
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

test("If likes property is missing, set default value to 0", async () => {
  const newBlog = {
    title: "Game of thrones",
    author: "idk",
    url: "asdkjsa",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

test("Delete a blog", async () => {
  const initialBlogsCount = initialBlogs.length;
  const idForBlogToBeDeleted = "63ff833b276ae5f702451685";
  await api.delete(`/api/blogs/${idForBlogToBeDeleted}`).expect(204);

  const response = await api.get("/api/blogs");

  const blogs = response.body;

  expect(blogs).toHaveLength(initialBlogsCount - 1);
});

test("Updates likes for a blog", async () => {
  const idForBlogLikesToBeUpdated = "63ff96bb98a65f746c3ef606";

  await api
    .put(`/api/blogs/${idForBlogLikesToBeUpdated}`)
    .send({ likes: "666" })
    .expect(204);

  const blogs = await getBlogs();

  expect(blogs[0].likes).toBe(666);
});

afterAll(async () => {
  await mongoose.connection.close();
});
