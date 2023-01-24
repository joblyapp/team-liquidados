import { useEffect } from "react";
import styles from "../../components/styles.module.css"


export default function FailLogIn({ setFail, fail }) {

    useEffect(() => {
        setTimeout(() => setFail(false), 3000)
    })

    return (
        <>
            {fail &&


                <div className={styles.centered}>

                    <div className={styles.box}>
                        <h4>
                            LA INFORMACION ES INCORRECTA. INTENTELO NUEVAMENTE
                        </h4>
                    </div>

                </div>


            }
        </>



    )
}