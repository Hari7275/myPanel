import React, { useState, useEffect } from "react";
import { UpdateInputField } from "../../../src/_components/ui/inputForm";
import {
  useGetProfileReviewDetailsQuery,
  useUpdateProfileReviewDetailsMutation,
} from "../../_store/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminUpdateDetails = ({ consultantId }) => {
  const {
    data: fetchData,
    error,
    isLoading,
  } = useGetProfileReviewDetailsQuery({
    id: consultantId,
  });

  const [updateProfileReviewDetails] = useUpdateProfileReviewDetailsMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    services: "",
    status: "approved",
    admin_comment: "",
  });

  // useEffect(() => {
  //   if (
  //     fetchData &&
  //     fetchData.data &&
  //     fetchData.data.consultant_submitted_data
  //   ) {
  //     setFormData(fetchData.data.consultant_submitted_data);
  //   }
  // }, [fetchData]);

  useEffect(() => {
    if (
      fetchData &&
      fetchData.data &&
      fetchData.data.consultant_submitted_data
    ) {
      const fetched = fetchData.data.consultant_submitted_data;
      setFormData((prev) => ({
        ...prev,
        description: fetched.description || "",
        services: fetched.services || "",
        admin_comment: fetched.admin_comment || "",
        status: fetched.status || "approved",
      }));
    }
  }, [fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = {
        status: formData.status || "approved",
        admin_comment: formData.admin_comment,
      };

      if (formData?.status == "approved") {
        payload.admin_enhanced_data = {
          description: formData.description,
          services: formData.services,
        };
      }

      console.log("payload", payload);

      // return;

      const response = await updateProfileReviewDetails({
        id: consultantId,
        body: payload,
      }).unwrap();

      console.log("response", response);

      if (response?.status === false) {
        toast.error(
          response?.message || "Something went wrong. Please try again."
        );
        return;
      }

      toast.success(response?.message || "Information updated successfully!");
      setTimeout(() => {
        navigate("/profile-review");
      }, 500);
    } catch (error) {
      toast.error(
        error?.message || "Error updating profile. Please try again."
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="main-container sub-container">
      <div className="RewardsTxn-container">
        <label
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
          }}
        >
          Update Info
        </label>

        <form
          className="simple-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <label
              htmlFor="description"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Description:
            </label>
            <div style={{ width: "100%", marginTop: "4px" }}>
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
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="this is description field"
              />
            </div>
          </div>

          <label
            htmlFor="services"
            style={{ width: "100%", marginTop: "20px" }}
          >
            Service:
          </label>
          <div style={{ width: "100%", marginTop: "4px" }}>
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
              id="services"
              name="services"
              value={formData.services}
              onChange={handleChange}
              placeholder="this is services field"
            />
          </div>

          <div style={{ display: "flex" }}>
            <UpdateInputField
              label="Admin Comment"
              type="text"
              id="admin_comment"
              name="admin_comment"
              value={formData?.admin_comment || ""}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData?.status}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ height: "55px" }}
            >
              <option>Select Status</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div
            style={{
              marginTop: "20px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            {/* <button
              type="button"
              className="fifthButton"
              style={{ marginRight: "10px" }}
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="fifthButton"
              style={{ backgroundColor: "green" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateDetails;
