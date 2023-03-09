import styles from "../styles.module.css";
import { exportToExcel } from 'react-json-to-excel';
import ExportLogo from "../../Images/icons/upload.svg";
import { useEffect, useState } from "react";

export default function UpperBar({ setEsNuevo, sectionText, buttonText, data, checkedBoxes }) {


    const [ableToExport, setAbleToExport] = useState(false);



    useEffect(() => {

        if (checkedBoxes.length != 0) {
            setAbleToExport(true)
        }
        else {
            setAbleToExport(false)
        }

    }, [checkedBoxes])

    function changeKeyName(oldName, newName, el) {

        el[newName] = el[oldName];
        delete el[oldName];
    }

    function deleteElement(oldName, el) {
        delete el[oldName];
    }



    async function handleExport(e) {

        e.preventDefault();

        var filteredIds = [];
        var filteredSales = JSON.parse(JSON.stringify(data));


        filteredSales.map(item => {
            if (checkedBoxes.includes(item._id)) {
                filteredIds.push(item._id);
            }
            item.date = item.date.substring(0, 10);

            // stringify the product information
            var temp = [];

            item.products.map(product => {
                temp.push(product.name);
            }

            )

            item.products = temp.join();

        }

        )


        filteredSales = filteredSales.filter(item => filteredIds.includes(item._id));

        // Format the categories to a better visual

        await filteredSales.forEach(el => {
            deleteElement("_id", el);
            deleteElement("__v", el);
            changeKeyName("products", "PRODUCTOS", el);
            changeKeyName("total", "TOTAL", el);
            changeKeyName("isCancelled", "CANCELADO?", el);
            changeKeyName("paymentForm", "PAGO", el);
            changeKeyName("date", "FECHA", el);

        });


        exportToExcel(filteredSales, "Ventas seleccionadas");

    }


    return (

        <div className={styles.space}>

            <div>

                <h3>{sectionText}</h3>

                <button className={styles.buttonExport} onClick={handleExport} disabled={!ableToExport}>
                    <img src={ExportLogo} style={{ maxWidth: "12px" }}></img><p style={{ textDecoration: "underline" }}> Export </p>
                </button>

            </div>

            <button
                className={`${styles.buttonYes} ${styles.buttonAdd}`}
                onClick={() => setEsNuevo(true)}
                style={{
                    backgroundColor: "#16C79A"
                    
                }}>
                {buttonText}</button>

        </div>
    )
}