import { useEffect, useState } from "react"

export default function StatsInputs({ setCalendar }) {


    const [selected, setSelected] = useState("custom");
    
/*
    useEffect(()=>{
        switch (selected){
            case: 
        }



    },[selected])
*/
   
    function handleSelection(e) {
        setSelected(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const dateFrom =  document.getElementById("dateFrom").value;
        const dateTo = document.getElementById("dateTo").value;

        console.log(dateFrom);
        console.log(dateTo);

        setCalendar({
            "startDate": dateFrom,
            "endDate": dateTo
        })

    }

    return (

        <>
            <div>
                <select defaultValue={selected} onChange={handleSelection}>
                    <option value="year">Último año</option>
                    <option value="month">Último mes</option>
                    <option value="week">Última semana</option>
                    <option value="day">Último día</option>
                    <option value="custom">Personalizado</option>
                </select>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input id="dateFrom" type="date"></input>
                    <input id="dateTo" type="date"></input>
                    <input type="submit" value="Buscar"></input>
                </form>
            </div>
        </>

    )
}