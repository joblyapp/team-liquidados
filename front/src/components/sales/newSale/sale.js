import { useState } from "react";
import ListaProductos from "../../products/listaProductos";
import styles from "../../styles.module.css";
import SaleBack from "../saleBack";
import SaleBar from "./saleBar";
import SaleDetails from "./saleDetails";


export default function Sale({ setMode }) {

    const [adding, setAdding] = useState(false);

    // We create a Sale  Status to register the products on current sale 
    const [saleStatus, setSaleStatus] = useState([]);



    return (


        <div className={styles.centered}>
            
            {adding ? 
                    <ListaProductos setSaleStatus={setSaleStatus} saleStatus={saleStatus} isSelling={true} setAdding={setAdding}/>
           :
                <>
                    <h3>NUEVA VENTA</h3>
                    <SaleBar />
                    <SaleDetails saleStatus={saleStatus} setSaleStatus={setSaleStatus} setAdding={setAdding} />
                    <SaleBack setMode={setMode} />
                </>

            }

        </div>

    )
}