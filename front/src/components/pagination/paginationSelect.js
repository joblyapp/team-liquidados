import styles from "../styles.module.css";

export default function PaginationSelect({ setCurrentPage, itemsPerPage, totalItems, currentPage }) {


    // Set the total pages.

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i);
    }

    // Create an array that contains the pages to be shown

    let adjustedPages = []

    // Check if dots are needed
    const leftNeeded = currentPage > pages[0] + 5;
    const rightNeeded = currentPage < pages.length - 5;

    // First we add the FIRST number and add "..."
    if (leftNeeded) {
        adjustedPages.push(pages[0]);
        adjustedPages.push("...");
    }



    // The add two number before Current Page
    for (let i = (currentPage - 3); i < currentPage - 1; i++) {
        if (pages[i]) {
            adjustedPages.push(pages[i]);
        }
    }

    // The add the Current Page
    adjustedPages.push(currentPage);

    // Then add two numbers after Current Page
    for (let i = currentPage; i < currentPage + 3; i++) {
        if (pages[i]) {
            adjustedPages.push(pages[i]);
        }
    }

    // The add the "..." and last number
    if (rightNeeded) {
        adjustedPages.push("...");
        adjustedPages.push(pages[pages.length - 1])
    }




    function handleArrow(to) {
        switch (to) {

            case "up": if (currentPage < pages.length) { setCurrentPage(currentPage + 1) }
                break;
            case "down": if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
                break;
            }
        }
    }

    return (

        <div className={styles.paginationSelect}>
            <button
                className={styles.buttonNonActive}
                onClick={() => handleArrow("down")}>
                &lt; </button>
            {adjustedPages.map((page, key) => {
                return (
                    <button className={page == currentPage ? styles.buttonActive : styles.buttonNonActive} key={key} onClick={page != "..." ? () => setCurrentPage(page) : null}> {page} </button>
                )
            })}
            <button
                className={styles.buttonNonActive}
                onClick={() => handleArrow("up")}>
                &gt; </button>
        </div>
    )
}