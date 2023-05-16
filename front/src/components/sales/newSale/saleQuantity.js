import styles from "../../styles.module.css";

export default function SaleQuantity( {quantity, setSaleStatus, saleStatus, name}) {
  
function deleteItem(array, index){
    
    const spliceResult = array.splice(index, 1);
    
}

function quantityChange(condition){

    const sale = [...saleStatus];
    const product = saleStatus.find(x => x.products.name === name);
    
    const index = sale.indexOf(product);
    

    if(condition === "up"){
        sale[index].products.quantity = sale[index].products.quantity + 1;
    }
    else if (condition === "down" && sale[index].products.quantity > 0){
        sale[index].products.quantity = sale[index].products.quantity - 1;
    }

    if(sale[index].quantity === 0){
        deleteItem(sale,index);
    }
     
    
    setSaleStatus(sale);
    
}    

    
    return (
        <div className={styles.saleButtons}>
            <button onClick={()=> quantityChange("down")} className={styles.buttonYes} style={{width: "32px", padding: "0 0 0 0"}}>-</button>
            <p className={styles.quantityNumber} style={{width: "32px"}}> {quantity} </p>
            <button onClick={()=> quantityChange("up")} className={styles.buttonYes} style={{width: "32px", padding: "0 0 0 0"}} >+</button>
        </div>
    )
}