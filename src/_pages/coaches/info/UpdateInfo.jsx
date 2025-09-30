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

const UpdateInfo = ({ isOpen, onClose, selectedData }) => {
  const [formData, setFormData] = useState({
    first_name: selectedData?.first_name,
    last_name: selectedData?.last_name,
    gender: Number(selectedData?.gender),
    email: selectedData?.email_address,
    date_of_birth: format(new Date(selectedData?.date_of_birth), "yyyy-MM-dd"),
    address: selectedData?.address,
    services: selectedData?.services,
    description: selectedData?.description,
    experience: selectedData?.experience,
    categories: selectedData?.categories?.map((cat) => cat.id) || [],
    skills: selectedData?.skills?.map((skill) => skill.id) || [],
    languages: selectedData?.languages || [],
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguage] = useState([]);
  const [error, setError] = useState("");

  const [updateInfo, { isLoading: isUpdating }] =
    useUpdateConsultantsDetailsMutation();
  const { data: categoryData } = useGetCoachCategoryListQuery();
  const { data: skillsData } = useGetCoachSkillsListQuery();
  const { data: languagesData } = useGetLanguagesListQuery();

  // Define category options from API data
  const categoryOptions =
    categoryData?.data
      ?.map((category) => ({
        value: category.id,
        label: category.category_name,
      }))
      .filter((category) => category.value !== 1 && category.value !== 3) || [];

  // Define all skill options from API data with category_id
  const allSkillOptions =
    skillsData?.data?.map((skill) => ({
      value: skill.id,
      label: skill.skill_name,
      category_id: skill.category_id,
    })) || [];

  // Filter skills based on selected categories
  const filteredSkillOptions =
    selectedCategories.length > 0
      ? allSkillOptions.filter((skill) =>
          selectedCategories.some((cat) => cat.value === skill.category_id)
        )
      : allSkillOptions;

  // Define Language options from API data
  const LanguagesOptions =
    languagesData?.data?.map((lang) => ({
      value: lang?.language,
      label: lang?.language,
    })) || [];

  // Preselect categories that are in both formData and API options
  const preselectedCategories = categoryOptions?.filter((option) =>
    selectedData.categories?.includes(option.value)
  );

  // Preselect skills that are in both formData and API options
  const preselectedSkills = allSkillOptions?.filter((option) =>
    selectedData?.skills?.includes(option.value)
  );

  // Preselect Language that are in both formData and API options
  const preselectedLanguage = LanguagesOptions?.filter((option) =>
    selectedData?.languages?.includes(option?.value)
  );

  useEffect(() => {
    setSelectedCategories(preselectedCategories);
    setSelectedSkills(preselectedSkills);
    setSelectedLanguage(preselectedLanguage);
  }, [languagesData, skillsData, categoryData]);

  useEffect(() => {
    if (selectedData) {
      setFormData((prevData) => ({
        ...prevData,
        categories: selectedData.categories?.map((cat) => cat.id),
        skills: selectedData.skills?.map((skill) => skill.id),
      }));
    }
  }, [selectedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gender" ? Number(value) : value,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    if (name === "languages" && selectedOptions.length > 3) {
      toast.error("You can only select up to 3 languages.");
      return;
    }

    if (name === "categories") {
      // Find out which category was removed (if any)
      const removedCategory = selectedCategories.find(
        (cat) => !selectedOptions.some((opt) => opt.value === cat.value)
      );

      setSelectedCategories(selectedOptions);

      if (removedCategory) {
        // Only remove skills that belong to the removed category
        const updatedSkills = selectedSkills.filter((skill) => {
          const skillCategory = allSkillOptions.find(
            (s) => s.value === skill.value
          )?.category_id;
          return skillCategory !== removedCategory.value;
        });

        setSelectedSkills(updatedSkills);
        setFormData((prev) => ({
          ...prev,
          skills: updatedSkills.map((skill) => skill.value),
        }));
      }
    } else if (name === "skills") {
      setSelectedSkills(selectedOptions);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions?.map((option) => option.value),
      }));
    } else if (name === "languages") {
      setSelectedLanguage(selectedOptions);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions?.map((option) => option.value),
      }));
    }
  };

  // Calculate the minimum valid date of birth (18 years ago from today)
  const minValidDOB = format(subYears(new Date(), 18), "yyyy-MM-dd");

  const handleSave = async (e) => {
    e.preventDefault();

    if (new Date(formData.date_of_birth) > new Date(minValidDOB)) {
      setError("User must be at least 18 years old.");
      return;
    }

    // Ensure categories are numbers
    const categoriesToSend = selectedCategories.map((cat) => cat.value);
    const skillsToSend = selectedSkills.map((skill) => skill.value);
    const languagesToSend = selectedLanguages.map((lang) => lang.value);

    const dataToSend = {
      ...formData,
      gender: Number(formData.gender),
      categories: categoriesToSend,
      skills: skillsToSend,
      languages: languagesToSend,
    };
    // Remove email since it's disabled
    delete dataToSend.email;
    if (
      selectedCategories.length === preselectedCategories.length &&
      selectedCategories.every(
        (cat, idx) => cat.value === preselectedCategories[idx].value
      )
    ) {
      delete dataToSend.categories;
    }

    if (
      selectedSkills.length === preselectedSkills.length &&
      selectedSkills.every(
        (skill, idx) => skill.value === preselectedSkills[idx].value
      )
    ) {
      delete dataToSend.skills;
    }

    if (
      selectedLanguages?.length === preselectedLanguage?.length &&
      selectedLanguages.every(
        (lang, idx) => lang?.value === preselectedLanguage[idx]?.value
      )
    ) {
      delete dataToSend.languages; // ✅ correct key
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
      <h2 className="top-main-heading">Update Info</h2>

      <form className="simple-form" noValidate autoComplete="off">
        <div style={{ display: "flex" }}>
          <UpdateInputField
            label="First Name"
            type="text"
            id="first_name"
            name="first_name"
            value={formData?.first_name}
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
            disabled={true}
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

        <div style={{ marginBottom: "15px" }}>
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

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="skills">Skills</label>
          <Select
            id="skills"
            name="skills"
            isMulti
            options={filteredSkillOptions}
            value={selectedSkills}
            onChange={(options) => handleMultiSelectChange("skills", options)}
            isDisabled={selectedCategories.length === 0}
          />
          {selectedCategories.length === 0 && (
            <p style={{ color: "#666", fontSize: "0.8rem", marginTop: "5px" }}>
              Please select categories first to choose skills
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
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
        <div style={{ width: "100%", marginTop: "4px", marginBottom: "15px" }}>
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
          Description:
        </label>
        <div style={{ width: "100%", marginTop: "4px", marginBottom: "15px" }}>
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
            style={{ marginRight: "10px", backgroundColor: "red" }}
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
