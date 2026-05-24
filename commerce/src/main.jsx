import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WhishListProvider } from "./context/WishContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WhishListProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </WhishListProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
