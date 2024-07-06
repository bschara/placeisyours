import React from "react";
import { Link } from "react-router-dom";
// import "./itemPod.css";

const ItemPod = ({ item }) => {
  const placeOrder = () => {};

  const deleteOrder = () => {};

  const filePath = item.mainImage;
  const pathComponents = filePath.split("\\");
  const fileName = pathComponents[pathComponents.length - 1];

  console.log(fileName);

  return (
    <div className="item-pod">
      <Link to={`/itemsDetails/${item.ID}`} className="item-link">
        <div className="item-podd">
          <img
            img
            src={`http://192.168.1.9:8081/${fileName}`}
            alt={item.itemName}
          />
          <p>Price: ${item.price}</p>
          <p>{item.itemName}</p>
        </div>
      </Link>
      <button onClick={placeOrder}>place Order</button>
      <button onClick={deleteOrder}>Delete Item</button>
    </div>
  );
};

export default ItemPod;
