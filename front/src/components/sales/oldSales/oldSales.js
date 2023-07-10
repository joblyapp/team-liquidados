import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles.module.css";
import Loading from "../../loading";
import SaleBar from "../newSale/saleBar";
import ListOldSales from "./ListOldSales";
import StatsInputs from "../../stats/statsInputs"
import UpperBar from "../../upperBar.js/upperBar";
import { confirmAlert } from "react-confirm-alert";
import { format } from "fecha";


export default function OldSales({ setMode, mode }) {

    const [oldSales, setOldSales] = useState("");
    const [loading, setLoading] = useState(true);

    // Create an state for editing mode
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Create a calendar state for filtering Old Sales. By default will be last year
    const [calendar, setCalendar] = useState(null);

    // Create a state for description when cancelling a sale
    const [saleCancel, setSaleCancel] = useState("");

    // Manage the checkedBoxes
    const [checkedBoxes, setCheckedBoxes] = useState([]);

    // 
    const [reverse, setReverse] = useState(false);

    const col = [
        "check",
        "Código de Factura",
        "Estado",
        "Forma de Pago",
        "Fecha",
        "Monto",
        "Acción"
    ]

    // Reverse when clicking on ORDENAR button
    useEffect(() => {

        if (reverse) {
            setOldSales(oldSales.reverse())
            setReverse(false);
        }


    }, [reverse])


    useEffect(() => {

        var first = new Date(null);
        first = format(first, 'isoDate');
        var today = format(new Date(), 'isoDate');

        setCalendar({
            "startDate": first,
            "endDate": today
        })

    }, [])



    useEffect(() => {

        // Now the UseEffect checks if there is a CALENDAR setted. If it is, calls "statistics". If not, calls "sales".
        // I'll avoid to call "sales" and call "statistics" from the beginning. There are a lot of lines of code.

        if (calendar) {

            axios
                .post(`${process.env.REACT_APP_URL}/sales/statistics`, calendar, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    
                    setOldSales(response.data)
                })

                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {

                    setLoading(false);
                })
        }

        /*
                else {
        
                    axios
                        .get(`${process.env.REACT_APP_URL}/Sales`, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((response) => {
                            console.log(response);
                            setOldSales(response.data)
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                        .finally(() => {
        
                            setLoading(false);
                        })
        
        
                }
        */
    }, [calendar, isEditing])

   

    useEffect(() => {

        if (isEditing) {

            // Confirm CANCEL modal

            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className={styles.alertDescription}>
                            <div>                            <h1>Cancelar Venta</h1>
                                <div>
                                    <p>¿Está seguro de que desea cancelar esta venta?</p>
                                    <p>Por favor indique los motivos de la cancelación. Esta descripción quedará registrada</p>
                                </div>
                            </div>

                            <textarea

                                id="cancelDescription"

                                className={styles.textArea}
                                autoFocus
                                placeholder="Por favor indique los motivos de la cancelación"
                                minLength="20"
                               
                                required

                            >
                            </textarea>

                            <div className={styles.buttonSet}>
                                <button
                                    onClick={() => {
                                        setEditingId("none");
                                        setIsEditing(false);
                                        onClose()
                                    }}
                                    className={styles.buttonNo}>
                                    No
                                </button>
                                <button
                                    onClick={() => {
                                        const description = document.getElementById("cancelDescription").value;
                                        handleCancelSale(editingId, description, onClose);

                                    }}
                                    className={styles.buttonYes}
                                >
                                    Si
                                </button>
                            </div>
                        </div>
                    );
                }
            });


        }


    }, [editingId])



    function handleCancelSale(id, description, onClose) {

       

        axios
            .patch(`${process.env.REACT_APP_URL}/Sales/cancel/${id}`, { "cancellationReason": description }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            },


            )

            .then((response) => {
                
                setIsEditing(false);
                setEditingId("null");

            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                onClose()
            });
    }

    return (

        <div className={styles.centered}>

            <div>



                {!loading ?
                    <>
                        <UpperBar setEsNuevo={setMode} sectionText="Ventas" buttonText={"+ Nueva Venta"} data={oldSales} checkedBoxes={checkedBoxes} setProductSearch={setMode}/>

                        <div style={{ backgroundColor: "white" }} className= {styles.showBox}>

                            <StatsInputs setCalendar={setCalendar} setReverse={setReverse} />

                            <SaleBar col={col} setCheckedBoxes={setCheckedBoxes} oldSales={oldSales} />

                            <ListOldSales oldSales={oldSales} setIsEditing={setIsEditing} setEditingId={setEditingId} columns={col.length} checkedBoxes={checkedBoxes} setCheckedBoxes={setCheckedBoxes} />

                        </div>
                    </>
                    :

                    <Loading />}
            </div>
        </div>
    )
}