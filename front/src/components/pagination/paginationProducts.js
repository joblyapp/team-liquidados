import NoProducts from "../products/noProducts";
import styles from "../styles.module.css";
import "./paginationProducts.css";
import editButton from "../../Images/icons/edit.svg";
import deleteButton from "../../Images/icons/delete.svg";
import activeProduct from "../../Images/icons/activeProduct.svg";
import hiddenProduct from "../../Images/icons/hiddenProduct.svg";

export default function PaginationProducts({
  data,
  handleEdit,
  handleAlert,
  handleAdd,
  state,
  addedList,
  disableList,
  categoriasDisponibles,
}) {
  console.log(addedList);

  console.log(data);

  return (
    <div className={styles.productsCard}>
      {data.map((item, key) => (
        <div key={key} className={styles.listaProductos}>
          <div className="imageAndName">
            <img
              className="productImg"
              src={`http://localhost:8080/${item.image.path}`}
              alt={`${item.name}`}
            />
            <p>{item.name}</p>
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
          <div className="actionButtons">
            <button>
              <img src={activeProduct} alt="" />
            </button>
            {!state && (
              <button onClick={() => handleAlert(item._id)}>
                <img src={deleteButton} alt="delete button" />
              </button>
            )}
            {!state && (
              <button
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

      {data.length === 0 && <NoProducts />}
    </div>
  );
}
