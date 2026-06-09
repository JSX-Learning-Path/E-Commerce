import React from "react";
import { FaBoxOpen, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { supabase } from "./js/main";
import Switch from "./components/Switch";
import SearchBar from "./SearchBar";
import { useCart } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import WishListDrawer from "./components/WishListDrawer";
// import WishListDrawer from "./components/WishListDrawer";
// import { useWishList } from "./context/WishContext";
import { useWishList } from "./context/WishContext";
import "./styles/Header.css";

function Header({ theme, toggleTheme }) {
  const [showCart, setShowCart] = React.useState(false);
  const [showWishList, setShowWishList] = React.useState(false);
  const { itemsCount } = useCart();
  const { wishListCount } = useWishList();
  const { user } = useAuth();

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
            <SearchBar />
          </div>

          <nav className="header-nav" aria-label="Primary navigation">
            <Link to="/products" className="header-nav-link">
              <FaBoxOpen size={18} /> Products
            </Link>
            <Link to="/about" className="header-nav-link">
              <FaInfoCircle size={18} /> About
            </Link>
            <Link to="/contact" className="header-nav-link">
              <FaEnvelope size={18} /> Contact
            </Link>
          </nav>

          <div className="header-utilities">
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
                  className="btn header-signout-btn"
                  onClick={handleLogout}
                  aria-label="Sign out"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="header-icon-svg"
                    aria-hidden="true"
                  >
                    <path d="M14 7V5.5A1.5 1.5 0 0 0 12.5 4h-6A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h6a1.5 1.5 0 0 0 1.5-1.5V17"></path>
                    <path d="M10 12h9"></path>
                    <path d="m16 8 4 4-4 4"></path>
                  </svg>
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
              className="btn position-relative header-action-btn bg-"
              onClick={() => setShowWishList(true)}
              aria-label="Open Wishlist"
            >
              <svg
                viewBox="0 0 24 24"
                className="header-icon-svg header-icon-heart"
                aria-hidden="true"
              >
                <path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 12 5.03 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.5L12 21.35Z" />
              </svg>
              {wishListCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishListCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="btn position-relative header-action-btn"
              onClick={() => setShowCart(true)}
              aria-label="Open Cart"
            >
              <svg
                viewBox="0 0 24 24"
                className="header-icon-svg  "
                aria-hidden="true"
              >
                <circle
                  cx="10"
                  cy="19"
                  r="1.6"
                  fill="currentColor"
                  stroke="none"
                ></circle>
                <circle
                  cx="17.5"
                  cy="19"
                  r="1.6"
                  fill="currentColor"
                  stroke="none"
                ></circle>
                <path d="M3 4h2.4l1.7 8.1a1.8 1.8 0 0 0 1.8 1.4h8.1a1.8 1.8 0 0 0 1.7-1.2L20.5 7H7.2"></path>
              </svg>
              {itemsCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {itemsCount}
                </span>
              )}
            </button>

            <Switch checked={theme === "dark"} onChange={toggleTheme} />
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
