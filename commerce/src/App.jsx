import React from "react";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import About from "./view/About";
import Products from "./view/Products";
import Contact from "./view/Contact";
import Login from "./Login";
import SecondNavigation from "./SecondNavigation";
import Register from "./Register";

const App = () => {
  return (
    <div>
      <Header />
      <SecondNavigation />
      <Routes>
        <Route path="/" />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;

// Saycheese_26666
