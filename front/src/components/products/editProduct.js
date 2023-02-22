import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import axios from "axios";
import Success from "../success";
import { Buffer } from "buffer";



export default function EditProduct({ setForceRender, onClose, esNuevo, setMode, id, category, name, price, image, categoriasDisponibles }) {

    // Product data State. Only active when submitting form
    const [product, setProduct] = useState(null);

    const [success, setSuccess] = useState(false);

    const [productImage, setProductImage] = useState("./notFound.jpg");



    useEffect(() => {

        if (image) {

            const dataBuffer = Buffer.from(image.data.data)
            setProductImage(`data:image/png;base64,${dataBuffer.toString("base64")}`);

        }


    }, [productImage])

    // When submitting form this function sets product state an trigger the useEffect hook
    function handleEditSubmit(e) {

        e.preventDefault();

        const formData = new FormData();
        formData.append('name', document.getElementById("name").value);
        formData.append('price', document.getElementById("price").value);
        formData.append('description', "testing");
        formData.append('image', document.getElementById("image").files[0]);
        formData.append('category', parseInt(document.getElementById("category").value))

        console.log("Created form Data");

        if (esNuevo) {

            console.log("Inside If: NEW PRODUCT");

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
        console.log(e.target.files[0]);
        setProductImage(URL.createObjectURL(e.target.files[0]));
        console.log(productImage);
    }


    return (

        !success ?

            <div className={styles.centered}>

                {esNuevo ? <h2>Crear Producto</h2> : <h2>Editar Producto</h2>}

                <div>

                    <form className={styles.boxEmergent} style={{ backgroundColor: "white" }} onSubmit={handleEditSubmit}>

                        <div className={styles.boxElement} style={{ justifyContent: "center" }}>
                            <label className={styles.boxElement} for="image"><img src={productImage}></img></label>
                            <input id="image" type="file" style={{ display: "none" }} onChange={handleImage}></input>
                        </div>
                        <div className={styles.boxElement}>
                            Categoría: <select id="category" defaultValue={category} type="number" required>

                                {categoriasDisponibles.map((item, key) => {

                                    return (
                                        <option key={key} value={item.id}>{`${item.id}: ${item.description}`}</option>
                                    )

                                })}
                            </select>
                            Nombre: <input id="name" defaultValue={name} type="text" maxLength="20" pattern="([^\s][A-z0-9À-ž\s]+)" required></input>
                            Precio: <input id="price" defaultValue={price} type="number" maxLength="10" required></input>
                            <div>
                                <button onClick={handleCancelar}>Cancelar</button>
                                <input type="submit" value="Confirmar"></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            :

            <Success operacion="Edicion de producto" setSuccess={setSuccess} setMode={setProduct} onClose={onClose} />


    )
}