import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../loading";
import styles from "../../styles.module.css";
import SaleBar from "../newSale/saleBar";



export default function ShowSale({ saleId, onClose }) {


    const [saleStatus, setSaleStatus] = useState([]);
    const [load, setLoad] = useState(true);

    const [totalToPay, setTotalToPay] = useState(0);

    const [saleData, setSaleData] = useState();

    const [description, setDescription] = useState(false);


    function calculateTotal(products) {
        var sum = 0;
       
        products.map((item) => (
            sum = sum + item.products.price * item.products.quantity
        ))
        
        setTotalToPay(sum.toFixed(2));
    }


    function handleBack(e) {
        e.preventDefault();
        onClose();
    }

    // Load the current sale information
    useEffect(() => {

        var sale;

        axios
            .get(`${process.env.REACT_APP_URL}/Sales/${saleId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {

                // sale recieves the products array
                sale = response.data;

                // Then map sale and create, for each product, an object with this format: {products: [], total:()}
                sale.products.map((item) => (
                    item.products = { name: item.name, price: item.price, quantity: item.quantity },
                    item.total = () => { return item.products.price * item.products.quantity }
                ))
                
                setSaleStatus(sale.products);
            })
            .then(() => {
                calculateTotal(sale.products);
                setSaleData(sale);

            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
               
                setLoad(false)

            });

    }, [])


    return (


        !load ?

            <div className={styles.centered}>

                {
                    <div className={styles.someAlert}>

                        <div className={styles.space}>
                            <h3>Venta Número: {saleData.number}</h3>

                            <div>{saleData.date.substring(0, 10)} </div>
                            <button className={styles.backCross} onClick={handleBack} >X</button>
                        </div>


                        <SaleBar col={["Nombre", "Precio", "Cantidad", "TOTAL"]} />
                        <div className={styles.productsCard}>

                            {saleStatus.map((item, key) => (

                                <div key={key} className={styles.listaProductos}>

                                    <p>{item.products.name}</p>
                                    <p>${item.products.price}</p>
                                    <p>{item.products.quantity}</p>
                                    <p>${item.total()}</p>

                                </div>

                            )
                            )}

                        </div>
                        <div className={styles.descriptionCancel} style={description ? {display:"flex"} : {display:"none"}}><p>{saleData.cancellationReason}</p></div>
                        <div className={styles.listaProductos}>
                            <div><p> {saleData.paymentForm}</p> </div>
                            <div > {saleData.isCancelled ? <p onMouseEnter={() => setDescription(true)} onMouseLeave={() => setDescription(false)}className={styles.cancelledSale}>Cancelado</p> : <p className={styles.facturedSale}>Facturado</p>}  </div>
                                   
                            <p></p>
                            <h3 style={{ fontWeight: "bold" }}>TOTAL ${totalToPay}</h3>
                        </div>


                    </div>

                }



            </div>



            :

            <Loading />

    )

}