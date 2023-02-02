import styles from "../../styles.module.css";

export default function SaleBar({one, two, three, four}) {

    return (
        <div style={{backgroundColor: "lightBlue", textAlign: "center"}} className={styles.listaProductos}>
            <p> {one}</p>
            <p> {two}</p>
            <p> {three}</p>
            <p> {four}</p>
        </div>
    )

}