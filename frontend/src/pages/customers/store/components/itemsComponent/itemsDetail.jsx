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
//   const [selectedImage, setSelectedImage] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get("https://theplaceisyours.club/api/items/itemById", {
//         params: { id: id },
//       })
//       .then((response) => {
//         setItem(response.data);
//         setSelectedImage(response.data.mainImage);
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

//   const handleImageClick = (imagePath) => {
//     setSelectedImage(imagePath);
//   };

//   const getFileName = (filePath) => {
//     const pathComponents = filePath.split("\\");
//     return pathComponents[pathComponents.length - 1];
//   };

//   return (
//     <div className="item-detail">
//       <h2>{item.itemName}</h2>
//       <img
//         className="selected-image"
//         src={`https://theplaceisyours.club/${getFileName(selectedImage)}`}
//         alt={item.itemName}
//       />
//       <p>
//         ${item.price}, {item.size}
//       </p>
//       <div className="page-buttons">
//         <button onClick={handleAddToCart} disabled={item.status === "sold"}>
//           Add to Cart
//         </button>
//         <button onClick={handleBuyNow} disabled={item.status === "sold"}>
//           Buy Now
//         </button>
//       </div>
//       {item.status === "sold" && <div className="sold-label">Sold</div>}

//       <div className="additional-images">
//         {[item.mainImage, ...(item.images || [])].map((imagePath, index) => (
//           <img
//             key={index}
//             src={`https://theplaceisyours.club/${getFileName(imagePath)}`}
//             alt={`${item.itemName} additional ${index + 1}`}
//             onClick={() => handleImageClick(imagePath)}
//             className="thumbnail-image"
//           />
//         ))}
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
import LoadingAnimation from "../../../../../components/loading-animation";

const ItemDetailPage = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`https://theplaceisyours.club/api/items/itemById/${id}`)
      .then((response) => {
        console.log(response.data);
        const itemData = response.data;
        setItem(itemData);
        setSelectedImage(itemData.mainImageUrl);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [id]);

  if (!item) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleBuyNow = () => {
    navigate(`/checkout?items=${item.ID}`);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="item-detail">
      <h2>{item.itemName}</h2>
      <img className="selected-image" src={selectedImage} alt={item.itemName} />
      <p>
        ${item.price}, {item.size}
      </p>
      <div className="page-buttons">
        <button onClick={handleAddToCart} disabled={item.status === "sold"}>
          Add to Cart
        </button>
        <button onClick={handleBuyNow} disabled={item.status === "sold"}>
          Buy Now
        </button>
      </div>
      {item.status === "sold" && <div className="sold-label">Sold</div>}

      <div className="additional-images">
        {[item.mainImageUrl, ...(item.additionalImageUrls || [])].map(
          (imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`${item.itemName} additional ${index + 1}`}
              onClick={() => handleImageClick(imageUrl)}
              className="thumbnail-image"
            />
          )
        )}
      </div>
    </div>
  );
};

export default ItemDetailPage;
