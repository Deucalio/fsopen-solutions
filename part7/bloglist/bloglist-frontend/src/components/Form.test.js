import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./Form";

const mockedSetFunc = jest.fn();

test("targetting value in input", async () => {
  render(<Form setBlogForm={mockedSetFunc} />);

  const titleInput = screen.getAllByLabelText("title");
  const authorInput = screen.getAllByLabelText("author");

  fireEvent.change(titleInput[0], { target: { value: "GOT" } });
  fireEvent.change(authorInput[0], { target: { value: "RR Martin" } });

  //   expect(titleInput[0]).toBeInTheDocument();
  expect(titleInput[0].value).toBe("GOT");
  expect(authorInput[0].value).toBe("RR Martin");
});

