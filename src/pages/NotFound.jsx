import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="container text-center py-5">
      <h1 className="display-1 text-secondary">404</h1>
      <h2 className="mb-3">{t("page_not_found")}</h2>
      <p className="lead">{t("the_page_you_are_looking_for_does_not_exist")}</p>
      <Link to="/" className="btn btn-outline-secondary mt-4">
        {t("go_home")}
      </Link>
    </div>
  );
};

export default NotFound;
