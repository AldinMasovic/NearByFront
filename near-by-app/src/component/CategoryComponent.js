import React, { useState, useEffect } from "react";
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../service/CategoryService";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);

  const handleAddCategory = () => {
    addCategory({ name: newCategory })
      .then((data) => setCategories([...categories, data]))
      .catch((error) => console.error("Error adding category:", error));
  };

  const handleUpdateCategory = () => {
    if (editCategory) {
      updateCategory(editCategory.id, { name: editCategory.name })
        .then(() => {
          setCategories(
            categories.map((c) => (c.id === editCategory.id ? editCategory : c))
          );
          setEditCategory(null);
        })
        .catch((error) => console.error("Error updating category:", error));
    }
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id)
      .then(() => setCategories(categories.filter((c) => c.id !== id)))
      .catch((error) => console.error("Error deleting category:", error));
  };

  return (
    <div>
      <h2>Categories</h2>
      <div className="category-list">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {editCategory && editCategory.id === category.id ? (
                <div>
                  <input
                    type="text"
                    value={editCategory.name}
                    onChange={(e) =>
                      setEditCategory({ ...editCategory, name: e.target.value })
                    }
                  />
                  <button onClick={handleUpdateCategory}>Save</button>
                </div>
              ) : (
                <div>
                  {category.name}
                  <button onClick={() => setEditCategory(category)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(category.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <br />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
    </div>
  );
};

export default CategoryComponent;
