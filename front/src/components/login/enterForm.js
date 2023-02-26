import { useEffect, useState } from "react";
import styles from "../styles.module.css";


export default function EnterForm({ setUserData, color }) {

    const [showPassLogo, setShowPassLogo] = useState("./openPass.png");
    const [userRememberedData, setUserRememberedData] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("remember")) {

            setUserRememberedData(JSON.parse(localStorage.getItem("remember")));

        }

    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        setUserData({
            email: document.getElementById("email").value,
            password: document.getElementById("pass").value
        })
        console.log("SETTING USER DATA")
    }

    function handleClick(e, id) {
        e.preventDefault();

        var valor = document.getElementById(id).type;

        if (valor === "password") {
            document.getElementById(id).type = "text";
            setShowPassLogo("./closedPass.png");
        }
        else {
            document.getElementById(id).type = "password";
            setShowPassLogo("./openPass.png");
        }
    }


    return (

        <div>

            <form className={styles.formBox} onSubmit={handleSubmit}>

                <div>
                    <label >Correo electrónico</label>
                    <input defaultValue={userRememberedData?.email} className={styles.inputs} type="email" id="email" placeholder="Ingrese su mail" required></input>
                </div>

                <div>
                    <label>Contraseña</label>
                    <div className={styles.passContainer} style={{ display: "flex" }}>

                        <input defaultValue={userRememberedData?.password} className={styles.inputs} type="password" id="pass" placeholder="Ingrese su contraseña" required></input>
                        <button className={styles.showPass} onClick={(e) => handleClick(e, "pass")}><img src={showPassLogo} alt="show password"></img></button>
                    </div>
                </div>
                <div className={styles.checkContainer} >
                    <label className={styles.labelOrder}>
                        <input type="checkbox" value="recordarme"></input>Recordarme
                    </label>

                </div>


                <div className={styles.botones}>
                    <input className={styles.loginButton} type="submit" value="Ingresar"></input>
                </div>

            </form>

        </div>


    )



}