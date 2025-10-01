import React, { useState, useEffect } from "react";
import "./NotificationForm.css";
import {
  useGetUserNotificationTamplateListQuery,
  useCreateSendNotificationToUserMutation,
} from "../../../../_store/api";
import toast from "react-hot-toast";

const NotificationForm = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templates, setTemplates] = useState([]);

  // handeling api  fetching data and deleting data
  const { data: fetchData } = useGetUserNotificationTamplateListQuery({
    page,
    size: pageSize,
  });

  const [createData, { isLoading }] = useCreateSendNotificationToUserMutation();

  // store data
  useEffect(() => {
    // console.log("fetchData gifts", fetchData?.data.rows);
    if (fetchData) {
      setTemplates(fetchData?.data?.records);
    }
  }, [fetchData]);

  const [formData, setFormData] = useState({
    title: "",
    notification_type_id: 9,
    message: "",
    image_url: "",
    target_type: "ALL_USERS",
    target_filter: {
      user_ids: [],
    },
    scheduled_time: "",
    is_instant: true,
    status: "PENDING",
    created_by: 1006,
  });

  const [userIdsInput, setUserIdsInput] = useState("");

  useEffect(() => {
    // This is where you would fetch templates from API
    // fetchTemplates();
  }, []);

  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);

    // If no template selected (Create New option), reset form
    if (!templateId) {
      setFormData({
        title: "",
        notification_type_id: 9,
        message: "",
        image_url: "",
        target_type: "ALL_USERS",
        target_filter: {
          user_ids: [],
        },
        scheduled_time: "",
        is_instant: true,
        status: "PENDING",
        created_by: 1006,
      });
      setUserIdsInput("");
      return;
    }

    // Find the selected template from templates array
    const selectedTemplateData = templates.find(
      (template) => template.id === parseInt(templateId)
    );

    // If template found, populate the form
    if (selectedTemplateData) {
      setFormData({
        ...formData,
        title: selectedTemplateData.title || "",
        message: selectedTemplateData.message || "",
        image_url: selectedTemplateData.image_url || "",
        // Keep other fields with their default values or current values
        notification_type_id: formData.notification_type_id,
        target_type: formData.target_type,
        target_filter: formData.target_filter,
        scheduled_time: formData.scheduled_time,
        is_instant: formData.is_instant,
        status: formData.status,
        created_by: formData.created_by,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTargetTypeChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      target_type: value,
    });
  };

  const handleUserIdsChange = (e) => {
    const value = e.target.value;
    setUserIdsInput(value);

    // Convert comma-separated string to array of numbers
    const userIds = value
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
    setFormData({
      ...formData,
      target_filter: {
        user_ids: userIds,
      },
    });
  };

  const handleSubmit = async () => {
    // Create a copy of formData to manipulate before sending
    const dataToSend = { ...formData };
    
    // If is_instant is true, remove scheduled_time from the request
    if (dataToSend.is_instant) {
      delete dataToSend.scheduled_time;
    }
    
    console.log("Form Data:", dataToSend);

    try {
      const response = await createData({ body: dataToSend }).unwrap();

      if (response.status) {
        toast.success(response.message || "Template created successfully");
        // onClose();
      } else {
        toast.error(response.message || "Failed to create template");
      }
    } catch (error) {
      console.error("Failed to create notification template", error);
      toast.error(error.data?.message || "Failed to create template");
    }
  };

  return (
    <div className="nf-container">
      <div className="nf-header">
        <div className="nf-template-selector">
          <label htmlFor="template-select" className="nf-label">
            Select Template:
          </label>
          <select
            id="template-select"
            className="nf-select nf-template-dropdown"
            value={selectedTemplate}
            onChange={handleTemplateChange}
          >
            <option value="">-- Create New --</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="nf-form">
        <div className="nf-form-group">
          <label htmlFor="title" className="nf-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="nf-input"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="nf-form-group">
          <label htmlFor="message" className="nf-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="nf-textarea"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="nf-form-group">
          <label htmlFor="image_url" className="nf-label">
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            className="nf-input"
            value={formData.image_url}
            onChange={handleInputChange}
          />
          {formData.image_url && (
            <div className="nf-image-preview">
              <img
                src={formData.image_url}
                alt="Preview"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        </div>

        <div className="nf-form-group">
          <label htmlFor="target_type" className="nf-label">
            Target Type
          </label>
          <select
            id="target_type"
            name="target_type"
            className="nf-select"
            value={formData.target_type}
            onChange={handleTargetTypeChange}
          >
            <option value="ALL_USERS">All Users</option>
            <option value="USER_IDS">Specific Users</option>
          </select>
        </div>

        {formData.target_type === "USER_IDS" && (
          <div className="nf-form-group">
            <label htmlFor="user_ids" className="nf-label">
              User IDs (comma-separated)
            </label>
            <input
              type="text"
              id="user_ids"
              className="nf-input"
              value={userIdsInput}
              onChange={handleUserIdsChange}
              placeholder="1,2,3,4"
            />
            <small className="nf-help-text">
              Enter user IDs separated by commas
            </small>
          </div>
        )}

        <div className="nf-form-group">
          <label className="nf-checkbox-label">
            <input
              type="checkbox"
              className="nf-checkbox"
              checked={formData.is_instant}
              onChange={(e) =>
                setFormData({ ...formData, is_instant: e.target.checked })
              }
            />
            Send Instantly
          </label>
        </div>
        {!formData.is_instant && (
          <div className="nf-form-group">
            <label htmlFor="scheduled_time" className="nf-label">
              Scheduled Time
            </label>
            <input
              type="datetime-local"
              id="scheduled_time"
              name="scheduled_time"
              className="nf-input"
              value={
                formData.scheduled_time
                  ? formData.scheduled_time.slice(0, 16)
                  : ""
              }
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        {/* <div className="nf-form-group">
          <label htmlFor="status" className="nf-label">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="nf-select"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="PENDING">Pending</option>
            <option value="SENT">Sent</option>
            <option value="FAILED">Failed</option>
          </select>
        </div> */}

        <div className="nf-form-actions">
          <button
            type="submit"
            className="nf-btn nf-btn-primary"
            onClick={handleSubmit}
          >
            Send Notification
          </button>
          <button
            type="button"
            className="nf-btn nf-btn-secondary"
            onClick={() => window.location.reload()}
          >
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationForm;