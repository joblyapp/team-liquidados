import { useEffect, useState } from "react";
import ListaProductos from "../../products/listaProductos";
import styles from "../../styles.module.css";
import SaleBack from "../saleBack";
import SaleBar from "./saleBar";
import SaleDetails from "./saleDetails";
import Loading from "../../loading";



export default function Sale({ setMode, isEditing, isEditingStatus, setIsEditing }) {

    const [adding, setAdding] = useState(false);
    const [load, setLoad] = useState(false);

    // We create a Sale  Status to register the products on current sale 
    const [saleStatus, setSaleStatus] = useState([]);



    // If we are editing a Sale, load the current sale information
    useEffect(() => {

        if (isEditing) {

            console.log(isEditingStatus);
            const sale = [...saleStatus];
            var newProduct;

            isEditingStatus.map((item) => {

                newProduct = {
                    productId: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    quantity: item.quantity,
                    total() { return this.price * this.quantity; }
                }

                sale.push(newProduct)

            }

            )

            setSaleStatus(sale)
          
        }

    },[])

    return (
        !load ?

            <div className={styles.centered}>

                {adding ?
                    <ListaProductos setSaleStatus={setSaleStatus} saleStatus={saleStatus} isSelling={true} setAdding={setAdding} />
                    :
                    <>
                        <h3>NUEVA VENTA</h3>
                        <SaleBar one="Nombre" two="Precio" three="Cantidad" four="TOTAL" />
                        <SaleDetails saleStatus={saleStatus} setSaleStatus={setSaleStatus} setAdding={setAdding} isEditing={isEditing} />
                        <SaleBack setMode={setMode} />
                    </>

                }

            </div>
            :

            <Loading />

    )
}