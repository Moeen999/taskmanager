import { useEffect, useState } from "react";
import styles from "./taskList.module.scss";
import { IoIosList } from "react-icons/io";
import { PiKanban } from "react-icons/pi";
import { CiSearch, CiFilter } from "react-icons/ci";
import { ListItem } from "./IndividualList";
import { KanbanBoard } from "./Kanban";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Loader } from "./Loader";
import { deleteTask } from "../api/postsData";

export const TaskList = ({
  tasks,
  setTasks,
  selectedTasks,
  setSelectedTasks,
}) => {
  const [filterData, setFilterData] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [view, setView] = useState("list");
  const [isLoading, setIsLoading] = useState(true);

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(filterData.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
          value={filterData}
          onChange={(e) => setFilterData(e.target.value)}
        />
      </div>

      <div className={styles.dropdownBtns}>
        <div className={styles.filterWrapper}>
          <button
            className={styles.filterBtn}
            onClick={() => {
              setShowStatusDropdown((prev) => !prev);
              setShowPriorityDropdown(false);
            }}
          >
            <CiFilter />
            Status
          </button>
          {showStatusDropdown && (
            <div className={styles.dropdown}>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}
        </div>

        <div className={styles.filterWrapper}>
          <button
            className={styles.filterBtn}
            onClick={() => {
              setShowPriorityDropdown((prev) => !prev);
              setShowStatusDropdown(false);
            }}
          >
            <CiFilter />
            Priority
          </button>
          {showPriorityDropdown && (
            <div className={styles.dropdown}>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : view === "list" ? (
        <ListItem
          tasks={filteredTasks}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
          ondelete={handleDelete}
        />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <KanbanBoard tasks={filteredTasks} setTasks={setTasks} />
        </DndProvider>
      )}
    </section>
  );
};
