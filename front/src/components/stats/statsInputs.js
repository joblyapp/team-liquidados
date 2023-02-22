import { useEffect, useState } from "react";
import { format } from 'fecha';
import styles from "../styles.module.css";

export default function StatsInputs({ setCalendar }) {


    const [selected, setSelected] = useState("week");
    const [custom, setCustom] = useState(false);

    const today = format(new Date(), 'isoDate');
    var tomorrow = new Date();
    var week = new Date();
    var month = new Date(today);
    var year = new Date(new Date(today).getFullYear(), 0, 1);

    tomorrow.setDate(tomorrow.getDate() + 1);
    week.setDate(week.getDate() - 7);
    month.setDate(1);

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

        console.log(dateFrom);

        setCalendar({
            "startDate": dateFrom,
            "endDate": dateTo
        })

    }

    return (

        <div className={styles.listaProductos}>
            <div>
                <select defaultValue={selected} onChange={handleSelection}>
                    <option value="year">Último año</option>
                    <option value="month">Último mes</option>
                    <option value="week">Última semana</option>
                    <option value="today">Hoy</option>
                    <option value="custom">Personalizado</option>
                </select>
            </div>
            <div>

                {custom ?
                <form onSubmit={handleSubmit}>
                    <input id="dateFrom" type="date"></input>
                    <input id="dateTo" type="date"></input>
                    <input type="submit" value="Buscar"></input>
                </form>
                :
                ""}

            </div>
        </div>

    )
}