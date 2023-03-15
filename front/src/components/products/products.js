import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles.module.css";
import EditProduct from "./editProduct";
import ListaProductos from "./listaProductos";

import { confirmAlert } from "react-confirm-alert";
import ProductsBar from "./productsBar";
import SaleBar from "../sales/newSale/saleBar";
import UpperBar from "../upperBar.js/upperBar";
import axios from "axios";


export default function Products() {

    // Input
    const [busqueda, setBusqueda] = useState("");
    // Choosen category
    const [categoria, setCategoria] = useState("All");

    // All CATEGORIES from database
    const [categorias, setCategorias] = useState([]);

    // Enable Edit Mode both NEW PRODUCT or EDIT PRODUCT
    const [editMode, setEditMode] = useState(false);
    const [esNuevo, setEsNuevo] = useState(false);

    // Object that contains PRODUCT info
    const [productInfo, setProductInfo] = useState({});

    // State to force render after deleting, adding or editing an element
    const [forceRender, setForceRender] = useState(false);

    // Columns for list

    const col = [
        "Producto",
        "Tipo",
        "Precio de Venta",
        "Acciones"
    ]

    // Just to navigate
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (editMode || esNuevo) {
            handleEditProduct(editMode, esNuevo, setEsNuevo, setEditMode);
        }



    }, [editMode, esNuevo])

    function getCategories() {

        axios
            .get(`${process.env.REACT_APP_URL}/category`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data);
                setCategorias(response.data)

            })
            .catch((error) => {
                console.log(error);
            })

    }


    function handleBack(to) {
        navigate(to);
    }


    function handleEditProduct(editMode, esNuevo, setEsNuevo, setEditMode) {

        confirmAlert({

            customUI: ({ onClose }) => {


                return (

                    <>
                        {editMode ?
                            <EditProduct setForceRender={setForceRender} forceRender={forceRender} onClose={onClose} esNuevo={esNuevo} setMode={setEditMode} id={productInfo.id} category={productInfo.category} name={productInfo.name} price={productInfo.price} image={productInfo.image} categoriasDisponibles={categorias} />
                            :
                            esNuevo ?

                                <EditProduct setForceRender={setForceRender} forceRender={forceRender} onClose={onClose} esNuevo={esNuevo} setMode={setEsNuevo} category={"1"} name={""} price={""} image={""} categoriasDisponibles={categorias} />
                                :
                                onClose()
                        }

                    </>
                );

            }

            ,
            closeOnClickOutside: false
        });

    }


    return (

        <div className={styles.centered}>

            <UpperBar setProductSearch={setEsNuevo} sectionText="Productos" buttonText="Nuevo Producto" />

            <ProductsBar setBusqueda={setBusqueda} categoriasDisponibles={categorias} setCategoria={setCategoria} />
            <SaleBar col={col} />
            <ListaProductos setForceRender={setForceRender} forceRender={forceRender} value={busqueda} categoryValue={categoria} categoriasDisponibles={categorias} setProductInfo={setProductInfo} setEditMode={setEditMode} editMode={editMode} isSelling={false} />

            {/* Not back button right now 
            <div>
                <button onClick={() => handleBack("/")}>Volver</button>
            </div>

            */}
        </div>


    )
}