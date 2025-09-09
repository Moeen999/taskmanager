import styles from "./IndividualList.module.scss";
import { Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { TbArrowsMoveVertical } from "react-icons/tb";
import { HiArrowSmUp } from "react-icons/hi";
import { useState } from "react";

export const ListItem = ({ tasks }) => {
  const [activeColumn, setActiveColumn] = useState(null);
  const [individualClick, setIndividualClick] = useState(false);

  const handleIndividualClick = () => {
    setIndividualClick(!individualClick);
  };

  const handleIconChange = (id) => {
    setActiveColumn((prev) => (prev === id ? null : id));
  };

  const getMenuItems = (id) => [
    { key: "edit", label: "Edit", onClick: () => console.log("Edit:", id) },
    {
      key: "delete",
      label: "Delete",
      onClick: () => console.log("Delete:", id),
    },
  ];

  return (
    <section className={styles.taskTable}>
      <div className={styles.tableHeader}>
        <div>
          <input type="checkbox" />
          <span onClick={handleIndividualClick}>
            Title
            {individualClick ? <HiArrowSmUp /> : <TbArrowsMoveVertical />}
          </span>
        </div>

        {[
          { id: 1, title: "Status" },
          { id: 2, title: "Priority" },
        ].map(({ id, title }) => (
          <span key={id} onClick={() => handleIconChange(id)}>
            {title}
            {activeColumn === id ? <HiArrowSmUp /> : <TbArrowsMoveVertical />}
          </span>
        ))}

        <span>Actions</span>
      </div>

      {tasks?.map((currTask) => (
        <div key={currTask.id} className={styles.tableRow}>
          <div className={styles.titleCol}>
            <input type="checkbox" />
            <span>{currTask.title}</span>
          </div>

          <span
            className={`${styles.badge} ${
              currTask.status === "Completed"
                ? styles.completed
                : styles.inprogress
            }`}
          >
            {currTask.status}
          </span>

          <span
            className={`${styles.badge} ${
              currTask.priority === "High"
                ? styles.high
                : currTask.priority === "Medium"
                ? styles.medium
                : styles.low
            }`}
          >
            {currTask.priority}
          </span>

          <Dropdown
            menu={{ items: getMenuItems(currTask.id) }}
            trigger={["click"]}
          >
            <EllipsisOutlined className={styles.actionIcon} />
          </Dropdown>
        </div>
      ))}
    </section>
  );
};
