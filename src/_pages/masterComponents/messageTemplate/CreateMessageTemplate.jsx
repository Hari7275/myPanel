import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import toast from "react-hot-toast";
import {
  useCreateMessageTemplateMutation,
  useUpdateMessageTemplateMutation,
  useGetMessageTemplatesQuery,
} from "../../../_store/api";

const flattenTree = (nodes, result = []) => {
  nodes.forEach((node) => {
    result.push({ id: node.id, text: node.text, type: node.type });
    if (node.children && node.children.length > 0) {
      flattenTree(node.children, result);
    }
  });
  return result;
};

const defaultFormData = {
  role: "user",
  type: "category",
  text: "",
  parent_id: "",
  sort_order: "",
  is_active: true,
};

const CreateMessageTemplate = ({
  isOpen,
  onClose,
  role: initialRole = "user",
  editData = null,
}) => {
  const isEditMode = !!editData;

  const [formData, setFormData] = useState({ ...defaultFormData, role: initialRole });
  const [iconFile, setIconFile] = useState(null);

  const { data: templateData } = useGetMessageTemplatesQuery({ role: formData.role });
  const allNodes = flattenTree(templateData?.data?.data || templateData?.data || []);

  const [createMessageTemplate, { isLoading: isCreating }] =
    useCreateMessageTemplateMutation();
  const [updateMessageTemplate, { isLoading: isUpdating }] =
    useUpdateMessageTemplateMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (isOpen && editData) {
      setFormData({
        role: initialRole,
        type: editData.type || "category",
        text: editData.text || "",
        parent_id: editData.parent_id || "",
        sort_order: editData.sort_order || "",
        is_active: editData.is_active !== undefined ? editData.is_active : true,
      });
      setIconFile(null);
    } else if (isOpen) {
      setFormData({ ...defaultFormData, role: initialRole });
      setIconFile(null);
    }
  }, [isOpen, editData, initialRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.text.trim()) {
      toast.error("Text is required");
      return;
    }

    const body = new FormData();
    body.append("type", formData.type);
    body.append("text", formData.text);

    if (formData.parent_id) body.append("parent_id", parseInt(formData.parent_id));
    if (formData.sort_order) body.append("sort_order", parseInt(formData.sort_order));
    body.append("is_active", formData.is_active);
    if (iconFile) body.append("icon", iconFile);

    try {
      let response;
      if (isEditMode) {
        response = await updateMessageTemplate({
          role: formData.role,
          id: editData.id,
          body,
        }).unwrap();
      } else {
        response = await createMessageTemplate({
          role: formData.role,
          body,
        }).unwrap();
      }

      if (response.success || response.status) {
        toast.success(
          response.message ||
          `Template ${isEditMode ? "updated" : "created"} successfully`
        );
        onClose();
      } else {
        toast.error(
          response.message ||
          `Failed to ${isEditMode ? "update" : "create"} template`
        );
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
        `Failed to ${isEditMode ? "update" : "create"} template`
      );
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className="message-template-modal" style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          {isEditMode ? "Edit Message Template" : "Create Message Template"}
        </h2>

        {/* Role */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="role">Role *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="info-input"
              disabled={isEditMode}
            >
              <option value="user">User</option>
              <option value="listener">Listener</option>
            </select>
          </div>

          {/* Type */}
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="info-input"
            >
              <option value="category">Category</option>
              <option value="subcategory">Subcategory</option>
              <option value="message">Message</option>
            </select>
          </div>
        </div>

        {/* Text1 */}
        <div style={{ marginBottom: "15px" }}>
          <div className="input-container">
            <label htmlFor="text">Text * (max 500 chars)</label>
            <input
              type="text"
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="info-input"
              placeholder="Enter template text"
              maxLength={500}
            />
          </div>
        </div>

        {/* Parent ID & Sort Order */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="parent_id">Parent ID</label>
            <select
              id="parent_id"
              name="parent_id"
              value={formData.parent_id}
              onChange={handleChange}
              className="info-input"
            >
              <option value="0">0 - None (Top Level)</option>
              {allNodes.map((node) => (
                <option key={node.id} value={node.id}>
                  #{node.id} - {node.text} ({node.type})
                </option>
              ))}
            </select>
          </div>

          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="sort_order">Sort Order (optional)</label>
            <input
              type="number"
              id="sort_order"
              name="sort_order"
              value={formData.sort_order}
              onChange={handleChange}
              className="info-input"
              placeholder="Enter sort order"
            />
          </div>
        </div>

        {/* Icon & Active */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <div className="input-container" style={{ flex: 1 }}>
            <label htmlFor="icon">Icon (optional)</label>
            <input
              type="file"
              id="icon"
              accept="image/*"
              onChange={(e) => setIconFile(e.target.files[0] || null)}
              className="info-input"
              style={{ padding: "8px 10px" }}
            />
          </div>

          <div className="input-container" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <label
              htmlFor="is_active"
              style={{
                position: "static",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#333",
              }}
            >
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, is_active: e.target.checked }))
                }
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              Active
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
            disabled={isLoading || !formData.text.trim()}
          >
            {isLoading
              ? "Submitting..."
              : isEditMode
                ? "Update"
                : "Submit"}
          </button>
          <button className="fifthButton" onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default CreateMessageTemplate;
