import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/accounts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const { formError } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (formError && typeof formError === "object") {
      setFormErrors(formError);
    }
  }, [formError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormErrors({ confirmPassword: t("passwords_do_not_match") });
      return;
    }
    try {
      await dispatch(registerUser(formData)).unwrap();
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });
      setFormErrors({});
      navigate("/login");
    } catch (error) {
      console.error(t("registration_failed"), error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center py-5">
        <div className="col-12 col-md-7 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="card-title text-center fw-bold text-primary mb-4">
                {t("user_register")}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("username")}:
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {formErrors.username && (
                    <div className="text-danger small">{formErrors.username}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("email")}:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {formErrors.email && (
                    <div className="text-danger small">{formErrors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("phone")}:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {formErrors.phone && (
                    <div className="text-danger small">{formErrors.phone}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("password")}:
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {formErrors.password && (
                    <div className="text-danger small">{formErrors.password}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("confirm_password")}:
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {formErrors.confirmPassword && (
                    <div className="text-danger small">
                      {formErrors.confirmPassword}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold"
                >
                  {t("register")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
