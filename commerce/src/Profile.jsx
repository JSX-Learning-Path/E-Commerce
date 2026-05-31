import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useOrders } from "./context/OrderContext";
import { useCart } from "./context/CartContext";
import { useWishList } from "./context/WishContext";
import "./styles/Profile.css";

function formatCurrency(value) {
  return `${Number(value || 0).toFixed(2)}`;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Profile View

function Profile({ theme = "light" }) {
  const { user } = useAuth();
  const { orders, ordersCount } = useOrders();
  const { wishListCount } = useWishList();
  const { itemsCount } = useCart();
  const isDark = theme === "dark";

  const stats = useMemo(() => {
    const totalSpent = orders.reduce(
      (sum, order) => sum + Number(order.totals?.total || 0),
      0,
    );
    const totalProducts = orders.reduce(
      (sum, order) => sum + Number(order.totals?.itemsCount || 0),
      0,
    );
    return {
      totalSpent,
      totalProducts,
      lastOrder: orders[0] || null,
    };
  }, [orders]);
  if (!user) return <Navigate to="/login" />;

  const displayName = user.email.split("@")[0] || "My profile";
  return (
    <div className="profile-page py-5">
      <div className="container">
        <div className="profile-hero shadow-lg mb-4">
          <div>
            <p className="text-uppercase small fw-bold mb-2 profile-eyebrow">
              Customer dashboard
            </p>
            <h1 className="display-6 fw-bold mb-2">{displayName}</h1>
            <p className="mb-0 profile-secondary-text">{user.email}</p>
          </div>
          <div className="profile-hero-badges">
            <span className="badge profile-badge rounded-pill px-3 py-2">
              {ordersCount} orders
            </span>
            <span className="badge profile-badge rounded-pill px-3 py-2">
              {wishListCount} liked products
            </span>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6 col-xl-3">
            <div className="profile-stat-card h-100">
              <span className="profile-stat-label">Total orders</span>
              <strong className="profile-stat-value">{ordersCount}</strong>
              <small className="profile-muted-text">
                Completed and active purchases
              </small>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="profile-stat-card h-100">
              <span className="profile-stat-label">Total spent</span>
              <strong className="profile-stat-value">
                {formatCurrency(stats.totalSpent)}
              </strong>
              <small className="profile-muted-text">
                Lifetime spending in the store
              </small>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="profile-stat-card h-100">
              <span className="profile-stat-label">Items ordered</span>
              <strong className="profile-stat-value">
                {stats.totalProducts}
              </strong>
              <small className="profile-muted-text">
                Units across all saved orders
              </small>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="profile-stat-card h-100">
              <span className="profile-stat-label">Current cart</span>
              <strong className="profile-stat-value">{itemsCount}</strong>
              <small className="profile-muted-text">
                Products waiting for checkout
              </small>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-xl-4">
            <div className="profile-panel h-100">
              <h3 className="h5 fw-bold mb-3">Account overview</h3>
              <div className="d-flex flex-column gap-3">
                <div>
                  <span className="profile-field-label">Email</span>
                  <div className="profile-field-value">{user.email}</div>
                </div>
                <div>
                  <span className="profile-field-label">Last order</span>
                  <div className="profile-field-value">
                    {stats.lastOrder
                      ? `${stats.lastOrder.orderNumber} on ${formatDate(stats.lastOrder.createdAt)}`
                      : "No orders yet"}
                  </div>
                </div>
                <div>
                  <span className="profile-field-label">Saved products</span>
                  <div className="profile-field-value">
                    {wishListCount} in wishlist
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-8">
            <div className="profile-panel h-100">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h3 className="h5 fw-bold mb-0">Order history</h3>
                <span className="badge profile-badge rounded-pill px-3 py-2">
                  {ordersCount} total
                </span>
              </div>

              {orders.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {orders.map((order) => (
                    <article key={order.id} className="order-card">
                      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
                        <div>
                          <div className="order-number">
                            {order.orderNumber}
                          </div>
                          <div className="profile-muted-text small">
                            {formatDate(order.createdAt)}
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <span className="badge profile-status-badge rounded-pill px-3 py-2">
                            {order.status}
                          </span>
                          <span className="badge profile-badge rounded-pill px-3 py-2 border-0">
                            {order.paymentMethod === "card"
                              ? "Card payment"
                              : "Cash on delivery"}
                          </span>
                        </div>
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-12 col-lg-7">
                          <div className="order-subpanel h-100">
                            <h4 className="h6 fw-bold mb-3">Items</h4>
                            <div className="d-flex flex-column gap-2">
                              {order.items.map((item) => (
                                <div
                                  key={`${order.id}-${item.id}`}
                                  className="order-item-row"
                                >
                                  <div className="d-flex align-items-center gap-3">
                                    <img
                                      src={item.thumbnail}
                                      alt={item.title}
                                      className="order-item-thumb"
                                    />
                                    <div>
                                      <div className="fw-semibold">
                                        {item.title}
                                      </div>
                                      <div className="small profile-muted-text">
                                        Qty {item.quantity}
                                        {item.brand ? ` • ${item.brand}` : ""}
                                      </div>
                                    </div>
                                  </div>
                                  <strong>
                                    {formatCurrency(item.price * item.quantity)}
                                  </strong>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-lg-5">
                          <div className="order-subpanel h-100">
                            <h4 className="h6 fw-bold mb-3">
                              Delivery and totals
                            </h4>
                            <div className="small profile-muted-text mb-2">
                              {order.shippingAddress.address},{" "}
                              {order.shippingAddress.city}{" "}
                              {order.shippingAddress.postalCode}
                            </div>
                            <div className="small profile-muted-text mb-3">
                              {order.customer.fullName} • {order.customer.phone}
                            </div>
                            {order.shippingAddress.notes ? (
                              <div className="small mb-3">
                                <span className="fw-semibold">
                                  Courier notes:
                                </span>{" "}
                                {order.shippingAddress.notes}
                              </div>
                            ) : null}
                            <div className="d-flex justify-content-between small mb-2">
                              <span>Subtotal</span>
                              <strong>
                                {formatCurrency(order.totals.subTotal)}
                              </strong>
                            </div>
                            <div className="d-flex justify-content-between small mb-2">
                              <span>Shipping</span>
                              <strong>
                                {formatCurrency(order.totals.shipping)}
                              </strong>
                            </div>
                            <div className="d-flex justify-content-between pt-2 border-top fw-semibold">
                              <span>Total</span>
                              <strong>
                                {formatCurrency(order.totals.total)}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="profile-empty-state text-center">
                  <div className="profile-empty-icon mb-3">
                    <i className="bi bi-bag-check"></i>
                  </div>
                  <h4 className="h5">No orders yet</h4>
                  <p className="profile-muted-text mb-0">
                    When you complete checkout, your order numbers and full
                    purchase history will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
