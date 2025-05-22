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

const InfoItem = ({ label, value }) => (
  <div className="card-footer-content">
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

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-upper-part">
          <div className="card-img">
            <img
              src={urls}
              alt="coach Profile"
              onClick={() => openImageModal(urls)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="card-user-name">
            <div className="userName">{`${data.first_name || ""} ${
              data.last_name || ""
            }`}</div>

            <div className="secondButton">
              <img
                className="button-img"
                src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png"
                alt=""
              />
              <span>Active</span>
            </div>
          </div>
        </div>

        <div className="line"></div>

        <footer className="card-footer">
          <InfoItem label="Coach ID " value={data.id} />
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
        </footer>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
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
      </div>

      {/* *********************************************   below is the second card for coach status **********************************************/}

      <CoachStatus />
      <ImageModal />
    </div>
  );
};

export default CoachLeftComponent;
