import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import LoadingAnimation from "react-circle-loading-animation";

import "./Header.css";
import OlxLogo from "../../Assets/OlxLogo";
import Search from "../../Assets/Search";
import Arrow from "../../Assets/Arrow";
import SellButton from "../../Assets/SellButton";
import SellButtonPlus from "../../Assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../Contexts/FIrebaseContexts";
function Header() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const firebase = useContext(FirebaseContext);

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div
          className="brandName"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push("/");
          }}
        >
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span>{`Welcome ${user.displayName}`}</span>
          ) : (
            <span
              onClick={() => {
                history.push("/login");
              }}
              style={{ cursor: "pointer" }}
            >
              Login
            </span>
          )}
          <hr />
        </div>
        {user && (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setLoading(true);
              firebase
                .auth()
                .signOut()
                .then(() => {
                  setLoading(false);
                  history.push("/login");
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                  alert(err.message);
                });
            }}
          >
            Logout
          </span>
        )}

        <div
          className="sellMenu"
          onClick={() => {
            history.push("/create");
          }}
        >
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        {loading && <LoadingAnimation isLoading={loading} />}
      </div>
    </div>
  );
}

export default Header;
