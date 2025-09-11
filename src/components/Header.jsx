import styles from "./header.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";
import { InputModal } from "./Modal";
import { FaTasks } from "react-icons/fa";

export const Header = ({ onSave, onDelete }) => {
  return (
    <header className={styles.heading}>
      <div className={styles.h_left}>
        <div className={styles.logo}>
          <h2>Tasks</h2>
          <FaTasks />
        </div>
        <span>Manage all tasks.</span>
      </div>
      <div className={styles.h_right}>
        <RiDeleteBin6Line className={styles.delIcon} onClick={()=>onDelete()} />
        <button className={styles.seebtn}>
          <MdInfoOutline /> Seed Tasks
        </button>
        <InputModal onSave={onSave} />
      </div>
    </header>
  );
};
