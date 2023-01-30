import { useEffect } from "react";
import styles from "../../styles.module.css";


export default function RegisterSuccess({ setExito , setRegister}){

    useEffect(() => {
        setTimeout(() => setExito(false), 3000)
        setTimeout(() => setRegister(false),3000)
    })

    return(

        <div className={styles.box}>

            <h3>El USUARIO fue registrado con éxito</h3>

        </div>
    )
}