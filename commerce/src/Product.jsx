// import { fakeApi } from "./api/FakeApi";
import Loading from "./components/Loading";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=500",
        );
        setProducts(response.data.products || []);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Products;
