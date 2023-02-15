import { useNavigate } from "react-router";
import styles from "../styles.module.css";


export default function NavigateLogo() {

  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (

    <div className={styles.navImg} onClick={handleClick}>
      <img src="./Marcas.png" alt="Don ventura logo"></img>
    </div>

  )

}