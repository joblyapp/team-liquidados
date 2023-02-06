
import styles from "../../styles.module.css";




export default function ListOldSales({ oldSales, setIsEditing, setEditingId }) {


    // When clicking on Sale Div we have to LOAD a SALE visual with sale's PRODUCTS loaded 
    function handleClick(saleId) {

        setEditingId(saleId);
        setIsEditing(true);

    }


    return (

        <>
            {oldSales.map((item, key) => (


                <div key={key} style={{ display: "flex" }}>

                    <div className={styles.listaProductos} >

                        <p>{item.date.substring(0, 10)}</p>

                        <p>{item.products.length}</p>

                        <select>

                            {item.products.map((product, key) => (


                                <option key={key}> {product.productId.name}</option>

                            )
                            )}

                        </select>

                        <p>{item.total}</p>

                    </div>

                    <button onClick={() => handleClick(item._id)}>Edit</button>

                </div>

            )

            )}
        </>


    )
}