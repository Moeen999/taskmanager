import styles from "./header.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";
import { InputModal } from "./Modal";

export const Header = () => {
    
  return (
    <header className={styles.heading}>
      <div className={styles.h_left}>
        <h2>Tasks</h2>
        <span>Manage all tasks.</span>
      </div>
      <div className={styles.h_right}>
        <RiDeleteBin6Line className={styles.delIcon} />
        <button className={styles.seebtn}>
          <MdInfoOutline /> Seed Tasks
        </button>
        <InputModal/>
      </div>
    </header>
  );
};
