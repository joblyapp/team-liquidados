import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "./NavBar.css";
import Logo from "../../Images/DonVenturaLogoWhite.svg";
import Avatar from "../../Images/Avatar.png";

const Navbar = ({ handleLogout, active, setActive }) => {
  //state for displayng the avatar drop down menu
  const [showMenu, setShowMenu] = useState(false);
  //state to keep track which link has the active state
  const avatarMenuRef = useRef(null);
  //used to check if clicked outside avatar dropdown

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleClick = (e, name) => {
    setActive(name);
  };

  useEffect(() => {
    // add event listener to the document to listen for clicks outside of the avatar menu
    const handleOutsideClick = (event) => {
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // remove event listener when component unmounts
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [avatarMenuRef]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={(e) => handleClick(e, "home")}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link
          to="/"
          className={`navbar-link ${active === "home" ? "active" : ""}`}
          onClick={(e) => handleClick(e, "home")}
        >
          Inicio
        </Link>
        <Link
          to="/products"
          className={`navbar-link ${active === "productos" ? "active" : ""}`}
          onClick={(e) => handleClick(e, "productos")}
        >
          Productos
        </Link>
        <Link
          to="/sales"
          className={`navbar-link ${active === "ventas" ? "active" : ""}`}
          onClick={(e) => handleClick(e, "ventas")}
        >
          Ventas
        </Link>
      </div>
      <div className="navbar-avatar">
        <img src={Avatar} alt="Avatar" />
        <div>
          <p>{sessionStorage.getItem("name")}</p>
          <span>Administrador</span>
        </div>

        <button onClick={handleMenuToggle}>
          <FaChevronDown
            className={`navbar-avatar-chevron ${showMenu ? "rotate" : ""}`}
          />
        </button>
        {showMenu && (
          <div className="navbar-avatar-dropdown" ref={avatarMenuRef}>
            <Link to="/perfil" className="navbar-avatar-dropdown-link">
              Perfil
            </Link>
            <Link
              onClick={() => handleLogout()}
              className="navbar-avatar-dropdown-link"
            >
              Cerrar sesión
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
