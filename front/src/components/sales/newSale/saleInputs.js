import styles from "../../styles.module.css";



export default function SaleInputs({ setPayMethod, paymentForm }) {



    return (



        <div className={`${styles.listaProductos} ${styles.whiteIt}`}>

            <input
                id="dateTo"
                type="date"
                disabled={true}
                className={styles.inputsBar}
                style={{ maxWidth: "150px", marginLeft:"10px"}}
                value={new Date().toLocaleDateString('en-CA')}>

            </input>

            <select className={styles.inputsBar} onChange={(e) => setPayMethod(e.target.value)} defaultValue={paymentForm}>
                <option value="Efectivo">Efectivo</option>
                <option value="Debito">Tarjeta de Débito</option>
                <option value="Credito">Tarjeta de Crédito</option>
            </select>



        </div>




    )



}