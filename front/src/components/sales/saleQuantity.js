import styles from "../styles.module.css";

export default function SaleQuantity( {amount, setSaleStatus, saleStatus, name}) {
  
function deleteItem(array, index){
    console.log("Inside deleteItem i have:");
    console.log("Array: "+ array);
    console.log("Index: "+ index);
    console.log("Sale Status: " + saleStatus)
    const spliceResult = array.splice(index, 1);
    console.log("splice: " + spliceResult);
}

function quantityChange(condition){

    const sale = [...saleStatus];
    const product = saleStatus.find(x => x.name === name);
    
    const index = sale.indexOf(product);
    console.log(index);
    console.log(sale);

    if(condition === "up"){
        sale[index].amount = sale[index].amount + 1;
    }
    else if (condition === "down" && sale[index].amount > 0){
        sale[index].amount = sale[index].amount - 1;
    }

    if(sale[index].amount === 0){
        deleteItem(sale,index);
    }
     
    console.log("Sale: " + sale);
    setSaleStatus(sale);
    
}    

    
    return (
        <div className={styles.saleButtons}>
            <button onClick={()=> quantityChange("down")}>-</button>
            <p> {amount} </p>
            <button onClick={()=> quantityChange("up")}>+</button>
        </div>
    )
}