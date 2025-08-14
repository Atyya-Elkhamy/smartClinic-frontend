import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/accounts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "react-bootstrap/Spinner";

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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">{t("login")}</h3>

          {formErrors.general && (
            <div className="alert alert-danger">{formErrors.general}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold text-secondary">
                {t("email")}
              </label>
              <input
                type="email"
                className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
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
              <label htmlFor="password" className="form-label fw-semibold text-secondary">
                {t("password")}
              </label>
              <input
                type="password"
                className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
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

            <button
              type="submit"
              className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading && (
                <Spinner animation="border" size="sm" className="me-2" />
              )}
              {t("login")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
