import React, { useState, useEffect } from "react";
import "../../../cssfolder/profileLeftComponent.css";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";
import { KeyRound, Pencil } from "lucide-react";
import { Atom } from "react-loading-indicators";
import UseImageModal from "../../../_constants/UseImageModal";
import { useNavigate } from "react-router-dom";
import UpdateConsultantProfileStatus from "../../../_components/reuseComponents/UpdateConsultantProfileStatus";
import { useLocation, useParams } from "react-router-dom";
import AssignOnboardingToAdmin from "../../../_components/reuseComponents/AssignOnboardingToAdmin";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { useUpdateStatusMutation } from "../../../_store/api";

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
  const { consultantId } = useParams();

  const [data, setData] = useState({});
  const { openImageModal, ImageModal } = UseImageModal();
  const [selectedData, setSelectedData] = useState(null);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [showOnboardingAssignTask, setShowOnboardingAssignTask] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  console.log("location", location);
  // const profileStatus = useSelector((state) => state.consultant.profileStatus);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const profileStatus = params.get("status");
  const { user } = useSelector((state) => state.auth);

  const [updateStatus, { isLoading: isUpdatingStatus, error: isUpdateError }] =
    useUpdateStatusMutation();

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

  // this is for profile status
  const handleShowUpdateStatus = () => {
    setShowUpdateStatus(!showUpdateStatus);
    setSelectedData(data.profile_status);
  };

  const toggleOnboardingStatus = () => {
    setShowOnboardingAssignTask(!showOnboardingAssignTask);
    setSelectedData(data);
  };

  const handleSaveInactiveConsultant = async (e) => {
    e.preventDefault();

    const payload = {
      status: 8,
    };

    try {
      const response = await updateStatus({
        id: consultantId,
        body: payload,
      });

      if (response?.data?.status) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      if (error.data) {
        console.error("API Error Data:", error.data);
      }
    }
  };

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

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
          {/* <img
            className="profile-img"
            src={urls || "girl-avtar.png"}
            alt="coach Profile"
            onClick={() => openImageModal(urls)}
            style={{ cursor: "pointer" }}
          /> */}

          <img
            className="profile-img"
            src={urls || "/avatar11.png"}
            alt="astrologer Profile"
            onClick={() => openImageModal(urls || "/avatar11.png")}
            style={{ cursor: "pointer" }}
          />
        </div>
        {/* SECOND COLUMN: User Info (column layout) */}
        <div className="user-info-section">
          <div className="userName">
            {`${data.first_name || ""} ${data.last_name || ""}`}({age})
          </div>
          <InfoItem label="Coach ID " value={data.id} />

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
        {profileStatus == 3 && (
          <Button
            variant="contained"
            style={{
              backgroundColor: "#6165d0ff",
              color: "white",
              marginLeft: "20px",
            }}
            onClick={handleSaveInactiveConsultant}
          >
            Inactive Consultant
          </Button>
        )}
        <span
          className="editIcon"
          style={{
            background: "#c65252ff",
          }}
        >
          <KeyRound
            className="iconSmall"
            onClick={() => toggleOnboardingStatus()}
          />
        </span>
        {socialMediaLinks.facebook && (
          <a
            href={socialMediaLinks.facebook}
            className="fa fa-facebook"
            target="blank"
          >
            <Facebook />
          </a>
        )}

        {socialMediaLinks.instagram && (
          <a
            href={socialMediaLinks.instagram}
            className="fa fa-instagram"
            target="blank"
          >
            <Instagram />
          </a>
        )}

        {socialMediaLinks.linkedin && (
          <a
            href={socialMediaLinks.linkedin}
            className="fa fa-linkedin"
            target="blank"
          >
            <Linkedin />
          </a>
        )}

        {socialMediaLinks.x && (
          <a href={socialMediaLinks.x} className="fa fa-twitter" target="blank">
            <Twitter />
          </a>
        )}

        {socialMediaLinks.youtube && (
          <a
            href={socialMediaLinks.youtube}
            className="fa fa-youtube"
            target="blank"
          >
            <Youtube />
          </a>
        )}
      </div>
      {/* *********************************************   below is the second card for coach status **********************************************/}

      {/* <CoachStatus /> */}
      <ImageModal />

      {showUpdateStatus && (
        <UpdateConsultantProfileStatus
          isOpen={showUpdateStatus}
          onClose={handleShowUpdateStatus}
          selectedData={selectedData}
          consultantId={consultantId}
        />
      )}

      {showOnboardingAssignTask && (
        <AssignOnboardingToAdmin
          isOpen={showOnboardingAssignTask}
          onClose={toggleOnboardingStatus}
          selectedRow={selectedData?.id}
          profileStatus={profileStatus}
          created={true}
          adminId={user.id}
        />
      )}
    </div>
  );
};

export default CoachLeftComponent;
