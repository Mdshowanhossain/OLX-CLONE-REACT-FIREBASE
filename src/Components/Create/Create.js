import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../Contexts/FIrebaseContexts";
import { useHistory } from "react-router-dom";

import LoadingAnimation from "react-circle-loading-animation";


const Create = () => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();
  const date = new Date();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    firebase
      .storage()
      .ref(`/images/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase.firestore().collection("products").add({
            name,
            category,
            price,
            imageUrl: url,
            userId: user.uid,
            createdAt: date.toDateString(),
          }).then(() => {
            setLoading(false);
            history.push("/");
          })
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          {loading && <LoadingAnimation isLoading={loading} />}
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
