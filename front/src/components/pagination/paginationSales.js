import styles from "../styles.module.css";

export default function PaginationSales({ data, handleClick }) {



    return (

        <div className={styles.productsCard}>

            {data.map((item, key) => (


                <div key={key} style={{ display: "flex" }}>

                    <div className={styles.listaProductos} >

                        <input
                            type="checkbox"
                            className="box"
                            defaultChecked={document.getElementById("checkAll")?.checked}
                        >

                        </input>

                        <p>{item?.number}</p>

                        {item.isCancelled ? <p className={styles.cancelledSale}>Cancelado</p> : <p className={styles.facturedSale}>Facturado</p>}

                        <p>{item.paymentForm}</p>

                        <p>{item.date.substring(0, 10)}</p>

                        <p>${item.total}</p>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img
                                className={!item.isCancelled ? "" : styles.disableButton}
                                src="./cancel.svg"
                                onClick={!item.isCancelled ? (() => handleClick(item._id)) : undefined}
                                style={{ cursor: "pointer" }}>
                            </img>
                        </div>
                    </div>
                </div>

            )

            )}
        </div>


    )
}