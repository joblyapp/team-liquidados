import { useEffect, useState } from "react";
import styles from "../../styles.module.css";
import SaleBar from "./saleBar";
import SaleDetails from "./saleDetails";
import Loading from "../../loading";
import axios from "axios";
import Success from "../../success";
import UpperBar from "../../upperBar.js/upperBar";
import SaleInputs from "./saleInputs";




export default function Sale({ setMode, isEditing, isEditingId, setIsEditing }) {


    const [load, setLoad] = useState(false);
    const [success, setSuccess] = useState(false);
    const [forceRender, setForceRender] = useState(false);

    // State to register the pay method
    const [payMethod, setPayMethod] = useState("Efectivo");



    const col = ["Producto", "Categoría", "Precio Unitario", "Precio Total", "Cantidad", "Acciones"];



    // Create a Sale  Status to register the products on current sale 
    const [saleStatus, setSaleStatus] = useState([]);

    // Create a state for product search
    const [productSearch, setProductSearch] = useState(false);


    // If we are editing a Sale, load the current sale information
    useEffect(() => {

        if (isEditing) {

            var sale;

            axios
                .get(`${process.env.REACT_APP_URL}/Sales/${isEditingId}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    // sale recieves the products array
                    sale = response.data;
                    console.log(sale);

                    // Then i map sale and create, for each product, an object with this format: {products: [], total:()}
                    sale.products.map((item) => (
                        item.products = { name: item.name, price: item.price, quantity: item.quantity },
                        item.total = () => { return item.products.price * item.products.quantity }
                    ))
                    console.log(sale);
                    setSaleStatus(sale.products);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {

                    console.log(saleStatus)
                    setLoad(false)

                });
        }

    }, [])



    return (

        !success ?

            !load ?

                <div className={styles.centered}>

                    {
                        <>
                            <UpperBar sectionText="Agregar Venta" buttonText="+ Agregar Producto" checkedBoxes={null} setProductSearch={setProductSearch} />

                            <div style={{ backgroundColor: "white" }} className={styles.showBox}>

                                <SaleInputs paymentForm={saleStatus.paymentForm} setPayMethod={setPayMethod} />
                                <SaleBar col={col} />
                                <SaleDetails setForceRender={setForceRender} forceRender={forceRender} saleStatus={saleStatus} setSaleStatus={setSaleStatus} isEditing={isEditing} isEditingId={isEditingId} setSuccess={setSuccess} columns={col.length} productSearch={productSearch} setProductSearch={setProductSearch} setPayMethod={setPayMethod} payMethod={payMethod} setMode={setMode} />

                            </div>


                        </>

                    }

                </div>

                :

                <Loading />
            :

            <Success operacion="La venta fue ingresada correctamente" setSuccess={setSuccess} setMode={setMode} setIsEditing={setIsEditing} />
    )
}