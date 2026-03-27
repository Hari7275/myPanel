import React, { useEffect, useState } from "react";
import "../../../cssfolder/profileLeftComponent.css";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, CirclePlus } from "lucide-react";
import { useGetUserListQuery } from "../../../_store/api/user/userDetails";
import { useAddUserToObservingListMutation } from "../../../_store/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UseImageModal from "../../../_constants/UseImageModal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import { getObserverId } from "../../../_constants/observerMapping";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import toast from "react-hot-toast";

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

const UserDetailsComponent = () => {
  const { userId } = useParams();
  // const userId = useSelector((state) => state.user.userData);

  console.log("userId", userId);

  const { data: fetchData, isLoading } = useGetUserListQuery(userId);
  const [userData, setUserData] = useState(null);
  const { openImageModal, ImageModal } = UseImageModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, prod } = useSelector((state) => state.auth);
  const assignedObserverId = getObserverId(user?.id, prod);
  const [addUserToObserving] = useAddUserToObservingListMutation();
  const permissions = usePermissions();

  const addToObservingList = async () => {
    try {
      const response = await addUserToObserving({
        body: {
          user_id: Number(userId),
          observer_id: assignedObserverId,
        },
      });
      if (response?.data?.status) {
        toast.success(response?.data?.message || "User added to observing list");
      } else {
        toast.error(response?.data?.message || "Failed to add user");
      }
    } catch (error) {
      console.log("Failed to add to observing list", error);
      toast.error("Failed to add user to observing list");
    }
  };

  useEffect(() => {
    if (fetchData) {
      setUserData(fetchData?.data);
    }
  }, [fetchData]);

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#3a3a3a" size="medium" text="" textColor="" />
      </span>
    );
  }

  const handleProfileClose = () => {
    navigate("/user", {
      state: {
        previousPage: location.state?.currentPage || 1,
        previousPageSize: location.state?.pageSize || 10,
      },
    });
    // navigate(-1);;
  };
  const age = userData?.date_of_birth
    ? calculateAge(userData?.profileDetails?.birth_date)
    : "N/A";

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
      {/*FIRST COLUMN USER DETAILS ROW */}
      <div className="user-details-row">
        {/* FIRST COLUMN IMAGE SECTION */}
        <div className="profile-img-section">
          {/* {userData.profile_images.length > 0 && ( */}
          <img
            className="profile-img"
            // src={userData?.profile_images[0]?.url || "avatar11.png"}
            src={userData?.profileDetails?.profile_image_url || "/avatar11.png"}
            alt="user Profile"
            onClick={() =>
              openImageModal(
                userData?.profileDetails?.profile_image_url || "/avatar11.png"
              )
            }
          />
        </div>
        {/* SECOND COLUMN: User Info (column layout) */}
        <div className="user-info-section">
          {/* <div className="userName">
            {`${data.first_name || ""} ${data.last_name || ""}`}({age})
          </div> */}
          <div className="userName">
            {userData?.profileDetails?.name} ({age})
            {permissions?.["orders"]?.includes("order_notifications") && (
              <span onClick={addToObservingList} style={{ cursor: "pointer" }}>
                <CirclePlus />
              </span>
            )}
          </div>
          <InfoItem label="User ID " value={userData?.id || "N/A"} />
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
