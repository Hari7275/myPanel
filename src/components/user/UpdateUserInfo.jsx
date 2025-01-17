import React, { useState } from "react";

const UpdateUserInfo = ({ closeUpdateUserInfo_Modal }) => {
  const [formData, setFormData] = useState({
    id: 3,
    first_name: "Ghanshyam",
    last_name: "Sharma",
    email: "sharma123@gmail.com",
    bio: "Hello",
    category: "relationship,dating",
    user_type: "coach",
    date_of_birth: "1992-07-01",
    address: "jaipur, Rajasthan",
    languages: "Hindi,English",
    gender: "MALE",
    country: "India",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
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
          <div className="input-container">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="info-input"
              value={formData.first_name}
              onChange={handleChange}
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
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="user_type">User Type</label>
            <input
              type="text"
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="input-container">
            <label htmlFor="date_of_birth">Date of Birth</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
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
            />
          </div>

          <div className="input-container">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            type="submit"
            className="fifthButton"
            style={{ marginRight: "10px" }}
          >
            Save
          </button>
          <button
            type="button"
            className="fifthButton"
            style={{ background: "red", marginLeft: "10px" }}
            onClick={closeUpdateUserInfo_Modal}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateUserInfo;
