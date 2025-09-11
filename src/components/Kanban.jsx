import { useDrag, useDrop } from "react-dnd";
import { updateTask } from "../api/postsData";
import styles from "./Kanban.module.scss";

const ItemTypes = {
  TASK: "task",
};

const priorities = ["None", "Low", "Medium", "High", "Urgent"];

const TaskCard = ({ task }) => {
  const status = task.status?.toLowerCase();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id, priority: task.priority },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={styles.kanban_card}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      {task.status && (
        <span
          className={
            status === "completed"
              ? styles.completed
              : status === "in progress"
              ? styles.in_progress
              : styles.not_started
          }
        >
          {task.status}
        </span>
      )}
    </div>
  );
};

const KanbanColumn = ({ level, tasks, setTasks }) => {
  const [, dropRef] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: async (item) => {
      if (item.priority === level) return; 

      try {
        const updatedTask = await updateTask(item.id, { priority: level });

        setTasks((prev) =>
          prev.map((t) =>
            t.id === item.id ? { ...t, ...updatedTask, priority: level } : t
          )
        );
      } catch (error) {
        console.error("Drop error:", error);
      }
    },
  }));

  return (
    <div ref={dropRef} className={styles.kanban_column}>
      <div className={styles.headers}>
        <h3>
          {level} ({tasks.length})
        </h3>
        <span>Add Task</span>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export const KanbanBoard = ({ tasks, setTasks }) => {
  const grouped = priorities.map((p) => ({
    level: p,
    tasks: tasks.filter((t) => t.priority === p),
  }));

  return (
    <div className={styles.kanban_board}>
      {grouped.map((col) => (
        <KanbanColumn
          key={col.level}
          level={col.level}
          tasks={col.tasks}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
};
