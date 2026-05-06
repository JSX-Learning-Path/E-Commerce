function Footer() {
  return (
    <div>
      <footer className={`bg-light text-dark-emphasis mt-5`}>
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div>
            <img
              src="public/logo-transparent.png"
              alt="Logo"
              className="w-25"
            />
            <p className="text-muted">© 2026 NextCart. All rights reserved.</p>
            <div className="d-flex gap-3">
              <ul className="list-unstyled d-flex gap-3 border-top border-2 py-2">
                <li>
                  <a
                    href="/about"
                    className="text-decoration-none text-body-emphasis   link-warning"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-decoration-none text-body-emphasis link-warning"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-decoration-none text-body-emphasis link-warning"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-decoration-none text-body-emphasis link-warning"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-decoration-none text-body-emphasis link-warning"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/help"
                    className="text-decoration-none text-body-emphasis link-warning"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
