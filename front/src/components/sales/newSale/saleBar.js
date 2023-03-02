import styles from "../../styles.module.css";

export default function SaleBar({ one, two, three, four, five, six, seven }) {

    const check = one === "check";
    const boxes = document.getElementsByClassName("box");



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

        <div style={{ backgroundColor: "lightBlue", textAlign: "center" }} className={`${styles.listaProductos} ${styles.listaBar}`}>

            {check ?
                <input
                    type="checkbox"
                    id="checkAll"
                    onClick={handleCheckAll}
                >
                </input>
                :
                ""}
            <p> {two}</p>
            <p> {three}</p>
            <p> {four}</p>
            <p> {five}</p>
            <p> {six}</p>
            <p> {seven}</p>
        </div>
    )

}