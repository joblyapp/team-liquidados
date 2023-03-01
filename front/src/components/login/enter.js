import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlices";
import EnterForm from "./enterForm";
import FailLogIn from "./failLogIn";
import styles from "../styles.module.css";
import axios from "axios";

export default function Enter({ setRecovery, setRegister }) {
  const [fail, setFail] = useState(false);

  // Datos del usuario
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    password: null,
    remember: false,
  });

  // Redux receptor for user login
  const dispatch = useDispatch();

  const checkUserData = useCallback(
    async (correo, contra) => {
      axios
        .post(`${process.env.REACT_APP_URL}/admin/login`, userData)
        .then((response) => {
          console.log(response.data);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("name", response.data.admin.name);

          if (userData.remember) {
            localStorage.setItem("remember", JSON.stringify(userData));
          } else {
            localStorage.removeItem("remember");
          }

          dispatch(
            login({
              mail: userData.email,
              pass: userData.password,
              loggedIn: false,
            })
          );
        })
        .catch((error) => {
          console.log(error);
          setFail(true);
        })
        .finally(() => console.log("Submitted!"));
    },
    [dispatch, userData]
  );

  useEffect(() => {
    if (userData.email) {
      checkUserData(userData.email, userData.password);
    }
  }, [userData, checkUserData]);

  function handleRecovery() {
    setRecovery(true);
  }

  function handleRegister(e) {
    e.preventDefault();
    setRegister(true);
  }

  return fail ? (
    <FailLogIn setFail={setFail} fail={fail} />
  ) : (
    <div className={styles.centered}>
      <div className={styles.loginLogo}>
        <img src="./imagen.svg"></img>
      </div>

      <div className={styles.loginBox}>
        <EnterForm
          setUserData={setUserData}
          setRecovery={setRecovery}
          setRegister={setRegister}
        />
        <p className={styles.recover} onClick={handleRecovery}>
          Recuperar contraseña
        </p>
      </div>
    </div>
  );
}
