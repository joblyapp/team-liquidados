import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlices";
import EnterForm from "./enterForm";
import FailLogIn from "./failLogIn";
import styles from "../styles.module.css";


export default function Enter({ user, user2, setRecovery, setRegister }) {

    const [fail, setFail] = useState(false);
    // Datos del usuario
    const [userData, setUserData] = useState({
        correo: null,
        contra: null
    });


    // Redux receptor for user login
    const dispatch = useDispatch();

    const checkUserData = useCallback((correo, contra) => {
        if ((correo === user.mail && contra === user.pass) || (correo === user2.mail && contra === user2.pass)) {

            console.log("Submitted!");
            dispatch(login({
                mail: document.getElementById("email").value,
                pass: document.getElementById("pass").value,
                loggedIn: true
            }))
        }
        else {
            console.log("Error!");
            setFail(true);
        }
    }, [dispatch, setFail, user, user2])


    useEffect(() => {
        if (userData.correo) {
            checkUserData(userData.correo, userData.contra);
        }
    }, [userData, checkUserData])

    function handleRecovery() {
        setRecovery(true);
    }

    function handleRegister(e) {
        e.preventDefault();
        setRegister(true);
    }

    return (


        fail
            ? <FailLogIn setFail={setFail} fail={fail} />
            :
            <div className={styles.centered}>
                <EnterForm setUserData={setUserData} setRecovery={setRecovery} setRegister={setRegister} />
                <div className={styles.register}>
                    <button onClick={handleRegister} >Registrarse</button>
                    <p className={styles.recover} onClick={handleRecovery}>Recuperar contraseña</p>
                </div>
            </div>
    )
}