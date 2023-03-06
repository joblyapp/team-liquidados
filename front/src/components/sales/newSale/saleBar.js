import styles from "../../styles.module.css";

export default function SaleBar({ col, setCheckedBoxes, oldSales }) {


    const boxes = document.getElementsByClassName("box");
  
    const columns = col.length;

    document.documentElement.style.setProperty("--col", columns);



    function handleCheckAll(e) {
 

        if (document.getElementById("checkAll").checked) {
            var temp=[];
            oldSales.map(item => {
               
                temp.push(item._id);
            })
            setCheckedBoxes(temp);
        }
        else {
             setCheckedBoxes([]);
            }
        }



        return (

            <div style={{ backgroundColor: "lightBlue", textAlign: "center", gridTemplateColumns: `repeat(${columns}, 1fr)` }} className={`${styles.listaProductos} ${styles.listaBar}`}>


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