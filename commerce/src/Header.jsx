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
      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 1040;
          backdrop-filter: blur(18px);
          border-bottom: 1px solid ${theme === "dark"
            ? "rgba(148, 163, 184, 0.16)"
            : "rgba(15, 23, 42, 0.08)"};
          background: ${theme === "dark"
            ? "linear-gradient(180deg, rgba(15, 23, 42, 0.94) 0%, rgba(17, 24, 39, 0.9) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 250, 252, 0.9) 100%)"};
        }

        .header-shell {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 0.9rem 0;
        }

        .header-brand {
          display: inline-flex;
          align-items: center;
          flex: 0 0 auto;
        }

        .header-brand img {
          height: 52px;
          width: auto;
          display: block;
        }

        .header-search {
          flex: 1 1 340px;
          min-width: min(100%, 280px);
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .header-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.75rem 1rem;
          border-radius: 999px;
          color: ${theme === "dark" ? "#e2e8f0" : "#0f172a"};
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .header-nav-link:hover {
          background: ${theme === "dark"
            ? "rgba(30, 41, 59, 0.92)"
            : "rgba(226, 232, 240, 0.78)"};
          color: ${theme === "dark" ? "#ffffff" : "#020617"};
          transform: translateY(-1px);
        }

        .header-utilities {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .header-profile-link {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          min-height: 52px;
          max-width: 360px;
          padding: 0.75rem 1.1rem;
          border-radius: 999px;
          border: 1px solid ${theme === "dark"
            ? "rgba(96, 165, 250, 0.32)"
            : "rgba(37, 99, 235, 0.26)"};
          background: ${theme === "dark"
            ? "rgba(30, 41, 59, 0.86)"
            : "rgba(255, 255, 255, 0.88)"};
          color: ${theme === "dark" ? "#bfdbfe" : "#2563eb"};
          text-decoration: none;
          font-weight: 600;
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
        }

        .header-profile-link:hover {
          transform: translateY(-1px);
        }

        .header-profile-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .header-action-btn,
        .header-signout-btn {
          width: 52px;
          height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.1);
        }

        .header-action-btn {
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: ${theme === "dark"
            ? "rgba(30, 41, 59, 0.92)"
            : "rgba(255, 255, 255, 0.92)"};
          color: ${theme === "dark" ? "#f8fafc" : "#0f172a"};
        }

        .header-signout-btn {
          border: 1px solid rgba(248, 113, 113, 0.28);
          background: ${theme === "dark"
            ? "rgba(127, 29, 29, 0.24)"
            : "rgba(254, 242, 242, 0.92)"};
          color: ${theme === "dark" ? "#fecaca" : "#b91c1c"};
        }

        .header-action-btn:hover,
        .header-signout-btn:hover {
          transform: translateY(-1px);
        }

        .header-icon-svg {
          width: 28px;
          height: 28px;
          display: block;
          color: inherit;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .header-icon-heart {
          fill: currentColor;
          stroke: none;
        }

        .header-auth-links {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .header-auth-link {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          min-height: 48px;
          padding: 0.75rem 1rem;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          color: ${theme === "dark" ? "#f8fafc" : "#0f172a"};
          background: ${theme === "dark"
            ? "rgba(30, 41, 59, 0.88)"
            : "rgba(255, 255, 255, 0.9)"};
          border: 1px solid rgba(148, 163, 184, 0.16);
        }

        @media (max-width: 1199px) {
          .header-nav {
            order: 3;
            width: 100%;
          }

          .header-utilities {
            margin-left: 0;
          }
        }

        @media (max-width: 767px) {
          .header-shell {
            gap: 0.85rem;
          }

          .header-brand img {
            height: 46px;
          }

          .header-search,
          .header-nav,
          .header-utilities {
            width: 100%;
          }

          .header-nav {
            justify-content: center;
          }

          .header-utilities {
            justify-content: space-between;
          }

          .header-profile-link {
            max-width: calc(100% - 70px);
            flex: 1 1 auto;
          }
        }
      `}</style>

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
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5" fill="currentColor"></circle>
                    <path
                      d="M4.5 19a7.5 7.5 0 0 1 15 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <span className="header-profile-text">Hey, {displayName}</span>
                </Link>
                <button
                  type="button"
                  className="btn header-signout-btn"
                  onClick={handleLogout}
                  aria-label="Sign out"
                >
                  <svg viewBox="0 0 24 24" className="header-icon-svg" aria-hidden="true">
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
              className="btn position-relative header-action-btn"
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
              <svg viewBox="0 0 24 24" className="header-icon-svg" aria-hidden="true">
                <circle cx="10" cy="19" r="1.6" fill="currentColor" stroke="none"></circle>
                <circle cx="17.5" cy="19" r="1.6" fill="currentColor" stroke="none"></circle>
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
      <CartDrawer open={showCart} onClose={() => setShowCart(false)} theme={theme} />
    </header>
  );
}

export default Header;