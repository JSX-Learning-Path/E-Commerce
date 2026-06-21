// import React from "react";

function Help() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-3">Help Center</h1>
      <p className="text-muted">
        Need help? Browse frequently asked questions or contact our support
        team.
      </p>

      <h5 className="mt-4">Contact support</h5>
      <p
        className="text-muted"
        onClick={() =>
          (window.location.href = "mailto:support@nexcart.example")
        }
      >
        Email: support@nexcart.example
      </p>
      <p className="text-muted">Phone: (123) 456-7890</p>
    </div>
  );
}

export default Help;
