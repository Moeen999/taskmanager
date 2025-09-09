import { useState } from "react";
import { Button, Modal, Select } from "antd";
import styles from "./Modal.module.scss";

export const InputModal = ({ onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [priority, setPriority] = useState("None");
  const [saving, setSaving] = useState(false); 

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSave = async () => {
    setSaving(true); 
    await onSave({ title, status, priority }); 
    setSaving(false); 
    setIsModalOpen(false);
    setTitle("");
    setStatus("Not Started");
    setPriority("None");
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
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Status</label>
            <Select
              value={status}
              onChange={setStatus}
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
              value={priority}
              onChange={setPriority}
              options={[
                { value: "None", label: "None" },
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
              ]}
            />
          </div>
        </div>

        <Button
          className={styles.saveBtn}
          onClick={handleSave}
          block
          loading={saving} // antd shows spinner
        >
          Save
        </Button>
      </Modal>
    </div>
  );
};
