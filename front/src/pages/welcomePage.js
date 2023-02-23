import Session from "../components/sessionBar/session";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlices";
import LogIn from "../components/login/logIn";
import Welcome from "../components/welcome";



export default function WelcomePage() {


    // Redux selector
    const user = useSelector(selectUser);

    return (
     
            
                <>
                    
                    {!user.loggedIn
                        ? <LogIn />
                        : <Welcome user={user} />}
                </>
    
    )
}