import styles from "../../styles.module.css";

export default function SaleBar({one, two, three, four, five, six, seven}) {

    return (
        
        <div style={{backgroundColor: "lightBlue", textAlign: "center"}} className={`${styles.listaProductos} ${styles.listaBar}`}>
            <p> {one}</p>
            <p> {two}</p>
            <p> {three}</p>
            <p> {four}</p>
            <p> {five}</p>
            <p> {six}</p>
            <p> {seven}</p>
        </div>
    )

}