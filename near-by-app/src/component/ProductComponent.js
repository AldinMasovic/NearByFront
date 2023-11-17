import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../service/ProductService";

import { getAllCategories } from "../service/CategoryService";

const ProductComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: 0,
    longitude: 0,
    latitude: 0,
    imageUrl: "",
    availableInStock: 1,
    category: selectedCategory,
  });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data.content));
    getAllCategories().then((data) => setCategories(data));
  }, []);

  const handleAddProduct = () => {
    addProduct(newProduct)
      .then((data) => setProducts([...products, data]))
      .catch((error) => console.error("Error adding product:", error));
  };

  const handleUpdateProduct = () => {
    if (editProduct) {
      updateProduct(editProduct.id, editProduct)
        .then(() => {
          setProducts(
            products.map((p) => (p.id === editProduct.id ? editProduct : p))
          );
          setEditProduct(null);
        })
        .catch((error) => console.error("Error updating product:", error));
    }
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => setProducts(products.filter((p) => p.id !== id)))
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    let category = categories.find((x) => x.id == event.target.value);
    console.log(category);
    setNewProduct({ ...newProduct, category: category });
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="product-list">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {editProduct && editProduct.id === product.id ? (
                <div>
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editProduct.description}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        description: e.target.value,
                      })
                    }
                  />
                  {/* Add other input fields as needed */}
                  <button onClick={handleUpdateProduct}>Save</button>
                </div>
              ) : (
                <div>
                  <img
                    src={product.imageUrl}
                    alt="product-picture"
                    width="200"
                    height="100"
                  />
                  <br />
                  <label>Product name: </label>
                  {product.name}
                  <br />
                  <label>Product name: </label>
                  {product.description}
                  <br />
                  <label>Price: </label>
                  {product.price}
                  <br />
                  <label>Longitude: </label>
                  {product.gpsCoordinate && product.gpsCoordinate.longitude}
                  <br />
                  <label>Latitude: </label>
                  {product.gpsCoordinate && product.gpsCoordinate.latitude}
                  <br />
                  <label>Available in stock: </label>
                  {product.availableInStock}
                  <br />
                  <button onClick={() => setEditProduct(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <br />
        <label>Product Description:</label>
        <input
          type="text"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <br />
        <label>Price:</label>
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <br />
        <label>Longitude:</label>
        <input
          type="number"
          placeholder="Longitude"
          value={newProduct.longitude}
          onChange={(e) =>
            setNewProduct({ ...newProduct, longitude: e.target.value })
          }
        />
        <br />
        <label>Latitude:</label>
        <input
          type="number"
          placeholder="Latitude"
          value={newProduct.latitude}
          onChange={(e) =>
            setNewProduct({ ...newProduct, latitude: e.target.value })
          }
        />
        <br />
        <label>Available In Stock:</label>
        <input
          type="number"
          placeholder="Available In Stock"
          value={newProduct.availableInStock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, availableInStock: e.target.value })
          }
        />
        <br />
        <label>Image URL:</label>
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) =>
            setNewProduct({ ...newProduct, imageUrl: e.target.value })
          }
        />
        <br />
        <label htmlFor="category">Select a Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select...</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br />

        {/* Add other input fields as needed */}
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductComponent;
