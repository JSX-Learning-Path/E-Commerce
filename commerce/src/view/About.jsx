// import "../styles/About.css";

function About() {
  return (
    <section className="about-hero py-5">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-12 col-md-6">
            <h1 className="display-5 fw-bold">About NexCart</h1>
            <p className="lead text-muted">
              We curate modern products with care — quality, value and service
              in mind. Our team sources items you can rely on and delivers a
              smooth shopping experience.
            </p>
            <div className="d-flex gap-3 mt-4 flex-row flex-sm-row">
              <a href="/products" className="btn btn-primary btn-lg">
                Shop Products
              </a>
              <a href="/contact" className="btn btn-outline-secondary btn-lg">
                Contact Us
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="about-features p-4 rounded shadow-lg bg-white">
              <h4 className="mb-3">Why shop with us?</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Curated selection:</strong> only the best products
                </li>
                <li className="mb-2">
                  <strong>Fast shipping:</strong> reliable delivery options
                </li>
                <li className="mb-2">
                  <strong>Secure checkout:</strong> modern payment methods
                </li>
                <li className="mb-2">
                  <strong>Customer-first:</strong> helpful support and returns
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="fw-bold">Our Story</h3>
          <p className="text-muted">
            We started NexCart to simplify online shopping — combining trusted
            products, honest pricing and service that cares. Every item is
            hand-picked and tested for quality before it reaches our store.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
