import NoProducts from "../products/noProducts";
import styles from "../styles.module.css";
import "./paginationProducts.css";
import editButton from "../../Images/icons/edit.svg";
import deleteButton from "../../Images/icons/delete.svg";
import activeProduct from "../../Images/icons/activeProduct.svg";
import nonActiveProduct from "../../Images/icons/nonActiveProduct.svg";
import { useEffect, useState } from "react";


export default function PaginationProducts({
  data,
  handleEdit,
  handleAlert,
  handleAdd,
  handleActive,
  state,
  addedList,
  disableList,
  categoriasDisponibles
}) {

 
  function handleClick(e, id) {
    e.preventDefault();
    handleActive(id);

    const imgName = e.target.src.split("/").pop();
    const active = activeProduct.split("/").pop();
    const nonActive = nonActiveProduct.split("/").pop();

    

    if(imgName === active){
      e.target.src = nonActiveProduct;
    }
    else{
      e.target.src = activeProduct;
    }
  }



  return (

    <div className={styles.productsCard}>

      {data.map((item, key) => (



        <div key={key} className={styles.listaProductos} style={{ opacity: (state && !item.active) ? "0.5" : "1", pointerEvents: (state && !item.active) ? "none" : "auto" }} >
          <div className="imageAndName">
            <div className="conteiner">
              <img
                className="productImg"
                src={`http://localhost:8080/${item.image.path}`}
                onError={(e) => e.target.src = "notFound.jpg"}
                alt={`${item.name}`}
              />
            </div>
            <div className="conteiner2">
              <p>{item.name}</p>
            </div>
          </div>

          <p>
            {
              categoriasDisponibles[
                categoriasDisponibles.findIndex(
                  (el) => el._id === item.category
                )
              ]?.name
            }
          </p>
          <p>$ {item.price}</p>

          <div style={{ display: "flex", justifyContent: "center" }}>
           
            {!state &&
              <button className="actionButtonsButton" onClick={(e) => handleClick(e, item._id)}>
                <img className="activeCorrection" src={item.active ? activeProduct : nonActiveProduct} alt="" />
              </button>}
            {!state && (
              <button className="actionButtonsButton" onClick={() => handleAlert(item._id)}>
                <img src={deleteButton} alt="delete button" />
              </button>
            )}
            {!state && (
              <button
                className="actionButtonsButton"
                onClick={() =>
                  handleEdit(
                    item._id,
                    item.category,
                    item.name,
                    item.price,
                    item.image
                  )
                }
              >
                <img src={editButton} alt="edit button" />
              </button>
            )}

            {state && (
              <button
                disabled={disableList.includes(item._id)}
                className={
                  addedList.includes(item._id)
                    ? `${styles.buttonActive} ${styles.buttonPlus}  ${styles.buttonSelected}`
                    : `${styles.buttonActive} ${styles.buttonPlus}`
                }
                onClick={() =>
                  handleAdd(item.name, item.price, item._id, item.category)
                }
              >
                {addedList.includes(item._id) ? <p>-</p> : <p>+</p>}

              </button>
            )}
          </div>
        </div>
      ))}

      {data.length === 0 && <NoProducts sectionName="Productos" sectionNew="Nuevo producto" icon="📦" />}
    </div>
  );
}
