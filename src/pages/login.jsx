import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/accounts";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
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
      setFormErrors({ general: t("unexpected_error") }, error);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center py-5">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="card-title text-center fw-bold text-primary mb-4">
                {t("login")}
              </h2>
              <form onSubmit={handleSubmit}>
                {formErrors?.general && (
                  <div className="alert alert-danger">{formErrors.general}</div>
                )}
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="form-label fw-semibold text-secondary"
                  >
                    {t("username")}:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {formErrors.username && (
                    <div className="text-danger small">{formErrors.username}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold text-secondary"
                  >
                    {t("password")}:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {formErrors.password && (
                    <div className="text-danger small">{formErrors.password}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? t("logging_in") : t("login")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
