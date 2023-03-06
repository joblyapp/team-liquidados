import PaginationProducts from "./paginationProducts";
import PaginationSales from "./paginationSales";


export default function PaginationList({ data, state, handleAdd, handleEdit, handleAlert, currentPage, itemsPerPage, goBack, isSale, columns, checkedBoxes, setCheckedBoxes }) {


    const lastPostIndex = currentPage * itemsPerPage;
    const firstPostIndex = lastPostIndex - itemsPerPage;

    var slicedData = data.slice(firstPostIndex, lastPostIndex);


    return (
        <>

            {
                !isSale ?


                    <PaginationProducts
                        
                        data={slicedData}
                        handleEdit={handleEdit}
                        handleAlert={handleAlert}
                        handleAdd={handleAdd}
                        state={state}
                        goBack={goBack}
                    />

                    :

                    <PaginationSales
                        
                        data={slicedData}
                        handleClick={handleAlert}
                        columns={columns}
                        checkedBoxes={checkedBoxes}
                        setCheckedBoxes= {setCheckedBoxes}
                    />
            }
        </>
    )
}