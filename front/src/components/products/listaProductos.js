import styles from "../styles.module.css";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading";

// A lista productos se le suma otro valor que es "isSelling". Si este valor es TRUE va a cambiar los botones de la derecha

export default function ListaProductos({ value, setProductInfo, setEditMode, isSelling, setSaleStatus, saleStatus, setAdding }) {

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
            .get(`${process.env.REACT_APP_URL}/products`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setDatos(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setForceRender(false))
    }, [forceRender])

    // Delete function
    function handleDelete(id) {

        axios
            .delete(`${process.env.REACT_APP_URL}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
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

    function handleAdd(name, price, id) {

        const sale = [...saleStatus];
        const newProduct = {
            productId:
            {
                _id: id,
                name: name,
                price: price,
                quantity: 1,
            }
            ,
            total() { return this.productId.price * this.productId.quantity }
        }

        const elementIndex = sale.indexOf(sale.find(element => element.productId._id === id));

        if (elementIndex === -1) {
            sale.push(newProduct);
            setSaleStatus(sale);
            setAdding(false);
        }
        else {
            sale[elementIndex].productId.quantity++;
            setSaleStatus(sale);
            setAdding(false);
        }

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
                                {!isSelling && <button onClick={() => handleEdit(item._id, item.category, item.name, item.price)}>EDIT</button>}
                                {!isSelling && <button onClick={() => handleAlert(item._id)}>DELETE</button>}
                                {isSelling && <button onClick={() => handleAdd(item.name, item.price, item._id)}>+</button>}
                            </div>
                        </div>
                    ))

                }


                {isSelling && <button onClick={() => setAdding(false)}> BACK</button>}

            </div>



            :

            <Loading />

    )
}