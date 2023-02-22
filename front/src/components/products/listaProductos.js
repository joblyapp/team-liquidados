import styles from "../styles.module.css";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading";
import PaginationList from "../pagination/paginationList";
import PaginationSelect from "../pagination/paginationSelect";


// A lista productos se le suma otro valor que es "isSelling". Si este valor es TRUE va a cambiar los botones de la derecha

export default function ListaProductos({ setForceRender, forceRender, value, categoryValue, setProductInfo, setEditMode, isSelling, setSaleStatus, saleStatus, goBack }) {

    // Loading wheel
    const [loading, setLoading] = useState(true);

    // Data obtained from BackEnd
    const [datos, setDatos] = useState(null);

    // To check the filter result
    const [complete, setComplete] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);


    // Hook to load information from DataBase. It render again after deleting, editing or adding an item
    useEffect(() => {

        console.log("rendering again")
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_URL}/products`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setDatos(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setForceRender(false);
                setLoading(false);
                console.log(datos)
            })

    }, [forceRender])



    useEffect(() => {
        if (datos) {
            setComplete(filtering(datos));
            setCurrentPage(1);
        }

    }, [value, categoryValue, datos])

    // Filter function
    function filtering(data) {
        const temp = data.filter(product => product.name.toLowerCase().includes(value) && ((product.category === parseInt(categoryValue) || categoryValue === "All")));
        return temp;
    }

    // Delete function
    function handleDelete(id) {

        axios
            .delete(`${process.env.REACT_APP_URL}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setForceRender(true))
    }

    // Confirm delete function
    function handleAlert(id) {


        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={styles.alert}>
                        <h1>Elminar Producto</h1>
                        <p>¿Está seguro de que desea eliminar este producto?</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                handleDelete(id);
                                onClose();
                            }}

                        >
                            Yes
                        </button>
                    </div>
                );
            }
        });

    }

    // Turns on Edit Mode on parent component
    function handleEdit(id, category, name, price, image) {
        console.log("editing");
        setEditMode(true);
        setProductInfo({
            id: id,
            category: category,
            name: name,
            price: price,
            image: image
        });

    }

    async function handleAdd(name, price, id) {
        console.log(saleStatus);
        const sale = [...saleStatus];
        const newProduct = {
            products:
            {
                _id: id,
                name: name,
                price: price,
                quantity: 1,
            }

            ,
            total() { return this.products.price * this.products.quantity },

        }

        const elementIndex = sale.indexOf(sale.find(element => element.products._id === id));

        if (elementIndex === -1) {
            sale.push(newProduct);
            setSaleStatus(sale);
            console.log("here");
            goBack();
        }
        else {
            sale[elementIndex].products.quantity++;
            setSaleStatus(sale);
            goBack();
        }

    }


    return (

        !loading ?


            <>
                <PaginationList
                    data={complete}
                    state={isSelling}
                    handleAdd={handleAdd}
                    handleEdit={handleEdit}
                    handleAlert={handleAlert}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    goBack={goBack}
                    isSale={false}
                />

                <PaginationSelect
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={complete.length}
                    currentPage={currentPage}

                />

            </>
            :

            <Loading />

    )
}