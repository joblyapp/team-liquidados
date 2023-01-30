import styles from "../styles.module.css";


export default function EnterForm({ setUserData, color }) {

    function handleSubmit(e) {
        e.preventDefault();
        setUserData({
            correo: document.getElementById("email").value,
            contra: document.getElementById("pass").value
        })
    }


    return (

        <div>

            <form style={{borderColor: color}} className={styles.box} onSubmit={handleSubmit}>
                <input type="email" id="email" placeholder="Ingrese su mail" required></input>
                <input type="password" id="pass" placeholder="Ingrese su contraseña" required></input>
                <div className={styles.botones}>
                    <input type="submit" value="Ingresar"></input>
                </div>
            </form>

        </div>


    )



}