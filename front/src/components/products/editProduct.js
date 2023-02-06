import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import axios from "axios";

export default function EditProduct({ esNuevo, setMode, id, category, name, price, categoriasDisponibles }) {

    // Product data State. Only active when submitting form
    const [product, setProduct] = useState(null);

    // Creating or editing product. It only works if something has changed
    useEffect(() => {
        console.log("inside useEffect")
        if (esNuevo && product) {
            axios
                .post(`${process.env.REACT_APP_URL}/products`, product)
                .then((response) => { })
                .catch(error => console.log(error))
                .finally(() => setMode(false))
        }
        else if (product && !esNuevo) {
            axios
                .patch(`${process.env.REACT_APP_URL}/products/${id}`, product)
                .then((response) => { console.log(response) })
                .catch(error => console.log(error))
                .finally(() => setMode(false))
        }

    }, [product])

    // When submitting form this function sets product state an trigger the useEffect hook
    function handleEditSubmit(e) {
        e.preventDefault();
        setProduct({
            category: parseInt(document.getElementById("category").value),
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            description: "testing"
        })
    }

    function handleChange(e){     
       console.log(e.target.value);
    }

    // Cancel function
    function handleCancelar() {
        setMode(false);
    }


    return (
        <div className={styles.centered}>
            {esNuevo ? <h2>Crear Producto</h2> : <h2>Editar Producto</h2>}
            <form className={styles.box} onSubmit={handleEditSubmit}>

                Categoría: <select id="category" defaultValue={category} onChange={handleChange} type="number" required>

                    {categoriasDisponibles.map((item, key) => {

                        return (
                            <option  key={key} value={item.id}>{`${item.id}: ${item.description}`}</option>
                        )

                    })}
                </select>
                Nombre: <input id="name" defaultValue={name} type="text" maxLength="20" pattern="([^\s][A-z0-9À-ž\s]+)" required></input>
                Precio: <input id="price" defaultValue={price} type="number" maxLength="10" required></input>
                <div>
                    <button onClick={handleCancelar}>Cancelar</button>
                    <input type="submit" value="Confirmar"></input>
                </div>
            </form>
        </div>
    )
}