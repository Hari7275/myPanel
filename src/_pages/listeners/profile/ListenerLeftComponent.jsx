import React, { useState, useEffect } from "react";
import "../../../cssfolder/profileLeftComponent.css";
import CoachStatus from "../../coaches/status/CoachStatus";
import { CirclePlus, KeyRound, Pencil } from "lucide-react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Modal from "../../../_components/modals/Modal";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";
import {
  getGenderLabel,
  getMaritalStatus,
} from "../../../_constants/consultantConstant";
import { useSelector } from "react-redux";
import UseImageModal from "../../../_constants/UseImageModal";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import UpdateConsultantProfileStatus from "../../../_components/reuseComponents/UpdateConsultantProfileStatus";
import { Atom } from "react-loading-indicators";
import AssignOnboardingToAdmin from "../../../_components/reuseComponents/AssignOnboardingToAdmin";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { useUpdateStatusMutation } from "../../../_store/api";
import { Switch } from "@mui/material";

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

const ListenerLeftComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageToEdit, setImageToEdit] = useState(null);
  const [data, setData] = useState({});
  const [listenerType, setListenerType] = useState("listenerstatus");
  const { openImageModal, ImageModal } = UseImageModal();
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [showOnboardingAssignTask, setShowOnboardingAssignTask] =
    useState(false);
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const navigate = useNavigate();
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();
  // const profileStatus = useSelector((state) => state.consultant.profileStatus);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const profileStatus = params.get("status");

  console.log("profileStatus", profileStatus);

  const [updateStatus, { isLoading: isUpdatingStatus, error: isUpdateError }] =
    useUpdateStatusMutation();

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

  const handleProfileClose = () => {
    navigate("/listeners", {
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

  const addNotification = () => {
    toast.success("Feature coming soon!");
  };

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    //MAIN ROW OF LISTNER CONTAINER
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
      {/* FIRST COLUMN OF MAIN CONTAINER AS ROW */}
      <div className="user-details-row">
        {/* FIRST COLUMN OF LISTNER DETAILS(IMAGE SECTION) */}
        <div className="profile-img-section">
          <div className="">
            <img
              className="profile-img"
              src={urls || "/avatar11.png"}
              alt="astrologer Profile"
              onClick={() => openImageModal(urls || "/avatar11.png")}
              style={{ cursor: "pointer" }}
            />
            {/* <div className="edit-profile-img">
              <button className="edit-profile-icon" onClick={openModal}>
                <Pencil
                  style={{ background: "none", height: "14px", width: "14px" }}
                />
              </button>
            </div> */}
          </div>
        </div>
        {/* SECOND COLUMN LISTNER INFO SECTION */}
        <div className="user-info-section">
          <div className="userName">
            {`${data.first_name || ""} ${data.last_name || ""}`}({age})
            <span onClick={addNotification} style={{ cursor: "pointer" }}>
              <CirclePlus />
            </span>
          </div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Listener ID : </strong> {data.id}
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
      </div>
      {/* SECOND COLUMN OF MAIN CONTAINER ROW */}

      <div className="social-icons-section">
        {profileStatus == 3 && (
          <Button
            variant="contained"
            style={{
              backgroundColor: data?.status === 1 ? "#6165d0ff" : "#9e9e9e",
              color: "white",
              marginLeft: "20px",
              cursor: data?.status === 1 ? "pointer" : "not-allowed",
              opacity: data?.status === 1 ? 1 : 0.7,
            }}
            onClick={data?.status === 1 ? handleSaveInactiveConsultant : null}
            disabled={data?.status !== 1}
          >
            {data?.status === 1 ? "Deactivate" : "Deactivated"}
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
        {socialMediaLinks?.facebook && (
          <a
            href={socialMediaLinks.facebook}
            className="fa fa-facebook"
            target="blank"
          >
            <Facebook />
          </a>
        )}

        {socialMediaLinks?.instagram && (
          <a
            href={socialMediaLinks.instagram}
            className="fa fa-instagram"
            target="blank"
          >
            <Instagram />
          </a>
        )}

        {socialMediaLinks?.linkedin && (
          <a
            href={socialMediaLinks.linkedin}
            className="fa fa-linkedin"
            target="blank"
          >
            <Linkedin />
          </a>
        )}

        {socialMediaLinks?.x && (
          <a href={socialMediaLinks.x} className="fa fa-twitter" target="blank">
            <Twitter />
          </a>
        )}

        {socialMediaLinks?.youtube && (
          <a
            href={socialMediaLinks.youtube}
            className="fa fa-youtube"
            target="blank"
          >
            <Youtube />
          </a>
        )}
      </div>

      {/* <CoachStatus listenerType={listenerType} /> */}
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

export default ListenerLeftComponent;
