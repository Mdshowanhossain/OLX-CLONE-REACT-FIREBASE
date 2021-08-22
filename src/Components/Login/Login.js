import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../../Contexts/FIrebaseContexts";
import Logo from "../../olx-logo.png";
import "./Login.css";

import LoadingAnimation from "react-circle-loading-animation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  var handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLoginError(null);
        setLoading(false);
        console.log(userCredential);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setLoginError(err.message);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {loginError && (
          <p style={{ color: "red", maxWidth: "12rem" }}>{loginError}</p>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <button>Login</button>
          {loading && <LoadingAnimation isLoading={loading} />}
        </form>
        <a
          onClick={() => {
            history.push("/signup");
          }}
        >
          Signup
        </a>
      </div>
    </div>
  );
}

export default Login;
