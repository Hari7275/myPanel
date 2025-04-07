import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Select from "react-select";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import {
  useUpdateConsultantsDetailsMutation,
  useGetCoachCategoryListQuery,
  useGetCoachSkillsListQuery,
  useGetLanguagesListQuery,
} from "../../../_store/api";
import toast from "react-hot-toast";

import { format, subYears } from "date-fns";

//  {
//    format(new Date(formData.date_of_birth), "dd MMMM yyyy");
//  }

const UpdateInfo = ({ isOpen, onClose, selectedData }) => {
  const [formData, setFormData] = useState({
    first_name: selectedData?.first_name,
    last_name: selectedData?.last_name,
    gender: Number(selectedData?.gender),
    email: selectedData?.email,
    date_of_birth: format(new Date(selectedData?.date_of_birth), "yyyy-MM-dd"),
    address: selectedData?.address,
    services: selectedData?.services,
    description: selectedData?.description,
    experience: selectedData?.experience,
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguage] = useState([]);

  const [updateInfo, { isLoading: isUpdating }] =
    useUpdateConsultantsDetailsMutation();
  const { data: categoryData } = useGetCoachCategoryListQuery();
  const { data: skillsData } = useGetCoachSkillsListQuery();
  const { data: languagesData } = useGetLanguagesListQuery();

  const [error, setError] = useState("");

  // Define category options from API data
  const categoryOptions =
    categoryData?.data?.map((category) => ({
      value: category.id,
      label: category.category_name,
    })) || [];

  // Define skill options from API data
  const skillOptions =
    skillsData?.data?.map((skill) => ({
      value: skill.id,
      label: skill.skill_name,
    })) || [];

  // Preselect categories that are in both formData and API options
  const preselectedCategories = categoryOptions?.filter((option) =>
    selectedData.categories?.includes(option.value)
  );

  useEffect(() => {
    setSelectedCategories(preselectedCategories);
  }, []);

  // Preselect skills that are in both formData and API options
  const preselectedSkills = skillOptions?.filter((option) =>
    selectedData?.skills?.includes(option.value)
  );

  useEffect(() => {
    setSelectedSkills(preselectedSkills);
  }, []);

  useEffect(() => {
    if (selectedData) {
      setFormData((prevData) => ({
        ...prevData,
        categories: selectedData.categories?.map((cat) => cat.id),
        skills: selectedData.skills?.map((skill) => skill.id),
      }));
    }
  }, [selectedData]);

  // Define Language options from API data
  const LanguagesOptions =
    languagesData?.data?.map((lang) => ({
      value: lang?.language,
      label: lang?.language,
    })) || [];

  // Preselect Language that are in both formData and API options
  const preselectedLanguage = LanguagesOptions?.filter((option) =>
    selectedData?.languages?.includes(option?.value)
  );

  useEffect(() => {
    setSelectedLanguage(preselectedLanguage);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gender" ? Number(value) : value,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    if (selectedOptions.length > 3) {
      toast.error("You can only select up to 3 languages.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions?.map((option) => option.value),
    }));
    if (name === "categories") {
      setSelectedCategories(selectedOptions);
    } else if (name === "skills") {
      setSelectedSkills(selectedOptions);
    }

    if (name === "languages") {
      setSelectedLanguage(selectedOptions);
    }
  };

  // Calculate the minimum valid date of birth (18 years ago from today)
  const minValidDOB = format(subYears(new Date(), 18), "yyyy-MM-dd");

  const handleSave = async (e) => {
    e.preventDefault();

    // Check if the selected date of birth is at least 18 years ago
    if (new Date(formData.date_of_birth) > new Date(minValidDOB)) {
      setError("User must be at least 18 years old.");
      return;
    }

    // Create a copy of formData to modify
    const dataToSend = {
      ...formData,
      gender: Number(formData.gender), // Ensure gender is a number
    };

    // If categories haven't changed, delete the categories key
    if (
      selectedCategories.length === preselectedCategories.length &&
      selectedCategories.every(
        (cat, idx) => cat.value === preselectedCategories[idx].value
      )
    ) {
      delete dataToSend.categories;
    }

    // If skills haven't changed, delete the skills key
    if (
      selectedSkills.length === preselectedSkills.length &&
      selectedSkills.every(
        (skill, idx) => skill.value === preselectedSkills[idx].value
      )
    ) {
      delete dataToSend.skills;
    }

    // If skills haven't changed, delete the skills key
    if (
      selectedLanguages?.length === preselectedLanguage?.length &&
      selectedLanguages.every(
        (lang, idx) => lang?.label === preselectedLanguage[idx]?.label
      )
    ) {
      delete dataToSend?.lang;
    }

    try {
      const response = await updateInfo({
        id: selectedData.id,
        body: dataToSend,
      });

      if (response.data.status === false) {
        toast.error(
          response.data.message || "Something went wrong. Please try again."
        );
        return;
      }

      toast.success(
        response.data.message || " information updated successfully."
      );
      onClose();
    } catch (error) {
      console.log("API error", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
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

      <form className="simple-form" noValidate autoComplete="off">
        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="First Name"
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <UpdateInputField
            label="Last Name"
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="input-container">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="info-input"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "inherit",
              }}
            >
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Others</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Date of Birth"
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            max={minValidDOB}
            disabled={true}
          />

          <UpdateInputField
            label="Address"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {error && <p style={{ color: "red", paddingLeft: "10px" }}>{error}</p>}

        {/* update experience */}
        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="Experience"
            type="number"
            id="experience"
            name="experience"
            value={formData?.experience || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="categories">Category</label>
          <Select
            id="categories"
            name="categories"
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={(options) =>
              handleMultiSelectChange("categories", options)
            }
          />
        </div>

        <div>
          <label htmlFor="skills">Skills</label>
          <Select
            id="skills"
            name="skills"
            isMulti
            options={skillOptions}
            value={selectedSkills}
            onChange={(options) => handleMultiSelectChange("skills", options)}
          />
        </div>

        <div>
          <label htmlFor="skills">Languages</label>
          <Select
            id="languages"
            name="languages"
            isMulti
            options={LanguagesOptions}
            value={selectedLanguages}
            onChange={(options) =>
              handleMultiSelectChange("languages", options)
            }
          />
        </div>

        <label
          htmlFor="description"
          style={{ width: "100%", marginTop: "20px" }}
        >
          Services:
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
            label="Services"
            type="text"
            id="services"
            name="services"
            value={formData?.services}
            onChange={handleChange}
            placeholder="this is service field"
          />
        </div>

        <label
          htmlFor="description"
          style={{ width: "100%", marginTop: "20px" }}
        >
          description:
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
            label="description"
            type="text"
            id="description"
            name="description"
            value={formData?.description}
            onChange={handleChange}
            placeholder="this is description field"
          />
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="submit"
            className="fifthButton"
            style={{ backgroundColor: "green", marginRight: "20px" }}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="fifthButton"
            style={{ marginRight: "10px" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

export default UpdateInfo;
