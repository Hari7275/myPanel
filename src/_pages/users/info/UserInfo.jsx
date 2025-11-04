import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import "../../../cssfolder/RewardsTxn.css";
import "../../../cssfolder/ProfileInfo.css";
import UpdateUserInfo from "./UpdateUserInfo";
import { useGetUserListQuery } from "../../../_store/api/user/userDetails";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";

const UserInfo = () => {
  const { userId } = useParams();

  // const userId = useSelector((state) => state.user.userData);

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
    setSelectedData(data?.profileDetails);
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
              User Profile Info
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
              <strong>User Name : </strong> {formData?.profileDetails?.name}
            </p>
            <p className="info-item">
              <strong>Gender : </strong> {formData?.profileDetails?.gender}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Date of Birth : </strong>{" "}
              {formData?.profileDetails?.birth_date}
            </p>
            <p className="info-item">
              <strong>Birth time: </strong>{" "}
              {formData?.profileDetails?.birth_time}
            </p>
            {/* <p className="info-item">
              <strong>Bio : </strong> {formData.bio}
            </p> */}
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Birth Place: </strong>{" "}
              {formData?.profileDetails?.birth_place}
            </p>
            <p className="info-item">
              <strong>Current Address : </strong>{" "}
              {formData?.profileDetails?.current_address}
            </p>
            {/* <p className="info-item">
              <strong>Bio : </strong> {formData.bio}
            </p> */}
          </div>

          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Dating Profile Id : </strong>{" "}
              {formData?.profileDetails?.dating_profile_id}
            </p>
            <p className="info-item">
              <strong>Currency Category: </strong>{" "}
              {formData?.profileDetails?.currency_category}
            </p>
          </div>
          <div className="dividerm"></div>

          {/* <div className="info-pair">
            <p className="info-item">
              <strong>Gender : </strong> {formData?.profileDetails?.gender}
            </p>
          </div> */}
          {/* <div className="dividerm"></div> */}
        </div>
      </div>

      {showUpdateUserInfo && (
        <UpdateUserInfo
          isOpen={showUpdateUserInfo}
          onClose={toggleUpdateInfo}
          selectedData={selectedData}
          userId={userId}
        />
      )}
    </div>
  );
};

export default UserInfo;
