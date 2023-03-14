import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles.module.css";

export default function ProductsBar({ setBusqueda, categoriasDisponibles, setCategoria }) {

 
 
    function handleInputChange(e) {
        setBusqueda(e.target.value);
    }

    function handleCatChange(e) {
        setCategoria(e.target.value);
    }



    return (

        <div className={styles.listaProductos} style={{paddingLeft: "56px"}}>
            <input onChange={handleInputChange}></input>

            <select id="categoryFilter" defaultValue={"All"} onChange={handleCatChange} type="number" required>

                <option value="All">Todos</option>

                {

                    categoriasDisponibles.map((item, key) => {

                        return (
                            <option key={key} value={item.number}>{`${item.number}: ${item.name}`}</option>
                        )

                    })}
            </select>
        </div>
    )
}