
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChangePassForm from "../components/login/changePass/changePassForm";
import FailLogIn from "../components/login/failLogIn";
import Success from "../components/success";


export default function ChangePass() {

    const { recoveryToken } = useParams();
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const { done, setDone } = useState("ok");


    const navigate = useNavigate();

    useEffect(() => {

        if (done === "") {
            console.log("is done!")
            navigate("/");
        }

    }, [done])


    return (

        !success ?

            !fail ?

                <ChangePassForm recoveryToken={recoveryToken} setSuccess={setSuccess} setFail={setFail}/>
                :
                <FailLogIn fail={fail} setFail={setFail}/>
            :

            <Success operacion="Cambio de contraseña" setSuccess={setSuccess} setMode={setDone} />



    )
}