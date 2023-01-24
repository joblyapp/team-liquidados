import styles from "../styles.module.css";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from "react";
import axios from "axios";



export default function ListaProductos({ value, setProductInfo, setEditMode }) {

    // Loading wheel
    const [loading, setLoading] = useState(true);

    // Data obtained from BackEnd
    const [datos, setDatos] = useState();

    // State to force render after deleting an element
    const [forceRender, setForceRender] = useState(false);


    // Hook to load information from DataBase. It render again after deleting a file
    useEffect(() => {
        console.log("rendering again")
        axios
            .get("http://localhost:8080/products")
            .then((response) => {
                setDatos(response.data)
                setLoading(false);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setForceRender(false))
    }, [forceRender])

    // Delete function
    function handleDelete(id) {

        axios
            .delete(`http://localhost:8080/products/${id}`)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setForceRender(true))
    }

    // Confirm delete function
    function handleAlert(id) {
        console.log("borranding this ID: " + id);

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={styles.alert}>
                        <h1>Elminar Producto</h1>
                        <p>¿Está seguro de que desea eliminar este producto?</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                handleDelete(id);
                                onClose();
                            }}

                        >
                            Yes
                        </button>
                    </div>
                );
            }
        });

    }

    // Turns on Edit Mode on parent component
    function handleEdit(id, category, name, price) {
        console.log("editing");
        setEditMode(true);
        setProductInfo({
            id: id,
            category: category,
            name: name,
            price: price
        });

    }



    return (

        !loading ?

            <div className={styles.productsCard}>

                {
                    datos.filter(product => product.name.toLowerCase().includes(value) || String(product.id).includes(value)
                    ).map((item, key) => (
                        <div key={key} className={styles.listaProductos}>
                            <p>{item.category}</p>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <div className={styles.lateralButtons}>
                                <button onClick={() => handleEdit(item._id, item.category, item.name, item.price)}>EDIT</button>
                                <button onClick={() => handleAlert(item._id)}>DELETE</button>
                            </div>
                        </div>
                    ))

                }

            </div>
            :

            <div className={styles.productsCard}> LOADING</div>

    )
}