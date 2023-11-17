import React, { useState, useEffect } from "react";
import { getProductsOnSale } from "../service/ProductService";

const SaleProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 0,
  });

  useEffect(() => {
    getProductsOnSale(priceRange).then((data) => setProducts(data.content));
  }, []);

  const findProductsOnSale = () => {
    getProductsOnSale(priceRange)
      .then((data) => setProducts(data.content))
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div>
      <h2>Products on sale</h2>

      <br />
      <label>Min price:</label>
      <input
        type="number"
        placeholder="Minprice"
        value={priceRange.minPrice}
        onChange={(e) =>
          setPriceRange({ ...priceRange, minPrice: e.target.value })
        }
      />
      <br />
      <label>Max price:</label>
      <input
        type="number"
        placeholder="Maxprice"
        value={priceRange.maxPrice}
        onChange={(e) =>
          setPriceRange({ ...priceRange, maxPrice: e.target.value })
        }
      />
      <br />
      <button onClick={findProductsOnSale}>Find near products</button>
      <div className="product-list">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {
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
                </div>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SaleProductComponent;
