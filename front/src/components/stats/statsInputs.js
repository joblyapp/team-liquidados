import { useState } from "react"

export default function StatsInputs() {

    const [selected, setSelected] = useState("custom");

    function handleSelection(e){
        setSelected(e.target.value);
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
                <input type="date"></input>
                <input type="date"></input>
            </div>
        </>

    )
}