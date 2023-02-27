import { useSelector } from "react-redux";
import LogIn from "../components/login/logIn";
import Products from "../components/products/products";
import Session from "../components/sessionBar/session";
import { selectUser } from "../features/userSlices";

export default function ProductsPage() {

    // Redux selector
    const user = useSelector(selectUser);

    return (

        <>

            {!user.loggedIn
                ? <LogIn />
                :
                <>
                    <Session />
                    <Products />
                </>
            }

        </>
    )
}