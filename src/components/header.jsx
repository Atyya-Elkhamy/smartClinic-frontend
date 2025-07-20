import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { logoutUser } from "../store/slices/accounts";
import LanguageSwitcher from "./LanguageSwitcher";


const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar navbar-expand bg-primary px-4 py-3 shadow-sm">
      <Link className="navbar-brand fw-bold text-white px-3 rounded bg-secondary" to="/">
        Smart Clinic
      </Link>
      <div className="ms-auto d-flex align-items-center gap-3">
        <LanguageSwitcher />
        {user ? (
          <>
            <span className="fw-semibold text-info me-2">{user.username}</span>
            <button
              className="btn btn-info text-white fw-semibold"
              onClick={handleLogout}
              disabled={loading}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-info text-white fw-semibold" to="/login">Login</Link>
            <Link className="btn btn-light fw-semibold" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
