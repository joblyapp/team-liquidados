import { useState } from "react"
import styles from "../styles.module.css";
import Yes from "../../Images/icons/yes.svg";
import No from "../../Images/icons/no.svg";
import axios from "axios";
import DeleteBin from "../../Images/icons/deleteBin.svg"

export default function Categorias({
    categoriasDisponibles,
    setCreateCategory,
    setSelectedCat,
    defaultCategory,
    setDeleteCategory,
    usedCategories
}) {

    // State for changing input
    const [creatingCategory, setCreatingCategory] = useState(false);
    const [modalCategories, setModalCategories] = useState(categoriasDisponibles);

    // Category delete error message
    const [deleteError, setDeleteError] = useState(false);

    function handleCategoryChange(e) {

        if (e.target.value === "New") {
            setCreatingCategory(true);
        }
        else {
            setSelectedCat(e.target.value);
           
        }
    }

    async function addNewCategory() {
        const newCategory = document.getElementById("newCategory").value;
        setCreateCategory(newCategory);

        setTimeout(() =>
            axios
                .get(`${process.env.REACT_APP_URL}/category`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
               
                    setModalCategories(response.data);

                })
                .catch((error) => {
                    console.log(error);
                })

            , 1000)
        // Add new category to the list just for this time    



    }

    function handleNewCategory(e) {

        e.preventDefault();

        switch (e.target.id) {

            case "yes": addNewCategory();
            case "no": setCreatingCategory(false);

        }

    }


    function handleDelete(e) {

        e.preventDefault();
        const id = document.getElementById("categoryId").value;

        if (usedCategories.includes(id)) {

           

            setDeleteError(true);

            setTimeout(() => {
                setDeleteError(false);
            }, 2000)

        }

        else {

            setDeleteCategory(id);

            setTimeout(() =>
                axios
                    .get(`${process.env.REACT_APP_URL}/category`, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        
                        setModalCategories(response.data);

                    })
                    .catch((error) => {
                        console.log(error);
                    })

                , 1000)
        }

    }


    return (

        creatingCategory

            ?

            <div style={{ display: "flex" }}>

                <input id="newCategory" className={styles.inputs} style={{ width: "80%" }} type="text" placeholder="Crea una nueva categoría"></input>
                <div style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <button
                        onClick={(e) => e.preventDefault()}
                        className={styles.buttonClean}
                    >

                        <img id="yes" onClick={handleNewCategory} src={Yes} className={styles.toGreen}></img>

                    </button>

                    <button
                        onClick={(e) => e.preventDefault()}
                        className={styles.buttonClean}
                        style={{ width: "25px" }}>

                        <img id="no" onClick={handleNewCategory} src={No} className={styles.toRed} ></img>

                    </button>

                </div>
            </div>

            :

            <div >

                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>

                    <select onChange={(e) => handleCategoryChange(e)} style={{ height: "4.6vh", width: "90%" }} id="categoryId" type="number" defaultValue={defaultCategory} required>

                        <option value={null} > Seleccione una categoría </option>

                        {modalCategories.map((item, key) => {

                            return (

                                <option key={key} value={item._id}>{`${item.number}: ${item.name}`} </option>

                            )

                        })}

                        <option value="New">New</option>

                    </select>

                    <button className={`${styles.buttonClean} ${styles.buttonDelete}`}><img onClick={handleDelete} src={DeleteBin} style={{ width: 18, height: 18 }}></img></button>

                </div>

                <p className={styles.errorMessage}>{deleteError ? "No se puede eliminar una categoria ya utilizada" : ""}</p>

            </div>



    )
}