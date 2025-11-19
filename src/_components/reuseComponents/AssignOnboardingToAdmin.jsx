import React, { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import { useGetAdminUserListQuery } from "../../_store/api";
import {
  useAssignOnboardingToAdminMutation,
  useReAssignOnboardingToAdminMutation,
} from "../../_store/api";
import toast from "react-hot-toast";

const AssignOnboardingToAdmin = ({
  isOpen,
  onClose,
  selectedRow,
  created,
  adminId,
  isReassign,
}) => {
  const [formData, setFormData] = useState({
    admin_id: "",
    description: "",
  });

  const [adminList, setAdminList] = useState([]);

  console.log("isReassign", isReassign);

  // Ref to prevent duplicate error toasts
  const errorShownRef = useRef(false);

  const {
    data: fetchData,
    error: fetchError,
    isLoading: isFetching,
  } = useGetAdminUserListQuery();

  const [assignOnboarding, { isLoading: isAssigning, error: assignError }] =
    useAssignOnboardingToAdminMutation();

  const [reAssignOnboarding, { isLoading: isReAssigning }] =
    useReAssignOnboardingToAdminMutation();

  // Fetch Admin List + Error Handling
  useEffect(() => {
    if (fetchData?.data?.records) {
      const filteredData = fetchData.data.records.filter(
        (admin) => admin.status === "active" && admin.role_id === 6
      );
      setAdminList(filteredData);
    }

    if (fetchError && !errorShownRef.current) {
      errorShownRef.current = true;
      toast.error(
        `${
          fetchError?.data?.message || "Failed to load admin users"
        }. Please log in again.`
      );
    }
  }, [fetchData, fetchError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.admin_id) {
      toast.error("Please select an admin user");
      return;
    }

    const payload = {
      consultant_id: selectedRow,
      admin_id: Number(formData.admin_id),
      description: formData.description.trim(),
      created: created,
      assign_by_admin_id: adminId,
    };

    try {
      let response;

      if (isReassign) {
        response = await reAssignOnboarding(payload).unwrap();
      } else {
        response = await assignOnboarding(payload).unwrap();
      }

      if (response.status) {
        toast.success(response.message);
        handleClose();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Assignment failed. Try again.");
    }
  };
  const handleClose = () => {
    setFormData({
      admin_id: "",
      description: "",
    });

    // Reset toast guard so next open can show new errors
    errorShownRef.current = false;

    onClose();
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      <div style={{ width: "450px", minHeight: "450px", padding: "20px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "flex",
            backgroundColor: "#f0f0f0",
            justifyContent: "center",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          Assign Onboarding to Admin
        </h2>

        <form className="simple-form" autoComplete="off" onSubmit={handleSave}>
          {/* ADMIN SELECT */}
          <div className="input-container" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="admin_id"
              style={{ display: "block", marginBottom: "8px" }}
            >
              Select Admin <span style={{ color: "red" }}>*</span>
            </label>

            <select
              id="admin_id"
              name="admin_id"
              value={formData.admin_id}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ width: "100%", padding: "8px" }}
              disabled={isFetching}
              required
            >
              <option value="">
                {isFetching ? "Loading..." : "-- Select Admin --"}
              </option>

              {adminList.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name} ({admin.email})
                </option>
              ))}
            </select>

            {fetchError && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                Failed to load admin users. Please log in again.
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="input-container" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="description"
              style={{ display: "block", marginBottom: "8px" }}
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{
                width: "100%",
                padding: "8px",
                minHeight: "100px",
                resize: "vertical",
                fontFamily: "inherit",
              }}
              placeholder="Enter assignment description (optional)..."
            />
          </div>

          {/* ASSIGN ERROR */}
          {assignError && (
            <div
              style={{
                color: "red",
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#fee",
                borderRadius: "4px",
              }}
            >
              {assignError?.data?.message ||
                "Failed to assign onboarding. Please try again."}
            </div>
          )}

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "30px",
            }}
          >
            <button
              type="button"
              className="fifthButton"
              style={{
                background: "#6c757d",
                padding: "10px 20px",
                cursor: "pointer",
              }}
              onClick={handleClose}
              disabled={isAssigning}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="fifthButton"
              style={{ padding: "10px 20px", cursor: "pointer" }}
              disabled={isAssigning || isFetching}
            >
              {isAssigning ? "Assigning..." : "Assign"}
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default AssignOnboardingToAdmin;
