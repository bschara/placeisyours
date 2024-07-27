// import React from "react";
// import "./storeSideBar.css";

// const categories = ["tshirts", "jerseys", "shorts", "pants", "caps"];

// const Sidebar = ({ selectedCategory, onSelectCategory }) => {
//   return (
//     <div className="sidebar">
//       <p>Categories</p>
//       <ul>
//         {categories.map((category, index) => (
//           <li key={index}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={selectedCategory === category}
//                 onChange={() => onSelectCategory(category)}
//               />
//               {category}
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import "./storeSideBar.css";

const categories = ["tshirts", "jerseys", "shorts", "pants", "caps"];

const Sidebar = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Toggle off if already selected
      onSelectCategory(null); // Inform parent component about unselecting category
    } else {
      setSelectedCategory(category); // Toggle on if not selected
      onSelectCategory(category); // Inform parent component about selected category
    }
  };

  return (
    <div className="sidebar">
      <p>Categories</p>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                name={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
