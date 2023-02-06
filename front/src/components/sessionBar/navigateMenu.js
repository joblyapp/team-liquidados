import { useNavigate } from "react-router-dom";
import styles from "../styles.module.css";


export default function NavigateMenu(){

    const navigate = useNavigate();

    function handleNavigate(to){
        navigate(to);
    }

    return(

        <div className={styles.navMenu}>
            <div className={styles.navigateMenuButton} onClick={()=> handleNavigate("/sales")}> VENTAS </div>
            <div className={styles.navigateMenuButton} onClick={()=> handleNavigate("/products")}> PRODUCTOS </div>
            <div className={styles.navigateMenuButton} onClick={()=> handleNavigate("/stats")}> ESTADISTICAS </div>
        </div>

    )

}
