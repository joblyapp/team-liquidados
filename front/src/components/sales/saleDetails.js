import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import SaleQuantity from "./saleQuantity";

export default function SaleDetails({ saleStatus, setSaleStatus, setAdding }) {

    const [totalToPay, setTotalToPay] = useState(0);


    function calculateTotal(products) {
        var sum = 0;
        products.map((item) => {
            sum = sum + item.total();
        })

        setTotalToPay(sum);
    }

    useEffect(() => {

        if (saleStatus) {
            calculateTotal(saleStatus);
        }

    }, [saleStatus])



    return (

        <>
            <div className={styles.productsCard}>

                {saleStatus.map((item, key) => (

                    <div key={key} className={styles.listaProductos}>

                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <SaleQuantity amount={item.amount} name={item.name} setSaleStatus={setSaleStatus} saleStatus={saleStatus} />
                        <p>{item.total()}</p>

                    </div>

                )
                )}

            </div>
            <div className={styles.listaProductos}>
                <p></p>
                <p></p>
                <p></p>
                <p style={{ fontWeight: "bold" }}>{totalToPay}</p>
            </div>


            <button onClick={() => setAdding(true)}>ADD NEW PRODUCT</button>
        </>
    )

}