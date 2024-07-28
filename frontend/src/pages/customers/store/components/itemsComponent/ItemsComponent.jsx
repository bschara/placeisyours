// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./itemComponent.css";
// import ItemPod from "../itemsPod/itemsPod";
// import Sidebar from "../../../../../components/storeSideBar/index";

// const ItemsComponent = () => {
//   const [items, setItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchItems(currentPage);
//   }, [currentPage]);

//   const fetchItems = (page) => {
//     axios
//       .get(`https://theplaceisyours.club/api/items?page=${page}`)
//       .then((response) => {
//         const { items, totalPages } = response.data;
//         setItems(items);
//         setTotalPages(totalPages);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const handleSelectCategory = (category) => {
//     setSelectedCategory((prevCategory) =>
//       prevCategory === category ? null : category
//     );
//     setCurrentPage(1); // Reset to the first page when category changes
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const filteredItems = selectedCategory
//     ? items.filter((item) => item.category === selectedCategory)
//     : items;

//   return (
//     <div className="whole-comp">
//       <Sidebar
//         selectedCategory={selectedCategory}
//         onSelectCategory={handleSelectCategory}
//       />
//       <div className="shop-list">
//         <ul>
//           {filteredItems.map((item) => (
//             <li key={item.ID}>
//               <ItemPod item={item} />
//             </li>
//           ))}
//         </ul>
//         <div className="pagination">
//           <button onClick={handlePrevPage} disabled={currentPage === 1}>
//             Prev
//           </button>
//           <span>{currentPage}</span> of <span>{totalPages}</span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemsComponent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./itemComponent.css";
import ItemPod from "../itemsPod/itemsPod";
import Sidebar from "../../../../../components/storeSideBar/index";

const ItemsComponent = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchItems(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  const fetchItems = (page, category) => {
    let url = `https://theplaceisyours.club/api/items?page=${page}`;
    if (category) {
      url = `https://theplaceisyours.club/api/items/${category}?page=${page}`;
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

  return (
    <div className="whole-comp">
      <Sidebar onSelectCategory={handleSelectCategory} />
      <div className="shop-list">
        <ul>
          {items.map((item) => (
            <li key={item.ID}>
              <ItemPod item={item} />
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
