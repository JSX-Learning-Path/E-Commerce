import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./js/theme";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import About from "./view/About";
import Products from "./Product";
import Contact from "./view/Contact";
import Login from "./Login";
import SecondNavigation from "./SecondNavigation";
import Register from "./Register";
import Home from "./view/Home";
import Footer from "./Footer";
import ProductDetails from "./view/ProductDetails";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header theme={theme} toggleTheme={toggleTheme} />
      {/* <Switch /> */}
      <SecondNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

// Saycheese_26666
