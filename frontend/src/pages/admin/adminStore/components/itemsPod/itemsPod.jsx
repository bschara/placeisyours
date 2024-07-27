import React from "react";
import "./itemPod.css";

const ItemPod = ({ item, onDelete, onChangeStatus }) => {
  return (
    <div className="whole-pod">
      <div className={`item-pod ${item.status === "sold" ? "sold" : ""}`}>
        <img src={item.mainImageUrl} alt={item.itemName} /> <p>{item.size}</p>
        <p>${item.price}</p>
        {item.status === "sold" && <div className="sold-overlay">Sold</div>}
        <button onClick={() => onDelete(item.ID)}>Delete</button>
        <button onClick={() => onChangeStatus(item.ID)}>Change Status</button>
      </div>
    </div>
  );
};

export default ItemPod;
