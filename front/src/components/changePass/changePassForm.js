import axios from "axios";
import { useState } from "react";
import styles from "../../components/styles.module.css";

export default function ChangePassForm({ recoveryToken, setSuccess, setFail }) {
  const [showPassLogo, setShowPassLogo] = useState("../openPass.png");

  const resetToken = recoveryToken;

  function handleSubmitRegister(e) {
    e.preventDefault();

    const password = document.getElementById("pass").value;
    const passRepeat = document.getElementById("passRepeat").value;

    if (password === passRepeat) {
  
      axios
        .post(`${process.env.REACT_APP_URL}/admin/reset`, {
          password,
          resetToken,
        })
        .then((response) => {
        

          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setFail(true);
        });
    } else {
     
    }
  }

  function handleClick(e, id) {
    e.preventDefault();

    var valor = document.getElementById(id).type;

    if (valor === "password") {
      document.getElementById(id).type = "text";
      setShowPassLogo("../closedPass.png");
    } else {
      document.getElementById(id).type = "password";
      setShowPassLogo("../openPass.png");
    }
  }

  return (
    <div className={styles.centered}>
      <h1> NUEVA CONTRASEÑA</h1>
      <div className={styles.box}>
        <form className={styles.formBox} onSubmit={handleSubmitRegister}>
          <div>
            <p>Ingrese su nueva contraseña</p>
            <div className={styles.passContainer} style={{ display: "flex" }}>
              <input
                className={styles.inputs}
                type="password"
                id="pass"
                placeholder="Ingrese su contraseña"
                required
              ></input>
              <button
                className={styles.showPass}
                onClick={(e) => handleClick(e, "pass")}
              >
                <img src={showPassLogo} alt="show password"></img>
              </button>
            </div>
          </div>

          <div>
            <p>Repita su nueva contraseña</p>
            <div className={styles.passContainer} style={{ display: "flex" }}>
              <input
                className={styles.inputs}
                type="password"
                id="passRepeat"
                placeholder="Ingrese su contraseña"
                required
              ></input>
              <button
                className={styles.showPass}
                onClick={(e) => handleClick(e, "passRepeat")}
              >
                <img src={showPassLogo} alt="show password"></img>
              </button>
            </div>
          </div>

          <div className={styles.botones}>
            <input
              className={styles.loginButton}
              type="submit"
              value="Cambiar contraseña"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
