// src/components/Footer.jsx
import React from "react";

const Footer = () => (
  <footer className="bg-dark text-white py-4 text-center mt-auto">
    <div>
      <p>© 2025 Smart Clinic. All Rights Reserved.</p>
      <p>
        <strong>Contact:</strong>{" "}
        <a className="text-white text-decoration-underline" href="mailto:info@smartclinic.com">
          info@smartclinic.com
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
