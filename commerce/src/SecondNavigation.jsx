import React from "react";
import { NavLink, useLocation } from "react-router-dom";
function SecondNavigation() {
  const location = useLocation();

  const categories = [
    { name: "Gaming and Tech", slug: "laptops" },
    { name: "Fashion World", slug: "mens-shirts" },
    { name: "Modern Home", slug: "home-decoration" },
    { name: "Daily Smartphones", slug: "smartphones" },
    { name: "Glow and Beauty", slug: "beauty" },
    { name: "Auto and Moto", slug: "automotive" },
  ];
  return (
    <nav className="py-3 ">
      <div className="d-flex justify-content-center ">
        <ul className="nav gap-2 flex-wrap py-2 bg-light mt-3 d-inline-flex rounded ">
        
          {categories.map((cat) => (
            <li key={cat.slug} className="nav-item">
              <NavLink
                to="/products"
                state={{ selectedCategory: cat.slug }}
                className={() => {
                  const isActive =
                    location.state?.selectedCategory === cat.slug;
                  return `nav-link rounded-pill py-2 px-3 px-sm-4 transition-all${isActive ? " active" : ""}`;
                }}
              >
                {cat.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default SecondNavigation;
