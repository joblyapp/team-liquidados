import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles.module.css";
import EditProduct from "./editProduct";
import ListaProductos from "./listaProductos";
import { selectUser } from "../../features/userSlices";
import LogIn from "../login/logIn";
import Session from "../session/session";

/* Para poder reutilizar el componente PRODUCTOS necesito distinguir si se ingresó desde PRODUCTOS o desde VENTAS */


export default function Products({ fromVentas }) {
    const [busqueda, setBusqueda] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [productInfo, setProductInfo] = useState({});

    const [esNuevo, setEsNuevo] = useState(false);

    const user = useSelector(selectUser);

    const navigate = useNavigate();


    function handleInputChange(e) {
        setBusqueda(e.target.value);
    }


    function handleBack(to) {
        navigate(to);
    }




    return (
        <> 
          <Session />

         {!user.loggedIn ? <LogIn /> :
        

            editMode ? <EditProduct esNuevo={esNuevo} setMode={setEditMode} id={productInfo.id} name={productInfo.name} price={productInfo.price} />

                :

                esNuevo ? <EditProduct esNuevo={esNuevo} setMode={setEsNuevo} id={""} name={""} price={""} />
                    :
                    <div className={styles.centered}>
                        <h3>PRODUCTOS</h3>
                        <input onChange={handleInputChange}></input>

                        <ListaProductos value={busqueda} setProductInfo={setProductInfo} setEditMode={setEditMode} />

                        <div>
                            <button onClick={() => handleBack("/")}>Volver</button>
                            <button onClick={() => setEsNuevo(true)}>Nuevo Producto</button>
                        </div>
                    </div>
            }        
        </>

    )
}