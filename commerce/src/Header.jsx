import React from "react";
import { useState } from "react";
import { FaBoxOpen, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { supabase } from "./js/main";
// import Switch from "./components/Switch";
import SearchBar from "./SearchBar";
import { useCart } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import WishListDrawer from "./components/WishListDrawer";
// import WishListDrawer from "./components/WishListDrawer";
// import { useWishList } from "./context/WishContext";
import { useWishList } from "./context/WishContext";
import "./styles/Header.css";
import { BiCart } from "react-icons/bi";
import { AiTwotoneHeart } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";


function Header({ theme, toggleTheme }) {
  const [showCart, setShowCart] = React.useState(false);
  const [showWishList, setShowWishList] = React.useState(false);
  const { itemsCount } = useCart();
  const { wishListCount } = useWishList();
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";
  const logoAlt = theme === "dark" ? "Dark Logo" : "Light Logo";
  const displayName =
    user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email;

  return (
    <header className={`site-header site-header-${theme}`}>
      <div className="container">
        <div className="header-shell">
          <Link to="/" className="header-brand" aria-label="NexCart home">
            <img src={logoSrc} alt={logoAlt} />
          </Link>

          <div className="header-search">
            <SearchBar
              burger={
                <button
                  className="header-burger d-md-none"
                  aria-label="Toggle menu"
                  aria-expanded={isMobile}
                  onClick={() => setIsMobile((prev) => !prev)}
                >
                  <span
                    className={`header-burger-icon ${isMobile ? "open" : ""}`}
                  />
                </button>
              }
            />
          </div>

          <nav className="header-nav" aria-label="Primary navigation">
            <Link to="/products" className="header-nav-link ">
              <FaBoxOpen size={18} h /> Products
            </Link>
            <Link to="/about" className="header-nav-link">
              <FaInfoCircle size={18} /> About
            </Link>
            <Link to="/contact" className="header-nav-link">
              <FaEnvelope size={18} /> Contact
            </Link>
          </nav>

          <div className="header-utilities align-items-center">
            {user ? (
              <>
                <Link to="/profile" className="header-profile-link">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="3.5" fill="currentColor"></circle>
                    <path
                      d="M4.5 19a7.5 7.5 0 0 1 15 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <span className="header-profile-text">
                    Hey, {displayName}
                  </span>
                </Link>
                <button
                  type="button"
                  className="btn header-signout-btn p-0"
                  onClick={handleLogout}
                  aria-label="Sign out"
                >
                    <CiLogout size={22} />
                </button>
              </>
            ) : (
              <div className="header-auth-links">
                <Link to="/login" className="header-auth-link">
                  <IoLogIn size={18} /> Login
                </Link>
                <Link to="/register" className="header-auth-link">
                  <IoLogIn size={18} /> Register
                </Link>
              </div>
            )}

            <button
              type="button"
              className="btn position-relative header-action-btn p-0"
              onClick={() => setShowWishList(true)}
              aria-label="Open Wishlist"
            >
              <AiTwotoneHeart size={20} />
              {wishListCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishListCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="btn position-relative header-action-btn p-0"
              onClick={() => setShowCart(true)}
              aria-label="Open Cart"
            >
              <BiCart size={20} />
              {itemsCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {itemsCount}
                </span>
              )}
            </button>

            {/* <Switch checked={theme === "dark"} onChange={toggleTheme} /> */}
          </div>
          <div className={`mobile-menu d-md-none ${isMobile ? "open" : ""}`}>
            <nav className="mobile-nav-links">
              <Link
                to="/products"
                className="mobile-nav-link"
                onClick={() => setIsMobile(false)}
              >
                <FaBoxOpen size={18} /> Products
              </Link>
              <Link
                to="/about"
                className="mobile-nav-link"
                onClick={() => setIsMobile(false)}
              >
                <FaInfoCircle size={18} /> About
              </Link>
              <Link
                to="/contact"
                className="mobile-nav-link"
                onClick={() => setIsMobile(false)}
              >
                <FaEnvelope size={18} /> Contact
              </Link>
            </nav>

            <div className="mobile-utilities mt-3">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="mobile-auth-link"
                    onClick={() => setIsMobile(false)}
                  >
                    Hey, {displayName}
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-secondary w-100 mt-2"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="d-flex gap-2 flex-column">
                  <Link
                    to="/login"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setIsMobile(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-sm"
                    onClick={() => setIsMobile(false)}
                  >
                    Register
                  </Link>
                </div>
              )}

              <div className="d-flex gap-2 mt-3">
                <button
                  className="btn btn-light flex-grow-1"
                  onClick={() => {
                    setIsMobile(false);
                    setShowWishList(true);
                  }}
                  aria-label="Open Wishlist"
                >
                  Wishlist
                </button>
                <button
                  className="btn btn-dark flex-grow-1"
                  onClick={() => {
                    setIsMobile(false);
                    setShowCart(true);
                  }}
                  aria-label="Open Cart"
                >
                  Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WishListDrawer
        open={showWishList}
        onClose={() => setShowWishList(false)}
        theme={theme}
      />
      <CartDrawer
        open={showCart}
        onClose={() => setShowCart(false)}
        theme={theme}
      />
    </header>
  );
}

export default Header;
