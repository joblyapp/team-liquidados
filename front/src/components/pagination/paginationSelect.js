import styles from "../styles.module.css";

export default function PaginationSelect({setCurrentPage, itemsPerPage, totalItems, currentPage}){


    let pages = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i);
    }

    return(

        <div className={styles.paginationSelect}>
            {pages.map((page, key)=>{
                return(
                    <button className={page == currentPage ? styles.buttonActive : styles.buttonNonActive} key={key} onClick={()=>setCurrentPage(page)}>{page}</button>
                )
            })}

        </div>
    )
}