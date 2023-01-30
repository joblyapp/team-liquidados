import EnterForm from "../login/enterForm";
import styles from "../styles.module.css";

export default function AdminUser() {

    return (
        <div className={styles.centered}>
            <img style={{ width: 50 }} src="/warning.png"></img>
            <h4 className={styles.message}>Esta pantalla es para la creación de un usuario ADMIN. Si usted ya creó uno o
                no está autorizado o capacitado para la creación de un usuario admin, por favor comuníquese
                con el encargado del área.
            </h4>


            <EnterForm color="red" />

        </div>
    )
}