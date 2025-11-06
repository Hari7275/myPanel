import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { useGetUserListQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import EditUserDatingProfileStatus from "./EditUserDatingProfileStatus";
import EditUserType from "./EditUserType";
import UpdateRefferalCode from "./UpdateRefferalCode";
import { useParams } from "react-router-dom";

const UserDatingStatus = () => {
  // const userId = useSelector((state) => state.user.userData);
  const { userId } = useParams();

  const { data: fetchData } = useGetUserListQuery(userId);

  const [userData, setUserData] = useState(null);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showEditUserType, setShowEditUserType] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [refferalCode, setRefferalCode] = useState(false);

  useEffect(() => {
    if (fetchData) {
      setUserData(fetchData?.data);
    }
  }, [fetchData]);

  if (!userData) {
    return <div></div>;
  }

  // console.log(" dating status ", userData?.referral_code);

  const toggleEditUserType = (row) => {
    setSelectedRow(row);
    setShowEditUserType(!showEditUserType);
  };

  const toggleEditStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };
  const toggleEditRefferalCode = (row) => {
    // console.log("row", row);
    setSelectedRow(userData?.referral_code);
    setRefferalCode(!refferalCode);
  };

  // const UserVerificationStatus = (value) => {
  //   switch (Number(value)) {
  //     case 1:
  //       return "Registered";
  //     case 2:
  //       return "Active";
  //     case 3:
  //       return "Inactive";
  //     case 4:
  //       return "Blocked";
  //     case 5:
  //       return "Suspended";
  //     case 6:
  //       return "Terminated";
  //     case 7:
  //       return "Deleted";
  //     case 8:
  //       return "Paused";
  //     case 9:
  //       return "Created";
  //     case 10:
  //       return "Rejected";

  //     default:
  //       return "N/A";
  //   }
  // };


  const UserVerificationStatus = (value) => {
  switch (Number(value)) {
    case 1:
      return "Uncreated";
    case 2:
      return "Active";
    case 3:
      return "Inactive";
    case 4:
      return "Blocked";
    case 5:
      return "Suspended";
    case 6:
      return "Terminated";
    case 7:
      return "Deleted";
    case 8:
      return "Pause";
    case 9:
      return "Under Review";
    case 10:
      return "Rejected";
    default:
      return "N/A";
  }
};


  return (
    <div>
      <div className="profile-sub-container  profile-right-sub-container">
        <h2
          className="main-heading "
          style={{
            marginBottom: "0px",
            display: "flex",
            justifyContent: "center",
            lineHeight: "1.2",
            fontSize: "26px",
          }}
        >
          User Type Status:
        </h2>

        {/* <Settings /> */}

        <footer
          className="userProfile-footer profile-mainContain "
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <div className="card-footer-content">
              <div className="info-pair">
                <p className="info-item">
                  <strong>User Type: </strong>
                  <span>
                    {userData?.user_type == 0 ? "External" : "Internal"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="actions-cell">
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleEditUserType()}
              />
            </span>
          </div>
        </footer>
      </div>

      <div className="profile-sub-container  profile-right-sub-container">
        <h2
          className="main-heading "
          style={{
            marginBottom: "0px",
            display: "flex",
            justifyContent: "center",
            lineHeight: "1.2",
            fontSize: "26px",
          }}
        >
          User Dating Status:
        </h2>

        {/* <Settings /> */}

        <footer
          className="userProfile-footer profile-mainContain "
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <div className="card-footer-content">
              <div className="info-pair">
                <p className="info-item">
                  <strong>Dating Status: </strong>
                  <span>
                    {UserVerificationStatus(userData.user_dating_status)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="actions-cell">
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleEditStatus()}
              />
            </span>
          </div>
        </footer>
      </div>

      {/* update promo referral code */}

      <div className="profile-sub-container  profile-right-sub-container">
        <h2
          className="main-heading "
          style={{
            marginBottom: "0px",
            display: "flex",
            justifyContent: "center",
            lineHeight: "1.2",
            fontSize: "26px",
          }}
        >
          User Referral code:
        </h2>

        {/* <Settings /> */}

        <footer
          className="userProfile-footer profile-mainContain "
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <div className="card-footer-content">
              <div className="info-pair">
                <p className="info-item">
                  <strong>Referral code: </strong>
                  <span>{userData?.referral_code}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="actions-cell">
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleEditRefferalCode()}
              />
            </span>
          </div>
        </footer>
      </div>
      {showEditUserType && (
        <EditUserType
          isOpen={showEditUserType}
          onClose={toggleEditUserType}
          selectedRow={selectedRow}
        />
      )}

      {showEditStatus && (
        <EditUserDatingProfileStatus
          isOpen={showEditStatus}
          onClose={toggleEditStatus}
          selectedRow={selectedRow}
        />
      )}

      {refferalCode && (
        <UpdateRefferalCode
          isOpen={refferalCode}
          onClose={toggleEditRefferalCode}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};

export default UserDatingStatus;
