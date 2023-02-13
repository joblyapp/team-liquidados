import axios from "axios";
import styles from "../../../components/styles.module.css";


export default function ChangePassForm({ recoveryToken, setSuccess }) {

    function handleSubmitRegister(e) {

        e.preventDefault();

        const pass = document.getElementById("pass").value;
        const passRepeat = document.getElementById("passRepeat").value;

        if (pass === passRepeat) {

            console.log("Se pudo enviar cambio de contraseña");
            
            axios
                .post(`${process.env.REACT_APP_URL}/reset`, {pass, recoveryToken} ,{
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                      'Content-Type': 'application/json'
                    }
                  })
                .then((response) => {
                    console.log("La contraseña nueva ha sido recibida con éxito")
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setSuccess(true);
                });


        }
        else {
            console.log("No se pudo enviar cambio de contraseña");
        }

    }


    return (

        <div className={styles.centered}>

            <form className={styles.box} onSubmit={handleSubmitRegister}>

                <input type="password" id="pass" placeholder="Ingrese su contraseña" required></input>
                <input type="password" id="passRepeat" placeholder="Ingrese nuevamente su contraseña" required></input>

                <div className={styles.botones}>
                    <input type="submit" value="Cambiar contraseña"></input>
                </div>

            </form>

        </div>



    )
}