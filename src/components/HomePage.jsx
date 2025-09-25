import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "./style.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSeedData = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/seed");
      alert(response.data);
    } catch (error) {
      alert("Error seeding data: " + error.message);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>KLU CRM App</h1>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/about-us">Dashboard</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to={isAuthenticated ? "/companies" : "/login"}>Companies</Link>
            </li>
            <li>
              <Link to={isAuthenticated ? "/deals" : "/login"}>Deals</Link>
            </li>
            <li>
              <Link to={isAuthenticated ? "/tasks" : "/login"}>Tasks</Link>
            </li>
            <li>
              <Link to={isAuthenticated ? "/messages" : "/login"}>Messages</Link>
            </li>
            <li>
              <Link to={isAuthenticated ? "/outlook" : "/login"}>Outlook</Link>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          <button onClick={handleSeedData}>Subscribe</button>
          {isAuthenticated ? (
            <div className="profile-menu">
              <FaUserCircle
                className="profile-icon"
                size={28}
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="dropdown">
                  <Link to="/messages" onClick={() => setDropdownOpen(false)}>Messages</Link>
                  <Link to="/outlook" onClick={() => setDropdownOpen(false)}>Outlook</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/signup"><button>Sign Up</button></Link>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="footer">@ copyright CRM App</div>
    </div>
  );
};

export default HomePage;
