import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import logo_img from '../../assets/logo_2.png'
import logo_txt from '../../assets/logo_txt2.png'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

import { useAuth } from "../../context/AuthContext";


const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (

    <div className='navbar_sec'>
      <div className="nav_logo_sec">
        <Link to="/">
          <img src={logo_img} alt="Logo Image" className="nav_logo" />
          <img src={logo_txt} alt="Logo Text" className="nav_logo_txt" />
        </Link>
      </div>
      <div className="nav_menu_sec">
        <ul className={`nav_menu ${menuOpen ? "active" : ""}`}>
          {isLoggedIn ? (
            <>
              <li className="nav_list">
                <NavLink to="/" className={({ isActive }) => isActive ? "active nav_link" : "nav_link"}>
                  Home
                </NavLink>
              </li>
              <li className="nav_list">
                <NavLink to="/notes" className={({ isActive }) => isActive ? "active nav_link" : "nav_link"} >
                  Notes
                </NavLink>
              </li>
              <li className="nav_list">
                <NavLink to="/history" className={({ isActive }) => isActive ? "active nav_link" : "nav_link"} >
                  History
                </NavLink>
              </li>
              <li className="nav_list">
                <NavLink to="/wish-list" className={({ isActive }) => isActive ? "active nav_link" : "nav_link"} >
                  Wishlist
                </NavLink>
              </li>
              <li className="nav_list">
                <NavLink to="/book-shelf" className={({ isActive }) => isActive ? "active nav_link" : "nav_link"} >
                  BookShelf
                </NavLink>
              </li>
              <li className="nav_list">
                <NavLink to="/genres" className={({ isActive }) => isActive ? "active nav_link" : "nav_link"} >
                  Genres
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav_list">
                <NavLink
                  to="/register"
                  className={({ isActive }) => isActive ? "active nav_link" : "nav_link"}
                >
                  Signup
                </NavLink>
              </li>
              <li className="nav_list">
                <NavLink
                  to="/login"
                  className={({ isActive }) => isActive ? "active nav_link" : "nav_link"}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>

      </div>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
      {isLoggedIn && (
        <div className="nav_ac_sec">
          <Link to="/myaccount">
            <FaUser />
          </Link>
          <BiLogOut className="logout-btn" onClick={handleLogout} />
        </div>
      )}
    </div>
  )
}

export default Navbar