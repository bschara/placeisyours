import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import "./itemDetail.css";

const ItemDetailPage = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get("http://192.168.1.9:8081/api/items/itemById", {
        params: { id: id },
      })
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    console.log("item added");
  };

  return (
    <div className="item-detail">
      <h2>{item.itemName}</h2>
      <p>${item.price}</p>
      <img src={item.mainImage} alt={item.itemName} />
      <p>{item.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ItemDetailPage;
