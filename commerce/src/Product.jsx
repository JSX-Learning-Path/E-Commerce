// import { fakeApi } from "./api/FakeApi";
import Loading from "./components/Loading";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useCart} from "./context/CartContext";

function Products() {
  const [, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Get category from navigation state
  const selectedCategory = location.state?.selectedCategory;
  const onSale = location.state?.onSale;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=200",
        );
        const allProducts = response.data.products || [];
        setProducts(allProducts);

        let filtered = allProducts;
        if (selectedCategory) {
          filtered = allProducts.filter((p) => p.category === selectedCategory);
        }

        setFilteredProducts(filtered);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, onSale]);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-capitalize">
        {selectedCategory ? `${selectedCategory} Collection` : "All Products"}
      </h2>
      <div className="row g-4">
        {loading ? (
          <Loading />
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card h-100 shadow-sm border-0 transition hover-shadow"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="p-3 bg-light text-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      height: "150px",
                      objectFit: "contain",
                    }}
                    className="card-img-top"
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title fw-bold text-truncate">
                    {product.title}
                  </h6>
                  <p
                    className="card-text small text-muted flex-grow-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold text-primary">
                      ${product.price}
                    </span>
                    <button className="btn btn-outline-primary btn-sm rounded-pill">
                      View Details
                    </button>
                    <button className="btn btn-primary btn-sm rounded-pill" onClick={(e)=>{
                      e.stopPropagation();
                      addToCart(product);
                    }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <style>{`
        .transition { transition: all 0.3s ease; }
        .hover-shadow:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
}

export default Products;
