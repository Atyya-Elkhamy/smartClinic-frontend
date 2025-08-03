import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  const { t } = useTranslation();

  return (
    <div className="container text-center py-5">
      <h1 className="display-4 text-danger">
        <i className="bi bi-shield-lock-fill"></i> {t("unauthorized")}
      </h1>
      <p className="lead">{t("you_do_not_have_permission_to_access_this_page")}</p>
      <Link to="/" className="btn btn-outline-primary mt-3">
        {t("go_home")}
      </Link>
    </div>
  );
};

export default Unauthorized;
