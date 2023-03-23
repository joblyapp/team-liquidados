import { useState } from "react"
import styles from "../styles.module.css";
import Yes from "../../Images/icons/yes.svg";
import No from "../../Images/icons/no.svg";

export default function Categorias({ categoriasDisponibles, categoriaPorDefecto, setCreateCategory, setCategoria }) {

    // State for changing input
    const [creatingCategory, setCreatingCategory] = useState(false);


    function handleCategoryChange(e) {

        if (e.target.value === "New") {
            setCreatingCategory(true);
        }
        else {
            setCategoria(e.target.value);

        }
    }

    function addNewCategory() {
        const newCategory = document.getElementById("newCategory").value;
        setCreateCategory(newCategory);
    }

    function handleNewCategory(e) {
        e.preventDefault();

        switch (e.target.id) {
            case "yes": addNewCategory();


            case "no": setCreatingCategory(false);

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
                        className={styles.buttonClean}>

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

            <div>
                <select onChange={(e) => handleCategoryChange(e)} style={{ height: "4.6vh", width: "100%" }} id="categoryFilter" defaultValue={categoriaPorDefecto} type="number" required>

                    <option value="All">All</option>    

                    {categoriasDisponibles.map((item, key) => {

                        return (
                            <option key={key} value={item._id}>{`${item.number}: ${item.name}`}</option>
                        )

                    })}
                    <option value="New">New</option>
                </select>
            </div>



    )
}