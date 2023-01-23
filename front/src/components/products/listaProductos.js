import data from "./MOCK_DATA.json";
import styles from "../styles.module.css";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';



export default function ListaProductos({ value, setProductInfo, setEditMode }) {



    function handleAlert() {
        console.log("borrandingS");
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={styles.alert}>
                        <h1>Elminar Producto</h1>
                        <p>¿Está seguro de que desea eliminar este producto?</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                this.handleClickDelete();
                                onClose();
                            }}

                        >
                            Yes, Delete it!
                        </button>
                    </div>
                );
            }
        });

    }

    function handleEdit(id, name, price) {
        console.log("editing");
        setEditMode(true);
        setProductInfo({
            id: id,
            name: name,
            price: price
        });

    }

    return (


        <div className={styles.productsCard}>

            {

                data.filter(product => product.name.toLowerCase().includes(value) || String(product.id).includes(value)
                ).map((item, key) => (
                    <div key={key} className={styles.listaProductos}>
                        <p>{item.id}</p>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <div className={styles.lateralButtons}>
                            <button onClick={() => handleEdit(item.id, item.name, item.price)}>EDIT</button>
                            <button onClick={handleAlert}>DELETE</button>
                        </div>
                    </div>
                ))

            }



        </div>

    )
}