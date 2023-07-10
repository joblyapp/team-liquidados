import { useState } from "react";
import styles from "../styles.module.css";
import axios from "axios";
import Logo from "../../Images/DonVenturaLogo.svg";
import { Link } from "react-router-dom";
import showPassword from "../../Images/icons/showPassword.png";
import hidePassword from "../../Images/icons/hidePassword.png";

export default function LogIn({ setLoggedIn, setActive }) {
  const [email, setEmail] = useState(
    localStorage.getItem("rememberMe") ? sessionStorage.getItem("email") : ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("rememberMe") ? sessionStorage.getItem("password") : ""
  );
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );
  const [revealPassword, setRevealPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/admin/login`,
        { email, password }
      );
      
      
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("name", response.data.name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      sessionStorage.setItem(
        "avatar",
        response.data.image
      );
      setLoggedIn(true);
      setActive("home");

      if (!rememberMe) {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    localStorage.setItem("rememberMe", isChecked);
  };

  const toggleRevealPassword = () => {
    setRevealPassword(!revealPassword);
  };

  const handleTest = (e) => {
    e.preventDefault();
    setEmail("raulventura@donventura.com");
    setPassword("Raulventura1");
  }

  return (
    <div
      className={styles.centered}
      style={{ height: "100vh", justifyContent: "center" }}
    >
      <img style={{ width: 250 }} src={Logo} alt="Logo"></img>
      <div className={`${styles.loginBox}`}>
        <form className={styles.formBox} onSubmit={handleSubmit}>
          <div>
            <label>Correo electrónico</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputs}
              type="email"
              id="email"
              placeholder="Ingrese su mail"
              required
              value={email ? email : ""}
            ></input>
          </div>

          <div>
            <label>Contraseña</label>
            <div className={styles.passContainer} style={{ display: "flex" }}>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputs}
                type={revealPassword ? "text" : "password"}
                id="pass"
                placeholder="Ingrese su contraseña"
                required
                value={password ? password : ""}
              ></input>

              <img
                onClick={toggleRevealPassword}
                className={styles.showPass}
                src={!revealPassword ? showPassword : hidePassword}
                alt="show password icon"
              />
            </div>
          </div>
          <div className={styles.checkContainer}>
            <label className={styles.labelOrder}>
              <input
                id="remember"
                onChange={handleRememberMeChange}
                checked={rememberMe}
                type="checkbox"
              ></input>
              Recordarme
            </label>
          </div>
          {showError && (
            <p style={{ color: "red" }}>Credenciales incorrectas</p>
          )}
          <div className={styles.botones}>
            <input
              className={styles.loginButton}
              type="submit"
              value="Ingresar"
            ></input>
            <button 
            className={styles.testButton}
            onClick= {handleTest} 
            >
            
              Versión de Prueba</button>
          </div>
        </form>
        <Link to={"/recovery"} href="" className={styles.recover}>
          Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
}
