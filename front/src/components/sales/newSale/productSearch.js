import { useState } from "react";
import ListaProductos from "../../products/listaProductos";
import ProductsBar from "../../products/productsBar";
import SaleBar from "./saleBar";
import styles from "../../styles.module.css";


export default function ProductSearch({ categorias, setForceRender, forceRender, saleStatus, setSaleStatus, onClose }) {

    // Input
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("All");

    // Component to hide the upper bars when loading
    const [showBars, setShowBars] = useState(false);

    // Products being added
    const [productsTemp, setProductsTemp] = useState([]);


    function handleConfirm() {

        const sales = [...saleStatus];
        // For each product add to sales
        productsTemp.forEach((product) => {

            sales.push(product);

        })

        // Set sale Status with the new products added

        setSaleStatus(sales);

        onClose();
    }


    return (


        <div className={styles.someAlert}>



            {showBars &&
            
                <>
                    <div>
                        <h1 style={{ paddingLeft: "56px", paddingTop: "20px" }}>Agregar producto</h1>
                        <ProductsBar setBusqueda={setBusqueda} categoriasDisponibles={categorias} setCategoria={setCategoria} />
                        <SaleBar col={["Product", "Categoría", "Precio", "Acciones"]} />
                    </div>
                </>
            }

            <div >
                <ListaProductos setForceRender={setForceRender} forceRender={forceRender} value={busqueda} categoryValue={categoria} categoriasDisponibles={categorias} saleStatus={saleStatus} setSaleStatus={setSaleStatus} editMode={false} isSelling={true} goBack={onClose} setShowBars={setShowBars} productsTemp={productsTemp} setProductsTemp={setProductsTemp} />
            </div>

            {showBars &&
                <div className={styles.buttonSet} style={{ width: "95%", paddingBottom: "20px" }} >
                    <button className={styles.buttonNo} onClick={onClose}>Cancelar</button>
                    <button className={styles.buttonYes} onClick={handleConfirm}>Confirmar</button>
                </div>
            }

        </div>

    )
}