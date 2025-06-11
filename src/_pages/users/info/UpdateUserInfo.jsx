import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import {
  useUpdateUserInfoMutation,
  useGetLanguagesListQuery,
} from "../../../_store/api";
import Select from "react-select";

const UpdateUserInfo = ({ isOpen, onClose, selectedData }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    date_of_birth: "",
    gender: "",
    permanent_address: "",
    current_address: "",
    country: "",
    languages: [],
  });

  const [selectedLanguages, setSelectedLanguage] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  const [updateInfo, { isLoading: isUpdating }] = useUpdateUserInfoMutation();
  const { data: languagesData } = useGetLanguagesListQuery();

  useEffect(() => {
    if (selectedData) {
      // Parse languages if it's a string, otherwise use as-is
      const languages =
        typeof selectedData.languages === "string"
          ? JSON.parse(selectedData.languages)
          : selectedData.languages || [];

      setFormData({
        first_name: selectedData.first_name || "",
        last_name: selectedData.last_name || "",
        bio: selectedData.bio || "",
        date_of_birth: selectedData.date_of_birth || "",
        gender: selectedData.gender || "",
        permanent_address: selectedData.permanent_address || "",
        current_address: selectedData.current_address || "",
        country: selectedData.country || "",
        languages: languages,
      });
    }
  }, [selectedData]);

  // Define Language options from API data
  useEffect(() => {
    if (selectedData && languagesData?.data?.length) {
      const options = languagesData.data.map((lang) => ({
        value: lang.language,
        label: lang.language,
      }));

      setLanguageOptions(options);

      // Get current languages from formData (already parsed)
      const currentLanguages = formData.languages || [];
      const preselected = options.filter((option) =>
        currentLanguages.some(
          (lang) => lang.toLowerCase() === option.value.toLowerCase()
        )
      );

      setSelectedLanguage(preselected);
    }
  }, [selectedData, languagesData, formData.languages]);

  const handleMultiSelectChange = (name, selectedOptions) => {
    const newLanguages = selectedOptions?.map((option) => option.value) || [];

    setFormData((prevData) => ({
      ...prevData,
      [name]: newLanguages,
    }));

    if (name === "languages") {
      setSelectedLanguage(selectedOptions);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateInfo({
        id: selectedData.id,
        body: {
          ...formData,
          languages: JSON.stringify(formData.languages || []),
        },
      });
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
      <div style={{ width: "500px" }}>
        <h2
          className="sub-heading"
          style={{
            marginBottom: "20px",
            display: "block",
            backgroundColor: "#f0f0f0",
          }}
        >
          Update User Info
        </h2>

        <form className="simple-form" noValidate autoComplete="off">
          <div style={{ display: "flex" }}>
            <div className="input-container">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="info-input"
              />
            </div>

            <div className="input-container">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="info-input"
              />
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div className="input-container">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="info-input"
              />
            </div>

            <div className="input-container">
              <label htmlFor="permanent_location">Permanent Location</label>
              <input
                type="text"
                id="permanent_address"
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleChange}
                className="info-input"
              />
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div className="input-container">
              <label htmlFor="current_address">Current Location</label>
              <input
                type="text"
                id="current_address"
                name="current_address"
                value={formData.current_address}
                onChange={handleChange}
                className="info-input"
              />
            </div>

            <div className="input-container">
              <label htmlFor="date_of_birth">Date of Birth</label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="info-input"
              />
            </div>
          </div>

          <div style={{ display: "flex" }}>
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
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
                <option value="agender">Agender</option>
                <option value="non-binary">Non-binary</option>
                <option value="pangender">Pangender</option>
              </select>
            </div>

            <div className="input-container">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="info-input"
              />
            </div>
          </div>

          <label htmlFor="languages">Languages</label>
          <Select
            id="languages"
            name="languages"
            isMulti
            options={languageOptions}
            value={selectedLanguages}
            onChange={(options) =>
              handleMultiSelectChange("languages", options)
            }
          />

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <button
              type="button"
              className="fifthButton"
              style={{ marginRight: "10px" }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="fifthButton"
              style={{ backgroundColor: "green" }}
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default UpdateUserInfo;
