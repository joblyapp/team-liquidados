import { useEffect, useState } from "react";
import styles from "../styles.module.css";

export default function SaleDetails({ saleProducts }) {

    const [totalToPay, setTotalToPay] = useState(0);


    function calculateTotal(products) {
        var sum = 0;
        products.map((item) => {
            sum = sum + item.total;
        })

        setTotalToPay(sum);
    }

    useEffect(() => {

        if (saleProducts) {
            calculateTotal(saleProducts);
        }
     

    })

    return (

        <div className={styles.productsCard}>

            {saleProducts.map((item, key) => (


                <div key={key} className={styles.listaProductos}>

                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{item.amount}</p>
                    <p>{item.total}</p>

                </div>

            )
            )}

            <div>{totalToPay}</div>


        </div>


    )

}