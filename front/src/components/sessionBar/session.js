import styles from "../styles.module.css";
import NavigateLogo from "./navigateLogo";
import NavigateMenu from "./navigateMenu";
import NavigateUser from "./navigateUser";


export default function Session() {


    return (
        <div className={styles.sessionBar}>

            <NavigateLogo />
            <NavigateMenu />
            <NavigateUser />

        </div>
    )
}