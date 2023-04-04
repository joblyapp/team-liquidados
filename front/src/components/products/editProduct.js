import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import axios from "axios";
import Success from "../success";
import Categorias from "./categorias";





export default function EditProduct({
    setForceRender,
    onClose,
    esNuevo,
    setMode,
    id,
    category,
    name,
    price,
    image,
    categoriasDisponibles,
    setCreateCategory,
    setDeleteCategory,
    usedCategories
}) {

    // Product data State. Only active when submitting form
    const [product, setProduct] = useState(null);

    const [success, setSuccess] = useState(false);

    const [productImage, setProductImage] = useState("./notFound.jpg");

    const [selectedCat, setSelectedCat] = useState(category)

    // State for show category error
    const [categorySelection, setCategorySelection] = useState(true);

    

    // Image for default image
    var image;

    useEffect(() => {

        /*defaultImage();*/

 

    }, [])

    useEffect(() => {
        setCategorySelection(true);

    }, [selectedCat])

    useEffect(() => {

        if (image) {

            setProductImage(`${process.env.REACT_APP_URL}/${image.path}`);

        }

    }, [productImage])

    // Function for loading a default image to the form.

    async function defaultImage() {

        /*
        await fetch("./notFound.jpg")
            .then(res => res.blob())
            .then(blob => {
                image = new File([blob], 'notFound.jpg', blob)
                console.log(image);
            })
*/

       


    }


    // When submitting form this function sets product state an trigger the useEffect hook
    function handleEditSubmit(e) {

        e.preventDefault();

        console.log(image);

        image = document.getElementById("image").files[0];

        /*
        if (!image) {
            defaultImage();
        }
*/

        if (!selectedCat) {
            console.log("debe ingresar una categoria");
            setCategorySelection(false);
        }
        else {
            console.log(selectedCat)
        }

        const formData = new FormData();

        formData.append('name', document.getElementById("name").value);
        formData.append('price', document.getElementById("price").value);
        formData.append('description', "testing");
        formData.append('image', image);
        formData.append('category', selectedCat);

        console.log("Created form Data");

        if (esNuevo) {

            console.log("Inside If: NEW PRODUCT");
            console.log(image);

            axios
                .post(`${process.env.REACT_APP_URL}/products`, formData, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    setSuccess(true)
                    setMode(false);
                    setForceRender(true);
                    console.log(res);

                })
                .catch(error => console.log(error))
                .finally(() => {
                    console.log("Succedeed")
                })
        }

        else if (!esNuevo) {

            console.log("Inside If: EDIT PRODUCT for id: " + id)

            axios
                .patch(`${process.env.REACT_APP_URL}/products/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    setSuccess(true)
                    setMode(false);
                    setForceRender(true);
                    console.log(res);
                })
                .catch(error => console.log(error))
                .finally(() => {
                    console.log("Succedeed")
                })
        }
    }

    // Cancel function
    function handleCancelar() {
        setMode(false);
        onClose();
    }

    function handleImage(e) {
        e.preventDefault();
        setProductImage(URL.createObjectURL(e.target.files[0]));
    }



    return (

        !success ?

            <div className={`${styles.centered} ${styles.someAlert}`}>

                <div style={{ marginTop: "9vh" }}>

                    {esNuevo ? <h2>Agregar Producto</h2> : <h2>Editar Producto</h2>}

                    <form id="newProduct" className={styles.boxEmergent} style={{ height: "100%" }} onSubmit={handleEditSubmit} method="post">

                        <div className={`${styles.boxElement} ${styles.boxImage}`}>
                            <label className={styles.boxElement} style={{ cursor: "pointer" }} for="image"><img src={productImage}></img></label>
                            <input onLoad={defaultImage} id="image" type="file" name="image" style={{ display: "none" }} onChange={handleImage}></input>
                        </div>
                        <div className={`${styles.boxElement} ${styles.boxInputs}`}>
                            <h2>Datos del producto</h2>
                            <div>
                                Nombre: <input className={styles.inputs} style={{ width: "100%" }} id="name" defaultValue={name} type="text" maxLength="20" pattern="([^\s][A-z0-9À-ž\s]+)" required></input>
                            </div>
                            <div>
                                Categoría:
                                <Categorias categoriasDisponibles={categoriasDisponibles} setCreateCategory={setCreateCategory} setSelectedCat={setSelectedCat} defaultCategory={category} setDeleteCategory={setDeleteCategory} usedCategories={usedCategories} />
                                <p className={styles.errorMessage} style={{ height: "0px" }}>{!categorySelection ? "Debe seleccionar una categoría" : ""}</p>
                            </div>
                            <div>
                                Precio: <input className={styles.inputs} style={{ width: "100%" }} id="price" defaultValue={price} type="number" maxLength="10" required></input>
                            </div>

                        </div>
                    </form>

                    <div className={styles.buttonSet}>
                        <button className={styles.buttonNo} onClick={handleCancelar}>Cancelar</button>
                        <input className={styles.buttonYes} form="newProduct" type="submit" value="Agregar"></input>
                    </div>
                </div>
            </div>

            :

            <Success operacion="El producto fue ingresado correctamente" setSuccess={setSuccess} setMode={setProduct} onClose={onClose} />


    )
}