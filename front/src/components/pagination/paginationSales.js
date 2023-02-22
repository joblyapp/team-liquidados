import styles from "../styles.module.css";

export default function PaginationSales({ data, handleClick }) {



    return (

        <div className={styles.productsCard}>

            {data.map((item, key) => (


                <div key={key} style={{ display: "flex" }}>

                    <div className={styles.listaProductos} >

                        <p>{item.date.substring(0, 10)}</p>

                        <p>{item.products.length}</p>

                        <select>

                            {item.products.map((product, key) => (


                                <option key={key}> {product.name}</option>

                            )
                            )}

                        </select>

                        <p>{item.total}</p>

                    </div>

                    <button onClick={() => handleClick(item._id)}>Edit</button>

                </div>

            )

            )}
        </div>


    )
}