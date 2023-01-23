import { useNavigate } from "react-router-dom";
import styles from "../styles.module.css";

export default function EditProduct({esNuevo, setMode, id, name, price }) {

    const navigate = useNavigate();

    function handleEditSubmit(e){
        e.preventDefault();
        console.log("The changes were submitted!");
        setMode(false);
    }
    function handleCancelar(){
        setMode(false);
    }

    function HandleBack(to){
        navigate(to);
    }

    return (
        <div className={styles.centered}>
           {esNuevo ? <h2>Crear Producto</h2> :<h2>Editar Producto</h2>}
            <form className={styles.box} onSubmit={handleEditSubmit}>
                ID: <input defaultValue={id} type="number" required></input>
                Nombre: <input defaultValue={name} type="text" required></input>
                Precio: <input pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" defaultValue={price} type="text" required></input>
                <div>
                    <button onClick={handleCancelar}>Cancelar</button>
                    <input type="submit" value="Confirmar"></input>
                </div>
            </form>
        </div>
    )
}