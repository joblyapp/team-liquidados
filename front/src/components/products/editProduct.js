import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import axios from "axios";
import Success from "../success";
import productImages from "./productImages";

export default function EditProduct({ setForceRender, onClose, esNuevo, setMode, id, category, name, price, categoriasDisponibles }) {

    // Product data State. Only active when submitting form
    const [product, setProduct] = useState(null);

    const [success, setSuccess] = useState(false);

    const [image, setImage] = useState();

    useEffect(()=>{
        if(category){
        setImage(productImages[category])
        console.log("This is category: "+ category);    
    }
    },[])

    // Creating or editing product. It only works if something has changed
    useEffect(() => {

        console.log("inside useEffect")
        if (esNuevo && product) {
            axios
                .post(`${process.env.REACT_APP_URL}/products`, product, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    setSuccess(true)
                    setMode(false);
                    setForceRender(true);
                    
                })
                .catch(error => console.log(error))
                .finally(() => {
                   console.log(product)
                })
        }
        else if (product && !esNuevo) {
            axios
                .patch(`${process.env.REACT_APP_URL}/products/${id}`, product, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(() =>{ 
                    setSuccess(true)
                    setImage(productImages[category])
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setMode(false);
                    setForceRender(true)
                })
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

    function handleChange(e) {
        category = e.target.value;
        console.log(document.getElementById("category").value);
        setImage(productImages[category]);
        console.log("la imagen es: " + productImages[category]);
       
    }

    // Cancel function
    function handleCancelar() {
        setMode(false);
        onClose();
    }


    return (

        !success ?

            <div className={styles.centered}>

                {esNuevo ? <h2>Crear Producto</h2> : <h2>Editar Producto</h2>}

                <div className={styles.boxEmergent} style={{ backgroundColor: "white" }}>
                    <div className={styles.boxElement}>
                        <img src={image} alt=""></img>
                    </div>
                    <form className={styles.boxElement} onSubmit={handleEditSubmit}>

                        Categoría: <select id="category" defaultValue={category} onChange={handleChange} type="number" required>

                            {categoriasDisponibles.map((item, key) => {

                                return (
                                    <option key={key} value={item.id}>{`${item.id}: ${item.description}`}</option>
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
            </div>

            :

            <Success operacion="Edicion de producto" setSuccess={setSuccess} setMode={setProduct} onClose={onClose} />


    )
}