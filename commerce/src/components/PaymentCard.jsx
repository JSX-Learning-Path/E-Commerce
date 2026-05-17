import React, { useRef } from "react";
import styled from "styled-components";

const PaymentCard = ({ cardNumber, holderName, expiry, cvv, onChange }) => {
  const yearInputRef = useRef(null);
  const expiryDigits = (expiry || "").replace(/\D/g, "").slice(0, 4);
  const expiryMonth = expiryDigits.slice(0, 2);
  const expiryYear = expiryDigits.slice(2, 4);

  const handleExpiryChange = (part, value) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 2);
    const nextExpiry = part === "month"
      ? `${sanitizedValue}${expiryYear}`
      : `${expiryMonth}${sanitizedValue}`;

    onChange({
      target: {
        name: "expiry",
        value: nextExpiry,
      },
    });

    if (part === "month" && sanitizedValue.length === 2) {
      yearInputRef.current?.focus();
    }
  };

  return (
    <StyledWrapper>
      <div className="visa-card">
        <div className="glow"></div>
        <div className="logoContainer">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={23} height={23} viewBox="0 0 48 48" className="svgLogo">
            <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
            <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
            <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
          </svg>
        </div>
        <div className="chip"></div>
        <div className="number-container">
          <label className="input-label" htmlFor="cardNumber">CARD NUMBER</label>
          <input className="inputstyle" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" name="cardNumber" type="text" inputMode="numeric" value={cardNumber} onChange={onChange} maxLength={19} />
        </div>
        <div className="name-date-cvv-container">
          <div className="name-wrapper">
            <label className="input-label" htmlFor="holderName">CARD HOLDER</label>
            <input className="inputstyle" id="holderName" placeholder="NAME" name="holderName" type="text" value={holderName} onChange={onChange} />
          </div>
          <div className="expiry-wrapper">
            <label className="input-label" htmlFor="expiry">VALID THRU</label>
            <div className="expiry-fixed-inputs" id="expiry">
              <input
                className="inputstyle expiry-part"
                aria-label="Card expiry month"
                placeholder="MM"
                type="text"
                inputMode="numeric"
                value={expiryMonth}
                onChange={(event) => handleExpiryChange("month", event.target.value)}
                maxLength={2}
              />
              <span className="expiry-divider">/</span>
              <input
                className="inputstyle expiry-part"
                aria-label="Card expiry year"
                placeholder="YY"
                type="text"
                inputMode="numeric"
                ref={yearInputRef}
                value={expiryYear}
                onChange={(event) => handleExpiryChange("year", event.target.value)}
                maxLength={2}
              />
            </div>
          </div>
          <div className="cvv-wrapper">
            <label className="input-label" htmlFor="cvv">CVV</label>
            <input className="inputstyle cvv-input" placeholder="CVV" maxLength={3} id="cvv" name="cvv" type="text" inputMode="numeric" value={cvv} onChange={onChange} />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .visa-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100%;
    min-height: 210px;
    background-image: radial-gradient(circle at 12% 20%, rgba(30, 41, 59, 0.98) 0%, rgba(22, 78, 99, 0.95) 42%, rgba(88, 28, 135, 0.88) 100%);
    border-radius: 22px;
    padding: 22px;
    font-family: Arial, Helvetica, sans-serif;
    position: relative;
    gap: 16px;
    overflow: hidden;
    animation: floatCard 4.8s ease-in-out infinite;
    box-shadow: 0 22px 45px rgba(2, 6, 23, 0.42);
  }

  .glow {
    position: absolute;
    inset: auto -40px -40px auto;
    width: 180px;
    height: 180px;
    background: rgba(148, 163, 184, 0.12);
    filter: blur(18px);
    border-radius: 50%;
    pointer-events: none;
  }

  .chip {
    width: 48px;
    height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(226,232,240,0.82), rgba(148,163,184,0.42));
    box-shadow: inset 0 1px 2px rgba(255,255,255,0.28);
    position: relative;
    z-index: 1;
  }

  .logoContainer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: fit-content;
    position: absolute;
    top: 0;
    left: 0;
    padding: 18px;
    pointer-events: none;
  }

  .svgLogo {
    height: 40px;
    width: auto;
  }

  .inputstyle::placeholder {
    color: rgba(255, 255, 255, 0.85);
  }

  .inputstyle {
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    caret-color: #fff;
    font-size: 13px;
    height: 25px;
    letter-spacing: 1.5px;
    width: 100%;
  }

  .number-container,
  .name-wrapper,
  .expiry-wrapper,
  .cvv-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  .number-container {
    width: 100%;
  }

  .name-date-cvv-container {
    width: 100%;
    display: flex;
    gap: 10px;
    position: relative;
    z-index: 1;
  }

  .name-wrapper {
    width: 50%;
  }

  .expiry-wrapper {
    width: 28%;
  }

  .expiry-fixed-inputs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem;
    width: 100%;
  }

  .expiry-part {
    width: calc(50% - 0.2rem);
    min-width: 0;
    text-align: center;
    letter-spacing: 1px;
  }

  .expiry-divider {
    color: rgba(255, 255, 255, 0.95);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0;
    flex-shrink: 0;
  }

  .cvv-wrapper {
    width: 22%;
  }

  .cvv-input {
    text-align: center;
    letter-spacing: 2px;
  }

  .input-label {
    font-size: 8px;
    letter-spacing: 1.5px;
    color: #f8fafc;
    width: 100%;
    margin-bottom: 0.15rem;
  }

  @keyframes floatCard {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-4px) rotate(0.6deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
`;

export default PaymentCard;