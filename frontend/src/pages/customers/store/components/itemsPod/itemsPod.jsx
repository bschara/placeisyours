// import React from "react";
// import { Link } from "react-router-dom";
// import "./itemPod.css"; // Import CSS for styling

// const ItemPod = ({ item }) => {
//   const filePath = item.mainImage;
//   const pathComponents = filePath.split("\\");
//   const fileName = pathComponents[pathComponents.length - 1];

//   return (
//     <Link to={`/itemsDetails/${item.ID}`} className="item-link">
//       <div className="item-pod">
//         <img
//           img
//           src={`http://192.168.1.9:8081/${fileName}`}
//           alt={item.itemName}
//         />
//         <p>Price: ${item.price}</p>
//         <p>{item.itemName}</p>
//       </div>
//     </Link>
//   );
// };

// export default ItemPod;

import React from "react";
import { Link } from "react-router-dom";
import "./itemPod.css";

const ItemPod = ({ item }) => {
  return (
    <div className="whole-pod">
      <Link to={`/itemsDetails/${item.ID}`} className="itemBorders">
        <div className={`item-pod ${item.status === "sold" ? "sold" : ""}`}>
          <img src={item.mainImageUrl} alt={item.itemName} /> <p>{item.size}</p>
          <p>${item.price}</p>
          {item.status === "sold" && <div className="sold-overlay">Sold</div>}
        </div>
      </Link>
    </div>
  );
};

export default ItemPod;
