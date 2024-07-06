import React, { useState } from "react";
import axios from "axios";
import "./postItemsComponent.css";

const PostItemsComponent = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleMainImageChange = (event) => {
    setMainImage(event.target.files[0]);
  };

  const handleImagesChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("size", size);
    formData.append("mainImage", mainImage);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    console.log(formData.values);
    try {
      const response = await axios.post(
        "http://192.168.1.9:8081/api/items/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Item created:", response.data);
      setItemName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setSize("");
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
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Size:</label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
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

export default PostItemsComponent;
