import React from "react";
import "./storeSideBar.css";

const categories = ["tshirts", "jerseys", "shorts", "pants", "caps"];

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="sidebar">
      <p>Categories</p>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => onSelectCategory(category)}
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
