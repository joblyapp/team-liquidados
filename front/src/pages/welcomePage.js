import Session from "../components/sessionBar/session";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlices";
import LogIn from "../components/login/logIn";
import Welcome from "../components/welcome";
import AdminUser from "../components/adminUser/adminUser";
import { useEffect } from "react";
import axios from "axios";


export default function WelcomePage() {

    const adminExist = true;

    useEffect(()=>{
        axios
        .get("http://localhost:8080/api/v1/admin/demo")
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
      
    },[])


    // Redux selector
    const user = useSelector(selectUser);

    return (
        <>
            {adminExist ?
                <>
                    <Session />
                    {!user.loggedIn
                        ? <LogIn />
                        : <Welcome user={user} />}
                </>
                :
                <AdminUser />
            }
        </>
    )
}