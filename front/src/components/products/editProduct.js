import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import axios from "axios";
import Success from "../success";
import Categorias from "./categorias";
import { Storage, StorageSharedKeyCredential } from '@azure/storage-blob';





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

            setProductImage(image);

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

    async function handleEditSubmit(e) {

        e.preventDefault();
        var imageUrl;
        // Posting to server
        const formdataImg = new FormData()
        formdataImg.append("image", document.getElementById("image").files[0])

        axios
            .post("https://api.imgur.com/3/image/", formdataImg, {
                headers: {
                    Authorization: "Client-ID 5a8be6a81450005"
                }
            })
            .then((res) => {


                imageUrl = res.data.data.link;
            })
            .then((res) => {
                // create JSON
                const formData = {
                    "name": document.getElementById("name").value,
                    'price': document.getElementById("price").value,
                    'description': "testing",
                    'image': imageUrl,
                    'category': selectedCat
                }
              
             

                if (esNuevo) {

                    axios
                        .post(`${process.env.REACT_APP_URL}/products`, formData, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => {
                            setSuccess(true)
                            setMode(false);
                            setForceRender(true);


                        })
                        .catch(error => console.log(error))
                        .finally(() => {

                        })
                }

                else if (!esNuevo) {

                    axios
                        .patch(`${process.env.REACT_APP_URL}/products/${id}`, formData, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => {
                            setSuccess(true)
                            setMode(false);
                            setForceRender(true);

                        })
                        .catch(error => console.log(error))
                        .finally(() => {

                        })
                }

            })

        // Posting to server


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