import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateUserSupportRequestMutation } from "../../../../_store/api";
import { UpdateInputField } from "../../../../_components/ui/inputForm";
import toast from "react-hot-toast";

const UpdateSupportRequest = ({ isOpen, onClose, selectedRow }) => {
  const [formData, setFormData] = useState({
    // user_id: selectedRow?.user_id || "",
    user_ticket_id: selectedRow?.id,
    response_message: selectedRow.description || "",
    status: "",
  });
  console.log("selectedRow", selectedRow);

  const [updateData, { isLoading: isUpdating, error }] =
    useUpdateUserSupportRequestMutation();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        // status: selectedRow?.status,
        // user_id: selectedRow?.user_id,
        user_ticket_id: selectedRow?.id,
        // support_executive_id: 2,
        response_message: selectedRow?.description || "",
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Build the request payload conditionally
      const requestData = {
        user_ticket_id: formData.user_ticket_id,
        response_message: formData.response_message,
      };

      // Only include status if it exists and has been selected
      if (formData.status !== undefined && formData.status !== null) {
        requestData.status = formData.status;
      }

      const response = await updateData({
        body: requestData,
      });

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        onClose();
      }

      console.log("response..", response);

      if (response?.data?.status === false) {
        toast.error(response?.data?.message);
        return;
      }
      if (response?.error?.data?.status === false) {
        toast.error(response?.error?.data?.message);
        return;
      }
    } catch (error) {
      console.log("API Error", error);
    }
  };

  if (!isOpen) return null;

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
          Update User Support Request
        </h2>

        {/* <UpdateInputField
          label=" User Id"
          id="user_id"
          name="user_id"
          value={formData?.user_id}
          onChange={handleChange}
        /> */}

        <label
          htmlFor="response_message"
          style={{ width: "100%", marginTop: "20px" }}
        >
          Description:
        </label>
        <div style={{ width: "100%", marginTop: "4px", marginBottom: "15px" }}>
          <textarea
            style={{
              width: "100%",
              height: "150px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
              fontFamily: "'Arial', sans-serif",
              resize: "vertical",
            }}
            label="description"
            type="text"
            id="response_message"
            name="response_message"
            value={formData?.response_message}
            onChange={handleChange}
            placeholder="this is description field"
          />
        </div>

        <div style={{ margin: "25px 0 0 10px", fontSize: "18px" }}>
          <input
            type="radio"
            name="status"
            value={2}
            checked={formData.status == 2}
            onChange={handleChange}
            style={{ marginRight: "10px", transform: "scale(1.25)" }}
          />

          <label>Closed</label>
        </div>

        <div style={{ marginTop: "30px" }}>
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
            onClick={handleSave}
            // disabled={isUpdating}
          >
            {"Save"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateSupportRequest;
