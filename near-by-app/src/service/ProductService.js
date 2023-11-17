const API_URL = "http://localhost:8080/api/v1";

export const getAllProducts = () => {
  return fetch(`${API_URL}/products/sale`).then((response) => response.json());
};

export const getProductsOnSale = (productRange) => {
  return fetch(
    `${API_URL}/products/sale?minPrice=${productRange.minPrice}&maxPrice=${productRange.maxPrice}`
  ).then((response) => response.json());
};

export const addProduct = (product) => {
  return fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
};

export const updateProduct = (id, product) => {
  return fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
};

export const deleteProduct = (id) => {
  return fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export const getNearProducts = (gpsCoordinate) => {
  return fetch(
    `${API_URL}/products/closest?latitude=${gpsCoordinate.latitude}&longitude=${gpsCoordinate.longitude}`,
    {
      method: "GET",
    }
  ).then((response) => response.json());
};
