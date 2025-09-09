import { useState } from "react";
import { Button, Modal, Select } from "antd";
import styles from "./Modal.module.scss";

export const InputModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleSave = () => {
    setIsModalOpen(false);
    console.log("I will send the data to api and will be displayed on the screen")
  };

  return (
    <div>
      <Button className={styles.cTaskbtn} onClick={showModal}>
        Create Task
      </Button>

      <Modal
        className={styles.modal}
        title="Create Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p className={styles.subtitle}>Create a new task.</p>

        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" placeholder="Enter task title" />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Status</label>
            <Select
              defaultValue="Not Started"
              options={[
                { value: "Not Started", label: "Not Started" },
                { value: "In Progress", label: "In Progress" },
                { value: "Completed", label: "Completed" },
              ]}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Priority</label>
            <Select
              defaultValue="None"
              options={[
                { value: "None", label: "None" },
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
              ]}
            />
          </div>
        </div>

        <Button className={styles.saveBtn} onClick={handleSave} block>
          Save
        </Button>
      </Modal>
    </div>
  );
};


