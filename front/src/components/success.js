import { useEffect } from "react";
import styles from "./styles.module.css";
import success from "./success.css";

export default function Success({ operacion, setSuccess, setMode, onClose, setIsEditing }) {

    useEffect(() => {

        setTimeout(() => {

            setSuccess(false);
            if (setIsEditing) {
                setIsEditing(false);
            }

            setMode("");
            console.log("im inside time out!");
            onClose();

        }, 3000);

    })

    return (

        <div className={styles.centered} style={{justifyContent: "center"}}>

            <div class="wrapper">

                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>

                <h3>{operacion}</h3>

            </div>
        </div>
    )

}