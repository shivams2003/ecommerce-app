import React, { useState } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  // console.log("The basket contains >>" ,basket);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="productInfo">
        <p>{title}</p>
        <p className="productPrice">
          <small>₹ </small>
          <strong>{price}</strong>
        </p>
        <div className="productRating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
