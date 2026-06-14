import React, { useState, useRef } from "react";
import toast from "react-hot-toast";

function randomCode(len = 4) {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function SpinWheel({ open, show, onClose }) {
  const isOpen = open ?? show;
  const segments = [
    { label: "15%", type: "percent", value: 15 },
    { label: "10%", type: "percent", value: 10 },
    { label: "Free shipping", type: "shipping", value: 0 },
    { label: "20%", type: "percent", value: 20 },
  ];

  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  const spin = () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);
    const idx = Math.floor(Math.random() * segments.length);
    const per = 360 / segments.length;
    const randomFull = 190 * 6;
    const target = 270 - idx * per - per / 4;
    const finalAngle = randomFull + target;

    setAngle((a) => a + finalAngle);

    setTimeout(() => {
      const seg = segments[idx];
      const codePrefix =
        seg.type === "percent" ? `DISC${seg.value}` : "FREESHIP";
      const code = `${codePrefix}-${randomCode(4)}`;

      try {
        const raw = window.localStorage.getItem("promo-codes");
        const obj = raw ? JSON.parse(raw) : {};
        obj[code] = { type: seg.type, value: seg.value, used: false };
        window.localStorage.setItem("promo-codes", JSON.stringify(obj));
      } catch {
        // ignore storage failures
      }

      setResult({ code, seg });
      setSpinning(false);
    }, 3800);
  };

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Promo code copied: " + code);
    } catch {
      // fallback for older browsers
      // eslint-disable-next-line no-alert
      prompt("Copy this code:", code);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        minHeight: "100vh",
      }}
    >
      <div style={{ width: 720, maxWidth: "95%", margin: "0 auto" }}>
        <div
          className="card shadow-lg p-4"
          style={{
            borderRadius: 16,
            maxHeight: "calc(100vh - 80px)",
            overflow: "auto",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Wheel of Fortune</h4>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Pointer */}
            <div
              style={{
                position: "absolute",
                top: -20,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "18px solid transparent ",
                  borderRight: "18px solid transparent ",
                  borderTop: "28px solid #e11d48",
                  borderRadius: "50px",
                  filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.2))",
                }}
              />
            </div>

            {/* Wheel */}
            <div
              style={{
                width: "100%",
                maxWidth: 420,
                height: 420,
                borderRadius: "50%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <div
                ref={wheelRef}
                style={{
                  width: "90%",
                  maxWidth: 380,
                  height: "auto",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                  boxShadow: "0 30px 60px rgba(15,23,42,0.25)",
                  background:
                    "conic-gradient(#ffbf69 0 25%, #ff7b7b 25% 50%, #7ee7b7 50% 75%, #7fb3ff 75% 100%)",
                  transform: `rotate(${angle}deg)`,
                  transition: spinning
                    ? "transform 3.8s cubic-bezier(.17,.67,.21,1)"
                    : "none",
                  position: "relative",
                }}
              >
                {/* Labels */}
                {segments.map((s, i) => {
                  const per = 360 / segments.length;
                  const rot = per * i + per / 2 - 90;
                  const labelRadius = 110;
                  const normalized = ((rot % 360) + 360) % 360;
                  const textRotation =
                    normalized > 90 && normalized < 270 ? -rot + 180 : -rot;

                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: `rotate(${rot}deg) translateY(-${labelRadius}px)`,
                        transformOrigin: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          transform: `rotate(${textRotation}deg)`,
                          color: "#111",
                          fontWeight: 800,
                          fontSize: s.label.length > 8 ? 13 : 16,
                          textShadow: "0 1px 0 rgba(255,255,255,0.2)",
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center button (outside rotating wheel so it doesn't spin) */}
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={spin}
                  disabled={spinning}
                  className="btn btn-gradient"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "6px solid rgba(255,255,255,0.14)",
                    background: "linear-gradient(135deg,#ffd54a,#ff7043)",
                    color: "#111",
                    fontWeight: 800,
                    fontSize: 18,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  {spinning ? "Circling" : "SPIN"}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            {result ? (
              <div className="alert alert-success d-inline-block">
                🎉 You won <strong>{result.seg.label}</strong>
                <div className="mt-2">
                  Code: <strong>{result.code}</strong>
                </div>
                <div className="mt-2">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => copyCode(result.code)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-muted">
                Try your luck — spin the wheel and win discounts or free
                shipping!
              </div>
            )}
          </div>

          <style>{`
            .btn-gradient { transition: transform .12s ease; }
            .btn-gradient:active { transform: scale(.98); }
            @media (max-width: 520px) { .btn-gradient { width: 96px; height: 96px; } }
          `}</style>
        </div>
      </div>
    </div>
  );
}
