import React from "react";
import { FaHome, FaBoxOpen, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "./context/AuthContext";
import { supabase } from "./js/main";
import { useState } from "react";
import Switch from "./components/Switch";
import SearchBar from "./SearchBar";
import { useCart } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";

function Header({ theme, toggleTheme }) {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { addToCart, itemsCount } = useCart();

  const { user } = useAuth();

  function handleBlur() {
    setTimeout(() => {
      setShowResults(false);
    }, 10);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Choose logo based on the theme
  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  const logoAlt = theme === "dark" ? "Dark Logo" : "Light Logo";
  const handleCartOpen = () => {
    setShowCart(true);
  };

  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      >
        <div className="container">
          <Link
            to="/"
            className="navbar-brand text-white text-decoration-none d-flex align-items-center justify-content-center"
            style={{ gap: "8px" }}
          >
            <img src={logoSrc} alt={logoAlt} style={{ height: "42px" }} />
            <style>{`
              .header-logo {
                max-height: 70px;
                min-height: 70px;
                width: auto;
                display: block;
              }
              .header-fixed-height {
                min-height: 70px;
                display: flex;
                align-items: center !important;
              }
              .custom-blue-dark {
                background: linear-gradient(90deg, #181e3a 0%, #22306b 100%) !important;
                border-bottom: 2px solid #1e293b;
              }
            `}</style>
          </Link>
          <SearchBar
            products={[]}
            onResults={(results) => {
              console.log("Search results:", results);
            }}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mb-2 mb-lg-0 w-100 justify-content-end align-items-center">
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link text-decoration-none d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <FaBoxOpen size={20} /> Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link text-decoration-none d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <FaInfoCircle size={20} /> About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link  text-decoration-none d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <FaEnvelope size={20} /> Contact
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link ">Hey, {user.email}</span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn bg-dark opacity-75"
                      onClick={handleLogout}
                    >
                      Signout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link text-white text-decoration-none d-flex align-items-center"
                      style={{ gap: "6px" }}
                    >
                      <IoLogIn size={20} />
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/register"
                      className="nav-link text-white text-decoration-none d-flex align-items-center"
                      style={{ gap: "6px" }}
                    >
                      <IoLogIn size={20} />
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div
          className="d-flex align-items-center"
          style={{ gap: "12px", marginRight: "16px" }}
        >
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn position-relative"
              onClick={handleCartOpen}
              aria-label="Open Cart"
            >
              <span className="header-cart-icon-wrap">
                <svg
                  viewBox="0 0 24 24"
                  className="header-cart-icon"
                  aria-hidden="true"
                >
                  <path d="M7 4H4v2h1.35l2.52 8.4A2 2 0 0 0 9.79 16H18a2 2 0 0 0 1.88-1.32L22 9H8.27l-.6-2H7Zm3 16a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                </svg>
              </span>
              {itemsCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {itemsCount}
                </span>
              )}
            </button>
          </div>
          <Switch checked={theme === "dark"} onChange={toggleTheme} />
          <CartDrawer open={showCart} onClose={() => setShowCart(false)} theme={theme} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
