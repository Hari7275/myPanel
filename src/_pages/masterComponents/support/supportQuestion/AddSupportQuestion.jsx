import React, { useState } from "react";
import ReactModal from "react-modal";
import { useCreateSupportQuestionMutation } from "../../../../_store/api";
import toast from "react-hot-toast";

const AddSupportQuestion = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    support_type: null,
    title: "",
    // type: "text",
    // status: "active",
  });

  const [createData, { isLoading }] = useCreateSupportQuestionMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const newData = {
      support_type: Number(formData?.support_type),
      title: formData?.title,
      //   type: formData?.type,
    };

    try {
      const response = await createData({ body: newData });
      if (response?.data?.status == true) {
        toast.success(response?.data?.message);
        onClose();
      }

      console.log("response..", response);

      if (response?.data?.status == false) {
        toast.error(response?.data?.message);
        return;
      }
      if (response?.error?.data?.status == false) {
        toast.error(response?.error?.data?.message);
        return;
      }
    } catch (error) {
      console.log("Failed to add new report reason", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add Support Question
        </h2>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Support Type
          </label>
          <input
            type="text"
            name="support_type"
            value={formData?.support_type}
            onChange={handleChange}
            placeholder="Support Type"
            className="userProfile-input-field"
          />
        </div>

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Report Title
          </label>
          <input
            type="text"
            name="title"
            value={formData?.title}
            onChange={handleChange}
            placeholder="Title"
            className="userProfile-input-field"
          />
        </div>

        {/* <div className="userProfile-grid-item">
          <label style={{ fontSize: "20px", marginTop: "20px" }}>
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="userProfile-input-field"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div> */}

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px" }}
            onClick={onClose}
          >
            Back
          </button>

          <button
            className="fifthButton"
            style={{ backgroundColor: "green" }}
            onClick={handleSubmit}
          >
            {"Submit"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddSupportQuestion;
