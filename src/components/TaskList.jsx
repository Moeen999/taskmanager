import { useState } from "react";
import styles from "./taskList.module.scss";
import { IoIosList } from "react-icons/io";
import { PiKanban } from "react-icons/pi";
import { CiSearch, CiFilter } from "react-icons/ci";
import { ListItem } from "./IndividualList";

export const TaskList = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <section className={styles.taskList}>
      <div className={styles.viewBtn}>
        <button>
          <IoIosList />
          List View
        </button>
        <button disabled>
          <PiKanban />
          Kanban View
        </button>
      </div>

      <div className={styles.filterTags}>
        <CiSearch className={styles.searchIcon} />
        <input
          className={styles.input}
          type="text"
          name="task"
          placeholder="Search tasks..."
        />

        {/* First filter button */}
        <div className={styles.filterWrapper}>
          <button
            className={styles.filterBtn}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <CiFilter />
            Filter
          </button>
          {showDropdown && (
            <div className={styles.dropdown}>
              <select>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}
        </div>

        <button className={styles.filterBtn}>
          <CiFilter />
          Filter
        </button>
      </div>

      {/* Individual List Data */}
      <ListItem />
    </section>
  );
};
