import { useEffect, useState } from "react";
import PaginationList from "../../pagination/paginationList";
import PaginationSelect from "../../pagination/paginationSelect";
import NoProducts from "../../products/noProducts";



export default function ListOldSales({ oldSales, setIsEditing, setEditingId, columns, checkedBoxes, setCheckedBoxes }) {


    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    // Set State for empty data
    const [empty, setEmpty] = useState(false);

    // Check if the recieved data (oldSales) is empty
    useEffect(() => {
        if (oldSales.length === 0) {
            setEmpty(true)
        }
        else {
            setEmpty(false);
        }

        setCurrentPage(1);
    }, [oldSales])




    // When clicking on Sale Div we have to LOAD a SALE visual with sale's PRODUCTS loaded 


    function handleClick(saleId) {

        setEditingId(saleId);
        setIsEditing(true);
      

    }



    return (

        <>
            {!empty

                ?


                <>

                    < PaginationList
                        data={oldSales}
                        checkedBoxes={checkedBoxes}
                        setCheckedBoxes={setCheckedBoxes}
                        handleAlert={handleClick}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        isSale={true}
                        columns={columns}
                    />

                    <PaginationSelect
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={oldSales.length}
                        currentPage={currentPage}
                    />
                </>

                :

                <NoProducts sectionName="Ventas" sectionNew="una Nueva Venta" icon="🛒" />
            }
        </>
    )
}