import React from "react";
import { FaHome, FaBoxOpen, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "./Login";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container   ">
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
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link text-white text-decoration-none d-flex align-items-center"
                  style={{ gap: "6px" }}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
