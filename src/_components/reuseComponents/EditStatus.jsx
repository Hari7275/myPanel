import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import {
  useGetConsultantStatusQuery,
  useUpdateStatusMutation,
} from "../../_store/api";
import toast from "react-hot-toast";

const EditStatus = ({ isOpen, onClose, selectedRow, profileStatus }) => {
  const [formData, setFormData] = useState("");
  const [data, setData] = useState([]);

  const { data: fetchData, error: fetchError } = useGetConsultantStatusQuery();
  const [updateStatus, { isLoading: isUpdating, error: updateError }] =
    useUpdateStatusMutation();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      let filteredData = fetchData?.data?.filter(
        (item) => item?.is_active == 1
      );

      if (profileStatus === 2) {
        filteredData = filteredData.filter((item) => item.status_value === 6);
      } else {
        filteredData = filteredData.filter((item) => item.status_value !== 6);
      }

      setData(filteredData);
    } else {
      console.error(
        "API response is null or has an unexpected structure:",
        fetchData
      );
    }
  }, [fetchData]);

  useEffect(() => {
    if (data.length > 0 && selectedRow) {
      const currentStatus = data.find((status) => status.id === selectedRow);
      if (currentStatus) {
        setFormData(currentStatus.status_value);
      }
    }
  }, [data, selectedRow]);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!selectedRow) {
      console.error("Selected row is not valid.");
      return;
    }

    const payload = {
      status: Number(formData),
    };

    try {
      console.log("name..........");

      await updateStatus({ id: selectedRow, body: payload });
      // console.log("..........name",onClose());

      onClose();
      console.log("name");
    } catch (error) {
      console.error("Failed to update status:", error);
      if (error.data) {
        console.error("API Error Data:", error.data);
      }
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div style={{ width: "350px", height: "400px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "flex",
            backgroundColor: "#f0f0f0",
            justifyContent: "center",
          }}
        >
          Edit Status
        </h2>
        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSave}
        >
          <div className="input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData}
              onChange={handleChange}
              className="userProfile-input-field"
              aria-describedby="status-desc"
            >
              <option value="">Select Status</option>
              {data.map((status) => (
                <option key={status.id} value={status.status_value}>
                  {status.status_name}
                </option>
              ))}
            </select>
            <p style={{ marginTop: "20px" }}>
              Select a status for the consultant.
            </p>
          </div>

          <div style={{ margin: "120px 0 0 40px" }}>
            <button
              type="submit"
              className="fifthButton"
              style={{ marginRight: "10px" }}
              disabled={isUpdating}
              aria-label="Save changes"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="fifthButton"
              style={{ background: "red", marginLeft: "10px" }}
              onClick={onClose}
              disabled={isUpdating}
              aria-label="Cancel changes"
            >
              Cancel
            </button>
          </div>
        </form>
        {updateError && (
          <p style={{ color: "red" }}>
            {updateError.data?.message || "Failed to update status."}
          </p>
        )}
        {fetchError && (
          <p style={{ color: "red" }}>
            {fetchError.message || "Failed to fetch status data."}
          </p>
        )}
      </div>
    </ReactModal>
  );
};

export default EditStatus;
