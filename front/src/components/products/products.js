import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles.module.css";
import EditProduct from "./editProduct";
import ListaProductos from "./listaProductos";



export default function Products() {

    // Input
    const [busqueda, setBusqueda] = useState("");

    // Enable Edit Mode both NEW PRODUCT or EDIT PRODUCT
    const [editMode, setEditMode] = useState(false);
    const [esNuevo, setEsNuevo] = useState(false);
   
    // Object that contains PRODUCT info
    const [productInfo, setProductInfo] = useState({});

    // Just to navigate
    const navigate = useNavigate();


    function handleInputChange(e) {
        setBusqueda(e.target.value);
    }


    function handleBack(to) {
        navigate(to);
    }


    return (
        <>


            {editMode

                ? <EditProduct esNuevo={esNuevo} setMode={setEditMode} id={productInfo.id} category={productInfo.category} name={productInfo.name} price={productInfo.price} />

                : esNuevo

                    ? <EditProduct esNuevo={esNuevo} setMode={setEsNuevo} category={""} name={""} price={""} />
                    : <div className={styles.centered}>
                        <h3>PRODUCTOS</h3>
                        <input onChange={handleInputChange}></input>

                        <ListaProductos value={busqueda} setProductInfo={setProductInfo} setEditMode={setEditMode} editMode={editMode} />

                        <div>
                            <button onClick={() => handleBack("/")}>Volver</button>
                            <button onClick={() => setEsNuevo(true)}>Nuevo Producto</button>
                        </div>
                    </div>
<<<<<<< HEAD
            }
=======
            }        
>>>>>>> productsCrud
        </>

    )
}