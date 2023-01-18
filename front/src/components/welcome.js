import { useNavigate} from "react-router-dom";
import { useState } from "react";
import LogIn from "./login/logIn";
import styles from "./styles.module.css";


export default function Welcome() {
    const nav = useNavigate();

    const [logged, setLogged] = useState();


    function handleClick(to) {
        nav(to);
    }

    return (
        <div className={styles.centered}>
            {
                logged ?

                    <div>
                        < h1 > WELCOME</h1 >
                        <h2 onClick={() => handleClick("/sales")} >NUEVA VENTA</h2>
                        <h2 onClick={() => handleClick("/products")} >PRODUCTOS</h2>
                        <h2 onClick={() => handleClick("/stats")} >ESTADÍSTICAS</h2>
                    </div >

                    :
                    <LogIn logged={logged} setLogged={setLogged}/>
            }
        </div>

    )
}