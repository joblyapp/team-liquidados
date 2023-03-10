import styles from "../styles.module.css";

export default function PaginationSelect({ setCurrentPage, itemsPerPage, totalItems, currentPage }) {



    // Set the total pages.

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(i);
    }

    // Create an array that contains the pages to be shown
    let adjustedPages = []
    // Create a variable to count the non existing previous or post current pages in order to mantain the anchor
    let debt = 0;

    // Check if dots are needed
    const leftNeeded = currentPage > pages[0] + 2;
    const rightNeeded = currentPage < pages.length - 2;

    // First we add the FIRST number and add "..."


    if (leftNeeded) {
        adjustedPages.push(pages[0]);
        adjustedPages.push("...");
    }



    // Then add two number before Current Page
    for (let i = (currentPage - 3); i < currentPage - 1; i++) {
        if (pages[i]) {
            adjustedPages.push(pages[i]);
        }
        else {
            debt++;
        }
    }

    // The add the Current Page
    adjustedPages.push(currentPage);

    // Then add two numbers after Current Page
    for (let i = currentPage; i < currentPage + 2; i++) {
        if (pages[i]) {
            adjustedPages.push(pages[i]);
        }
        else {
            debt++;
        }
    }

    // The add the "..." and last number

    // Adds three more numbers to complete the selector anchor

    if (rightNeeded && !leftNeeded) {

        for (let i = currentPage + 2; i < currentPage + 4 + debt; i++) {
            if (pages[i]) {
                adjustedPages.push(pages[i]);
            }
        }
    }

    // Add three more numbers to complete the anchor
    else if (!rightNeeded && leftNeeded) {
        let j = 0;
        for (let i = currentPage - (5 + debt); i < currentPage - 3; i++) {

            if (pages[i]) {
                console.log(adjustedPages)
                adjustedPages.splice(2 + j, 0, pages[i])
                j++;
            }
        }

    }
    // Add the points at the end
    if (rightNeeded) {
        adjustedPages.push("...");
        adjustedPages.push(pages[pages.length - 1])
    }




    function handleClick(e, current, page) {
        e.preventDefault();

        console.log("current: " + current)
        console.log("Page: " + page)

        if (e.target.value > current) {
            console.log("move right");
           
        }

        if (e.target.value < current) {
            console.log("move left");
        }



        setCurrentPage(page);

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
                    <button id={page} className={page == currentPage ? styles.buttonActive : styles.buttonNonActive} key={key} onClick={page != "..." ? (e) => handleClick(e, currentPage, page) : null} value={page}> {page} </button>
                )
            })}
            <button
                className={styles.buttonNonActive}
                onClick={() => handleArrow("up")}>
                &gt; </button>
        </div>
    )
}