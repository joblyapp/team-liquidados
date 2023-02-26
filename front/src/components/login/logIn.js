import { useEffect, useState } from "react";
import Recovery from "./recovery/recovery";
import Register from "./register/register";
import Enter from "./enter";

export default function LogIn() {


    const [recovery, setRecovery] = useState(false);
    const [register, setRegister] = useState(false);

 
    useEffect(()=>{
        check();
    },[recovery,register])

    function check() {
        if (recovery) {
            return (<Recovery setRecovery={setRecovery} />)
        }
        if  (register) {
            return (<Register setRegister={setRegister}/>)
        }
        else{
            return (<Enter setRecovery={setRecovery} setRegister={setRegister}/>)
        }
    }

    return (

        <>

            {check()}

        </>

    )
}