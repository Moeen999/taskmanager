import { updateTask } from "../api/postsData";
import styles from "./Kanban.module.scss";
const priorities = ["None", "Low", "Medium", "High", "Urgent"];

export const KanbanBoard = ({ tasks, setTasks }) => {
  const grouped = priorities.map((p) => ({
    level: p,
    tasks: tasks.filter((t) => t.priority === p),
  }));

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleDrop = async (e, newPriority) => {
    const id = e.dataTransfer.getData("taskId");

    if (!id) return;

    try {
      const updatedTask = await updateTask(id, { priority: newPriority });

      if (updatedTask) {
        setTasks((prev) =>
          prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
      }
    } catch (error) {
      console.error("Drop error:", error);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className={styles.kanban_board}>
      {grouped.map((col) => (
        <div
          key={col.level}
          className={styles.kanban_column}
          onDrop={(e) => handleDrop(e, col.level)}
          onDragOver={handleDragOver}
        >
          <div className={styles.headers}>
            <h3>
              {col.level} ({col.tasks.length})
            </h3>
            <span>Add Task</span>
          </div>
          {col.tasks.map((task) => (
            <div
              key={task.id}
              className={styles.kanban_card}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              {task.status && (
                <span
                  className={
                    task.status === "Completed"
                      ? styles.completed
                      : task.status === "In Progress"
                      ? styles.in_progress
                      : styles.not_started
                  }
                >
                  {task.status}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
