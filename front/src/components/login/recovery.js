import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles.module.css";




export default function Recovery({ setRecovery }) {
    const [recoveryMail, setRecoveryMail] = useState();
    const navigate = useNavigate();


    function handleSubmitRecovery(e) {
        e.preventDefault();
        setRecoveryMail(document.getElementById("email").value);
        console.log("Submitted the recovery mail!");
        setRecovery(false);
    }


    return (
        <div className={styles.centered}>
            <form className={styles.box} onSubmit={handleSubmitRecovery}>
                <input type="email" id="email" placeholder="Ingrese su mail" required></input>
                <div className={styles.botones}>
                    <input type="submit" value="Recuperar contraseña"></input>
                </div>
            </form>
        </div>
    )
}