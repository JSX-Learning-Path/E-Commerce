import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}`,
        );
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        throw new Error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  return (
    <div className="search-bar width-300 background-light p-2 rounded">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {!loading && searchTerm && products.length > 0 && (
        <ul className="search-results">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="text-decoration-none text-dark"
              >
                {product.title .concat(" - $", product.price)}
                {product.thumbnail && (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="img-thumbnail img-fluid w-25 h-25 ms-2"
                    style={{ maxWidth: "60px", height: "auto" }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
