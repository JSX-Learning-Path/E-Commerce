import React from "react";
import { FaHome, FaBoxOpen, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "./context/AuthContext";
import { supabase } from "./js/main";

function Header() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand text-white text-decoration-none d-flex align-items-center justify-content-center"
            style={{ gap: "8px" }}
          >
            Home <FaHome size={24} className="ms-1" />
          </Link>
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
                  className="nav-link text-white text-decoration-none d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <FaBoxOpen size={20} /> Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link text-white text-decoration-none d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <FaInfoCircle size={20} /> About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link text-white text-decoration-none d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  <FaEnvelope size={20} /> Contact
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-white">
                      Hey, {user.email}
                    </span>
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
      </nav>
    </header>
  );
}

export default Header;
