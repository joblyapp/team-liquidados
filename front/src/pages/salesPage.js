import { useSelector } from "react-redux";
import LogIn from "../components/login/logIn";
import OldSales from "../components/sales/oldSales/oldSales";
import SaleIndex from "../components/sales/saleIndex";
import Session from "../components/sessionBar/session"
import { selectUser } from "../features/userSlices";

export default function SalesPage() {


    // Redux selector
    const user = useSelector(selectUser);

    return (

        <>

            {!user.loggedIn
                ? <LogIn />
                :
                <>
                    <Session />
                    <SaleIndex />
                </>
            }
        </>

    )
}