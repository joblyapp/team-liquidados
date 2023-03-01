import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import axios from "axios";


export default function EnterForm({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/admin/login`,
        { email, password }
      );
      console.log(response.data); // handle response
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("name", response.data.admin.name);
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div>
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
              placeholder="Ingrese su contraseña"
              required
            ></input>
            <button className={styles.showPass}>
              {/* <img src={showPassLogo} alt="show password"></img> */}
            </button>
          </div>
        </div>
        <div className={styles.checkContainer}>
          <label className={styles.labelOrder}>
            <input id="remember" type="checkbox" value="recordarme"></input>
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
    </div>
  );
}
