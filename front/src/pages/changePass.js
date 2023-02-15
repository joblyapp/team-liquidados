
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChangePassForm from "../components/login/changePass/changePassForm";

import Success from "../components/success";


export default function ChangePass() {

    const { recoveryToken } = useParams();
    const [success, setSuccess] = useState(false);
    const {done, setDone} = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{

        if(done === ""){
            navigate("/");
        }
        
    },[done])



    return (

       !success ? 

       <ChangePassForm recoveryToken={recoveryToken} setSuccess={setSuccess}/>

       :

       <Success operacion="Cambio de contraseña" setSuccess={setSuccess} setMode={setDone} />



    )
}