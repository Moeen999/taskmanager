import styles from "./Loader.module.scss"
export const Loader = () => {
  return (
    <div className={styles.loader_overlay}>
      <div className={styles.loader}></div>
    </div>
  );
};
