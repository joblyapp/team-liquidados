import styles from "../styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlices"; 
import { useState } from "react";

export default function Session() {

    const [mouseOn, setMouseOn] = useState(false);

    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    function handleEnter() {
        setMouseOn(!mouseOn);
    }

    function handleLogOut(){
     
        dispatch (logout({
            mail: null,
            pass: null,
            loggedIn: false
        }));
    }

    return (
        <>
            {user.mail ?
                <div className={styles.sessionStyle}>
                    <div onMouseEnter={handleEnter} onMouseLeave={handleEnter}>
                        {mouseOn ?
                            <div className={styles.logOut} onClick={handleLogOut}>Log Out</div>
                            :
                             user.mail 
                        }

                    </div>
                </div>

                :
                <div className={styles.sessionStyle}>
                    <div>
                        <p>No USER</p>
                    </div>
                </div>
            }
        </>
    )
}