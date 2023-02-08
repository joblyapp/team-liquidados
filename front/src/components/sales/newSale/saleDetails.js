import { useEffect, useState } from "react";
import styles from "../../styles.module.css";
import SaleQuantity from "./saleQuantity";
import axios from "axios";

export default function SaleDetails({ saleStatus, setSaleStatus, setAdding, isEditing, setMode, isEditingId, setSuccess }) {

    const [totalToPay, setTotalToPay] = useState(0);


    function calculateTotal(products) {
        var sum = 0;
        products.map((item) => (
            sum = sum + item.total()
        ))

        setTotalToPay(sum);
    }

    useEffect(() => {

        if (saleStatus) {
            console.log(saleStatus);
            calculateTotal(saleStatus);

        }

    }, [saleStatus])


    // This function send to de backEnd a JSON structured like this {products: [] total: {}}
    function handleSale() {

        if (isEditing) {
            axios
                .patch(`http://localhost:8080/Sales/${isEditingId}`, {
                    products: saleStatus.map(({ productId, quantity }) => ({ productId, quantity })),
                    total: totalToPay
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setSuccess(true);
                });
        }
        else {

            axios
                .post("http://localhost:8080/Sales/", {
                    products: saleStatus.map(({ productId, quantity }) => ({ productId, quantity })),
                    total: totalToPay
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setSuccess(true);
                });

        }





    }

    return (

        <>
            <div className={styles.productsCard}>

                {saleStatus.map((item, key) => (

                    <div key={key} className={styles.listaProductos}>

                        <p>{item.productId.name}</p>
                        <p>{item.productId.price}</p>
                        <SaleQuantity quantity={item.quantity} name={item.productId.name} setSaleStatus={setSaleStatus} saleStatus={saleStatus} />
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