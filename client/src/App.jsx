import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  console.log("products :>> ", products);

  const getProduct = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProducts(result.data.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    //
    const newProduct = products.filter((item) => item.id !== id);
    console.log("newProduct :>> ", newProduct);
    setProducts(newProduct);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {products.map((product) => {
        return (
          <div className="product-list" key={product.id}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>

              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => deleteProduct(product.id)}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
