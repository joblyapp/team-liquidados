import { useEffect, useState } from "react";
import ListOldSales from "../sales/oldSales/ListOldSales";
import StatsInputs from "./statsInputs";
import axios from "axios";
import Loading from "../loading";
import styles from "../styles.module.css";

export default function StatsIndex() {

    const [oldSales, setOldSales] = useState();
    const [loading, setLoading] = useState(true);
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

            <StatsInputs setCalendar={setCalendar} />

            {!loading

                ?
                <ListOldSales isStats={true} oldSales={oldSales} />
                :
                <Loading />

            }



        </div>


    )
}