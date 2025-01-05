import React, { useState, useEffect } from "react";
import api from "../../services/api";

const StockPage = () => {
  const [stock, setStock] = useState([]);
  const [productId, setProductId] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    const response = await api.get("/stock");
    setStock(response.data);
  };

  const handleAddStock = async () => {
    await api.post("/stock", { productId, quantity: stockQuantity });
    fetchStock();
    setProductId("");
    setStockQuantity("");
  };

  return (
    <div>
      <h1>Stock Management</h1>
      <input
        type="text"
        value={productId}
        placeholder="Product ID"
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="number"
        value={stockQuantity}
        placeholder="Stock Quantity"
        onChange={(e) => setStockQuantity(e.target.value)}
      />
      <button onClick={handleAddStock}>Add Stock</button>
      <ul>
        {stock.map((stockItem) => (
          <li key={stockItem.id}>
            Product ID: {stockItem.productId} - Quantity: {stockItem.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockPage;
