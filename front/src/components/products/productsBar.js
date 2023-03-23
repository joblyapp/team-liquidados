import styles from "../styles.module.css";
import Lupa from "../../Images/icons/Lupa.svg"
import Categorias from "./categorias";

export default function ProductsBar({ setBusqueda, categoriasDisponibles, setCategoria, setReverse, setCreateCategory }) {



    function handleInputChange(e) {
        setBusqueda(e.target.value);
    }

    function handleCatChange(e) {
        setCategoria(e.target.value);

    }

    function handleOrder() {
        setReverse(true);
    }


    return (

        <div className={`${styles.listaProductos} ${styles.gapping} ${styles.whiteIt} ${styles.borderTop}`} style={{ paddingLeft: "56px", backgroundColor: "white" }}>

            <div className={styles.inputWithIcon}>
                <img className={styles.iconInside} src={Lupa}></img>
                <input
                    onChange={handleInputChange}
                    placeholder="Buscar"
                    className={styles.inputsBar}
                ></input>
            </div>
            {/*
            <select className={styles.inputsBar} id="categoryFilter" defaultValue={"All"} onChange={handleCatChange} type="number" required>

                <option value="All">Todos</option>

                {

                    categoriasDisponibles.map((item, key) => {

                        return (
                            <option key={key} value={item._id}>{`${item.number}: ${item.name}`}</option>
                        )

                    })}
            </select>
*/}

            <Categorias categoriasDisponibles={categoriasDisponibles} categoriaPorDefecto="All" setCreateCategory={setCreateCategory} setCategoria={setCategoria} />

            <button onClick={handleOrder} className={styles.inputsBar}>⬆⬇ Ordenar</button>
        </div>
    )
}