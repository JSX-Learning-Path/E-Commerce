import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fakeApi from "../api/fakeApi";

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const products = await fakeApi.fetchProducts();
        const homeCategories = [
          {
            title: "Gaming & Tech",
            slug: "laptops",
            color: "border-primary",
            icon: "bi-pc-display",
            bg: "bg-primary-subtle",
            type: "grid",
            items: products
              .filter(
                (p) => p.category === "laptops" || p.category === "tablets",
              )
              .slice(0, 4),
          },
          {
            title: "Fashion World",
            slug: "mens-shirts",
            color: "border-danger",
            icon: "bi-bag-heart",
            bg: "bg-danger-subtle",
            type: "grid",
            items: products
              .filter(
                (p) =>
                  p.category === "mens-shirts" ||
                  p.category === "womens-dresses" ||
                  p.category === "tops",
              )
              .slice(0, 4),
          },
          {
            title: "Modern Home",
            slug: "home-decoration",
            color: "border-success",
            icon: "bi-house-heart",
            bg: "bg-success-subtle",
            type: "grid",
            items: products
              .filter(
                (p) =>
                  p.category === "home-decoration" ||
                  p.category === "furniture",
              )
              .slice(0, 4),
          },
          {
            title: "Daily Smartphones",
            slug: "smartphones",
            color: "border-info",
            icon: "bi-phone",
            bg: "bg-info-subtle",
            type: "grid",
            items: products
              .filter((p) => p.category === "smartphones")
              .slice(0, 4),
          },
          {
            title: "Glow & Beauty",
            slug: "beauty",
            color: "border-warning",
            icon: "bi-stars",
            bg: "bg-warning-subtle",
            type: "single",
            item: products.find((p) => p.category === "beauty"),
          },
          {
            title: "Auto & Moto",
            slug: "vehicle",
            color: "border-secondary",
            icon: "bi-car-front",
            bg: "bg-secondary-subtle",
            type: "grid",
            items: products
              .filter(
                (p) => p.category === "motorcycle" || p.category === "vehicle",
              )
              .slice(0, 4),
          },
        ];
        setCategories(homeCategories);
      } catch (error) {
        throw new Error("Failed to load home data");
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="min-vh-100">
      <div className="container-fluid py-0 position-relative">
        <div
          className="bg-dark text-white text-center shadow-sm hero-section d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundImage: "linear-gradient(45deg, #3aa3e4 0%, #ffffff 100%)",
            minHeight: "350px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="hero-title fw-bold">Welcome to NextCart</h1>
          <p className="hero-subtitle text-black">
            Your one-stop{" "}
            <span
              className="fw-bold"
              style={{
                color: "#fd7e14",
                textShadow:
                  "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              }}
            >
              shop
            </span>{" "}
            from electronics to Fashion, home essentials to groceries, and more!
          </p>
          <button
            className="btn btn-primary mt-3 rounded-pill"
            onClick={() => navigate("/products")}
          >
            Show now
          </button>
        </div>
      </div>
      <div className="container my-5">
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4">
              <div
                className={`card h-100 border border-dark border-opacity-25 shadow-lg relative overflow-hidden d-flex flex-column ${category.bg}`}
              >
                <div
                  className={`card-header ${category.bg} border-bottom border-dark border-opacity-25 py-3 d-flex align-items-center justify-content-between`}
                >
                  <h5 className="card-title mb-0">{category.title}</h5>
                  <span className="badge bg-white border-dark text-dark border">
                    <small>On sale</small>
                  </span>
                </div>
                <div className="card-body">
                  {category.type === "grid" ? (
                    <div className="row g-2">
                      {category.items.map((item) => (
                        <div key={item.id} className="col-6">
                          <div
                            onClick={() => handleProductClick(item.id)}
                            className="card h-100 border-0 bg-light p-2 text-center hover-shadow transition cursor-pointer"
                          >
                            <img
                              src={item.thumbnail}
                              alt={item.title || item.name || "product"}
                              className="card-img-top mx-auto"
                              style={{ width: "80px", height: "80px" }}
                            />
                            <div className="card-body p-1">
                              <small className="d-block text-truncate">
                                {item.title || item.name}
                              </small>
                              {item.price !== undefined && (
                                <small className="text-muted">
                                  ${item.price}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p>No items to display</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
