import React, { useState, useEffect } from "react";
import axios from "axios";
import "./itemComponent.css";
import ItemPod from "../itemsPod/itemsPod";
import Sidebar from "../../../../../components/storeSideBar/index";
import Cookies from "js-cookie";

const ItemsComponent = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = Cookies.get("authToken");

  useEffect(() => {
    fetchItems(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  const fetchItems = (page, category) => {
    let url = `http://theplaceisyours.club/api/items?page=${page}`;
    if (category) {
      url = `http://theplaceisyours.club/api/items/${category}?page=${page}`;
    }
    axios
      .get(url)
      .then((response) => {
        const { items, totalPages } = response.data;
        setItems(items);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://theplaceisyours.club/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.ID !== id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleChangeStatus = (id) => {
    axios
      .put(
        `http://theplaceisyours.club/api/items/updateItemStatus/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchItems(currentPage, selectedCategory); // Refresh the items list
      })
      .catch((error) => {
        console.error("Error changing item status:", error);
      });
  };

  return (
    <div className="whole-comp">
      <Sidebar onSelectCategory={handleSelectCategory} />
      <div className="shop-list">
        <ul>
          {items.map((item) => (
            <li key={item.ID}>
              <ItemPod
                item={item}
                onDelete={handleDelete}
                onChangeStatus={handleChangeStatus}
              />
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{currentPage}</span> of <span>{totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsComponent;
