import { useState } from "react";
import ChoiseSale from "./choiceSale/choiseSale";
import Sale from "./newSale/sale";
import OldSales from "./oldSales/oldSales";


export default function SaleIndex() {

    const [mode, setMode] = useState(false);

    function checkSale() {
        if (mode) {
            return (<Sale setMode={setMode} />)
        }
        else {
            return (<OldSales setMode={setMode} />)
        }

    }


    return (
        <>
            {checkSale()}
        </>
    )
}