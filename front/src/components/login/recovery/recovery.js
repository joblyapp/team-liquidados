import { useEffect, useState } from "react";
import FailLogIn from "../failLogIn";
import styles from "../../styles.module.css";
import axios from "axios";
import RecoverySuccess from "./recoverySucces";




export default function Recovery({ setRecovery }) {

    const [recoveryMail, setRecoveryMail] = useState();
    const [fail, setFail] = useState(false);
    const [exito, setExito] = useState(false);


    function checkMail(mes) {

        console.log("Inside checkMail: " + mes);

        if (mes === 'User not registered') {
            console.log("inside checkmail if")
            setFail(true);
        }
        else {
            console.log("inside checkmail else")
            setExito(true);
        }

    }


    useEffect(() => {

        if (recoveryMail) {

            axios
                .post("http://localhost:8080/admin/forgot", recoveryMail,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((response) => {
                    console.log(response);
                    checkMail(response.data.message)
                })
                .catch((error) => {
                    console.log(error);
                    setFail(true);
                })
                .finally(() => {

                }

                );
        }

    }, [recoveryMail])


    function handleSubmitRecovery(e) {
        e.preventDefault();
        console.log(document.getElementById("email").value)
        setRecoveryMail({
            email: document.getElementById("email").value
        }
        )
    }


    return (

        <div className={styles.centered}>

            {!fail ?

                !exito ?

                    <div className={styles.centered}>
                        <form className={styles.box} onSubmit={handleSubmitRecovery}>
                            <input type="email" id="email" placeholder="Ingrese su mail" required></input>
                            <div className={styles.botones}>
                                <input type="submit" value="Recuperar contraseña"></input>
                            </div>
                        </form>
                    </div>

                    :

                    <RecoverySuccess setExito={setExito} setRecovery={setRecovery} />



                :

                <FailLogIn setFail={setFail} fail={fail} />
            }


        </div>

    )
}