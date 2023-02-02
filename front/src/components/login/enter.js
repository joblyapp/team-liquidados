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
        email: null,
        password: null
    });


    // Redux receptor for user login
    const dispatch = useDispatch();


  
    const checkUserData = useCallback(async (correo, contra) => {
       
        axios
            .post("http://localhost:8080/admin/login", userData)
            .then((response) => {
                console.log(response);
                dispatch(login({
                    mail: userData.email,
                    pass: userData.password,
                    loggedIn: true
                }));
            })
            .catch((error) => {
                console.log(error);
                dispatch(login({
                    mail: userData.email,
                    pass: userData.password,
                    loggedIn: true
                }));
            })
            .finally(() => console.log("Submitted!"));


    }, [dispatch, setFail, userData])





    useEffect(() => {
        if (userData.email) {
            checkUserData(userData.email, userData.password);
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