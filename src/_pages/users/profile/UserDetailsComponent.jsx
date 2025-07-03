import React, { useEffect, useState } from "react";
import "../../../cssfolder/profileLeftComponent.css";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useGetUserListQuery } from "../../../_store/api/user/userDetails";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UseImageModal from "../../../_constants/UseImageModal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (fetchData) {
      setUserData(fetchData?.data);
    }
  }, [fetchData]);

  if (!userData) {
    return <div></div>;
  }

  const handleProfileClose = () => {
    navigate("/user", {
      state: {
        previousPage: location.state?.currentPage || 1,
        previousPageSize: location.state?.pageSize || 10,
      },
    });
    // navigate(-1);
  };

  return (
    // MAIN ROW/ CONTAINER ROW
    <div className="user-details-container">
      <div className="backButton" onClick={handleProfileClose}>
        <img
          src="/backbutton.png"
          style={{
            width: "16px",
            objectFit: "cover",
          }}
        />
        Go Back
      </div>
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
              openImageModal(userData?.profile_images[0]?.url || "praveen.png")
            }
          />
        </div>
        {/* SECOND COLUMN: User Info (column layout) */}
        <div className="user-info-section">
          <div className="userName">{userData.fullName}</div>
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
