import { useSelector } from "react-redux";
import ChangePass from "./changePass";
import Session from "../components/sessionBar/session";
import { selectUser } from "../features/userSlices";

export default function NewPage() {

    const user = useSelector(selectUser);


    return (

        <>
              <>
                    <Session />
                    {!user.loggedIn
                        ? <ChangePass />
                        : ""}
                </>
        </>
    )
}