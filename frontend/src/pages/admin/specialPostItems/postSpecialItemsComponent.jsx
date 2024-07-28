import React, { useState } from "react";
import axios from "axios";
import "./postItemsComponent.css";
import Cookies from "js-cookie";

const PostSpecialItemsComponent = () => {
  const token = Cookies.get("authToken");

  const categories = [{ value: "sDrop", label: "Special Drop" }];

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([{ size: "", quantity: "" }]);
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleMainImageChange = (event) => {
    setMainImage(event.target.files[0]);
  };

  const handleImagesChange = (event) => {
    setImages(event.target.files);
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleAddSize = () => {
    setSizes([...sizes, { size: "", quantity: "" }]);
  };

  const handleRemoveSize = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("ID", "someUniqueId"); // Set the ID value as needed
    formData.append("itemName", itemName);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("sizeAndQuantity", JSON.stringify(sizes)); // Adjust the size and quantity to fit the expected format
    formData.append("mainImage", mainImage);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      console.log(formData);
      const response = await axios.post(
        "http://theplaceisyours.club/api/items/createSpecialItem",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Item created:", response.data);
      // Clear form fields after successful submission
      setItemName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setSizes([{ size: "", quantity: "" }]);
      setMainImage(null);
      setImages([]);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="whole-page">
      <h1>Upload items</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Sizes and Quantities:</label>
          {sizes.map((sq, index) => (
            <div key={index} className="size-quantity-pair">
              <input
                type="text"
                placeholder="Size"
                value={sq.size}
                onChange={(e) =>
                  handleSizeChange(index, "size", e.target.value)
                }
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={sq.quantity}
                onChange={(e) =>
                  handleSizeChange(index, "quantity", e.target.value)
                }
                required
              />
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveSize(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddSize}>
            Add Size
          </button>
        </div>
        <div>
          <label>Main Image:</label>
          <input
            type="file"
            onChange={handleMainImageChange}
            accept="image/*"
            required
          />
        </div>
        <div>
          <label>Additional Images:</label>
          <input
            type="file"
            onChange={handleImagesChange}
            accept="image/*"
            multiple
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostSpecialItemsComponent;
