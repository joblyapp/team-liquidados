import styles from "./styles.module.css";

export default function Loading({  }) {


    return (
        <div className={styles.centered} style={{justifyContent: "center"}}>

            <div className={styles.ldsCircle}> <div></div> </div>

        </div>
    )
}