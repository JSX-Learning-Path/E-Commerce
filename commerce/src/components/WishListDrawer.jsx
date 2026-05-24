import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishList } from "../context/WishContext";
import "../styles/WishlistDrawer.css";

function WishListDrawer({ open, onClose, theme = "light" }) {
  const navigate = useNavigate();
  const { wishListItems, removeFromWishList, clearWishList, wishListCount } =
    useWishList();

  if (!open) {
    return null;
  }

  const panelClass =
    theme === "dark"
      ? "wishlist-panel wishlist-panel-dark"
      : "wishlist-panel wishlist-panel-light";

  return (
    <>
      <div className="wishlist-backdrop" onClick={onClose}></div>
      <aside className={panelClass}>
        <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
          <div>
            <p className="text-uppercase small mb-1 wishlist-eyebrow">Likes</p>
            <h4 className="mb-1">Your wishlist</h4>
            <p className="text-muted mb-0 small">
              {wishListCount} item{wishListCount === 1 ? "" : "s"} saved
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary rounded-circle wishlist-close-btn"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            ×
          </button>
        </div>

        {wishListItems.length > 0 ? (
          <>
            <div className="d-flex flex-column gap-3">
              {wishListItems.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  <button
                    type="button"
                    className="wishlist-item-content"
                    onClick={() => {
                      onClose();
                      navigate(`/product/${item.id}`);
                    }}
                  >
                    <div className="wishlist-item-thumb-wrap">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="wishlist-item-thumb"
                      />
                    </div>
                    <div className="flex-grow-1 text-start overflow-hidden">
                      <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                        <h6 className="mb-0 text-truncate">{item.title}</h6>
                        <span className="badge text-bg-danger rounded-pill">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="small text-muted mb-1 text-capitalize">
                        {item.category}
                        {item.brand ? ` • ${item.brand}` : ""}
                      </p>
                      <div className="small text-warning">
                        <i className="bi bi-star-fill me-1"></i>
                        {item.rating}
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger rounded-pill mt-3"
                    onClick={() => removeFromWishList(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-outline-danger w-100 rounded-pill mt-4 py-3 fw-semibold"
              onClick={clearWishList}
            >
              Clear wishlist
            </button>
          </>
        ) : (
          <div className="wishlist-empty-state text-center">
            <div className="wishlist-empty-icon mb-3">
              <i className="bi bi-heart"></i>
            </div>
            <h5>No liked products yet</h5>
            <p className="text-muted mb-0">
              Click the like button on a product and it will appear here.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

export default WishListDrawer;
