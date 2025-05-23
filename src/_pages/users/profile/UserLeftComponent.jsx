import React, { useEffect, useState } from "react";
import "../../../cssfolder/profileLeftComponent.css";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useGetUserListQuery } from "../../../_store/api/user/userDetails";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UseImageModal from "../../../_constants/UseImageModal";

const InfoItem = ({ label, value }) => (
  <div className="card-footer-content">
    <div className="info-pair">
      <p className="info-item">
        <strong>{label}: </strong>
        <span>{value}</span>
      </p>
    </div>
  </div>
);

const UserLeftComponent = () => {
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
    <div className="card-container">
      <div className="card">
        <div className="card-upper-part">
          <div className="card-img ">
            {userData.profile_images.length > 0 && (
              <img
                src={userData.profile_images[0].url}
                alt="Profile"
                onClick={() =>
                  openImageModal(
                    userData.profile_images[0].url || "girl-avtar.png"
                  )
                }
              />
            )}
          </div>

          <div className="card-user-name">
            <div className="userName">{userData.fullName}</div>

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
          <InfoItem label="User ID " value={userData.id || "N/A"} />
          <div className="line"></div>

          <InfoItem
            label="Mobile No. "
            value={userData.phone_number || "N/A"}
          />
          <div className="line"></div>

          <InfoItem label="Gender " value={userData.gender || "N/A"} />
          <div className="line"></div>

          <InfoItem label="Age " value={userData.age || "N/A"} />
          <div className="line"></div>

          <InfoItem
            label="Referral code "
            value={userData.referral_code || "N/A"}
          />
          <div className="line"></div>

          <InfoItem
            label="Referred by "
            value={userData.referred_by || "N/A"}
          />
          <div className="line"></div>
          <InfoItem
            label="Referral amount "
            value={userData.referral_amount || "N/A"}
          />
          <div className="line"></div>

          <InfoItem
            label="Wallet amount "
            value={
              userData.wallet_balance
                ? parseFloat(userData.wallet_balance).toFixed(2)
                : "N/A"
            }
          />

          <div className="line"></div>
        </footer>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
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
      </div>
      <ImageModal />
    </div>
  );
};

export default UserLeftComponent;
