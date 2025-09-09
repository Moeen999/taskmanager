import { useState } from "react";
import styles from "./taskList.module.scss";
import { IoIosList } from "react-icons/io";
import { PiKanban } from "react-icons/pi";
import { CiSearch, CiFilter } from "react-icons/ci";
import { ListItem } from "./IndividualList";
import { KanbanBoard } from "./Kanban";


export const TaskList = ({ tasks, setTasks }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [view, setView] = useState("list");

  return (
    <section className={styles.taskList}>
      <div className={styles.viewBtn}>
        <button
          onClick={() => setView("list")}
          className={view === "list" ? styles.active : ""}
        >
          <IoIosList />
          List View
        </button>

        <button
          onClick={() => setView("kanban")}
          className={view === "kanban" ? styles.active : ""}
        >
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

      {view === "list" ? (
        <ListItem tasks={tasks} />
      ) : (
        <KanbanBoard tasks={tasks} setTasks={setTasks} />
      )}
    </section>
  );
};
