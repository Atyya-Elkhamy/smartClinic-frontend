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
    <nav className="navbar navbar-expand-lg sc-header shadow-sm px-3 py-2" style={{ background: "var(--sc-light)", borderBottom: "1px solid var(--sc-border)", position: "sticky", top: 0, zIndex: 1030 }}>
      <div className={`container-fluid ${isRTL ? "" : "flex-row"}`}>
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-3" to="/" style={{ color: "var(--sc-primary)" }}>
        <img src="public/images/Logo.svg" alt="Logo" className="me-2" style={{ width: "50px", height: "50px" }} />
          {t("clinic_name")}
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler sc-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          style={{ borderColor: "var(--sc-secondary)", background: "#fff" }}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapse */}
        <div className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`} id="navbarSupportedContent">
          {/* Left links */}
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${isRTL ? "m-auto" : "m-auto"}`}>
            <li className="nav-item">
              <Link className="nav-link fw-bold fs-5" to="/about-us" style={{ color: "var(--sc-secondary)" }}>
                {t("about_us")} 
              </Link>
            
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link fw-bold fs-5" to="/services" style={{ color: "var(--sc-secondary)" }}>
                {t("Services")}
              </Link> 
            </li> */}
          </ul>

          {/* Right side controls */}
          <div className="d-flex align-items-center gap-2">
            <LanguageSwitcher />

            {user ? (
              <>
                {/* User dropdown */}
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ background: "#fff", color: "var(--sc-primary)", border: "1px solid var(--sc-secondary)" }}
                  >
                    <i className="bi bi-person-fill fs-5"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" style={{ border: "1px solid var(--sc-border)" }}>
                    {user.role === "doctor" ? (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/doctor-profile">
                            {t("profile")}
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/doctor-dashboard">
                            {t("dashboard")}
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </ul>
                </div>

                <button
                  className="btn fw-semibold"
                  onClick={handleLogout}
                  disabled={loading}
                  style={{ background: "var(--sc-primary)", borderColor: "var(--sc-primary)", color: "#fff" }}
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <Link className="btn fw-semibold" to="/login" style={{ background: "#fff", color: "var(--sc-primary)", borderColor: "var(--sc-secondary)", borderWidth: 1, borderStyle: "solid" }}>
                  {t("login")}
                </Link>
                <Link className="btn fw-semibold" to="/register" style={{ background: "var(--sc-primary)", color :"var(--sc-bg)", borderColor: "var(--sc-secondary)" }}>
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
