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
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (formError && typeof formError === "object") {
      setFormErrors(formError.errors || {});
    }
  }, [formError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setFormErrors({ password_confirmation: t("passwords_do_not_match") });
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        address: "",
        age: "",
        gender: "",
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
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("username")}:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {formErrors.name && (
                    <div className="text-danger small">{formErrors.name[0]}</div>
                  )}
                </div>

                {/* Email */}
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
                    <div className="text-danger small">{formErrors.email[0]}</div>
                  )}
                </div>

                {/* Phone */}
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
                    <div className="text-danger small">{formErrors.phone[0]}</div>
                  )}
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("address")}:
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {formErrors.address && (
                    <div className="text-danger small">{formErrors.address[0]}</div>
                  )}
                </div>

                {/* Age */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("age")}:
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {formErrors.age && (
                    <div className="text-danger small">{formErrors.age[0]}</div>
                  )}
                </div>

                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("gender")}:
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">{t("select_gender")}</option>
                    <option value="male">{t("male")}</option>
                    <option value="female">{t("female")}</option>
                  </select>
                  {formErrors.gender && (
                    <div className="text-danger small">{formErrors.gender[0]}</div>
                  )}
                </div>

                {/* Password */}
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
                    <div className="text-danger small">{formErrors.password[0]}</div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    {t("confirm_password")}:
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {formErrors.password_confirmation && (
                    <div className="text-danger small">
                      {formErrors.password_confirmation[0]}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">
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
