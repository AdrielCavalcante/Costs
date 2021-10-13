import styles from "./Loading.module.scss";
import loading from "../../img/loading.svg";

function Loading() {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="" />
        </div>
    );
}

export default Loading;