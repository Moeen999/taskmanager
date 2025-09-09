import { useEffect, useState } from "react";
import { getPostsData } from "../api/postsData";
import styles from "./IndividualList.module.scss";
import { Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { TbArrowsMoveVertical } from "react-icons/tb";
import { HiArrowSmUp } from "react-icons/hi";

export const ListItem = () => {
  const [tasks, setTasks] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);

  const handleIconChange = (id) => {
    setActiveColumn((prev) => (prev === id ? null : id));
  };
  useEffect(() => {
    const getData = async () => {
      const data = await getPostsData();
      setTasks(data);
    };
    getData();
  }, []);

  const menu = (
    <Menu
      items={[
        { key: "1", label: "Edit" },
        { key: "2", label: "Delete" },
      ]}
    />
  );

  return (
    <section className={styles.taskTable}>
      <div className={styles.tableHeader}>
        <div>
          <input type="checkbox" />
        </div>
        {[
          { id: 1, title: "Title" },
          { id: 2, title: "Status" },
          { id: 3, title: "Privacy" },
          { id: 4, title: "Actions" },
        ].map(({ id, title }) => (
          <span key={id} onClick={() => handleIconChange(id)}>
            {title}
            {activeColumn === id ? <HiArrowSmUp /> : <TbArrowsMoveVertical />}
          </span>
        ))}
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

          <Dropdown overlay={menu} trigger={["click"]}>
            <MoreOutlined className={styles.actionIcon} />
          </Dropdown>
        </div>
      ))}
    </section>
  );
};