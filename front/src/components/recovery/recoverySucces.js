import { useEffect } from "react";
import styles from "../../components/styles.module.css";

export default function RecoverySuccess({ setExito, setRecovery }) {
  useEffect(() => {
   
    setTimeout(() => setExito(false), 3000);
    setTimeout(() => setRecovery(false), 3000);
  });

  return (
    <div className={styles.box}>
      <h3>El CORREO está registrado. Recibirá un mail en la dirección dada</h3>
    </div>
  );
}
