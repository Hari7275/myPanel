import React, { useState, useEffect } from "react";
import "../../../cssfolder/profileLeftComponent.css";
import CoachStatus from "../status/CoachStatus";
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

const InfoItem = ({ label, value }) => (
  <div className="">
    <div className="info-pair">
      <p className="info-item">
        <strong>{label} : </strong>
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

const CoachLeftComponent = () => {
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const [data, setData] = useState({});
  const { openImageModal, ImageModal } = UseImageModal();

  const navigate = useNavigate();
  const location = useLocation();

  console.log("location", location);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsDetailsQuery(consultantId);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data || {});
      const newPhoneCode = fetchData?.data?.phone_code;
      if (newPhoneCode) {
        localStorage.setItem("phone_code", newPhoneCode);
      }
    }
  }, [fetchData]);

  const urls = data?.profile_pic?.url;

  const socialMediaLinks = data?.social_media || {};
  const age = data.date_of_birth ? calculateAge(data.date_of_birth) : "N/A";

  const handleProfileClose = () => {
    navigate("/coaches", {
      state: {
        previousPage: location.state?.currentPage || 1,
        previousPageSize: location.state?.pageSize || 10,
      },
    });
    // navigate(-1);
  };

  return (
    //MAIN ROW CONTAINER ROW
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
      {/* FIRST COLUMN AS COACH DETAILS ROW */}
      <div className="user-details-row">
        {/* FIRST COLUMN OF COACH DETAILS (IMAGE SECTION) */}
        <div className="profile-img-section">
          <img
            className="profile-img"
            src={urls || "girl-avtar.png"}
            alt="coach Profile"
            onClick={() => openImageModal(urls)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {/* SECOND COLUMN: User Info (column layout) */}
        <div className="user-info-section">
          <div className="userName">
            {`${data.first_name || ""} ${data.last_name || ""}`}({age})
          </div>
          <InfoItem label="Coach ID " value={data.id} />

          {data?.profile_status == 1 ? (
            <div className="active-status">
              <img
                className="button-img"
                src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png"
                alt=""
              />
              <span>Active</span>
            </div>
          ) : (
            <div className="inActive-status">
              ❌<span>Inactive</span>
            </div>
          )}

          {/* <div className="active-status">
            <img
              className="button-img"
              src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png"
              alt=""
            />
            <span>Active</span>
          </div> */}
        </div>
        {/* <footer className="card-footer">
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

          <InfoItem label="Age " value={age} />
          <div className="line"></div>

          <InfoItem label="Referral code" value={data.referral_code || "N/A"} />
          <div className="line"></div>

          <InfoItem label="Referred by" value={data.referred_by || "N/A"} />
          <div className="line"></div>
        </footer> */}
      </div>

      {/* SECOND COLUMN OF COACH DETAILS ROW */}
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
      {/* *********************************************   below is the second card for coach status **********************************************/}

      {/* <CoachStatus /> */}
      <ImageModal />
    </div>
  );
};

export default CoachLeftComponent;
