import { useEffect, useState } from "react";
import styles from "../../styles.module.css";
import SaleQuantity from "./saleQuantity";
import axios from "axios";
import categorias from "../../products/categorias.json";
import { confirmAlert } from "react-confirm-alert";
import ProductSearch from "./productSearch";

export default function SaleDetails({ setForceRender, forceRender, saleStatus, setSaleStatus, isEditing, setMode, isEditingId, setSuccess }) {

    const [totalToPay, setTotalToPay] = useState(0);
    const [payMethod, setPayMethod] = useState("Cash");


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

            const temporarySales = {
                products: saleStatus.map(({ products }) => ({ name: products.name, price: products.price, quantity: products.quantity })),
                total: totalToPay,
                isCancelled: false,
                paymentForm: payMethod
            };

            console.log(temporarySales)

            axios
                .patch(`${process.env.REACT_APP_URL}/Sales/${isEditingId}`, temporarySales, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response);
                    setSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {

                });
        }
        else {
            console.log("Payment Form: " + typeof payMethod)
            const temporarySales = {
                products: saleStatus.map(({ products }) => ({ name: products.name, price: products.price, quantity: products.quantity })),
                total: totalToPay,
                isCancelled: false,
                paymentForm: payMethod
            };

            console.log(temporarySales)

            axios
                .post(`${process.env.REACT_APP_URL}/Sales/`, temporarySales, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response);
                    setSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function handleAddProduct() {
        confirmAlert({

            customUI: ({ onClose }) => {

                return (

                    <ProductSearch
                        categorias={categorias}
                        setForceRender={setForceRender}
                        forceRender={forceRender}
                        saleStatus={saleStatus}
                        setSaleStatus={setSaleStatus}
                        onClose={onClose}
                    />

                );
            },
            closeOnClickOutside: false
        });
    }


    return (

        <>
            <div className={styles.productsCard}>

                {saleStatus.map((item, key) => (

                    <div key={key} className={styles.listaProductos}>

                        <p>{item.products.name}</p>
                        <p>{item.products.price}</p>
                        <SaleQuantity
                            quantity={item.products.quantity}
                            name={item.products.name}
                            setSaleStatus={setSaleStatus}
                            saleStatus={saleStatus}
                        />
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

            <select onChange={(e) => setPayMethod(e.target.value)} defaultValue={saleStatus.paymentForm}>
                <option value="Cash">Efectivo</option>
                <option value="Debit">Tarjeta de Débito</option>
                <option value="Credit">Tarjeta de Crédito</option>
            </select>

            <button onClick={handleAddProduct}>ADD NEW PRODUCT</button>
            <button onClick={handleSale}>REGISTER SALE</button>

        </>
    )

}