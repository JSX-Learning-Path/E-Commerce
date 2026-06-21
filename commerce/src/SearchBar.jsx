import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/SearchBar.css";
import { GoSearch } from "react-icons/go";
import { FaTimes } from "react-icons/fa";

function SearchBar({ burger }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        setLoading(true);
        fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
          .then((res) => res.json())
          .then((data) => setProducts(data.products || []))
          .catch(() => setProducts([]))
          .finally(() => setLoading(false));
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <div>
      <div className="search-form d-flex align-items-center gap-2 position-relative">
        <div className="search-wrap flex-1"></div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control search-input transition focus-shadow"
          // style={{ paddingRight: "2.5rem" }}
        />
        <GoSearch className="search-icon-inside" />
      </div>
      {!loading && searchTerm && products.length > 0 && (
        <ul className="search-results">
          <button
            type="button"
            className="result-clear"
            aria-label="Clear search results"
            onClick={() => {
              setSearchTerm("");
              setProducts([]);
              setLoading(false);
            }}
          >
            <FaTimes />
          </button>
          {products.map((product) => (
            <li key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="text-decoration-none text-dark background-light d-flex align-items-center gap-2 p-2 rounded transition hover-shadow"
                onClick={() => {
                  setSearchTerm("");
                  setProducts([]);
                  setLoading(false);
                }}
              >
                {product.thumbnail && (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="img-thumbnail img-fluid w-25 h-25 ms-2"
                    style={{ maxWidth: "60px", height: "auto" }}
                  />
                )}
                {/* {product.title.concat(" - $", product.price)} */}
                <div className="result-text">
                  <div className="result-title">{product.title}</div>
                  <div className="result-price">
                    ${product.price}•{product.brand || product.category}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    {burger && <div className="search-burger">{burger}</div>}
    </div>
  );
}

export default SearchBar;
