import { useNavigate } from "react-router-dom"



export default function Welcome() {
const nav = useNavigate();


function handleClick(to){
    nav(to);
}

    return (
        <div>
            <h1  >WELCOME</h1>
            <h2 onClick={()=>handleClick("/sales")} >NUEVA VENTA</h2>
            <h2 onClick={()=>handleClick("/products")} >PRODUCTOS</h2>
            <h2 onClick={()=>handleClick("/stats")} >ESTADÍSTICAS</h2>
        </div>
    )
}