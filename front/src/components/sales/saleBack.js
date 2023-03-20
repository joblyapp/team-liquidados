import { useNavigate } from "react-router-dom";
import styles from "../styles.module.css";


export default function SaleBack({ setMode, toMenu }) {

    const navigate = useNavigate();

    function handleClick() {

        if(toMenu){
            navigate("/");
        }
        setMode(false);
    }

    return (

        <button 
        onClick={handleClick}
        className={styles.buttonNo}
        > Volver </button>
    )

}