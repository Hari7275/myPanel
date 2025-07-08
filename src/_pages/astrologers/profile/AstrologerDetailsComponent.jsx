import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import Modal from "../../../_components/modals/Modal";
import AstrologerStatus from "../status/AstrologerStatus";
import CoachStatus from "../../coaches/status/CoachStatus";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";
import {
  getGenderLabel,
  getMaritalStatus,
} from "../../../_constants/consultantConstant";
import { useSelector } from "react-redux";
import UseImageModal from "../../../_constants/UseImageModal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UpdateConsultantProfileStatus from "../../../_components/reuseComponents/UpdateConsultantProfileStatus";

const InfoItem = ({ label, value }) => (
  <div className="">
    <div className="info-pair">
      <p className="info-item">
        <strong>{label}: </strong>
        <span style={{ wordBreak: "break-all" }}>{value}</span>
      </p>
    </div>
  </div>
);

// function for calculate date of birth

const calculateAge = (dob) => {
  const birthDate = new Date(dob);

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the current month/day is before the birth month/day
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const AstrologerDetailsComponent = () => {
  const consultantId = useSelector(
    (state) => state?.consultant?.consultantData
  );

  const profileStatus = useSelector((state) => state.consultant.profileStatus);

  const [showModal, setShowModal] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [imageToEdit, setImageToEdit] = useState(null);
  const [data, setData] = useState({});
  const { openImageModal, ImageModal } = UseImageModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedData, setSelectedData] = useState(null);

  console.log("location", location);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsDetailsQuery(consultantId);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data || {});
      // Update the phone code in localStorage
      const newPhoneCode = fetchData?.data?.phone_code;
      if (newPhoneCode) {
        localStorage.setItem("phone_code", newPhoneCode);
      }
    }
  }, [fetchData]);

  const urls = data?.profile_pic?.url;
  const socialMediaLinks = data.social_media || {};
  const age = data.date_of_birth ? calculateAge(data.date_of_birth) : "N/A";

  const openModal = () => {
    setShowModal(true);
    setImageToEdit(data.profile_pic);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // this is for profile status
  const handleShowUpdateStatus = () => {
    setShowUpdateStatus(!showUpdateStatus);
    setSelectedData(data.profile_status);
  };

  const handleProfileClose = () => {
    navigate("/astrologer", {
      state: {
        previousPage: location.state?.currentPage || 1,
        previousPageSize: location.state?.pageSize || 10,
      },
    });
    // navigate(-1);
  };

  if (isLoading) {
    <span>loaading.....</span>;
  }
  return (
    // MAIN ROW/ CONTAINER ROW
    <div className="user-details-container" style={{ position: "relative" }}>
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
      {/*FIRST COLUMN AS ASTROLOGER DETAILS ROW */}
      <div className="user-details-row">
        {/* FIRST COLUMN OF ASTROLOGER DETAILS (IMAGE SECTION) */}
        <div className="profile-img-section">
          <img
            className="profile-img"
            src={urls || "girl-avtar.png"}
            alt="astrologer Profile"
            onClick={() => openImageModal(urls)}
          />
          {/* <div className="edit-profile-img">     //  **************ye code background removal ka popup open karne ke liye hai 
            <button className="edit-profile-icon" onClick={openModal}>
              <Pencil
                style={{ background: "none", height: "14px", width: "14px" }}
              />
            </button>
          </div> */}
        </div>
        {/* SECOND COLUMN: User Info (column layout) */}
        <div className="user-info-section">
          <div className="userName">
            {`${data.first_name || ""} ${data.last_name || ""}`}({age})
          </div>
          <div className="info-pair">
            <p className="info-item">
              <strong>Astrologer ID: </strong> {data.id}
            </p>
          </div>

          {/* for profile status */}
          <div className="profile-img-section" style={{ width: "fit-content" }}>
            {data?.profile_status == 1 ? (
              <div className="active-status">
                <img
                  className="button-img"
                  src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png"
                  alt=""
                />
                <span>Active</span>

                {/* <div className="edit-profile-img"> */}

                {/* </div> */}
              </div>
            ) : (
              <div className="inActive-status">
                ❌<span>Inactive</span>
              </div>
            )}
            {profileStatus == 3 && (
              <button
                className="edit-profile-active-status"
                onClick={handleShowUpdateStatus}
              >
                <Pencil
                  style={{
                    background: "none",
                    height: "14px",
                    width: "14px",
                  }}
                />
              </button>
            )}
          </div>
        </div>
        {/* <footer className="card-footer">
          <div className="info-pair">
            <p className="info-item">
              <strong>Astrologer ID: </strong> {data.id}
            </p>
          </div>
          <div className="line"></div>
          <InfoItem label="Email" value={data.email || "N/A"} />
          <div className="line"></div>
          <InfoItem label="Mobile No." value={data.phoneNumber || "N/A"} />
          <div className="line"></div>
          <InfoItem label="Gender" value={getGenderLabel(data.gender)} />
          <div className="line"></div>
          <InfoItem
            label="Marital Status"
            value={getMaritalStatus(data?.marital_status)}
          />

          <div className="line"></div>
          <InfoItem label="Age" value={age} />

          <div className="line"></div>
          <InfoItem label="Referral code" value={data.referral_code || "N/A"} />
          <div className="line"></div>
          <InfoItem label="Referred by" value={data.referred_by || "N/A"} />
          <div className="line"></div>
          </footer> */}
      </div>
      {/* SECOND COLUMN ASTROLOGER DETAILS ROW */}
      <div className="social-icons-section">
        {socialMediaLinks.facebook && (
          <a href={socialMediaLinks.facebook} className="fa fa-facebook">
            <Facebook />
          </a>
        )}

        {socialMediaLinks.instagram && (
          <a href={socialMediaLinks.instagram} className="fa fa-instagram">
            <Instagram />
          </a>
        )}

        {socialMediaLinks.linkedin && (
          <a href={socialMediaLinks.linkedin} className="fa fa-linkedin">
            <Linkedin />
          </a>
        )}

        {socialMediaLinks.x && (
          <a href={socialMediaLinks.x} className="fa fa-twitter">
            <Twitter />
          </a>
        )}

        {socialMediaLinks.youtube && (
          <a href={socialMediaLinks.youtube} className="fa fa-youtube">
            <Youtube />
          </a>
        )}
      </div>
      {/* <AstrologerStatus /> */}
      {/* <CoachStatus /> */}
      <ImageModal />

      {showModal && (
        <Modal
          closeUserProfile_Modal={closeModal}
          modalType="editProfileImage"
          imageToEdit={imageToEdit}
        />
      )}

      {showUpdateStatus && (
        <UpdateConsultantProfileStatus
          isOpen={showUpdateStatus}
          onClose={handleShowUpdateStatus}
          selectedData={selectedData}
          consultantId={consultantId}
        />
      )}
    </div>
  );
};

export default AstrologerDetailsComponent;
