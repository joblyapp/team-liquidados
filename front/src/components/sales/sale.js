import styles from "../styles.module.css";
import SaleDetails from "./saleDetails";
import saleProducts from "./saleProducts.json";

export default function Sale() {
    return (

        <div className={styles.centered}>
            <h3>NUEVA VENTA</h3>
            <SaleDetails saleProducts={saleProducts}/>
        </div>

    )
}