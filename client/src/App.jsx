import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"

function App() {
  const [blogPost, setBlogPost] = useState([]);

  const getBlogPost = async () => {
    const result = await axios.get('http://localhost:4001/products')
    setBlogPost(result.data.data)
  }

  useEffect(() => {
    getBlogPost();
  }, [blogPost])
  
  const handleDeleteBlogPost = async (e,id) => {
    e.preventDefault()
    await axios.delete(`http://localhost:4001/products/${id}`)
  } 

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {blogPost.map((item,index) => (
        <div className="product" key={index}>
          <div className="product-preview">
            <img
              src={item.image}
              alt={item.name}
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name:{item.name}</h1>
            <h2>Product price: {item.price} Baht</h2>
            <p>Product description: {item.description}</p>
          </div>

          <button className="delete-button" onClick={(e) => handleDeleteBlogPost(e, item.id)}>x</button>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
