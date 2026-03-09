import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import UpdateInfo from "./UpdateInfo";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";
import { format } from "date-fns";
import {
  getGenderLabel,
  getConsultantTypes,
} from "../../../_constants/consultantConstant";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { useLocation, useParams } from "react-router-dom";
import { useTheme } from "../../../_context/ThemeContext";

const ListenerInfo = () => {
  const { isDarkMode } = useTheme();
  const [selectedData, setSelectedData] = useState(null);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [formData, setFormData] = useState(null);
  // const [category, setCategory] = useState([]);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const permissions = usePermissions();

  const { data: fetchdata, isLoading } =
    useGetConsultantsDetailsQuery(consultantId);

  useEffect(() => {
    if (fetchdata && fetchdata.data) {
      setFormData(fetchdata.data);
    }
  }, [fetchdata]);

  if (isLoading || !formData) {
    return (
      <span className="loadPage">
        <Atom color={isDarkMode ? "#a8b8d0" : "#1c2434"} size="medium" text="" textColor="" />
      </span>
    );
  }

  const toggleUpdateInfo = (data) => {
    setShowUpdateInfo(!showUpdateInfo);
    setSelectedData(data);
  };

  return (
    <div className="main-container profile-right-sub-container">
      <div className="RewardsTxn-container">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "var(--card-bg)",
              marginBottom: "20px",
            }}
          >
            <h3 className="main-heading " style={{ marginBottom: "0px" }}>
              Update Info 
            </h3>
            {permissions?.["listener"]?.includes(
              "update_listener_profile_info"
            ) && (
              <span
                className="editIcon"
                onClick={() => toggleUpdateInfo(formData)}
              >
                <Pencil className="iconSmall" />
              </span>
            )}
          </div>

          <div className="info-pair">
            <p className="info-item">
              <strong>First Name : </strong> {formData?.first_name}
            </p>
            <p className="info-item">
              <strong>Last Name : </strong> {formData?.last_name}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Display Name : </strong> {formData?.display_name}
            </p>
            <p className="info-item">
              <strong>Email : </strong> {formData?.email_address}
            </p>
          </div>

          <div className="dividerm"></div>
          <div className="info-pair">
            <p className="info-item">
              <strong>Meta Description : </strong>{" "}
              <span style={{ color: "red" }}>
                {" "}
                {formData?.meta_description || "N/A"}
              </span>
            </p>
          </div>

          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Gender : </strong> {getGenderLabel(formData?.gender)}
            </p>
            <p className="info-item">
              <strong>Experience : </strong> {formData?.experience || "0"}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Languages : </strong>{" "}
              {formData?.languages?.join(",") || ""}
            </p>

            <p className="info-item">
              <strong>Date of Birth : </strong>{" "}
              {format(new Date(formData?.date_of_birth), "dd MMMM yyyy")}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Address : </strong> {formData?.address}
            </p>

            <p className="info-item">
              <strong>Country : </strong> {formData?.country}
            </p>
          </div>
          <div className="dividerm"></div>
          <div className="info-pair">
            <p className="info-item">
              <strong>Description : </strong> {formData?.description || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {showUpdateInfo && (
        <UpdateInfo
          isOpen={showUpdateInfo}
          onClose={toggleUpdateInfo}
          selectedData={selectedData}
        />
      )}
    </div>
  );
};

export default ListenerInfo;
