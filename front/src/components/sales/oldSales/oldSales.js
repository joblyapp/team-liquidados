import { useEffect, useState } from "react";
import axios from "axios";
import SaleBack from "../saleBack";
import styles from "../../styles.module.css";
import Loading from "../../loading";
import SaleBar from "../newSale/saleBar";
import ListOldSales from "./ListOldSales";
import Sale from "../newSale/sale";

export default function OldSales({ setMode }) {

    const [oldSales, setOldSales] = useState("");
    const [loading, setLoading] = useState(true);
    // Create an state for editing mode
    const [isEditing, setIsEditing] = useState(false);
    const [editingStatus, setEditingStatus] = useState(null);



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

        <div className={styles.centered}>

            {!loading ?

                !isEditing ?

                    <div className={styles.productCard}>

                        <SaleBar one="Fecha" two="Cantidad de Productos" three="Productos" four="TOTAL" />

                        <ListOldSales oldSales={oldSales} setIsEditing={setIsEditing} setEditingStatus={setEditingStatus} />

                        <SaleBack setMode={setMode} />

                    </div>
                    :
                    <Sale isEditing={isEditing} isEditingStatus={editingStatus} setIsEditing={setIsEditing}    />
                :

                <Loading />}

        </div>
    )
}