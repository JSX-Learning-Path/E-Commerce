// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import ProductSearchResult from "../components/ProductSearchResult";

// // Взимаме текущата тема от body класа
// function getCurrentTheme() {
//   if (typeof document !== "undefined") {
//     return document.body.classList.contains("dark-mode") ? "dark" : "light";
//   }
//   return "light";
// }

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [theme, setTheme] = useState(getCurrentTheme());

//   useEffect(() => {
//     async function fetchProducts() {
//       setLoading(true);
//       try {
//         const res = await axios.get("https://dummyjson.com/products?limit=30");
//         setProducts(res.data.products || []);
//       } catch (e) {
//         setProducts([]);
//       }
//       setLoading(false);
//     }
//     fetchProducts();

//     // Слушаме за промяна на тема
//     const observer = new MutationObserver(() => {
//       setTheme(getCurrentTheme());
//     });
//     observer.observe(document.body, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });
//     return () => observer.disconnect();
//   }, []);

//   // Фонът на контейнера се сменя според темата
//   const containerBg = theme === "dark" ? "#181e3a" : "#f8fafc";
//   return (
//     <div
//       style={{
//         maxWidth: 900,
//         margin: "0 auto",
//         padding: 24,
//         background: containerBg,
//         borderRadius: 18,
//         boxShadow:
//           theme === "dark"
//             ? "0 2px 16px rgba(60,60,120,0.18)"
//             : "0 2px 16px rgba(60,60,120,0.08)",
//       }}
//     >
//       <h1>Our Products</h1>
//       <p>Explore our wide range of products.</p>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//             gap: 24,
//           }}
//         >
//           {/* {products.map((product) => (
//             // <ProductSearchResult
//             //   key={product.id}
//             //   product={product}
//             //   theme={theme}
//             // />
//           ))} */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;
