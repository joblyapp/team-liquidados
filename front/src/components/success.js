import { useEffect } from "react";
import styles from "./styles.module.css";

export default function Success({ operacion, setSuccess, setMode }) {

    useEffect(()=>{

        setTimeout(()=>{setSuccess(false); setMode("");}, 3000);

    },[])

    return (

        <div className={styles.centered}>

            <h2>La siguiente operación: {operacion} fue realizada con éxito</h2>

        </div>
    )

}