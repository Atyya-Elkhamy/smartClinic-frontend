import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/accounts";
import earthyTones from "../colors";

const styles = {
  wrapper: {
    maxWidth: "420px",
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

const Login = () => {
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
      setFormErrors({ general: "Unexpected error occurred." }, error);
    }
  };
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
        {formErrors?.general && (
          <div style={styles.error}>{formErrors.general}</div>
        )}
        <div>
          <label htmlFor="username" style={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />
          {formErrors.username && (
            <div style={styles.error}>{formErrors.username}</div>
          )}
        </div>
        <div>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {formErrors.password && (
            <div style={styles.error}>{formErrors.password}</div>
          )}
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
