import styles from "../styles.module.css";

export default function ProductsBar({ setBusqueda, categoriasDisponibles, setCategoria, setReverse }) {



    function handleInputChange(e) {
        setBusqueda(e.target.value);
    }

    function handleCatChange(e) {
        setCategoria(e.target.value);
    }

    function handleOrder(){
        setReverse(true);
    }


    return (

        <div className={`${styles.listaProductos} ${styles.gapping} ${styles.whiteIt} ${styles.borderTop}`} style={{ paddingLeft: "56px", backgroundColor:"white" }}>

            <input
            onChange={handleInputChange} 
            placeholder="Buscar 🔎"
            className={styles.inputsBar}
            ></input>

            <select   className={styles.inputsBar} id="categoryFilter" defaultValue={"All"} onChange={handleCatChange} type="number" required>

                <option value="All">Todos</option>

                {

                    categoriasDisponibles.map((item, key) => {

                        return (
                            <option key={key} value={item._id}>{`${item.number}: ${item.name}`}</option>
                        )

                    })}
            </select>

            <button onClick={handleOrder} className={styles.inputsBar}>⬆⬇ Ordenar</button>
        </div>
    )
}