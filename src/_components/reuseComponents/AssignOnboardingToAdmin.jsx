import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useGetAdminUserListQuery } from "../../_store/api";
import { useAssignOnboardingToAdminMutation } from "../../_store/api";
import toast from "react-hot-toast";

const AssignOnboardingToAdmin = ({
  isOpen,
  onClose,
  selectedRow,
  created,
  adminId,
}) => {
  const [formData, setFormData] = useState({
    admin_id: "",
    description: "",
  });
  const [adminList, setAdminList] = useState([]);

  const {
    data: fetchData,
    error: fetchError,
    isLoading: isFetching,
  } = useGetAdminUserListQuery();
  const [assignOnboarding, { isLoading: isAssigning, error: assignError }] =
    useAssignOnboardingToAdminMutation();

  useEffect(() => {
    if (fetchData?.data?.records) {
      // Filter only active admin users with role_id 6
      const filteredData = fetchData.data.records.filter(
        (admin) => admin.status === "active" && admin.role_id === 6
      );
      setAdminList(filteredData);
    } else if (fetchData) {
      console.error("API response has an unexpected structure:", fetchData);
    }
  }, [fetchData]);

  console.log("createdTo.....", created);

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
      alert("Please select an admin user");
      return;
    }

    const payload = {
      consultant_id: selectedRow,
      admin_id: Number(formData.admin_id),
      description: formData.description.trim(),
      created: created,
      assign_by_admin_id: adminId,
    };
    console.log("payload", payload);

    // return;
    try {
      const response = await assignOnboarding(payload).unwrap();

      if (response.status) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
      }
      // Reset form
      setFormData({
        admin_id: "",
        description: "",
      });
    } catch (error) {
      // console.error("Failed to assign onboarding:", error);
      toast.error(error.data.message);
    }
  };

  const handleClose = () => {
    // Reset form on close
    setFormData({
      admin_id: "",
      description: "",
    });
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

        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSave}
        >
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
                Failed to load admin users
              </p>
            )}
          </div>

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
            <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              Provide details about this onboarding assignment (optional)
            </p>
          </div>

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
              aria-label="Cancel assignment"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="fifthButton"
              style={{
                padding: "10px 20px",
                cursor: "pointer",
              }}
              disabled={isAssigning || isFetching}
              aria-label="Assign onboarding"
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
