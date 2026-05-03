import { ThemeProvider } from "styled-components";

const BASE = "https://dummyjson.com";

async function fetchProducts() {
  try {
    const response = await fetch(`${BASE}/products?limit=200`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      return data.products || [];
    }
  } catch (error) {
    console.log("Error fetching products:", error);
    return [];
  }
}

async function fetchProductsById(id) {
  try {
    const response = await fetch(`${BASE}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error!: ${response.status}`);
    } else {
      const data = await response.json();
      return data.products;
    }
  } catch (error) {
    console.log("Error fetching product by id:", error);
    return null;
  }
}

async function fetchProductsByCategory(category) {
  try {
    const response = await fetch(`${BASE}/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error!: ${response.status}`);
    } else {
      const data = await response.json();
      return data.products || [];
    }
  } catch (error) {
    console.log("Error fetching products by category:", error);
    return [];
  }
}



export default {fetchProducts, fetchProductsById, fetchProductsByCategory};