import { useEffect, useState } from "react";
import styles from "../styles.module.css"
import Recovery from "./recovery";
import Register from "./register";
import Enter from "./enter";

export default function LogIn({ logged, setLogged }) {


    const [recovery, setRecovery] = useState(false);
    const [register, setRegister] = useState(false);


    const user = {
        mail: "admin@admin.com",
        pass: "123456"
    };


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
            return (<Enter user={user} setLogged={setLogged} setRecovery={setRecovery} setRegister={setRegister}/>)
        }
    }

    return (

        <>

            {check()}

        </>

    )
}