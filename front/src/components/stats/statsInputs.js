import { useEffect, useState } from "react";
import { format } from 'fecha';
import styles from "../styles.module.css";






export default function StatsInputs({ setCalendar, setReverse }) {



    const [selected, setSelected] = useState("custom");
    const [custom, setCustom] = useState(false);

    const today = format(new Date(), 'isoDate');
    var tomorrow = new Date();
    var week = new Date();
    var month = new Date(today);
    var year = new Date(new Date(today).getFullYear(), 0, 1);

    tomorrow.setDate(tomorrow.getDate() + 1);
    week.setDate(week.getDate() - 7);
    month.setDate(week.getDate() - 30);

    tomorrow = format(tomorrow, 'isoDate');
    week = format(week, 'isoDate');
    month = format(month, 'isoDate');
    year = format(year, 'isoDate');


    useEffect(() => {

        setCustom(false);

        switch (selected) {

            case "today": setCalendar({
                "startDate": today,
                "endDate": tomorrow
            });
                break;
            case "week": setCalendar({
                "startDate": week,
                "endDate": tomorrow
            });
                break;
            case "month": setCalendar({
                "startDate": month,
                "endDate": tomorrow
            });
                break;
            case "year": setCalendar({
                "startDate": year,
                "endDate": tomorrow
            });
                break;
            case "custom": setCustom(true);
                break;
        }



    }, [selected])


    function handleSelection(e) {
        setSelected(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const dateFrom = document.getElementById("dateFrom").value;
        const dateTo = document.getElementById("dateTo").value;

        

        setCalendar({
            "startDate": dateFrom,
            "endDate": dateTo
        })

    }

    function handleOrder(){
        setReverse(true);
    }

    return (

        <div className={`${styles.listaProductos} ${styles.gapping} ${styles.whiteIt} ${styles.borderTop}`}>

            <form className={styles.calendar} onSubmit={handleSubmit}>
                <input
                    id="dateFrom"
                    type="text"
                    placeholder="Desde"
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => e.target.type = 'text'}
                    disabled={!custom}
                    className={styles.inputsBar}
                    style={{maxWidth:"200px"}}>
                        
                </input>
                <p>-</p>
                <input
                    id="dateTo"
                    type="text"
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => e.target.type = 'text'}
                    placeholder="Hasta"
                    disabled={!custom}
                    className={styles.inputsBar}
                    style={{maxWidth:"200px"}}>

                </input>
                <input type="submit" value="Buscar" disabled={!custom} placeholder="Buscar 🔎"></input>
            </form>


            <div>
                <select className={styles.inputsBar} defaultValue={selected} onChange={handleSelection}>
                    <option value="year">Último año</option>
                    <option value="month">Último mes</option>
                    <option value="week">Última semana</option>
                    <option value="today">Hoy</option>
                    <option value="custom">Personalizado</option>
                </select>
            </div>

            <button onClick={handleOrder} className={styles.inputsBar}>⬆⬇ Ordenar</button>
         
        </div>

    )
}