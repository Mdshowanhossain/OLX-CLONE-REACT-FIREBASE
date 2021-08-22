import React, { useContext, useEffect, useState } from "react";

import Heart from "../../Assets/Heart";
import { FirebaseContext } from "../../Contexts/FIrebaseContexts";
import "./Post.css";

import LoadingAnimation from "react-circle-loading-animation";
import { ViewPostContext } from "../../Contexts/PostContext";
import { useHistory } from "react-router";

function Posts() {
  const firebase = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setViewPost } = useContext(ViewPostContext);
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const allProducts = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setLoading(false);
        setProducts(allProducts);
      });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {loading && <LoadingAnimation isLoading={loading} />}
          {products.length > 0 ? (
            products.map((card, key) => {
              return (
                <div
                  className="card"
                  key={key}
                  onClick={() => {
                    setViewPost(card);
                    history.push("/view-post");
                  }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={card.imageUrl} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {card.price}</p>
                    <span className="kilometer">{card.category}</span>
                    <p className="name"> {card.name}</p>
                  </div>
                  <div className="date">
                    <span>{card.createdAt}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4>{"Sorry.. No product availiable..! :-("}</h4>
            </div>
          )}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.length > 0 ? (
            products.map((card, key) => {
              return (
                <div
                  className="card"
                  key={key}
                  onClick={() => {
                    setViewPost(card);
                    history.push("/view-post");
                  }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={card.imageUrl} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {card.price}</p>
                    <span className="kilometer">{card.category}</span>
                    <p className="name"> {card.name}</p>
                  </div>
                  <div className="date">
                    <span>{card.createdAt}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4>{"Sorry.. No product availiable..! :-("}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
