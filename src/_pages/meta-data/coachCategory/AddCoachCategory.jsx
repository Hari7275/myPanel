import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useCreateCoachCategoryMutation } from "../../../_store/api";

const parseRGBA = (color) => {
  // Extract RGBA values from the "rgba(r, g, b, a)" string
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  return match
    ? {
        r: match[1],
        g: match[2],
        b: match[3],
        a: match[4],
      }
    : { r: "", g: "", b: "", a: "" };
};

const AddCoachCategory = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    category_name: "",
    image: null,
    category_bg_color: JSON.stringify([
      { offset: 0, color: "rgba(255, 244, 207, 0.25)" },
      { offset: 1, color: "rgba(144, 113, 53, 0.3)" },
    ]),
    category_card_bg_color: JSON.stringify([
      { offset: 0, color: "rgba(255, 244, 207, 0.75)" },
      { offset: 1, color: "rgba(144, 113, 53, 0.91)" },
    ]),
    status: "active",
  });

  const [createCategory, { isLoading }] = useCreateCoachCategoryMutation();

  // State to manage RGBA values
  const [bgColor, setBgColor] = useState([
    parseRGBA("rgba(255, 244, 207, 0.25)"),
    parseRGBA("rgba(144, 113, 53, 0.3)"),
  ]);
  const [cardBgColor, setCardBgColor] = useState([
    parseRGBA("rgba(255, 244, 207, 0.75)"),
    parseRGBA("rgba(144, 113, 53, 0.91)"),
  ]);

  // Handle RGBA value changes
  const handleColorChange = (type, index, key, value) => {
    if (type === "bg") {
      const updatedColors = [...bgColor];
      updatedColors[index][key] = value;
      setBgColor(updatedColors);
      setFormData((prevData) => ({
        ...prevData,
        category_bg_color: JSON.stringify(
          updatedColors.map((color) => ({
            offset: index,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          }))
        ),
      }));
    } else if (type === "card") {
      const updatedColors = [...cardBgColor];
      updatedColors[index][key] = value;
      setCardBgColor(updatedColors);
      setFormData((prevData) => ({
        ...prevData,
        category_card_bg_color: JSON.stringify(
          updatedColors.map((color) => ({
            offset: index,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          }))
        ),
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const newCategory = new FormData();
    newCategory.append("category_name", formData.category_name);
    newCategory.append("image", formData.image);
    newCategory.append("category_bg_color", formData.category_bg_color);
    newCategory.append(
      "category_card_bg_color",
      formData.category_card_bg_color
    );
    newCategory.append("status", formData.status);

    try {
      await createCategory(newCategory);
      onClose();
    } catch (error) {
      console.log("Failed to add new category", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "750px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add Category
        </h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <UpdateInputField
            label="Category Name"
            type="text"
            id="category_name"
            name="category_name"
            placeholder="Category Name"
            value={formData.category_name}
            onChange={handleChange}
          />

          <UpdateInputField
            label="Image"
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>

        {/* Category Background Colors */}
        <label style={{ fontSize: "16px", marginTop: "10px" }}>
          Category Background Colors
        </label>
        {bgColor.map((color, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "8px", marginTop: "10px" }}
          >
            {["r", "g", "b", "a"].map((key) => (
              <span
                key={key}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label style={{ marginBottom: "4px" }}>
                  {key.toUpperCase()}:{" "}
                </label>
                <input
                  type="number"
                  value={color[key]}
                  onChange={(e) =>
                    handleColorChange("bg", index, key, e.target.value)
                  }
                />
              </span>
            ))}
          </div>
        ))}
        <textarea
          name="category_bg_color"
          value={formData.category_bg_color}
          onChange={handleChange}
          rows="4"
          className="userProfile-input-field"
          style={{ marginTop: "10px" }}
        />

        {/* Category Card Background Colors */}
        <label style={{ fontSize: "16px", marginTop: "10px" }}>
          Category Card Background Colors
        </label>
        {cardBgColor.map((color, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "8px", marginTop: "10px" }}
          >
            {["r", "g", "b", "a"].map((key) => (
              <span
                key={key}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label style={{ marginBottom: "4px" }}>
                  {key.toUpperCase()}:{" "}
                </label>
                <input
                  type="number"
                  value={color[key]}
                  onChange={(e) =>
                    handleColorChange("card", index, key, e.target.value)
                  }
                />
              </span>
            ))}
          </div>
        ))}
        <textarea
          name="category_card_bg_color"
          value={formData.category_card_bg_color}
          onChange={handleChange}
          rows="4"
          className="userProfile-input-field"
          style={{ marginTop: "10px" }}
        />

        <div className="userProfile-grid-item">
          <label style={{ fontSize: "16px", marginTop: "10px" }}>
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
        </div>

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
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddCoachCategory;
