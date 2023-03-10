import React from "react";

const Login = ({ handleLoginForm, loginFormData, setLoginFormData }) => {
  return (
    <>
      <h1>Log in to application</h1>
      <form>
        <label>username</label>
        <input id="username"
          onChange={(e) =>
            setLoginFormData({ ...loginFormData, username: e.target.value })
          }
          value={loginFormData.username}
          name="username"
          type="text"
        ></input>
        <br />
        <label>password</label>
        <input id="password"
          onChange={(e) =>
            setLoginFormData({ ...loginFormData, password: e.target.value })
          }
          value={loginFormData.password}
          name="password"
          type="password"
        ></input>
        <br />

        <button id="loginBtn" onClick={handleLoginForm} type="submit">
          login
        </button>
      </form>
    </>
  );
};

export default Login;
