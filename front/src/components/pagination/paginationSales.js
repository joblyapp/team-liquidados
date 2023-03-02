import styles from "../styles.module.css";

export default function PaginationSales({ data, handleClick }) {



    return (

        <div className={styles.productsCard}>

            {data.map((item, key) => (


                <div key={key} style={{ display: "flex" }}>

                    <div className={styles.listaProductos} >

                        <input type="checkbox"></input>

                        <p>{item._id.substring(0, 10)}</p>

                        {item.isCancelled ? <p>CANCELLED</p> : <p>GOOD</p>}

                        <p>{item.paymentForm}</p>

                        <p>{item.date.substring(0, 10)}</p>

                        <p>{item.total}</p>

                        <button onClick={() => handleClick(item._id)}>Edit</button>

                    </div>



                </div>

            )

            )}
        </div>


    )
}