import React from "react";
import CategoryComponent from "./component/CategoryComponent";
import ProductComponent from "./component/ProductComponent";
import NearProductComponent from "./component/NearProductComponent";
import SaleProductComponent from "./component/SaleProductComponent";

function App() {
  return (
    <div>
      <CategoryComponent />
      <ProductComponent />
      <NearProductComponent />
      <SaleProductComponent />
    </div>
  );
}

export default App;
