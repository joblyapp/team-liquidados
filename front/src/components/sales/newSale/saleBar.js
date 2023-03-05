import styles from "../../styles.module.css";

export default function SaleBar({ col }) {


    const boxes = document.getElementsByClassName("box");

    const columns = col.length;
    
    document.documentElement.style.setProperty("--col", columns);



    function handleCheckAll(e) {

        if (document.getElementById("checkAll").checked) {
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].checked = true;
            }
        }
        else {
            for (let i = 0; i < boxes.length; i++) {
                boxes[i].checked = false;
            }
        }
    }



    return (

        <div style={{ backgroundColor: "lightBlue", textAlign: "center", gridTemplateColumns: `repeat(${columns}, 1fr)` }} className={`${styles.listaProductos} ${styles.listaBar}`}>
            {/*
                {
                    check?
                        
                :
    ""
}
            <p> {two}</p>
            <p> {three}</p>
            <p> {four}</p>
            <p> {five}</p>
            <p> {six}</p>
            <p> {seven}</p>
        </div >
    )
*/}

            {col.map((item, key) => {
                if (item === "check") {
                    const boxes = document.getElementsByClassName("box");
                    return (
                        <input key={key}
                            type="checkbox"
                            id="checkAll"
                            onClick={handleCheckAll}
                        >
                        </input>
                    )
                }
                else {
                    return (
                        <p key={key}>{item}</p>
                    )
                }

            })}

        </div>

    )
}