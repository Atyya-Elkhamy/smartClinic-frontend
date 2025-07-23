// src/components/Footer.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-dark text-white py-4 text-center mt-auto">
      <div>
        <p>© 2025 {t("clinic_name")}. {t("all_rights_reserved")}</p>
        <p>
          <strong>{t("contact")}:</strong>{" "}
          <a className="text-white text-decoration-underline" href="mailto:info@smartclinic.com">
            info@smartclinic.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
