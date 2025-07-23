import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/accounts";
import LanguageSwitcher from "./languageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const isRTL = i18n.dir() === "rtl";

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleNavbar = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm px-3 py-2">
      <div
        className={`container-fluid ${isRTL ? "" : "flex-row"}`}
      >
        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
          {t("clinic_name")}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            isNavCollapsed ? "" : "show"
          }`}
          id="navbarSupportedContent"
        >
          <ul
            className={`navbar-nav me-auto mb-2 mb-lg-0 ${
              isRTL ? "m-auto" : "m-auto"
            }`}
          >
            <li className="nav-item">
              <Link className="nav-link text-secondary fw-bold fs-5" to="/about-us">
                {t("about_us")}
              </Link>
            </li>
          </ul>

          <div
            className={`d-flex align-items-center gap-2`}
          >
            <LanguageSwitcher />

            {user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-fill fs-5"></i>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/queue">
                        {t("show_number")}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="#">
                        {t("update_data")}
                      </Link>
                    </li>
                  </ul>
                </div>

                <button
                  className="btn btn-primary fw-semibold"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-primary fw-semibold"
                  to="/login"
                >
                  {t("login")}
                </Link>
                <Link className="btn btn-secondary text-white fw-semibold" to="/register">
                  {t("register")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
