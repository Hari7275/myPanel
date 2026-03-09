import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { UpdateInputField } from "../../../_components/ui/inputForm";
import {
  useUpdateConsultantsDetailsMutation,
  useGetLanguagesListQuery,
} from "../../../_store/api";
import { useSelector } from "react-redux";
import { format, subYears } from "date-fns";
import Select from "react-select";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../_context/ThemeContext";

const UpdateInfo = ({ isOpen, onClose, selectedData }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    first_name: selectedData?.first_name,
    last_name: selectedData?.last_name,
    display_name: selectedData?.display_name,
    gender: Number(selectedData?.gender),
    email: selectedData?.email_address,
    languages: selectedData?.languages,
    date_of_birth: format(new Date(selectedData?.date_of_birth), "yyyy-MM-dd"),
    address: selectedData?.address,
    description: selectedData?.description,
    meta_description: selectedData?.meta_description,
    // country: selectedData.country,
    experience: selectedData?.experience,
  });
  const [error, setError] = useState("");
  const [selectedLanguages, setSelectedLanguage] = useState([]);

  // const consultantId = useSelector(
  //   (state) => state?.consultant?.consultantData
  // );
  const { consultantId } = useParams();

  const [updateInfo, { isLoading: isUpdating }] =
    useUpdateConsultantsDetailsMutation(consultantId);
  const { data: languagesData } = useGetLanguagesListQuery();

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
  }, [languagesData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gender" ? Number(value) : value,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  // Calculate the minimum valid date of birth (18 years ago from today)
  const minValidDOB = format(subYears(new Date(), 18), "yyyy-MM-dd");

  const handleMultiSelectChange = (name, selectedOptions) => {
    if (selectedOptions.length > 3) {
      toast.error("You can only select up to 3 languages.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions.map((option) => option?.value),
    }));

    if (name == "languages") {
      setSelectedLanguage(selectedOptions);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(""); // clear any previous error

    // Check if the selected date of birth is at least 18 years ago
    if (new Date(formData.date_of_birth) > new Date(minValidDOB)) {
      setError("User must be at least 18 years old.");
      return;
    }

    // Prepare data
    const dataToSend = {
      ...formData,
      gender: Number(formData.gender), // ensure number type
    };

    // If languages haven't changed, remove languages key
    if (
      selectedLanguages?.length === preselectedLanguage?.length &&
      selectedLanguages.every(
        (lang, idx) => lang?.label === preselectedLanguage[idx]?.label
      )
    ) {
      delete dataToSend.languages; // fixed: correct key name
    }

    // Exclude email (for show only)
    const payload = { ...dataToSend };
    delete payload.email;

    try {
      const response = await updateInfo({
        id: selectedData.id,
        body: payload,
      }).unwrap(); // ✅ use unwrap() for cleaner error handling (RTK Query best practice)

      // Success toast
      toast.success(response?.message || "Information updated successfully.");
      onClose();
    } catch (error) {
      // Error from RTK Query
      console.error("API error:", error);
      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
              label="Dispaly Name"
              type="text"
              id="display_name"
              name="display_name"
              value={formData.display_name}
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
                  backgroundColor: "var(--input-bg)",
                  color: "var(--input-text)",
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
            <UpdateInputField
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={true}
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

          <div style={{ width: "100%", marginTop: "15px" }}>
            <label htmlFor="Description">Description</label>
            <textarea
              style={{
                width: "100%",
                height: "150px",
                padding: "10px",
                border: "1px solid var(--input-border)",
                borderRadius: "4px",
                fontSize: "14px",
                fontFamily: "'Arial', sans-serif",
                resize: "vertical",
                backgroundColor: "var(--input-bg)",
                color: "var(--text-primary)",
              }}
              label="Description"
              type="text"
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
            />
          </div>

          <div style={{ width: "100%", marginTop: "15px" }}>
            <label htmlFor="Meta Description">Meta Description</label>
            <textarea
              style={{
                width: "100%",
                height: "50px",
                padding: "10px",
                border: "1px solid var(--input-border)",
                borderRadius: "4px",
                fontSize: "14px",
                fontFamily: "'Arial', sans-serif",
                resize: "vertical",
                backgroundColor: "var(--input-bg)",
                color: "var(--text-primary)",
              }}
              label="Meta Description"
              type="text"
              id="meta_description"
              name="meta_description"
              value={formData?.meta_description}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p style={{ color: "red", paddingLeft: "10px" }}>{error}</p>
          )}

          <div style={{ display: "flex" }}>
            {/* 
            <UpdateInputField
              label="Country"
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            /> */}
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              type="submit"
              className="fifthButton"
              style={{ backgroundColor: "green", marginRight: "10px" }}
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="fifthButton"
              style={{ backgroundColor: "red" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </ReactModal>
    </>
  );
};

export default UpdateInfo;
