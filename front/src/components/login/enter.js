import { useState } from "react";
import styles from "../styles.module.css"


export default function Enter({ user, setLogged, setRecovery, setRegister }) {

    const [fail, setFail] = useState(false);

    function handleSubmit(e) {

        e.preventDefault();

        if (document.getElementById("email").value == user.mail && document.getElementById("pass").value == user.pass) {
            console.log("Submitted!");
            setLogged(true);
        }
        else {
            console.log("Error!");
            setFail(true);
        }
    }

    function handleRecovery() {
        setRecovery(true);
    }

    function handleRegister(e) {
        e.preventDefault();
        setRegister(true);
    }
    return (
        <div className={styles.centered}>

            <form className={styles.box} onSubmit={handleSubmit}>
                <input type="email" id="email" placeholder="Ingrese su mail" required></input>
                <input type="password" id="pass" placeholder="Ingrese su contraseña" required></input>

                {fail && <p>Los datos ingresados no son correctos</p>}
                <div className={styles.botones}>
                    <button onClick={handleRegister} >Registrarse</button>
                    <input type="submit" value="Ingresar"></input>
                </div>
                <p className={styles.recover} onClick={handleRecovery}>Recuperar contraseña</p>
            </form>


        </div>
    )
}