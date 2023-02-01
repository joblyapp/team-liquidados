import { useEffect, useState } from "react";
import styles from "../../styles.module.css";
import SaleQuantity from "./saleQuantity";
import axios from "axios";

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
            console.log(saleStatus);
        }

    }, [saleStatus])


    // This function send to de backEnd a JSON structured like this {products: [] total: {}}
    function handleSale() {

        axios
            .post("http://localhost:8080/Sales/", {
                products: saleStatus.map(({productId, quantity}) => ({productId, quantity})),
                total: totalToPay
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("proceso atravesado")
            });





    }

    return (

        <>
            <div className={styles.productsCard}>

                {saleStatus.map((item, key) => (

                    <div key={key} className={styles.listaProductos}>

                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <SaleQuantity quantity={item.quantity} name={item.name} setSaleStatus={setSaleStatus} saleStatus={saleStatus} />
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
            <button onClick={handleSale}>REGISTER SALE</button>
        </>
    )

}