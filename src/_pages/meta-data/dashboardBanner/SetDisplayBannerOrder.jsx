import React, { useState } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useUpdateDisplayDashboardBannerMutation } from "../../../_store/api";

const SetDisplayBannerOrder = ({ isOpen, onClose, selectedRow, allData }) => {
  const [formData, setFormData] = useState({
    display_order: selectedRow?.display_order || "",
  });

  console.log("selectedRow", selectedRow);

  const transformedData = allData.map((order) => ({
    id: order.id,
    display_order: order.display_order,
  }));

  console.log("Transformed Data:", transformedData);

  const [updateOrder, { isLoading: isUpdating, error }] =
    useUpdateDisplayDashboardBannerMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Current and new display order values
    const currentOrder = selectedRow.display_order;
    const newOrder = parseInt(formData.display_order, 10);

    // Adjust orders based on the new display order
    const updatedData = allData.map((row) => {
      if (row.id === selectedRow.id) {
        // Update the selected row with the new order
        return { ...row, display_order: newOrder };
      }

      if (
        newOrder > currentOrder &&
        row.display_order > currentOrder &&
        row.display_order <= newOrder
      ) {
        // If shifting down, decrement orders between current and new
        return { ...row, display_order: row.display_order - 1 };
      }

      if (
        newOrder < currentOrder &&
        row.display_order >= newOrder &&
        row.display_order < currentOrder
      ) {
        // If shifting up, increment orders between new and current
        return { ...row, display_order: row.display_order + 1 };
      }

      // No changes for other rows
      return row;
    });

    // Prepare data for API
    const displayOrderData = updatedData.map((row) => ({
      banner_id: row.id,
      display_order: row.display_order,
    }));

    try {
      // Send the updated data to the API
      await updateOrder({ body: { display_order_data: displayOrderData } });

      // Close the modal and refresh data if needed
      onClose();
    } catch (error) {
      console.error("API Error", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      aria-labelledby="update-promotional-card-title"
    >
      <div style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          id="update-promotional-card-title"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Update Dashboard Banner
        </h2>
        <UpdateInputField
          label="display_order"
          type="number"
          id="display_order"
          name="display_order"
          value={formData.display_order}
          onChange={handleChange}
        />

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
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
        {error && <p className="error-message">Error: {error?.message}</p>}
      </div>
    </ReactModal>
  );
};

export default SetDisplayBannerOrder;
