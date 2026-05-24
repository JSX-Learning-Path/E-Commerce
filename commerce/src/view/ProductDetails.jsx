import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fakeApi from "../api/FakeApi";
import Loading from "../components/Loading";
import { useCart } from "../context/CartContext";
import { useWishList } from "../context/WishContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const { addToCart } = useCart();
  const wishListContext = useWishList();
  const toggleWishList = wishListContext?.toggleWishList;
  const isInWishList = wishListContext?.isInWishList || (() => false);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const data = await fakeApi.fetchProductsById(id);
        if (!data) {
          throw new Error("Product data is undefined");
        }
        setProduct(data);
        setActiveImage(data.thumbnail);

        // Fetch similar products (same category)
        const allProducts = await fakeApi.fetchProducts();
        const filtered = allProducts
          .filter((p) => p.category === data.category && p.id !== data.id)
          .slice(0, 4); // Show only top 4
        setSimilarProducts(filtered);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
    window.scrollTo(0, 0); 
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };
  const handleToggleWishList = () => {
    if (!product) {
      return;
    }
    if (typeof toggleWishList === "function") {
      toggleWishList(product);
    } else {
      console.warn("toggleWishList не е дефинирана функция в WishContext!");
    }
  };

  if (loading) return <Loading />;
  if (!product)
    return (
      <div className="container py-5 text-center">
        <h3>Product not found</h3>
      </div>
    );

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-dark mb-4"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left me-2"></i>Back
      </button>

      <div className="row g-4 g-lg-5">
        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-sm p-3 bg-white rounded">
            <img
              src={activeImage || product.thumbnail}
              alt={product.title}
              className="img-fluid rounded"
              style={{
                width: "100%",
                height: "auto",
                minHeight: "300px",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
            {product.images && product.images.length > 0 && (
              <div className="d-flex gap-2 mt-3 overflow-auto pb-2 justify-content-start justify-content-md-center">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.title}-${idx}`}
                    className={`img-thumbnail flex-shrink-0 ${activeImage === img ? "border-primary border-2" : ""}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6">
          <span className="badge bg-primary-subtle text-primary mb-2 text-capitalize">
            {product.category}
          </span>
          <h1 className="fw-bold mb-3 h2 h1-md">{product.title}</h1>
          <div className="d-flex align-items-center mb-3">
            <div className="text-warning me-2">
              <i className="bi bi-star-fill"></i>
              <span className="ms-1 fw-bold text-dark">{product.rating}</span>
            </div>
            <span className="text-muted small">| {product.stock} in stock</span>
          </div>

          <h2 className="text-danger fw-bold mb-4">${product.price}</h2>

          <div className="mb-4">
            <h5 className="fw-bold">Description</h5>
            <p className="text-muted lead fs-6">{product.description}</p>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6">
              <div className="p-3 border rounded bg-light">
                <small className="text-muted d-block">Brand</small>
                <span className="fw-bold">{product.brand || "N/A"}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 border rounded bg-light">
                <small className="text-muted d-block">Discount</small>
                <span className="fw-bold text-success">
                  {product.discountPercentage}% OFF
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary btn-lg rounded-pill shadow-sm flex-grow-1"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus me-2"></i>Add to Cart
            </button>
            <button
              className={`btn btn-lg rounded-pill shadow-sm flex-grow-1 d-inline-flex align-items-center justify-content-center gap-2 ${isInWishList(product?.id) ? "btn-danger" : "btn-outline-danger"}`}
              onClick={handleToggleWishList}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isInWishList(product?.id) ? "currentColor" : "none"}
                aria-hidden="true"
              >
                <path
                  d="M12 20.4 4.9 13.6A4.8 4.8 0 0 1 11.8 7l.2.2.2-.2a4.8 4.8 0 0 1 6.9 6.6L12 20.4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{isInWishList(product?.id) ? "Liked" : "Like"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="mt-5 pt-5 border-top">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h3 className="fw-bold mb-1">Similar Products</h3>
              <p className="text-muted small">
                You might also like these items from {product.category}
              </p>
            </div>
            <button
              className="btn btn-outline-primary btn-sm rounded-pill px-4 mb-2"
              onClick={() =>
                navigate("/products", {
                  state: { selectedCategory: product.category },
                })
              }
            >
              See more similar products{" "}
              <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>

          <div className="row g-3">
            {similarProducts.map((item) => (
              <div key={item.id} className="col-6 col-md-3">
                <div
                  className="card h-100 border-0 shadow-sm transition hover-shadow"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="p-2 bg-light text-center rounded-top">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-fluid"
                      style={{ height: "120px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="card-body p-2 d-flex flex-column">
                    <h6 className="card-title small fw-bold text-truncate mb-1">
                      {item.title}
                    </h6>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-primary small">
                        ${item.price}
                      </span>
                      <div
                        className="text-warning"
                        style={{ fontSize: "0.7rem" }}
                      >
                        <i className="bi bi-star-fill"></i> {item.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
