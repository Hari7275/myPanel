import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import { useCreateCoachSkillsMutation } from "../../../_store/api";
import { useGetCoachCategoryListQuery } from "../../../_store/api";

const AddCoachSkills = ({ isOpen, onClose }) => {
  const [data, setdata] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    skill_name: "",
    icon: null,
    status: "active",
  });

  const [createCard, { isLoading }] = useCreateCoachSkillsMutation();
  const { data: fetchData } = useGetCoachCategoryListQuery();

  useEffect(() => {
    if (fetchData) {
      setdata(fetchData.data);
    }
  }, [fetchData]);

  // get category list
  const Response = data?.map((response) => response);


  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "icon") {
      setFormData((prevData) => ({
        ...prevData,
        icon: files[0], // Store the selected file object
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("category_id", Number(formData.id));
    form.append("skill_name", formData.skill_name);
    form.append("icon", formData.icon);
    form.append("status", formData.status);

    try {
      await createCard({ body: form });
      onClose();
    } catch (error) {
      console.log("Failed to add new magazine category", error);
    }
  };

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div style={{ width: "400px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
          }}
        >
          Add Skills
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="input-container">
            <label htmlFor="type">Category Name</label>
            <select
              id=" id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="userProfile-input-field"
              style={{ height: "55px" }}
            >
              <option value="">Select a Category</option>
              {Response.map((categoryName, index) => (
                <option key={index} value={categoryName.id}>
                  {categoryName.category_name}
                </option>
              ))}
            </select>
          </div>

          <UpdateInputField
            label=" Skill Name"
            type="text"
            id="skill_name"
            name="skill_name"
            placeholder="skill_name"
            value={formData.skill_name}
            onChange={handleChange}
          />

          <div style={{}}>
            <UpdateInputField
              label=" Icon"
              type="file"
              id="icon"
              name="icon"
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            className="fifthButton"
            style={{ marginRight: "10px", backgroundColor: "green" }}
            onClick={handleSubmit}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            className="fifthButton"
            style={{}}
            onClick={onClose}
          >
            Back
          </button>

        </div>
      </div>
    </ReactModal>
  );
};

export default AddCoachSkills;
