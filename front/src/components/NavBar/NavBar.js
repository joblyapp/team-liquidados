import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "./NavBar.css";
import Logo from "../../Images/DonVenturaLogo.svg";
import Avatar from "../../Images/Avatar.webp";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Inicio
        </Link>
        <Link to="/productos" className="navbar-link">
          Productos
        </Link>
        <Link to="/ventas" className="navbar-link">
          Ventas
        </Link>
      </div>
      <div className="navbar-avatar">
        <img src={Avatar} alt="Avatar" />
        <p>Raul Ventura</p>
        <button onClick={handleMenuToggle}>
          <FaChevronDown />
        </button>
        {showMenu && (
          <div className="navbar-avatar-dropdown">
            <Link to="/perfil" className="navbar-avatar-dropdown-link">
              Perfil
            </Link>
            <Link to="/configuracion" className="navbar-avatar-dropdown-link">
              Configuración
            </Link>
            <Link to="/logout" className="navbar-avatar-dropdown-link">
              Cerrar sesión
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
