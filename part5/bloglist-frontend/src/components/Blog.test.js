import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const mockedSetFunc = jest.fn();

test("renders the blog's title", () => {
  const blog = {
    title: "Test First",
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".box");
  expect(div).toHaveTextContent("Test First");
});

test("clicking buttons shows likes", async () => {
  const blog = {
    title: "LOTR",
    author: "Tolkien",
    likes: 90,
  };
  const mockHandler = jest.fn();
  render(<Blog blog={blog} />);
  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);
  const element = screen.getByText("likes: 90");

  expect(element).toBeDefined();
});

test("testing like button, calling mock function if it's clicked", async () => {
  const mockHandler = jest.fn();
  const blog = {
    title: "LOTR",
    author: "Tolkien",
    likes: 90,
  };
  render(<Blog updateLike={mockHandler} blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);
  const likeBtn = screen.getByText("like");
  await user.click(likeBtn);
  expect(mockHandler.mock.calls).toHaveLength(1)

  // expect(likeBtn).toBeDefined();

  // const mockHandler = jest.fn();

  // render(<Blog updateLike={mockHandler} />);

  // const user = userEvent.setup();
  // const button = screen.getByText("view");

  // await user.click(button);
  // const likeBtn = screen.getByText("like")
  // await user.click(likeBtn);
  // expect(mockHandler.mock.calls).toHaveLength(1)
});
