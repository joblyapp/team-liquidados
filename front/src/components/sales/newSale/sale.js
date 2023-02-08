import { useEffect, useState } from "react";
import ListaProductos from "../../products/listaProductos";
import styles from "../../styles.module.css";
import SaleBack from "../saleBack";
import SaleBar from "./saleBar";
import SaleDetails from "./saleDetails";
import Loading from "../../loading";
import axios from "axios";
import Success from "../../success";



export default function Sale({ setMode, isEditing, isEditingId, setIsEditing }) {

    const [adding, setAdding] = useState(false);
    const [load, setLoad] = useState(false);
    const [success, setSuccess] = useState(false);
    
    // We create a Sale  Status to register the products on current sale 
    const [saleStatus, setSaleStatus] = useState([]);



    // If we are editing a Sale, load the current sale information
    useEffect(() => {

        if (isEditing) {
            
            var sale;

            axios
                .get(`http://localhost:8080/Sales/${isEditingId}`)
                .then((response) => {
                    console.log(response.data.products);
                    sale = response.data.products;
                    console.log(sale);
                    sale.map((item) => (
                        item.total = () => { return item.productId.price * item.quantity }
                    ))
                    console.log(sale);
                    setSaleStatus(sale);
                    console.log("Sale: " + sale[0].productId.total)
                    console.log(typeof saleStatus);

                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    console.log("saleStatus: " + saleStatus)
                    setLoad(false)

                });
        }
    }, [])



    return (

        !success ?

            !load ?

                <div className={styles.centered}>

                    {adding ?

                        <ListaProductos setSaleStatus={setSaleStatus} saleStatus={saleStatus} isSelling={true} setAdding={setAdding} />
                        :
                        <>
                            {!isEditing ? <h3>NUEVA VENTA</h3> : <h3>EDITAR VENTA</h3>}

                            <SaleBar one="Nombre" two="Precio" three="Cantidad" four="TOTAL" />
                            <SaleDetails saleStatus={saleStatus} setSaleStatus={setSaleStatus} setAdding={setAdding} isEditing={isEditing} setMode={setMode} isEditingId={isEditingId} setSuccess={setSuccess} />
                            <SaleBack setMode={setMode} isEditing={isEditing} setIsEditing={setIsEditing} />
                        </>

                    }

                </div>

                :

                <Loading />
            :

            <Success operacion="Venta" setSuccess={setSuccess} setMode={setMode}/>
    )
}