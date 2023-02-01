import { useEffect, useState } from "react";
import axios from "axios";
import SaleBack from "../saleBack";
import styles from "../../styles.module.css";
import Loading from "../../loading";

export default function OldSales({ setMode }) {

    const [oldSales, setOldSales] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        axios
            .get("http://localhost:8080/Sales/")
            .then((response) => {
                console.log(response);
                setOldSales(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])


    return (

        !loading ?

            <div className={styles.productCard}>


                {oldSales.map((item, key) => (

                    <div key={key} className={styles.listaProductos}>

                        <p>{item.total}</p>

                        {item.products.map((product, key) => (

                            <p key={key}> {product.productId.DateOfEntry} </p>


                                )



                        )}

                            </div>

                        )
                        )}

                        <SaleBack setMode={setMode} />


                    </div>

            :

                <Loading />

                )
}