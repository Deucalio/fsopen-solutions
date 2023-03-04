import React from "react";

const Form = ({ createBlog, blogForm, setBlogForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBlogForm({ ...blogForm, [name]: value });
  };

  return (
    <>
      <form>
        <h1>create new</h1>
        <label>title</label>{" "}
        <input onChange={handleChange} name="title" type="text"></input>
        <br />
        <label>author</label>{" "}
        <input onChange={handleChange} name="author" type="text"></input>
        <br />
        <label>url</label>{" "}
        <input onChange={handleChange} name="url" type="text"></input>
        <br />
        <button onClick={createBlog} type="submit">
          create
        </button>
      </form>
      <br />
    </>
  );
};

export default Form;
