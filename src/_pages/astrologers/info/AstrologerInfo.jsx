import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import UpdateInfo from "./UpdateInfo";
import {
  useGetConsultantsDetailsQuery,
  useGetCoachCategoryListQuery,
  useGetCoachSkillsListQuery,
} from "../../../_store/api";
import { format } from "date-fns";
import {
  getGenderLabel,
  getConsultantTypes,
} from "../../../_constants/consultantConstant";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../overview/AstrologerOverview";
import { Atom } from "react-loading-indicators";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const AstrologerInfo = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [formData, setFormData] = useState(null);

  const [category, setCategory] = useState([]);
  const [skills, setSkills] = useState([]);

  const consultantId = useSelector(
    (state) => state?.consultant?.consultantData
  );

  const { data: fetchdata } = useGetConsultantsDetailsQuery(consultantId);
  const { data: constantData } = useGetCoachCategoryListQuery();
  const { data: constantSkills } = useGetCoachSkillsListQuery();
  const permissions = usePermissions();

  useEffect(() => {
    if (constantData) {
      setCategory(constantData?.data || []);
    }
  }, [constantData]);

  useEffect(() => {
    if (constantSkills) {
      setSkills(constantSkills?.data);
    }
  }, [constantSkills]);

  useEffect(() => {
    if (fetchdata) {
      setFormData(fetchdata?.data || {});
    }
  }, [fetchdata]);

  // if (!formData) {
  //   return <div>loading...</div>;
  // }

  if (!formData) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  const toggleUpdateInfo = (data) => {
    setShowUpdateInfo(!showUpdateInfo);
    setSelectedData(data);
  };

  // Helper function to get category names from IDs
  const getCategoryNames = (categoryIds) => {
    if (!Array.isArray(categoryIds)) return "";
    return categoryIds
      .map((id) => category.find((cat) => cat.id === id)?.category_name)
      .filter((name) => name)
      .join(", ");
  };

  // Helper function to get skills names from IDs

  const getSkillsNames = (skillsIds) => {
    if (!Array.isArray(skillsIds)) return "";
    return skillsIds
      .map((id) => skills.find((skill) => skill.id === id)?.skill_name)
      .filter((name) => name)
      .join(", ");
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
              backgroundColor: "#f0f0f0",
              marginBottom: "20px",
            }}
          >
            <h3 className="main-heading " style={{ marginBottom: "0px" }}>
              Update Info
            </h3>
            {permissions?.["astrologer"]?.includes("update_astrologer_profile_info") && (
              <span
                className="secondIcon editIcon"
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
              <strong>Gender : </strong> {getGenderLabel(formData?.gender)}
            </p>
            <p className="info-item">
              <strong>Email : </strong> {formData?.email_address}
            </p>
          </div>

          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Skills : </strong>{" "}
              {getSkillsNames(formData?.skills || [])}
            </p>
            <p className="info-item">
              <strong>Consultant Type : </strong>
              {getConsultantTypes(formData?.consultant_type)}
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
              <strong>Date of Birth : </strong>{" "}
              {format(new Date(formData?.date_of_birth), "dd MMMM yyyy")}
            </p>
            <p className="info-item">
              <strong>Languages : </strong>{" "}
              {(formData?.languages || [])
                .map((language) => capitalizeFirstLetter(language))
                .join(",")}
            </p>
          </div>
          <div className="dividerm"></div>
          <div className="info-pair">
            <p className="info-item">
              <strong>Experience : </strong> {formData?.experience || "0"}
            </p>
          </div>
          <div className="dividerm"></div>
          <div className="info-pair">
            <p className="info-item">
              <strong>Services : </strong> {formData?.services || "N/A"}
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

export default AstrologerInfo;
