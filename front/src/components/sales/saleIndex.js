import { useState } from "react";
import ChoiseSale from "./choiceSale/choiseSale";
import Sale from "./newSale/sale";
import OldSales from "./oldSales/oldSales";


export default function SaleIndex() {

    const [mode, setMode] = useState(null);

    function checkSale() {
        if (mode === "new") {
            return (<Sale setMode={setMode}/>)
        }
        if (mode === "old") {
            return (<OldSales setMode={setMode}/>)
        }
        else {
            return (<ChoiseSale setMode={setMode} />)
        }
    }


    return (
        <>
            {checkSale()}
        </>
    )
}