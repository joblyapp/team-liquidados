import { useEffect, useState } from "react";
import styles from "../../styles.module.css";
import SaleQuantity from "./saleQuantity";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import ProductSearch from "./productSearch";
import NoProducts from "../../products/noProducts";
import Delete from "../../../Images/icons/delete.svg"
import SaleBack from "../saleBack";

export default function SaleDetails({ setForceRender, forceRender, saleStatus, setSaleStatus, isEditing, isEditingId, setSuccess, columns, productSearch, setProductSearch, setMode, payMethod }) {

    const [totalToPay, setTotalToPay] = useState(0);
    const [empty, setEmpty] = useState(true);


    // Get categories state
    const [categorias, setCategorias] = useState([]);



    function getCategories() {

        axios
            .get(`${process.env.REACT_APP_URL}/category`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data);
                setCategorias(response.data)

            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        getCategories();
    }, [])

    // Check if the sale data (saleStatus) is empty
    useEffect(() => {
        if (saleStatus.length === 0) {
            setEmpty(true)
        }
        else {
            setEmpty(false);
        }
    
    }, [saleStatus])


    useEffect(() => {

        if (productSearch) {
            handleAddProduct();
        }


    }, [productSearch])

    // Fuction to calculate total
    function calculateTotal(products) {
        var sum = 0;
        products.map((item) => (
            sum = sum + item.total()
        ))

        setTotalToPay(sum.toFixed(2));
    }

    // Calculate total every time the Sale Status change
    useEffect(() => {

        if (saleStatus) {
            console.log(saleStatus);
            calculateTotal(saleStatus);
        }

    }, [saleStatus])


    // This function send to de backEnd a JSON structured like this {products: [] total: {}}
    function handleSale() {

        if (isEditing) {

            const temporarySales = {
                products: saleStatus.map(({ products }) => ({ name: products.name, price: products.price, quantity: products.quantity, category: products.category })),
                total: totalToPay,
                isCancelled: false,
                paymentForm: payMethod
            };

            console.log(temporarySales)

            axios
                .patch(`${process.env.REACT_APP_URL}/Sales/${isEditingId}`, temporarySales, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response);
                    setSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {

                });
        }
        else {
            console.log("Payment Form: " + typeof payMethod)
            const temporarySales = {
                products: saleStatus.map(({ products }) => ({ name: products.name, price: products.price, quantity: products.quantity, category: products.category })),
                total: totalToPay,
                paymentForm: payMethod
            };

            console.log(temporarySales)

            axios
                .post(`${process.env.REACT_APP_URL}/Sales/`, temporarySales, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response);
                    setSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    // ADD PRODUCT modal
    function handleAddProduct() {

        confirmAlert({

            customUI: ({ onClose }) => {

                return (


                    <ProductSearch
                        categorias={categorias}
                        setForceRender={setForceRender}
                        forceRender={forceRender}
                        saleStatus={saleStatus}
                        setSaleStatus={setSaleStatus}
                        onClose={onClose}
                    />



                );
            },
            closeOnClickOutside: false
        });
        setProductSearch(false);
    }

    // Delete Product Modal
    function handleDeleteProduct(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={styles.alertDescription}>
                        <div>
                            <h1>Elminar Producto</h1>
                            <p>¿Está seguro de que desea eliminar este producto de la venta?</p>
                        </div>
                        <div className={styles.buttonSet}>
                            <button className={styles.buttonNo} onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    const sale = [...saleStatus];
                                    const elementIndex = sale.indexOf(sale.find(element => element.products._id === id));
                                    sale.splice(elementIndex, 1);

                                    setSaleStatus(sale);
                                    onClose();
                                }}
                                className={styles.buttonYes}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                );
            }
        });


    }

    return (

        <>

            {!empty ?

                <>
                    <div className={styles.productsCard}>

                        {saleStatus.map((item, key) => (

                            <div key={key} className={styles.listaProductos} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>

                                <p>{item.products.name}</p>
                                <p>{categorias[categorias.findIndex(el => el._id === item.products.category)]?.name}</p>
                                <p>{item.products.price}</p>
                                <p>{ item.total().toFixed(2) }</p>
                                <SaleQuantity
                                    quantity={item.products.quantity}
                                    name={item.products.name}
                                    setSaleStatus={setSaleStatus}
                                    saleStatus={saleStatus}
                                />
                                <div
                                    style={{ display: "flex", justifyContent: "center" }}
                                    onClick={() => handleDeleteProduct(item.products._id)}>
                                    <img
                                        src={Delete}
                                        style={{ cursor: "pointer" }}>
                                    </img>

                                </div>


                            </div>

                        )
                        )}

                    </div>
                    <div className={styles.listaProductos} style={{ borderTop: "1px solid lightGrey", borderBottomLeftRadius:"8px", borderBottomRightRadius:"8px" }}>
                        <p></p>
                        <p></p>
                        <p></p>
                        <h3 style={{ fontWeight: "bold" }}>TOTAL $ {totalToPay}</h3>
                    </div>


                    <div className={`${styles.buttonSet} ${styles.buttonSales} `}>


                        <SaleBack setMode={setMode} isEditing={isEditing} />
                        <button
                            onClick={handleSale}
                            className={styles.buttonYes}>
                            Confirmar
                        </button>



                    </div>
                </>

                :

                <NoProducts sectionName="Productos" sectionNew="un nuevo Producto" icon="➕" />


            }
        </>
    )

}