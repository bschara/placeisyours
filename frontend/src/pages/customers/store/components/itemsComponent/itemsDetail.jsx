// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./itemDetail.css";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../../checkout/cart/cartContext";

// const ItemDetailPage = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const [item, setItem] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get("http://192.168.1.9:8081/api/items/itemById", {
//         params: { id: id },
//       })
//       .then((response) => {
//         setItem(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching item details:", error);
//       });
//   }, [id]);

//   if (!item) {
//     return <div>Loading...</div>;
//   }

//   const handleAddToCart = () => {
//     addToCart(item);
//   };

//   const handleBuyNow = () => {
//     navigate(`/checkout?items=${item.ID}`);
//   };

//   const filePath = item.mainImage;
//   const pathComponents = filePath.split("\\");
//   const fileName = pathComponents[pathComponents.length - 1];

//   // for(let i = 0; i < item.add)

//   return (
//     <div className="item-detail">
//       <h2>{item.itemName}</h2>
//       <img src={`http://192.168.1.9:8081/${fileName}`} alt={item.itemName} />
//       <p>${item.price}</p>
//       <p>{item.description}</p>
//       <button onClick={handleAddToCart} disabled={item.status === "sold"}>
//         Add to Cart
//       </button>
//       <button onClick={handleBuyNow} disabled={item.status === "sold"}>
//         Buy Now
//       </button>
//       {item.status === "sold" && <div className="sold-label">Sold</div>}
//     </div>
//   );
// };

// export default ItemDetailPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./itemDetail.css";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../../checkout/cart/cartContext";

// const ItemDetailPage = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const [item, setItem] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get("http://192.168.1.9:8081/api/items/itemById", {
//         params: { id: id },
//       })
//       .then((response) => {
//         setItem(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching item details:", error);
//       });
//   }, [id]);

//   if (!item) {
//     return <div>Loading...</div>;
//   }

//   const handleAddToCart = () => {
//     addToCart(item);
//   };

//   const handleBuyNow = () => {
//     navigate(`/checkout?items=${item.ID}`);
//   };

//   const mainImageFilePath = item.mainImage;
//   const mainImagePathComponents = mainImageFilePath.split("\\");
//   const mainImageFileName =
//     mainImagePathComponents[mainImagePathComponents.length - 1];

//   return (
//     <div className="item-detail">
//       <h2>{item.itemName}</h2>
//       <img
//         src={`http://192.168.1.9:8081/${mainImageFileName}`}
//         alt={item.itemName}
//       />
//       <p>${item.price}</p>
//       <p>{item.description}</p>
//       <button onClick={handleAddToCart} disabled={item.status === "sold"}>
//         Add to Cart
//       </button>
//       <button onClick={handleBuyNow} disabled={item.status === "sold"}>
//         Buy Now
//       </button>
//       {item.status === "sold" && <div className="sold-label">Sold</div>}
//       <div className="additional-images">
//         {item.images &&
//           item.images.map((imagePath, index) => {
//             const additionalImagePathComponents = imagePath.split("\\");
//             const additionalImageFileName =
//               additionalImagePathComponents[
//                 additionalImagePathComponents.length - 1
//               ];
//             return (
//               <img
//                 key={index}
//                 src={`http://192.168.1.9:8081/${additionalImageFileName}`}
//                 alt={`${item.itemName} additional ${index + 1}`}
//               />
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default ItemDetailPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./itemDetail.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../checkout/cart/cartContext";

const ItemDetailPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://192.168.1.9:8081/api/items/itemById", {
        params: { id: id },
      })
      .then((response) => {
        setItem(response.data);
        setSelectedImage(response.data.mainImage);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleBuyNow = () => {
    navigate(`/checkout?items=${item.ID}`);
  };

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const getFileName = (filePath) => {
    const pathComponents = filePath.split("\\");
    return pathComponents[pathComponents.length - 1];
  };

  return (
    <div className="item-detail">
      <h2>{item.itemName}</h2>
      <img
        className="selected-image"
        src={`http://192.168.1.9:8081/${getFileName(selectedImage)}`}
        alt={item.itemName}
      />
      <p>${item.price}</p>
      <p>{item.description}</p>
      <button onClick={handleAddToCart} disabled={item.status === "sold"}>
        Add to Cart
      </button>
      <button onClick={handleBuyNow} disabled={item.status === "sold"}>
        Buy Now
      </button>
      {item.status === "sold" && <div className="sold-label">Sold</div>}
      <div className="additional-images">
        {[item.mainImage, ...(item.images || [])].map((imagePath, index) => (
          <img
            key={index}
            src={`http://192.168.1.9:8081/${getFileName(imagePath)}`}
            alt={`${item.itemName} additional ${index + 1}`}
            onClick={() => handleImageClick(imagePath)}
            className="thumbnail-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ItemDetailPage;
