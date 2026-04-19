function SecondNavigation() {
  return (
    <nav className="second-nav bg-dark bg-opacity-85 py-2 border-top border-secondary">
      <ul
        className="d-flex list-unstyled justify-content-center mb-0"
        style={{ gap: "20px" }}
      >
        <li className="">
          <a href="#section1" className="text-decoration-none">
            All Products
          </a>
        </li>
        <li>
          <a href="#section2" className="text-decoration-none">
            On Sale
          </a>
        </li>
        <li>
          <a href="#section3" className="text-decoration-none">
            New Arrivals
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SecondNavigation;
