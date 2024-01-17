import styles from "./Loading.module.css";

const Loading = () => {
  // ---------------------------- CSS ----------------------------

  const loadingContainer = [styles.loadingContainer].join("");
  const loadingOuter = [styles.loadingOuter].join("");
  const loadingInner = [styles.loadingInner].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={loadingContainer}>
      <div className={loadingOuter}>
        <div className={loadingInner}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Loading;
