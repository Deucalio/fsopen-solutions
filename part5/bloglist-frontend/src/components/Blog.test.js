import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Test First",
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".box");
  expect(div).toHaveTextContent("Test First");
});
