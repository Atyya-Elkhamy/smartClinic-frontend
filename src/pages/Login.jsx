import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/accounts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../components/footer";
const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(resultAction)) {
        setFormErrors({});
        navigate("/");
      } else if (loginUser.rejected.match(resultAction)) {
        const errors = resultAction.payload;
        if (typeof errors === "object") {
          setFormErrors(errors);
        } else {
          setFormErrors({ general: errors });
        }
      }
    } catch (error) {
      setFormErrors({ general: t("unexpected_error") });
    }
  };

  return (
    <>
      <div className="login-container m-4">
        {/* Left side - form */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <h3 className="login-title  --sc-primary ">{t("login")}</h3>

            {formErrors.general && (
              <div className="alert alert-danger">{formErrors.general}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label fw-semibold text-secondary"
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  className={`form-control ${
                    formErrors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {formErrors.email && (
                  <div className="invalid-feedback">{formErrors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label fw-semibold text-secondary"
                >
                  {t("password")}
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    formErrors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {formErrors.password && (
                  <div className="invalid-feedback">{formErrors.password}</div>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="role"
                  className="form-label fw-semibold text-secondary"
                >
                  {t("login_as")}
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="patient">{t("patient")}</option>
                  <option value="doctor">{t("doctor")}</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn  w-100 d-flex justify-content-center align-items-center"
                disabled={loading}
                style={{
                  background: "var(--sc-secondary)",
                  color: "#fff",
                  borderColor: "var(--sc-secondary)",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              >
                {loading && (
                  <Spinner animation="border" size="sm" className="me-2" />
                )}
                {t("login")}
              </button>

              <div className="text-center mt-3">
                <span>
                  {t("no_account", { defaultValue: "Don't have an account?" })}
                </span>
                <a href="/register" className="btn m-2" style={{
                  background: "#fff",
                  color: "var(--sc-secondary)",
                  borderColor: "var(--sc-secondary)",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}>
                  {t("sign_up", { defaultValue: "Sign up" })}
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - image */}
        <div className="login-image-section">
          <img
            src="public/images/doctor-with-his-arms-crossed-white-background.jpg" // Change this to your image path
            alt="Login visual"
            className="login-side-image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
