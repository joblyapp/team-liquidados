import { useEffect, useState } from "react";
import FailLogIn from "../login/failLogIn";
import styles from "../../components/styles.module.css";
import axios from "axios";
import RecoverySuccess from "./recoverySucces";
import { useNavigate } from "react-router";
import Loading from "../loading";
import Logo from "../../Images/DonVenturaLogo.svg";
import "./Recovery.css";

export default function Recovery({ setRecovery }) {
  const [recoveryMail, setRecoveryMail] = useState();
  const [fail, setFail] = useState(false);
  const [exito, setExito] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function checkMail(mes) {
    console.log("Inside checkMail: " + mes);

    if (mes === "User not registered") {
      console.log("inside checkmail if");
      setFail(true);
    } else {
      console.log("inside checkmail else");
      setExito(true);
    }
  }

  useEffect(() => {
    if (recoveryMail) {
      setLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_URL}/admin/forgot-password`,
          recoveryMail
        )
        .then((response) => {
          console.log(response);
          checkMail(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          setFail(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [recoveryMail]);

  function handleClick(e) {
    e.preventDefault();
    setRecovery(false);
  }

  function handleSubmitRecovery(e) {
    e.preventDefault();
    console.log(document.getElementById("email").value);
    const email = document.getElementById("email").value;
    setRecoveryMail({ email: email });
  }

  return (
    <div className={styles.centered}>
      {!loading ? (
        !fail ? (
          !exito ? (
            <div className={styles.centered}>
              <img style={{ width: 250 }} src={Logo} alt="Logo"></img>
              <form className={styles.box} onSubmit={handleSubmitRecovery}>
                <h3 className={styles.forgotMessage}>
                  ¿Olvidaste tu contraseña? No te preocupes, te enviaremos un
                  mail con lo pasos a seguir.
                </h3>

                <input
                  className={styles.inputs}
                  type="email"
                  id="email"
                  placeholder="Ingrese su mail"
                  required
                ></input>

                <div className={styles.botones}>
                  <input
                    className="button"
                    type="submit"
                    value="Recuperar contraseña"
                  ></input>
                </div>
              </form>
            </div>
          ) : (
            <RecoverySuccess setExito={setExito} setRecovery={setRecovery} />
          )
        ) : (
          <FailLogIn setFail={setFail} fail={fail} />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
