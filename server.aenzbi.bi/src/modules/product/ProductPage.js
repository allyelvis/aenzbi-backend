import React, { useState, useEffect } from "react";
import api from "../../services/api";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [productPrice, setProductPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get("/product");
    setProducts(response.data);
  };

  const handleAddProduct = async () => {
    await api.post("/product", { name: newProduct, price: productPrice });
    fetchProducts();
    setNewProduct("");
    setProductPrice("");
  };

  const handleDeleteProduct = async (productId) => {
    await api.delete(`/product/${productId}`);
    fetchProducts();
  };

  return (
    <div>
      <h1>Product Management</h1>
      <input
        type="text"
        value={newProduct}
        placeholder="Product Name"
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <input
        type="number"
        value={productPrice}
        placeholder="Product Price"
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - $ {product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
