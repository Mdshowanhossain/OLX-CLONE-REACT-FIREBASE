import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../../Contexts/FIrebaseContexts";
import { ViewPostContext } from "../../Contexts/PostContext";

import "./View.css";
function View() {
  const { viewPost } = useContext(ViewPostContext);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (viewPost) {
      console.log({ viewPost });
      firebase
        .firestore()
        .collection("users")
        .where("id", "==", viewPost.userId)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            console.log(doc);
            setUserDetails(doc.data());
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      history.push("/");
    }
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={viewPost.imageUrl} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {viewPost.price} </p>
          <span>{viewPost.name}</span>
          <p>{viewPost.category}</p>
          <span>{viewPost.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
