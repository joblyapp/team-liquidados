import { useState } from "react";
import PaginationList from "../../pagination/paginationList";
import PaginationSelect from "../../pagination/paginationSelect";



export default function ListOldSales({ oldSales, setIsEditing, setEditingId, columns, checkedBoxes, setCheckedBoxes }) {


    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

   


    // When clicking on Sale Div we have to LOAD a SALE visual with sale's PRODUCTS loaded 


    function handleClick(saleId) {

        setEditingId(saleId);
        setIsEditing(true);
        console.log("Sale ID:" + saleId)

    }



    return (

        <>

            <PaginationList
                data={oldSales}
                checkedBoxes={checkedBoxes}
                setCheckedBoxes= {setCheckedBoxes}
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
    )
}