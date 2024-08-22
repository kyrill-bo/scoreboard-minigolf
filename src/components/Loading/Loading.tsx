import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
    <div className={styles.bar}>
      <div className={styles.ball}></div>
    </div>

    </div>
  );
};

export default Loading;
