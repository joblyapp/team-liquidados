import styles from "../styles.module.css";

export default function UpperBar({setEsNuevo, sectionText, buttonText}) {


    return (

        <div className={styles.space}>

            <div >
                <h3>{sectionText}</h3>
                <p>Export ⬇</p>
            </div>

            <button className={styles.button} onClick={() => setEsNuevo(true)}>{buttonText}</button>

        </div>
    )
}