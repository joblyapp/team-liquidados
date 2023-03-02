import { useState } from "react";
import styles from "../styles.module.css";
import axios from "axios";
import Logo from "../../Images/DonVenturaLogo.svg";
import "./logIn.css";
import { Link } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/admin/login`,
        { email, password }
      );
      console.log(response.data); // handle response
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("name", response.data.name);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      setLoggedIn(true);
      setActive("home");

      if (!rememberMe) {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    localStorage.setItem("rememberMe", isChecked);
  };

  return (
    <div className={styles.centered}>
      <img style={{ width: 250 }} src={Logo}></img>
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
              defaultValue={
                sessionStorage.getItem("email")
                  ? sessionStorage.getItem("email")
                  : ""
              }
              value={email}
            ></input>
          </div>

          <div>
            <label>Contraseña</label>
            <div className={styles.passContainer} style={{ display: "flex" }}>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputs}
                type="password"
                id="pass"
                defaultValue={
                  sessionStorage.getItem("password")
                    ? sessionStorage.getItem("password")
                    : ""
                }
                placeholder="Ingrese su contraseña"
                required
                value={password}
              ></input>
              <button className={styles.showPass}>
                {/* <img src={showPassLogo} alt="show password"></img> */}
              </button>
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

          <div className={styles.botones}>
            <input
              className={styles.loginButton}
              type="submit"
              value="Ingresar"
            ></input>
          </div>
        </form>
        <Link to={"/recovery"} href="" className={styles.recover}>
          Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
}
