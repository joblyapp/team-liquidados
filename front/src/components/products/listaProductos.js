import styles from "../styles.module.css";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading";
import PaginationList from "../pagination/paginationList";
import PaginationSelect from "../pagination/paginationSelect";


// A lista productos se le suma otro valor que es "isSelling". Si este valor es TRUE va a cambiar los botones de la derecha

export default function ListaProductos({ 
    setForceRender, 
    forceRender, 
    value, 
    categoryValue, 
    categoriasDisponibles, 
    setProductInfo, 
    setEditMode, 
    isSelling, 
    setSaleStatus, 
    saleStatus, 
    goBack, 
    setShowBars, 
    productsTemp, 
    setProductsTemp, 
    setReverse, 
    reverse, 
    setDataToExport,
    usedCategories, 
    setUsedCategories
}) {

    // Loading wheel
    const [loading, setLoading] = useState();

    // Data obtained from BackEnd
    const [datos, setDatos] = useState(null);

    // To check the filter result
    const [complete, setComplete] = useState([]);

    // Temporary added products
    const [addedList, setAddedList] = useState([]);

    // Disabled products
    const [disableList, setDisableList] = useState(saleStatus && saleStatus.map((item) => item.products._id) || null)

    // Active products
    const [activeProducts, setActiveProducts] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);




    // Hook to load information from DataBase. It render again after deleting, editing or adding an item
    useEffect(() => {

        setAddedList(saleStatus && saleStatus.map((item) => item.products._id))

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
                setDataToExport(response.data);
              
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setForceRender(false);
                setLoading(false);
                setShowBars(true);
            })


    }, [forceRender])

    // Filter data when changing search or category.
    useEffect(() => {

        if (datos) {
            setComplete(filtering(datos));
            setCurrentPage(1);
        }

    }, [value, categoryValue, datos])

    // Reverse when clicking on ORDENAR button
    useEffect(() => {

        if (reverse) {
            setComplete(complete.reverse())
            setReverse(false);

            
        }
        else {
          
        }

    }, [reverse])

    useEffect(()=> {
        loadActive(datos);
        if(usedCategories){
            loadUsedCategories(datos);
        }
       
    },[datos])

    // Filter function
    function filtering(data) {
        const temp = data.filter(product => product.name.toLowerCase().includes(value) && ((product.category === categoryValue || categoryValue === "All")));
        return temp;
    }

    // Active products load
    function loadActive(data) {

        if (data) {

            const temp = [...activeProducts]

            data.forEach(item => {
                    if (item.active) {
                        temp.push(item._id);
                    }
                });

            setActiveProducts(temp);
        }

        else{
          
        }

    }

     // Active products load
     function loadUsedCategories(data) {

        if (data) {

            const temp = [...usedCategories]

            data.forEach(item => {
                    if (!temp.includes(item.category)) {
                        temp.push(item.category);
                    }
                });

            setUsedCategories(temp);
        }

        else{
          
        }


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
                    <div className={styles.alertDescription}>
                        <div>
                            <h1>Eliminar Producto</h1>
                            <p>¿Está seguro de que desea eliminar este producto?</p>
                        </div>
                        <div className={styles.buttonSet}>
                            <button className={styles.buttonNo} onClick={onClose}>No</button>
                            <button
                                onClick={() => {
                                    handleDelete(id);
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

    // Turns on Edit Mode on parent component
    function handleEdit(id, category, name, price, image) {
        
        setEditMode(true);
        setProductInfo({
            id: id,
            category: category,
            name: name,
            price: price,
            image: image
        });

    }

    async function handleAdd(name, price, id, cat) {

        const sale = [...productsTemp];
        
        

        // create a product
        const newProduct = {
            products:
            {
                _id: id,
                name: name,
                price: price,
                quantity: 1,
                category: cat
            }

            ,
            total() { return (this.products.price * this.products.quantity) },

        }

        const elementIndex = sale.indexOf(sale.find(element => element.products._id === id));

        if (elementIndex === -1) {

            // Add the product to the temp array
            sale.push(newProduct);
            setProductsTemp(sale);

            // Add the product the the temporary added list
            const added = [...addedList];
            added.push(id);
            setAddedList(added);
           
        }

        else {
            // Delete the product from temporary product list
            sale.splice(elementIndex, 1);
            setProductsTemp(sale);

            // Delete product from added List
            const added = [...addedList];
            added.splice(added.indexOf(id), 1);
            setAddedList(added);


        }
    }


    function handleActive(id) {

        axios
            .patch(`${process.env.REACT_APP_URL}/products/deactivate/${id}`, { active: true }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
          
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handleDeactive(id) {

        axios
            .patch(`${process.env.REACT_APP_URL}/products/deactivate/${id}`, { active: false }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
              
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (

        !loading

            ?

            <>
                <PaginationList
                    data={complete}
                    state={isSelling}
                    handleAdd={handleAdd}
                    handleEdit={handleEdit}
                    handleAlert={handleAlert}
                    handleActive={handleActive}
                    handleDeactive={handleDeactive}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    goBack={goBack}
                    isSale={false}
                    addedList={addedList}
                    disableList={disableList}
                    categoriasDisponibles={categoriasDisponibles}
                    activeProducts={activeProducts}
                    setActiveProducts={setActiveProducts}
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