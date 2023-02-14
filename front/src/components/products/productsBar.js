export default function ProductsBar({ setBusqueda, categoriasDisponibles, setCategoria }) {

    function handleInputChange(e) {
        setBusqueda(e.target.value);
    }

    function handleCatChange(e) {
        setCategoria(e.target.value);
    }

    return (

        <div>
            <input onChange={handleInputChange}></input>

            <select id="categoryFilter" defaultValue={"All"} onChange={handleCatChange} type="number" required>

                <option value="All">Todos</option>

                {categoriasDisponibles.map((item, key) => {

                    return (
                        <option key={key} value={item.id}>{`${item.id}: ${item.description}`}</option>
                    )

                })}
            </select>
        </div>
    )
}