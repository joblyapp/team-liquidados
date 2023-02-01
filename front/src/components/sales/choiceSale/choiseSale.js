
import styles from "../../../components/styles.module.css";


export default function ChoiseSale({ setMode }) {

    function changeMode (modo){
        setMode(modo);
    }


    return (

        <div className={styles.centered}>

            <div className={styles.welcomeTouch} >
                <h2 className={styles.selectTouch} style={{ gridColumn: "1 / 3", gridRow: "1 / 4", backgroundColor: "green" }} onClick={() => changeMode("new")} >NUEVA VENTA</h2>
                <h2 className={styles.selectTouch} style={{ gridColumn: "1 / 3", gridRow: "4 / 7", backgroundColor: "red" }} onClick={() => changeMode("old")} >VENTAS ANTERIORES</h2>
            </div>
        </div>


    )
}