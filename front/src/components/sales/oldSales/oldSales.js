import { useEffect, useState } from "react";
import axios from "axios";
import SaleBack from "../saleBack";
import styles from "../../styles.module.css";
import Loading from "../../loading";
import SaleBar from "../newSale/saleBar";
import ListOldSales from "./ListOldSales";
import Sale from "../newSale/sale";
import StatsInputs from "../../stats/statsInputs"
import UpperBar from "../../upperBar.js/upperBar";

export default function OldSales({ setMode, mode }) {

    const [oldSales, setOldSales] = useState("");
    const [loading, setLoading] = useState(true);

    // Create an state for editing mode
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Create a calendar state for filtering Old Sales
    const [calendar, setCalendar] = useState(null);


    useEffect(() => {

        if (calendar) {

            axios
                .post(`${process.env.REACT_APP_URL}/sales/statistics`, calendar, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response)
                    setOldSales(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        else {

            axios
                .get(`${process.env.REACT_APP_URL}/Sales`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
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


        }

    }, [calendar])


    return (

        <div className={styles.centered}>

            <UpperBar setEsNuevo={null} sectionText="Ventas" buttonText={"Nueva Venta"} />

            {!loading ?

                !isEditing ?

                    <div>

                        <StatsInputs setCalendar={setCalendar} />

                        <SaleBar one="Fecha" two="Cantidad de Productos" three="Productos" four="TOTAL" />

                        <ListOldSales oldSales={oldSales} setIsEditing={setIsEditing} setEditingId={setEditingId} />

                        <SaleBack setMode={setMode} toMenu={true} setIsEditing={setIsEditing} />

                    </div>
                    :

                    <Sale setMode={setMode} isEditing={isEditing} isEditingId={editingId} setIsEditing={setIsEditing} />
                :

                <Loading />}

        </div>
    )
}