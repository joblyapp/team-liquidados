import PaginationProducts from "./paginationProducts";
import PaginationSales from "./paginationSales";


export default function PaginationList({ data, state, handleAdd, handleEdit, handleAlert, handleActive, currentPage, itemsPerPage, goBack, isSale, columns, checkedBoxes, setCheckedBoxes, addedList, disableList, categoriasDisponibles }) {


    const lastPostIndex = currentPage * itemsPerPage;
    const firstPostIndex = lastPostIndex - itemsPerPage;

    data = data.slice(firstPostIndex, lastPostIndex);
 

    return (
        <>

            {
                !isSale ?


                    <PaginationProducts
                        
                        data={data}
                        handleEdit={handleEdit}
                        handleAlert={handleAlert}
                        handleAdd={handleAdd}
                        handleActive= {handleActive}
                        state={state}
                        goBack={goBack}
                        addedList= {addedList}
                        disableList={disableList}
                        categoriasDisponibles={categoriasDisponibles}
                    />

                    :

                    <PaginationSales
                        
                        data={data}
                        handleClick={handleAlert}
                        columns={columns}
                        checkedBoxes={checkedBoxes}
                        setCheckedBoxes= {setCheckedBoxes}
                    />
            }
        </>
    )
}