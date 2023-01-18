import { useState } from "react";
import styles from "../styles.module.css"


export default function Register({setRegister}) {

    const [error, setError] = useState(false);

    function handleSubmitRegister(e){

        e.preventDefault();
        const pass = document.getElementById("pass").value;
        const passRepeat = document.getElementById("passRepeat").value;
        
        if(pass == passRepeat){
            console.log("El usuario ha sido registrado con éxito!");
            setRegister(false);
        }
        else{
            setError(true);
        }
    }


    return (
        <div className={styles.centered}>

            <form className={styles.box} onSubmit={handleSubmitRegister}>
                <input type="text" id="name" placeholder="Ingrese su nombre" required></input>
                <input type="text" id="lastname" placeholder="Ingrese su Apellido" required></input>
                <input type="email" id="email" placeholder="Ingrese su mail" required></input>
                <input type="password" id="pass" placeholder="Ingrese su contraseña" required></input>
                <input type="password" id="passRepeat" placeholder="Ingrese nuevamente su contraseña" required></input>

                <div className={styles.botones}>
                    <input type="submit" value="Registrarse"></input>
                </div>

            </form>

            {error && <p>Las contraseñas no coinciden</p>}


        </div>
    )
}