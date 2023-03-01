import EnterForm from "../login/enterForm";
import styles from "../styles.module.css";

export default function AdminUser() {
  return (
    <div className={styles.centered}>
      <img style={{ width: 50 }} src="/warning.png"></img>

      <EnterForm color="red" />
    </div>
  );
}
