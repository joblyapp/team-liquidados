import { Link } from "react-router-dom";
import "./Welcome.css";
import ProductsIcon from "../../Images/icons/ProductsIcon.svg";
import ChevronRight from "../../Images/icons/ChevronRight.svg";
import ShoppingCart from "../../Images/icons/ShoppingCart.svg";
import BarChart from "../BarChart/BarChart";

export default function Welcome({ setActive }) {
  const handleClick = (e, name) => {
    setActive(name);
  };
  return (
    <>
      <div className="hero_box">
        <div className="hero_text">
          <h1>Hola, {`${sessionStorage.getItem("name")}`} 👋</h1>
          <p>¡Buen día!</p>
        </div>

        <div className="categories_container">
          <Link
            to={"/products"}
            onClick={(e) => handleClick(e, "productos")}
            className="categories"
          >
            <div className="categories_left">
              <div className="image_container_left">
                <img src={ProductsIcon} alt="products icon" />
              </div>
              <p>Productos</p>
            </div>
            <div className="categories_right">
              <img src={ChevronRight} alt="Chevron Right" />
            </div>
          </Link>

          <Link
            to={"/sales"}
            onClick={(e) => handleClick(e, "ventas")}
            className="categories"
          >
            <div className="categories_left">
              <div className="image_container_right">
                <img src={ShoppingCart} alt="products icon" />
              </div>
              <p>Ventas</p>
            </div>
            <div className="categories_right">
              <img src={ChevronRight} alt="Chevron Right" />
            </div>
          </Link>
        </div>
      </div>

      <BarChart />
    </>
  );
}
