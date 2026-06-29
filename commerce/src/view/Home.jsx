import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fakeApi from "../api/FakeApi";
import Loading from "../components/Loading";

const Home = () => {
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
            type: "grid",
            items: products.filter((p) => p.category === "beauty").slice(0, 4),
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

        setCategories(
          homeCategories.filter(
            (cat) =>
              (cat.type === "grid" && cat.items.length > 0) ||
              (cat.type === "single" && cat.item),
          ),
        );
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleCategoryClick = (slug) => {
    navigate("/products", { state: { selectedCategory: slug } });
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-vh-100 ">
      <div className="container-fluid p-0 mb-5 position-relative">
        <div
          className="mobile-card bg-dark text-white text-center py-5 shadow-sm hero-section"
          style={{
            backgroundImage: "linear-gradient(45deg, #3aa3e4 0%, #ffffff 100%)",
            minHeight: "350px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h1 className="hero-title fw-bold mb-3">Welcome to NexCart</h1>
            <p className="lead fs-4 text-dark fw-medium hero-subtitle">
              Exclusive Monthly Promo: Enjoy{" "}
              <span
                className="fw-bold"
                style={{
                  color: "#fd7e14",
                  textShadow:
                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
              >
                -25% OFF
              </span>{" "}
              on all categories!
            </p>
            <button
              className="btn btn-light btn-lg px-5 rounded-pill shadow-sm"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-120px" }}>
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4">
              <div
                className={`card h-100 border border-dark border-opacity-25 shadow-lg position-relative overflow-hidden`}
              >
                <div
                  className={`card-header ${category.bg} border-bottom border-dark border-opacity-10 py-3 d-flex align-items-center justify-content-between`}
                >
                  <h5 className="card-title mb-0 fw-bold">
                    <i
                      className={`bi ${category.icon} me-2 font-primary text-opacity-50`}
                    ></i>
                    {category.title}
                  </h5>
                  <span className="badge bg-white text-dark rounded-pill">
                    Featured
                  </span>
                </div>

                <div className="card-body">
                  {category.type === "grid" ? (
                    <div className="row g-2">
                      {category.items.map((item) => (
                        <div key={item.id} className="col-6">
                          <div
                            onClick={() => handleProductClick(item.id)}
                            className="card h-100 border-0 bg-light p-2 text-center hover-shadow transition"
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={item.thumbnail}
                              className="card-img-top mx-auto"
                              alt={item.title}
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "contain",
                              }}
                            />
                            <div className="p-1 mt-1">
                              <small
                                className="d-block text-truncate fw-medium"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {item.title}
                              </small>
                              <span
                                className="badge bg-success-subtle text-success mt-1"
                                style={{ fontSize: "0.65rem" }}
                              >
                                ${item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="text-center p-3"
                      onClick={() => handleProductClick(category.item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={category.item.thumbnail}
                        className="img-fluid rounded shadow-sm mb-3"
                        alt={category.item.title}
                        style={{ maxHeight: "180px", objectFit: "contain" }}
                      />
                      <h6 className="fw-bold text-primary">
                        {category.item.title}
                      </h6>
                    </div>
                  )}
                </div>

                <div className="card-footer bg-white border-top-0 pt-0 pb-3 px-3">
                  <button
                    onClick={() => handleCategoryClick(category.slug)}
                    className="btn btn-outline-primary btn-sm w-100 rounded-pill fw-bold transition-all hover-bg-primary"
                  >
                    See Collection <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .transition { transition: all 0.3s ease; }
        .transition-all { transition: all 0.2s ease-in-out; }
        .hover-shadow:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .hover-bg-primary:hover { background-color: #0d6efd; color: white; }
        margin-top: 120px;
      `}</style>
    </div>
  );
};

export default Home;
