import { CiLocationOn } from "react-icons/ci";
import "./styles/Map.css";
import "./styles/Footer.css";
function Footer() {
  return (
    <div className="footer-container">
      <footer className={`bg-light text-dark-emphasis mt-4`}>
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="footer-image-links">
            <img
              src="public/logo-transparent.png"
              alt="Logo"
              className="image w-25"
            />
            <p className="text-muted">© 2026 NextCart. All rights reserved.</p>
            <div className="footer-links d-flex gap-3">
              <ul className="footer-links list-unstyled d-flex gap-3 border-top border-2 py-2">
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
          <div className="image-location d-flex flex-column">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2959.2857438557094!2d24.728339276752592!3d42.12276567121589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd03c0a396b7f%3A0xcdba5a55532fa58!2z0LYu0LouINCl0YDQuNGB0YLQviDQkdC-0YLQtdCyIC0g0K7Qs9Cu0LbQtdC9LCDRg9C7LiDigJ7Qk9C10L7RgNCz0Lgg0JjQutC-0L3QvtC80L7QsuKAnCAxLCA0MDA0INCf0LvQvtCy0LTQuNCy!5e0!3m2!1sbg!2sbg!4v1775375140185!5m2!1sbg!2sbg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=" map-container border-1 rounded shadow-lg hover:width-105% transition-all duration-300 ease-in-out"
            ></iframe>
            <p className="text-black p-2 d-flex align-items-center gap-1 mt-2 rounded ">
              <CiLocationOn />1 Georgi Ikonomov St., Plovdiv, Bulgaria
            </p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}

export default Footer;
