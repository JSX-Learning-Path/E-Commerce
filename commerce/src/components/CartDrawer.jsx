import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentCard from "./PaymentCard";
import { useCart } from "../context/CartContext";

const initialCheckoutState = {
  fullName: "",
  phone: "",
  city: "",
  address: "",
  postalCode: "",
  notes: "",
  paymentMethod: "cash",
  cardNumber: "",
  holderName: "",
  expiry: "",
  cvv: "",
};

function CartDrawer({ open, onClose, theme = "light" }) {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemsCount,
    subTotal, 
    shipping,
    total,
  } = useCart();
  const [step, setStep] = useState("cart");
  const [checkoutData, setCheckoutData] = useState(initialCheckoutState);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep("cart");
      setOrderPlaced(false);
      return;
    }

    if (cartItems.length === 0) {
      setStep("cart");
    }
  }, [cartItems.length, open]);

  if (!open) {
    return null;
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    if (name === "cardNumber") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
      const formattedCardNumber = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
      setCheckoutData((currentData) => ({
        ...currentData,
        cardNumber: formattedCardNumber,
      }));
      return;
    }

    if (name === "holderName") {
      setCheckoutData((currentData) => ({
        ...currentData,
        holderName: value.replace(/\s{2,}/g, " ").toUpperCase(),
      }));
      return;
    }

    if (name === "expiry") {
      setCheckoutData((currentData) => ({
        ...currentData,
        expiry: value.replace(/\D/g, "").slice(0, 4),
      }));
      return;
    }

    if (name === "cvv") {
      setCheckoutData((currentData) => ({
        ...currentData,
        cvv: value.replace(/\D/g, "").slice(0, 3),
      }));
      return;
    }

    setCheckoutData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    const requiredFields = [
      checkoutData.fullName,
      checkoutData.phone,
      checkoutData.city,
      checkoutData.address,
      checkoutData.postalCode,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      window.alert("Please fill in the delivery details.");
      return;
    }

    if (checkoutData.paymentMethod === "card") {
      const cardNumberDigits = checkoutData.cardNumber.replace(/\D/g, "");
      const expiryDigits = checkoutData.expiry.replace(/\D/g, "");
      const expiryMonth = Number(expiryDigits.slice(0, 2));
      const cardFields = [checkoutData.holderName.trim()];

      if (cardFields.some((field) => !field.trim())) {
        window.alert("Please fill in the card details.");
        return;
      }

      if (cardNumberDigits.length < 16) {
        window.alert("Please enter a valid 16-digit card number.");
        return;
      }

      if (expiryDigits.length < 4 || Number.isNaN(expiryMonth) || expiryMonth < 1 || expiryMonth > 12) {
        window.alert("Please enter a valid expiry date in MM/YY format.");
        return;
      }

      if (checkoutData.cvv.length < 3) {
        window.alert("Please enter a valid 3-digit CVV.");
        return;
      }
    }

    clearCart();
    setCheckoutData(initialCheckoutState);
    setOrderPlaced(true);
    setStep("success");
  };

  const panelClass = theme === "dark" ? "cart-panel cart-panel-dark" : "cart-panel cart-panel-light";

  return (
    <>
      <div className="cart-backdrop" onClick={onClose}></div>
      <aside className={panelClass}>
        <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
          <div>
            <p className="text-uppercase small mb-1 cart-eyebrow">Bag</p>
            <h4 className="mb-1">Your cart</h4>
            <p className="text-muted mb-0 small">{itemsCount} item{itemsCount === 1 ? "" : "s"} selected</p>
          </div>
          <button type="button" className="btn btn-outline-secondary rounded-circle cart-close-btn" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {step === "cart" && (
          <div className="cart-panel-body">
            {cartItems.length > 0 ? (
              <>
                <div className="d-flex flex-column gap-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <button
                        type="button"
                        className="cart-item-content"
                        onClick={() => {
                          onClose();
                          navigate(`/product/${item.id}`);
                        }}
                      >
                        <div className="cart-item-thumb-wrap">
                          <img src={item.thumbnail} alt={item.title} className="cart-item-thumb" />
                        </div>
                        <div className="flex-grow-1 text-start overflow-hidden">
                          <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                            <h6 className="mb-0 text-truncate">{item.title}</h6>
                            <span className="badge text-bg-primary rounded-pill">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <p className="small text-muted mb-1 text-capitalize">{item.category}{item.brand ? ` • ${item.brand}` : ""}</p>
                          <div className="d-flex align-items-center gap-2 mt-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill" onClick={(event) => { event.stopPropagation(); updateQuantity(item.id, item.quantity - 1); }}>-</button>
                            <span className="fw-semibold">{item.quantity}</span>
                            <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill" onClick={(event) => { event.stopPropagation(); updateQuantity(item.id, item.quantity + 1); }}>+</button>
                          </div>
                        </div>
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-danger rounded-pill mt-3" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary-card mt-4">
                  <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><strong>${subTotal.toFixed(2)}</strong></div>
                  <div className="d-flex justify-content-between mb-2"><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong></div>
                  <div className="d-flex justify-content-between pt-3 border-top"><span className="fw-semibold">Total</span><strong className="fs-5 text-primary">${total.toFixed(2)}</strong></div>
                </div>

                <button type="button" className="btn btn-primary w-100 rounded-pill mt-4 py-3 fw-semibold" onClick={() => setStep("checkout")}>Order now</button>
              </>
            ) : (
              <div className="cart-empty-state text-center">
                <div className="cart-empty-icon mb-3">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h-2l-1 2v2h2l2.6 7.59-1.35 2.44A1 1 0 0 0 8.75 20h10.5v-2h-9.9l1.1-2h7.45a2 2 0 0 0 1.79-1.11L22 8H8.42l-.94-2ZM10 22a1.5 1.5 0 1 0 .001-3.001A1.5 1.5 0 0 0 10 22Zm8 0a1.5 1.5 0 1 0 .001-3.001A1.5 1.5 0 0 0 18 22Z" /></svg>
                </div>
                <h5>Your cart is empty</h5>
                <p className="text-muted mb-0">Add products and they will appear here instantly.</p>
              </div>
            )}
          </div>
        )}

        {step === "checkout" && (
          <form className="cart-panel-body" onSubmit={handlePlaceOrder}>
            <button type="button" className="btn btn-link px-0 mb-2 text-decoration-none" onClick={() => setStep("cart")}>← Back to cart</button>
            <div className="checkout-section">
              <h5 className="mb-3">Delivery details</h5>
              <div className="row g-3">
                <div className="col-12"><input className="form-control form-control-lg rounded-4" name="fullName" placeholder="Full name" value={checkoutData.fullName} onChange={handleFieldChange} /></div>
                <div className="col-12 col-md-6"><input className="form-control form-control-lg rounded-4" name="phone" placeholder="Phone number" value={checkoutData.phone} onChange={handleFieldChange} /></div>
                <div className="col-12 col-md-6"><input className="form-control form-control-lg rounded-4" name="postalCode" placeholder="Postal code" value={checkoutData.postalCode} onChange={handleFieldChange} /></div>
                <div className="col-12"><input className="form-control form-control-lg rounded-4" name="city" placeholder="City" value={checkoutData.city} onChange={handleFieldChange} /></div>
                <div className="col-12"><input className="form-control form-control-lg rounded-4" name="address" placeholder="Address" value={checkoutData.address} onChange={handleFieldChange} /></div>
                <div className="col-12"><textarea className="form-control rounded-4" rows="3" name="notes" placeholder="Notes for courier (optional)" value={checkoutData.notes} onChange={handleFieldChange}></textarea></div>
              </div>
            </div>

            <div className="checkout-section mt-4">
              <h5 className="mb-3">Payment</h5>
              <div className="d-flex flex-column gap-3">
                <label className="payment-option-card">
                  <input type="radio" className="form-check-input" name="paymentMethod" value="cash" checked={checkoutData.paymentMethod === "cash"} onChange={handleFieldChange} />
                  <span>
                    <strong>Cash on delivery</strong>
                    <span className="d-block small text-muted">Pay when the courier arrives.</span>
                  </span>
                </label>
                <label className="payment-option-card">
                  <input type="radio" className="form-check-input" name="paymentMethod" value="card" checked={checkoutData.paymentMethod === "card"} onChange={handleFieldChange} />
                  <span>
                    <strong>Card payment</strong>
                    <span className="d-block small text-muted">Enter your card details below.</span>
                  </span>
                </label>
              </div>

              {checkoutData.paymentMethod === "card" && (
                <div className="mt-4">
                  <PaymentCard
                    cardNumber={checkoutData.cardNumber}
                    holderName={checkoutData.holderName}
                    expiry={checkoutData.expiry}
                    cvv={checkoutData.cvv}
                    onChange={handleFieldChange}
                  />
                </div>
              )}
            </div>

            <div className="cart-summary-card mt-4">
              <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><strong>${subTotal.toFixed(2)}</strong></div>
              <div className="d-flex justify-content-between mb-2"><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong></div>
              <div className="d-flex justify-content-between pt-3 border-top"><span className="fw-semibold">Total</span><strong className="fs-5 text-primary">${total.toFixed(2)}</strong></div>
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-pill mt-4 py-3 fw-semibold">Place order</button>
          </form>
        )}

        {step === "success" && orderPlaced && (
          <div className="cart-empty-state text-center">
            <div className="cart-success-icon mb-3">✓</div>
            <h5>Order placed successfully</h5>
            <p className="text-muted">Your order was accepted and is ready for processing.</p>
            <button type="button" className="btn btn-primary rounded-pill px-4" onClick={onClose}>Continue shopping</button>
          </div>
        )}

        <style>{`
          .cart-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.5);
            backdrop-filter: blur(5px);
            z-index: 1060;
          }

          .cart-panel {
            position: fixed;
            top: 0;
            right: 0;
            width: min(520px, 100vw);
            height: 100vh;
            z-index: 1070;
            padding: 1.25rem;
            overflow-y: auto;
            box-shadow: -18px 0 48px rgba(15, 23, 42, 0.22);
          }

          .cart-panel-light {
            background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          }

          .cart-panel-dark {
            background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
            color: #e5e7eb;
          }

          .cart-eyebrow {
            letter-spacing: 0.18em;
            color: #2563eb;
            font-weight: 700;
          }

          .cart-close-btn {
            width: 40px;
            height: 40px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            line-height: 1;
          }

          .cart-panel-body {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .cart-item-card,
          .cart-summary-card,
          .checkout-section,
          .payment-option-card {
            border-radius: 24px;
            border: 1px solid ${theme === "dark" ? "rgba(148, 163, 184, 0.16)" : "rgba(148, 163, 184, 0.18)"};
            background: ${theme === "dark" ? "rgba(15, 23, 42, 0.64)" : "rgba(255,255,255,0.86)"};
            box-shadow: ${theme === "dark" ? "0 12px 24px rgba(2, 6, 23, 0.24)" : "0 12px 24px rgba(15, 23, 42, 0.08)"};
          }

          .cart-item-card,
          .cart-summary-card,
          .checkout-section {
            padding: 1rem;
          }

          .cart-item-content {
            width: 100%;
            border: 0;
            background: transparent;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 0.85rem;
            color: inherit;
          }

          .cart-item-thumb-wrap {
            width: 84px;
            height: 84px;
            flex-shrink: 0;
            border-radius: 18px;
            padding: 0.4rem;
            background: ${theme === "dark" ? "rgba(30, 41, 59, 0.92)" : "rgba(241, 245, 249, 0.96)"};
          }

          .cart-item-thumb {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 14px;
          }

          .payment-option-card {
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
            padding: 1rem;
            cursor: pointer;
          }

          .cart-empty-state {
            margin-top: 4rem;
            padding: 2.5rem 1.5rem;
          }

          .cart-empty-icon svg {
            width: 56px;
            height: 56px;
            fill: #2563eb;
          }

          .cart-success-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto;
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            font-size: 1.8rem;
            font-weight: 700;
          }
        `}</style>
      </aside>
    </>
  );
}

export default CartDrawer;