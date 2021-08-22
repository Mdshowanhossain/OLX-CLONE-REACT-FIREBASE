import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../Contexts/FIrebaseContexts";
import { useHistory } from "react-router-dom";

import LoadingAnimation from "react-circle-loading-animation";

import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const history = useHistory();

  const firebase = useContext(FirebaseContext);

  var handleFormSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSignupError(null);
        userCredential.user
          .updateProfile({ displayName: username })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .add({
                id: userCredential.user.uid,
                username: username,
                phone: phone,
              })
              .then(() => {
                setLoading(false);
                history.push("/login");
              });
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setSignupError(err.message);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {signupError && (
          <p style={{ color: "red", maxWidth: "12rem" }}>{signupError}</p>
        )}
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
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
          <button>Signup</button>
          {loading && <LoadingAnimation isLoading={loading} />}
        </form>
        <a onClick={()=>{
          history.push("/login")
        }}>Login</a>
      </div>
    </div>
  );
}
