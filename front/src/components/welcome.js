import { useNavigate } from "react-router-dom";
import styles from "../components/styles.module.css";

export default function Welcome({ user }) {
  const nav = useNavigate();

  function handleClick(to) {
    nav(to);
  }

  return (
    <>
      <div className={styles.centered}>
        <div className={styles.welcomeTouch}>
          <h1
            className={styles.selectTouch}
            style={{ gridColumn: "1 / 3", gridRow: "1 / 2" }}
          >
            {" "}
            {/* Usuario conectado: {user.mail}{" "} */}
          </h1>
          <h1
            style={{
              gridColumn: "1 / 3",
              gridRow: "2 / 3",
              backgroundColor: "transparent",
            }}
          >
            {" "}
          </h1>
          <h2
            className={styles.selectTouch}
            style={{
              gridColumn: "1 / 3",
              gridRow: "3 / 5",
              backgroundColor: "green",
            }}
            onClick={() => handleClick("/sales")}
          >
            VENTAS
          </h2>
          <h2
            className={styles.selectTouch}
            style={{
              gridColumn: "1 / 2",
              gridRow: "5 / 7",
              backgroundColor: "red",
            }}
            onClick={() => handleClick("/products")}
          >
            PRODUCTOS
          </h2>
          <h2
            className={styles.selectTouch}
            style={{
              gridColumn: "2 / 3",
              gridRow: "5 / 7",
              backgroundColor: "blue",
            }}
            onClick={() => handleClick("/stats")}
          >
            ESTADÍSTICAS
          </h2>
        </div>
      </div>
    </>
  );
}
