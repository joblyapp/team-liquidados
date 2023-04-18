import styles from "../styles.module.css";

export default function NoProducts({ sectionName, sectionNew, icon }) {



    return (

        <div className={`${styles.productsCard} ${styles.noProducts}`} style={{ height: "63vh" }}>


            <p style={{fontSize: "32px" }}>{icon}</p>
            <h2 style={{fontWeight: "500" }}>No se encuentran {sectionName}</h2>
            <h4 style={{fontWeight: "400" }}>Puede ingresar {sectionNew} haciendo click en el botón</h4>


        </div>
    )
}