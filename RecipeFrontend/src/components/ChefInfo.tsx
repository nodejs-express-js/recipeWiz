import useChefInfo from "../hooks/useChefInfo";
import styles from "./ChefInfo.module.css"; // Ensure correct import (lowercase "s" in styles)

const ChefInfo = () => {
  const { state } = useChefInfo();

  return (
    <section className={styles.chefInfoContainer}>
      <h1 className={styles.title}>Profile Info</h1>
      <div className={styles.profile}>
        <img src={state.profilepic} alt={`${state.firstName} ${state.lastName}`} className={styles.profilePic} />
        <div className={styles.details}>
          <p><strong>First Name:</strong> {state.firstName}</p>
          <p><strong>Last Name:</strong> {state.lastName}</p>
        </div>
      </div>
      {state?.error && < >{state?.error}</>}
    </section>
  );
};

export default ChefInfo;
