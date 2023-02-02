
import styles from "../../styles.module.css";




export default function ListOldSales({ oldSales, setIsEditing, setEditingStatus }) {


    // When clicking on Sale Div we have to LOAD a SALE visual with sale's PRODUCTS loaded 
    function handleClick(productos) {

        setEditingStatus(productos);
        setIsEditing(true);

    }


    return (

        <>
            {oldSales.map((item, key) => (

                <div key={key} className={styles.listaProductos} onClick={() => handleClick(item.products)}>

                    <p>{item.date.substring(0, 10)}</p>

                    <p>{item.products.length}</p>

                    <select>
                        {item.products.map((product, key) => (


                            <option key={key}> {product.productId.name} </option>

                        )
                        )}

                    </select>

                    <p>{item.total}</p>




                </div>

            )
            )}
        </>


    )
}