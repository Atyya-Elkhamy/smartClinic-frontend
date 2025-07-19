import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { logoutUser } from "../store/slices/accounts";
import earthyTones from "../colors";

const styles = {
  navbar: {
    background: earthyTones.brown,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
    height: "64px",
    boxShadow: `0 2px 8px ${earthyTones.mocha}33`,
    justifyContent: "space-between",
  },
  brand: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.4rem",
    textDecoration: "none",
    background: earthyTones.mocha,
    borderRadius: "8px",
    padding: "8px 18px",
    boxShadow: `0 1px 4px ${earthyTones.clay}22`,
    letterSpacing: "1px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  username: {
    color: earthyTones.beige,
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "capitalize",
    marginRight: "8px",
  },
  btn: {
    background: earthyTones.mocha,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 20px",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: `0 1px 4px ${earthyTones.clay}22`,
    transition: "background 0.2s",
  },
  btnLight: {
    background: earthyTones.beige,
    color: earthyTones.brown,
    border: "none",
    borderRadius: "6px",
    padding: "8px 20px",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: `0 1px 4px ${earthyTones.mocha}22`,
    transition: "background 0.2s",
  },
};

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav style={styles.navbar}>
      <Link style={styles.brand} to="/">Smart Clinic</Link>
      <div style={styles.navRight}>
        {user ? (
          <>
            <span style={styles.username}>{user.username}</span>
            <button 
              style={styles.btn} 
              onClick={handleLogout} 
              disabled={loading}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link style={styles.btn} to="/login">Login</Link>
            <Link style={styles.btnLight} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
