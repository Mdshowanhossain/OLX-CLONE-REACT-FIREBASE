import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { AuthContext, FirebaseContext } from "./Contexts/FIrebaseContexts";
import Post from "./Contexts/PostContext";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";

function App() {
  const firebase = useContext(FirebaseContext);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <Post>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/signup">{user ? <Redirect to="/" /> : <Signup />}</Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/create">
          {user ? <Create /> : <Redirect to="/login" />}
        </Route>
        <Route path="/view-post" component={ViewPost} />
      </Router>
    </Post>
  );
}

export default App;
