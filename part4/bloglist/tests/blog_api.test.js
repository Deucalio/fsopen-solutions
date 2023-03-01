const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");

const api = supertest(app);

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

test("test if a blog has id or _id", async () => {
  const blogs = await getBlogs();
  console.log("blogs", blogs);
  //   await expect( getBlogs()).resolves.toBe(!undefined)
  expect(blogs[0]._id).toBe(undefined);
  expect(blogs[0].id).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
