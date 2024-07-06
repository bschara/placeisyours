import React, { useState, useEffect } from "react";
import axios from "axios";
import "./itemComponent.css";
import ItemPod from "../itemsPod/itemsPod";
import Sidebar from "../../../../../components/storeSideBar/index";

const ItemsComponent = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:8081/api/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <div className="whole-comp">
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      <div className="shop-list">
        <ul>
          {filteredItems.map((item) => (
            <li key={item.ID}>
              <ItemPod item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemsComponent;
