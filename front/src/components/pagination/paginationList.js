import NoProducts from "../products/noProducts";
import styles from "../styles.module.css";


export default function PaginationList({ data, state, handleAdd, handleEdit, handleAlert, currentPage, itemsPerPage, goBack }) {


    const lastPostIndex = currentPage * itemsPerPage;
    const firstPostIndex = lastPostIndex - itemsPerPage;
    data = data.slice(firstPostIndex, lastPostIndex);

    return (

        <div className={styles.productsCard}>

            {
                data.map((item, key) => (
                    <div key={key} className={styles.listaProductos}>
                        <p>{item.category}</p>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <div className={styles.lateralButtons}>
                            {!state && <button onClick={() => handleEdit(item._id, item.category, item.name, item.price)}>EDIT</button>}
                            {!state && <button onClick={() => handleAlert(item._id)}>DELETE</button>}
                            {state && <button onClick={() => handleAdd(item.name, item.price, item._id)}>+</button>}
                        </div>
                    </div>
                ))
            }

            {data.length === 0 && <NoProducts />}
            {state && <button onClick={goBack}> BACK</button>}

        </div>

    )
}