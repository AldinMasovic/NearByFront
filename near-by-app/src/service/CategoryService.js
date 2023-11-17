const API_URL = "http://localhost:8080/api/v1";

export const getAllCategories = () => {
  return fetch(`${API_URL}/categories`).then((response) => response.json());
};

export const addCategory = (category) => {
  return fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  }).then((response) => response.json());
};

export const updateCategory = (id, category) => {
  return fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  }).then((response) => response.json());
};

export const deleteCategory = (id) => {
  return fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};
