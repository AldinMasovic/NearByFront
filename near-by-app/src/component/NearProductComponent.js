import React, { useState } from "react";
import { getNearProducts } from "../service/ProductService";

const NearProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [gpsCoordinate, setGpsCoordinate] = useState({
    longitude: 0,
    latitude: 0,
  });

  const findNearProducts = () => {
    getNearProducts(gpsCoordinate)
      .then((data) => setProducts(data.content))
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div>
      <h2>Near Products</h2>

      <br />
      <label>Longitude:</label>
      <input
        type="number"
        placeholder="Longitude"
        value={gpsCoordinate.longitude}
        onChange={(e) =>
          setGpsCoordinate({ ...gpsCoordinate, longitude: e.target.value })
        }
      />
      <br />
      <label>Latitude:</label>
      <input
        type="number"
        placeholder="Latitude"
        value={gpsCoordinate.latitude}
        onChange={(e) =>
          setGpsCoordinate({ ...gpsCoordinate, latitude: e.target.value })
        }
      />
      <br />
      <button onClick={findNearProducts}>Find near products</button>
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

export default NearProductComponent;
