import styles from "../styles.module.css";
import SaleInfo from "../../Images/icons/showSale.svg";
import { confirmAlert } from "react-confirm-alert";
import ShowSale from "../sales/oldSales/showSale";


export default function PaginationSales({ data, handleClick, columns, checkedBoxes, setCheckedBoxes }) {

   

    function handleInfo(id) {

        confirmAlert({

            customUI: ({ onClose }) => {


                return (

                    <>
                        <ShowSale saleId={id} onClose={onClose} />
                    </>
                );

            }

            ,
            closeOnClickOutside: false
        });

    }


    function handleChange(e, id){
        const temp = [...checkedBoxes];

        if(e.target.checked === true){    
            temp.push(id);
            setCheckedBoxes(temp);
        }
        else{
            var filteredArray = temp.filter(function(e) { return e !== id });
            setCheckedBoxes(filteredArray);
        }
      
    }

 

    return (



        <div className={styles.productsCard}>


            {
                data.map((item, key) => (


                    <div key={key} style={{ display: "flex" }}>

                        <div className={styles.listaProductos} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>

                            <input
                                type="checkbox"
                                className="box"
                                id={item._id}
                                checked={checkedBoxes.includes(item._id)}
                                onChange={(e) => handleChange(e, item._id)}
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

                                <img

                                    className={styles.saleInfo}
                                    src={SaleInfo}
                                    onClick={() => handleInfo(item._id)}
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