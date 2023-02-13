import { useEffect, useState } from "react";
import styles from "../../styles.module.css";
import axios from "axios";
import RegisterSuccess from "./registerSuccess";
import FailLogIn from "../failLogIn";
import RegisterForm from "./registerForm";


export default function Register({ setRegister }) {

    const [error, setError] = useState(false);
    const [exito, setExito] = useState(false);

    const [newUser, setNewUser] = useState(null);


    useEffect(() => {
        if (newUser) {

            axios
                .post(`${process.env.REACT_APP_URL}/admin/generate`, newUser)
                .then((response) => {
                    console.log(response)
                    setExito(true);
                })
                .catch((error) => {
                    setError(true)
                    console.log(error);
                })
                .finally(()=>console.log(newUser));

        }

    }, [newUser])




    function checkRegister() {
        if (exito) {
            return (
                <RegisterSuccess setExito={setExito} setRegister={setRegister}/>
            )
        }
        else if (error) {
            return (
                <FailLogIn setFail={setError} fail={error}/>
            )
        }
        else{
            return(
                <RegisterForm setRegister={setRegister} setNewUser={setNewUser} setError={setError} setExito={setExito} />
            )
        }
    }


    return (

        <div className={styles.centered}>

            {checkRegister()}

        </div>
    )
}