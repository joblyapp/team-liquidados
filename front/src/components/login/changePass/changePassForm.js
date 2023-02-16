import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../../../components/styles.module.css";


export default function ChangePassForm({ recoveryToken, setSuccess, setFail }) {

    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState("password");

    const resetToken = recoveryToken;

    function handleSubmitRegister(e) {

        e.preventDefault();

        const pass = document.getElementById("pass").value;
        const passRepeat = document.getElementById("passRepeat").value;

        if (pass === passRepeat) {

            console.log("Se pudo enviar cambio de contraseña (paso 1)");
            console.log("enviando pass: " + pass + " y token: " + resetToken);
            axios
                .post(`${process.env.REACT_APP_URL}/admin/reset`, { pass, resetToken })
                .then((response) => {
                    console.log("La contraseña nueva ha sido recibida con éxito (paso 2)");
                    setSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                    setFail(true);
                })
                .finally(() => {

                });


        }
        else {
            console.log("No se pudo enviar cambio de contraseña");
        }

    }

    useEffect(()=>{

        if(showPassword){
            setInputType("text");
        }
        else {
            setInputType("password");
        }


    },[showPassword])

    function handleClick(e,id){
        e.preventDefault();
        var valor = document.getElementById(id).type;
    
        if (valor === "password"){
            document.getElementById(id).type = "text";
        }
        else{
            document.getElementById(id).type = "password";
        }
    }

    return (

        <div className={styles.centered}>

            <h1> NUEVA CONTRASEÑA</h1>

            <form className={styles.box} onSubmit={handleSubmitRegister}>

                <div>
                    <input type={inputType} id="pass" placeholder="Ingrese su contraseña" required></input>
                    <button onClick={(e)=>handleClick(e,"pass")}>👁</button>
                </div>

                <div>
                    <input type={inputType} id="passRepeat" placeholder="Ingrese nuevamente su contraseña" required></input>
                    <button onClick={(e)=>handleClick(e,"passRepeat")}>👁</button>
                </div>
                <div className={styles.botones}>
                    <input type="submit" value="Cambiar contraseña"></input>
                </div>

            </form>

        </div>



    )
}