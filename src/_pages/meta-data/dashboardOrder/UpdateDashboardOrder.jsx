import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useUpdateDashboardOrderListMutation } from "../../../_store/api";
import { useGetCoachCategoryListQuery } from "../../../_store/api";
import Select from "react-select";
import toast from "react-hot-toast";

const UpdateDashboardOrder = ({ isOpen, onClose, selectedRow }) => {
  const [data, setdata] = useState([]);
  const [formData, setFormData] = useState({
    category_ids: [],
    content_type: "",
    consultant_type: "",
    title: "",
    display_order: "",
  });

  const [updateCard, { isLoading }] = useUpdateDashboardOrderListMutation();
  const { data: fetchData } = useGetCoachCategoryListQuery();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setdata(fetchData?.data);
    } else {
      setdata([]);
    }
  }, [fetchData]);

  // Preselect form data when selectedRow changes
  useEffect(() => {
    if (selectedRow) {
      setFormData({
        category_ids: selectedRow?.category_ids || [],
        content_type: selectedRow?.content_type || "",
        consultant_type: selectedRow?.consultant_type || "",
        title: selectedRow?.title || "",
        display_order: selectedRow?.display_order || "",
      });
    }
  }, [selectedRow]);

  // get category list
  const Response = data?.map((response) => ({
    value: response?.id, // Assuming each response has an 'id'
    label: response?.category_name, // Assuming each response has a 'name'
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      category_ids: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await updateCard({
        body: formData,

        id: selectedRow.id,
      });
      console.log("response ", response);
      if (response.data.status) {
        toast.success(response.data.message);
        onClose();
      } else if (response.data.status === false) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Failed to update dashboard order", error);
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
          Update dashboard order list
        </h2>

        <UpdateInputField
          label="Content Type"
          type="text"
          id="content_type"
          name="content_type"
          placeholder="Content Type"
          value={formData.content_type}
          onChange={handleChange}
        />
        <div className="input-container">
          <label htmlFor="category_ids">Category Name</label>
          <Select
            id="category_ids"
            name="category_ids"
            isMulti
            options={Response}
            value={Response.filter((option) =>
              formData.category_ids.includes(option.value)
            )}
            onChange={handleSelectChange}
          />
        </div>

        <div className="input-container">
          <label htmlFor="consultant_type">Consultant Type</label>
          <select
            id="consultant_type"
            name="consultant_type"
            value={formData.consultant_type}
            onChange={handleChange}
            className="userProfile-input-field"
            style={{ height: "55px" }}
          >
            <option value="">Select a Consultant Type </option>
            <option value={1}>Astrologer</option>
            <option value={2}>Coach</option>
            <option value={3}>Listener</option>
          </select>
        </div>
        <UpdateInputField
          label="Title"
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <UpdateInputField
          label="Display Order"
          type="text"
          id="display_order"
          name="display_order"
          placeholder="Display Order"
          value={formData.display_order}
          onChange={handleChange}
        />

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
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default UpdateDashboardOrder;
