import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useUpdateUserInfoMutation } from "../../../_store/api";

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
    languages: "",
  });

  const [updateInfo, { isLoading: isUpdating }] = useUpdateUserInfoMutation();

  useEffect(() => {
    if (selectedData) {
      setFormData({
        first_name: selectedData.first_name || "",
        last_name: selectedData.last_name || "",
        bio: selectedData.bio || "",
        date_of_birth: selectedData.date_of_birth || "",
        gender: selectedData.gender || "",
        permanent_address: selectedData.permanent_address || "",
        current_address: selectedData.current_address || "",
        country: selectedData.country || "",
        languages: selectedData.languages
          ? JSON.stringify(selectedData.languages)
          : "",
      });
    }
  }, [selectedData]);

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
      const updatedData = {
        ...formData,
      };

      await updateInfo({
        id: selectedData.id,
        body: updatedData,
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
          Edit User Info
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

          <div style={{ display: "flex" }}>
            <div className="input-container">
              <label htmlFor="languages">Languages</label>
              <input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                className="info-input"
                placeholder="Enter languages separated by commas"
              />
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
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
