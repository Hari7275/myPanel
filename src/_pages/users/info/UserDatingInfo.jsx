import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import "../../../cssfolder/RewardsTxn.css";
import "../../../cssfolder/ProfileInfo.css";
import UpdateUserInfo from "./UpdateUserInfo";
import UpdateDatingInfo from "./UpdateDatingInfo";
import { useGetUserListQuery } from "../../../_store/api/user/userDetails";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
const UserDatingInfo = () => {
  const userId = useSelector((state) => state.user.userData);

  const { data: fetchData, isLoading } = useGetUserListQuery(userId);

  const [formData, setFormData] = useState(null);
  const [showUpdateUserInfo, setShowUpdateUserInfo] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    if (fetchData) {
      setFormData(fetchData?.data);
    }
  }, [fetchData]);

  if (isLoading || !formData) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  const toggleUpdateInfo = (data) => {
    setShowUpdateUserInfo(!showUpdateUserInfo);
    setSelectedData(data);
  };

  return (
    <div className="main-container profile-right-sub-container">
      <div className="RewardsTxn-container">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              marginBottom: "20px",
            }}
          >
            <h3 className="main-heading " style={{ marginBottom: "0px" }}>
              User Dating Info
            </h3>

            <span className=" editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateInfo(formData)}
              />
            </span>
          </div>

          <div className="info-pair">
            <p className="info-item">
              <strong>First Name : </strong> {formData?.full_first_name}
            </p>
            <p className="info-item">
              <strong>Last Name : </strong> {formData?.last_name}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Date of Birth : </strong> {formData.date_of_birth}
            </p>
            <p className="info-item">
              <strong>Bio : </strong> {formData.bio}
            </p>
          </div>

          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Current Address : </strong>{" "}
              {formData?.living_location?.city &&
              formData.living_location.state &&
              formData.living_location.country
                ? `${formData.living_location.city}, ${formData.living_location.state}, ${formData.living_location.country}`
                : "N/A"}
            </p>
            <p className="info-item">
              <strong>Permanent Address : </strong>{" "}
              {formData?.hometown_location?.city &&
              formData.hometown_location.state &&
              formData.hometown_location.country
                ? `${formData.hometown_location.city}, ${formData.hometown_location.state}, ${formData.hometown_location.country}`
                : "N/A"}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Gender : </strong> {formData.gender}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Country : </strong> {formData.country}
            </p>
            <p className="info-item">
              <strong>Job : </strong> {formData.job || "N/A"}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Languages : </strong> {formData.languages.join(",") || []}
            </p>
            {/* <p className="info-item">
              <strong>Languages : </strong>{" "}
              {JSON.parse(formData?.languages)?.join(",") || []}
            </p>, */}
          </div>
        </div>
      </div>

      {showUpdateUserInfo && (
        <UpdateDatingInfo
          isOpen={showUpdateUserInfo}
          onClose={toggleUpdateInfo}
          selectedData={selectedData}
          userId={userId}
        />
      )}
    </div>
  );
};

export default UserDatingInfo;
