// import "./drops_page.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const ItemDetailPage = () => {
//   const navigate = useNavigate();
//   const [item, setItem] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const { id } = useParams();
//   console.log(id);

//   useEffect(() => {
//     axios
//       .get(`http://192.168.1.9:8081/api/items/findSpecialItem`)
//       .then((response) => {
//         console.log(response.data);
//         const itemData = response.data;
//         setItem(itemData);
//         console.log(itemData);
//         setSelectedImage(itemData.mainImageUrl);
//       })
//       .catch((error) => {
//         console.error("Error fetching item details:", error);
//       });
//   }, [id]);

//   if (!item) {
//     return <div>Loading...</div>;
//   }

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//   };

//   const handleBuyNow = () => {
//     navigate(`/specialCheckOutPage?items=${item.ID}`);
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//   };

//   return (
//     <div className="drops-page">
//       <div className="item-detail">
//         <h2>{item.itemName}</h2>
//         <img
//           className="selected-image"
//           src={selectedImage}
//           alt={item.itemName}
//         />
//         <p>${item.price}</p>

//         <div className="size-selector">
//           {item.sizeAndQuantity.map(({ size, quantity }) => (
//             <div
//               key={size}
//               className={`size-option ${
//                 selectedSize === size ? "selected" : ""
//               }`}
//               onClick={() => quantity > 0 && handleSizeSelect(size)}
//               style={{
//                 cursor: quantity > 0 ? "pointer" : "not-allowed",
//                 opacity: quantity > 0 ? 1 : 0.5,
//               }}
//             >
//               {size}
//             </div>
//           ))}
//         </div>
//         <div className="page-buttons">
//           <button
//             onClick={handleBuyNow}
//             disabled={!selectedSize || item.status === "sold"}
//           >
//             Buy Now
//           </button>
//         </div>
//         {item.status === "sold" && <div className="sold-label">Sold</div>}

//         <div className="additional-images">
//           {[item.mainImageUrl, ...(item.additionalImageUrls || [])].map(
//             (imageUrl, index) => (
//               <img
//                 key={index}
//                 src={imageUrl}
//                 alt={`${item.itemName} additional ${index + 1}`}
//                 onClick={() => handleImageClick(imageUrl)}
//                 className="thumbnail-image"
//               />
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemDetailPage;

import "./drops_page.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../components/loading-animation";

const ItemDetailPage = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://192.168.1.9:8081/api/items/findSpecialItem`)
      .then((response) => {
        console.log(response.data);
        const itemData = response.data;
        setItem(itemData);
        console.log(itemData);
        setSelectedImage(itemData.mainImageUrl);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [id]);

  // if (!item) {
  //   return <div>Loading...</div>;
  // }

  if (!item) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleBuyNow = () => {
    if (selectedSize) {
      navigate(`/specialCheckOutPage?items=${item.ID}&size=${selectedSize}`);
    } else {
      alert("Please select a size.");
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="drops-page">
      <div className="item-detail">
        {/* <h2>{item.itemName}</h2> */}
        <img
          className="selected-image"
          src={selectedImage}
          alt={item.itemName}
        />

        <div className="size-selector">
          {item.sizeAndQuantity.map(({ size, quantity }) => (
            <div
              key={size}
              className={`size-option ${
                selectedSize === size ? "selected" : ""
              }`}
              onClick={() => quantity > 0 && handleSizeSelect(size)}
              style={{
                cursor: quantity > 0 ? "pointer" : "not-allowed",
                opacity: quantity > 0 ? 1 : 0.5,
              }}
            >
              {size}
            </div>
          ))}
        </div>
        <p>${item.price}</p>
        <div className="page-buttons">
          <button
            onClick={handleBuyNow}
            disabled={!selectedSize || item.status === "sold"}
          >
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
    </div>
  );
};

export default ItemDetailPage;
