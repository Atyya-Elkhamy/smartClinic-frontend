import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/accounts";
import { useNavigate } from "react-router-dom";
import earthyTones from "../colors";

const styles = {
  wrapper: {
    maxWidth: "480px",
    margin: "40px auto",
    background: earthyTones.beige,
    borderRadius: "12px",
    boxShadow: `0 2px 12px ${earthyTones.mocha}22`,
    padding: "32px 28px",
    fontFamily: "Segoe UI, Arial, sans-serif",
    color: earthyTones.clay,
  },
  title: {
    fontWeight: 700,
    fontSize: "2rem",
    color: earthyTones.brown,
    textAlign: "center",
    marginBottom: "18px",
  },
  label: {
    fontWeight: 600,
    color: earthyTones.mocha,
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: `1px solid ${earthyTones.mocha}`,
    borderRadius: "6px",
    fontSize: "1rem",
    marginBottom: "10px",
    background: earthyTones.light,
    color: earthyTones.clay,
    outline: "none",
  },
  error: {
    color: "#b71c1c",
    fontSize: "0.95rem",
    marginBottom: "8px",
  },
  button: {
    width: "100%",
    background: earthyTones.brown,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "12px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: `0 1px 4px ${earthyTones.mocha}22`,
    marginTop: "10px",
    transition: "background 0.2s",
  },
};

const Register = () => {
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
      setFormErrors({ confirmPassword: "Passwords do not match" });
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
      console.error("Registration failed:", error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>User Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {formErrors.username && (
            <div style={styles.error}>{formErrors.username}</div>
          )}
        </div>
        <div>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {formErrors.email && (
            <div style={styles.error}>{formErrors.email}</div>
          )}
        </div>
        <div>
          <label style={styles.label}>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {formErrors.phone && (
            <div style={styles.error}>{formErrors.phone}</div>
          )}
        </div>
        <div>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {formErrors.password && (
            <div style={styles.error}>{formErrors.password}</div>
          )}
        </div>
        <div>
          <label style={styles.label}>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {formErrors.confirmPassword && (
            <div style={styles.error}>{formErrors.confirmPassword}</div>
          )}
        </div>
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
