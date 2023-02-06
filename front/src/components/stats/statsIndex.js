import { useEffect, useState } from "react";
import ListOldSales from "../sales/oldSales/ListOldSales";
import StatsInputs from "./statsInputs";
import axios from "axios";
import Loading from "../loading";
import styles from "../styles.module.css";

export default function StatsIndex() {

    const [oldSales, setOldSales] = useState();
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
        <div className={styles.centered}>

            <StatsInputs />
            {!loading

                ?
                <ListOldSales isStats={true} oldSales={oldSales} />
                :
                <Loading />

            }



        </div>


    )
}