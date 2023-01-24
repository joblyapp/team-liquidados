import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../features/userSlices";
import styles from "../styles.module.css"
import FailLogIn from "./failLogIn";


export default function Enter({ user, user2, setRecovery, setRegister }) {

    const [fail, setFail] = useState(false);

    // Redux receptor for user login
    const dispatch = useDispatch();


    // This handleSubmit function must be re-written. It will be too dirty by adding back end fetch
    function handleSubmit(e) {

        e.preventDefault();

        const correo = document.getElementById("email").value;
        const contra = document.getElementById("pass").value;

        if ((correo == user.mail && contra == user.pass) || (correo == user2.mail && contra == user2.pass)) {

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
    }
    // This handleSubmit function must be re-written. It will be too dirty when adding backEnd fetch


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
            <>
                <div className={styles.centered}>

                    <form className={styles.box} onSubmit={handleSubmit}>
                        <input type="email" id="email" placeholder="Ingrese su mail" required></input>
                        <input type="password" id="pass" placeholder="Ingrese su contraseña" required></input>



                        <div className={styles.botones}>
                            <button onClick={handleRegister} >Registrarse</button>
                            <input type="submit" value="Ingresar"></input>
                        </div>
                        <p className={styles.recover} onClick={handleRecovery}>Recuperar contraseña</p>
                    </form>


                </div>
            </>

    )
}