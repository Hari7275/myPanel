import React, { useEffect, useState } from "react";
import "../../../cssfolder/profileLeftComponent.css";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useGetUserListQuery } from "../../../_store/api/user/userDetails";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UseImageModal from "../../../_constants/UseImageModal";

const InfoItem = ({ label, value }) => (
  <div className="">
    <div className="info-pair">
      <p className="info-item">
        <strong>{label}: </strong>
        <span>{value}</span>
      </p>
    </div>
  </div>
);

const UserDetailsComponent = () => {
  const userId = useSelector((state) => state.user.userData);

  const { data: fetchData } = useGetUserListQuery(userId);
  const [userData, setUserData] = useState(null);
  const { openImageModal, ImageModal } = UseImageModal();

  useEffect(() => {
    if (fetchData) {
      setUserData(fetchData?.data);
    }
  }, [fetchData]);

  if (!userData) {
    return <div></div>;
  }

  return (
    // MAIN ROW/ CONTAINER ROW
    <div className="user-details-container">
      {/*FIRST COLUMN USER DETAILS ROW */}
      <div className="user-details-row">
        {/* FIRST COLUMN IMAGE SECTION */}
        <div className="profile-img-section">
          {/* {userData.profile_images.length > 0 && ( */}
          <img
            className="profile-img"
            src={userData?.profile_images[0]?.url || "praveen.png"}
            alt="user Profile"
            onClick={() =>
              openImageModal(
                userData?.profile_images[0]?.url || "praveen.png"
              )
            }
          />
        </div>
        {/* SECOND COLUMN: User Info (column layout) */}
        <div className="user-info-section">
          <div className="userName">
            {userData.fullName}
          </div>
          <InfoItem label="User ID " value={userData.id || "N/A"} />
          <div className="active-status">
            <img
              className="button-img"
              src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png"
              alt=""
            />
            <span>Active</span>
          </div>
        </div>
      </div>
      {/* SECOND COLUMN SOCIAL ICONS ROW */}
      <div className="social-icons-section">
        <a href="#" className="fa fa-facebook">
          <Facebook />
        </a>
        <a href="#" className="fa fa-instagram">
          <Instagram />
        </a>
        <a href="#" className="fa fa-linkedin">
          <Linkedin />
        </a>
        <a href="#" className="fa fa-twitter">
          <Twitter />
        </a>
        <a href="#" className="fa fa-youtube">
          <Youtube />
        </a>
      </div>
      <ImageModal />
    </div>
  );
};

export default UserDetailsComponent;
