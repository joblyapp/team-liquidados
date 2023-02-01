import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlices";
import EnterForm from "./enterForm";
import FailLogIn from "./failLogIn";
import styles from "../styles.module.css";
import axios from "axios";


export default function Enter({ user, user2, setRecovery, setRegister }) {

    const [fail, setFail] = useState(false);

    // Datos del usuario
    const [userData, setUserData] = useState({
        email: null,
        password: null
    });


    // Redux receptor for user login
    const dispatch = useDispatch();


    // THIS FUNCTION IS DOING THE SAME WITH SUCCES AND WITH ERRORS. IT IS ON PURPOSE

    const checkUserData = useCallback(async (correo, contra) => {
        
        axios
        .post("http://localhost:8080/api/v1/admin/login", userData)
        .then((response) => {
            console.log(response);
            dispatch(login({
                mail: document.getElementById("email").value,
                pass: document.getElementById("pass").value,
                loggedIn: true
            }));
        })
        .catch((error) => {
            console.log(error);
            dispatch(login({
                mail: document.getElementById("email").value,
                pass: document.getElementById("pass").value,
                loggedIn: true
            }));
        })
        .finally(()=>console.log("Submitted!"));
        
    
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