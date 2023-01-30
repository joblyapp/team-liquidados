import styles from "../styles.module.css";

export default function SaleBar() {

    return (
        <div style={{backgroundColor: "lightBlue", textAlign: "center"}} className={styles.listaProductos}>
            <p> Producto</p>
            <p> Precio</p>
            <p> Cantidad</p>
            <p> Total</p>



        </div>
    )

}