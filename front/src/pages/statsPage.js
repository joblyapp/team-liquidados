import { useSelector } from "react-redux";
import LogIn from "../components/login/logIn";
import Session from "../components/sessionBar/session";
import StatsIndex from "../components/stats/statsIndex";
import { selectUser } from "../features/userSlices";

export default function StatsPage (){

    
    // Redux selector
    const user = useSelector(selectUser);


    return(
        <>
        <Session />
        {!user.loggedIn
            ? <LogIn />
            : <StatsIndex />
        }
    </>
    )
}