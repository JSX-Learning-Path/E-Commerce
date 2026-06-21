import React from "react";

function Privacy() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-3">Privacy Policy</h1>
      <p className="text-muted">
        Your privacy is important to us. This page outlines how we collect, use
        and protect your personal data when you use our store.
      </p>

      <h4 className="mt-4">Information we collect</h4>
      <ul>
        <li>Account information (email, name)</li>
        <li>Order and shipping details</li>
        <li>Usage data to improve the site</li>
      </ul>
      <h4 className="mt-4">Company Details</h4>

      <ul>
        <li>Company Name: NextCart Ltd.</li>
        <li>UIC: 20409250</li>
        <li>VAT Number: BG1412150</li>
        <li>Registered Office and Business Address: Plovdiv</li>
        <li>Contact: Email: support@nexcart.example</li>
      </ul>

      <h4 className="mt-3">How we use information</h4>
      <p className="text-muted">
        We use data to process orders, communicate about your purchases, and
        improve site functionality. We never share personal data with third
        parties for marketing without consent.
      </p>
    </div>
  );
}

export default Privacy;
