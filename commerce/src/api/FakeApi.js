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
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
      return null; 
  }
  const data = await response.json();
  console.log("Fetched product data:", data);
  return data;
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

export default { fetchProducts, fetchProductsById, fetchProductsByCategory };
