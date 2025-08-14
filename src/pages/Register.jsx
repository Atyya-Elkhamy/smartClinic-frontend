import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "react-bootstrap/Spinner";

// ⬇️ If your action/path differs, change this import only
import { registerUser } from "../store/slices/accounts";
import Footer from "../components/footer";

// import "./Auth.css"; // shared with Login

const Register = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((s) => s.auth || { loading: false });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side check (keeps your server validation intact)
    if (formData.password !== formData.confirmPassword) {
      setFormErrors({ confirmPassword: t("passwords_not_match", { defaultValue: "Passwords don't match" }) });
      return;
    }

    try {
      const result = await dispatch(registerUser(formData));
      if (registerUser.fulfilled?.match?.(result)) {
        setFormErrors({});
        navigate("/login"); // go to login after successful register
      } else {
        const errors = result.payload;
        if (typeof errors === "object") setFormErrors(errors || {});
        else setFormErrors({ general: errors || t("unexpected_error") });
      }
    } catch (err) {
      setFormErrors({ general: t("unexpected_error", { defaultValue: "Something went wrong. Try again." }) });
    }
  };

  return (
    <>
    <div className="auth-container">
      {/* Left: form */}
      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <h3 className="auth-title">{t("register", { defaultValue: "User Register" })}</h3>

          {formErrors.general && (
            <div className="alert alert-danger">{formErrors.general}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">{t("username", { defaultValue: "Username" })}</label>
              <input
                name="username"
                className={`form-control ${formErrors.username ? "is-invalid" : ""}`}
                value={formData.username}
                onChange={handleChange}
                required
              />
              {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">{t("email", { defaultValue: "Email" })}</label>
              <input
                type="email"
                name="email"
                className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">{t("phone", { defaultValue: "Phone" })}</label>
              <input
                name="phone"
                className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">{t("address", { defaultValue: "Address" })}</label>
              <input
                name="address"
                className={`form-control ${formErrors.address ? "is-invalid" : ""}`}
                value={formData.address}
                onChange={handleChange}
                required
              />
              {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">{t("age", { defaultValue: "Age" })}</label>
              <input
                type="number"
                name="age"
                className={`form-control ${formErrors.age ? "is-invalid" : ""}`}
                value={formData.age}
                onChange={handleChange}
                required
                min={0}
              />
              {formErrors.age && <div className="invalid-feedback">{formErrors.age}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">{t("gender", { defaultValue: "Gender" })}</label>
              <select
                name="gender"
                className={`form-select ${formErrors.gender ? "is-invalid" : ""}`}
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">{t("select_gender", { defaultValue: "Select gender" })}</option>
                <option value="male">{t("male", { defaultValue: "Male" })}</option>
                <option value="female">{t("female", { defaultValue: "Female" })}</option>
              </select>
              {formErrors.gender && <div className="invalid-feedback">{formErrors.gender}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">{t("password", { defaultValue: "Password" })}</label>
              <input
                type="password"
                name="password"
                className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">{t("confirm_password", { defaultValue: "Confirm Password" })}</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 d-flex justify-content-center align-items-center mb-3"
              disabled={loading}
            >
              {loading && <Spinner animation="border" size="sm" className="me-2" />}
              {t("register", { defaultValue: "Register" })}
            </button>

            <div className="text-center">
              <span>{t("have_account", { defaultValue: "Already have an account?" })}</span>
              <Link to="/login" className="btn btn-outline-primary ms-2">
                {t("login", { defaultValue: "Log in" })}
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right: image */}
      <div className="auth-image-section">
        <img
          src="public/images/doctor-with-his-arms-crossed-white-background.jpg"  /* place image in /public */
          alt="Register"
          className="auth-side-image"
        />
      </div>
    
    </div>
      <Footer />
      </>
  );
};

export default Register;
