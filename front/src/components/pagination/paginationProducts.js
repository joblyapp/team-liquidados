import NoProducts from "../products/noProducts";
import styles from "../styles.module.css";

export default function PaginationProducts({ data, handleEdit, handleAlert, handleAdd, state, addedList, disableList, categoriasDisponibles }) {

    console.log(addedList)

    return (

        <div className={styles.productsCard}>

            {
                data.map((item, key) => (
                    <div key={key} className={styles.listaProductos}>
                        <p>{item.name}</p>
                        <p>{categoriasDisponibles[categoriasDisponibles.findIndex(el => el._id === item.category)]?.name}</p>
                        <p>$ {item.price}</p>
                        <div className={styles.lateralButtons}>
                            {!state && <button onClick={() => handleEdit(item._id, item.category, item.name, item.price, item.image)}>EDIT</button>}
                            {!state && <button onClick={() => handleAlert(item._id)}>DELETE</button>}
                            {state && <button
                                disabled= {disableList.includes(item._id)}
                                className={addedList.includes(item._id) ? `${styles.buttonActive} ${styles.buttonPlus}  ${styles.buttonSelected}`: `${styles.buttonActive} ${styles.buttonPlus}`}
                                onClick={() => handleAdd(item.name, item.price, item._id, item.category)}
                            >
                                {
                                    addedList.includes(item._id)

                                        ?

                                        <p>-</p>

                                        :

                                        <p >+</p>
                                }


                            </button>}
                        </div>
                    </div>
                ))
            }

            {data.length === 0 && <NoProducts />}


        </div>
    )
}