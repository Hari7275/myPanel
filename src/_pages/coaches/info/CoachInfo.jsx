import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import UpdateInfo from "./UpdateInfo";
import {
  useGetConsultantsDetailsQuery,
  useGetCoachCategoryListQuery,
  useGetCoachSkillsListQuery,
} from "../../../_store/api";
import { format } from "date-fns";
import { getGenderLabel } from "../../../_constants/consultantConstant";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { useLocation, useParams } from "react-router-dom";

const CoachInfo = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [formData, setFormData] = useState(null);
  const [category, setCategory] = useState([]);
  const [skills, setSkills] = useState([]);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const permissions = usePermissions();

  const { data: fetchdata, isLoading } =
    useGetConsultantsDetailsQuery(consultantId);

  const { data: constantData } = useGetCoachCategoryListQuery();
  const { data: constantSkills } = useGetCoachSkillsListQuery();

  useEffect(() => {
    // console.log("constantData", constantData);
    if (constantData && constantData?.data) {
      setCategory(constantData?.data);
    } else {
      setCategory([]);
    }
  }, [constantData]);

  // fectching data for coach skills

  useEffect(() => {
    if (constantSkills && constantSkills?.data) {
      setSkills(constantSkills?.data);
    } else {
      setSkills([]);
    }
  }, [constantSkills]);

  useEffect(() => {
    if (fetchdata) {
      setFormData(fetchdata?.data);
    }
  }, [fetchdata]);

  if (isLoading || !formData) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  const toggleUpdataInfo = (data) => {
    setShowUpdateInfo(!showUpdateInfo);
    setSelectedData(data);
  };

  // Helper function to get category names from IDs

  const getCategoryNames = (categoryIds) => {
    console.log("formData?.categories", categoryIds);
    console.log("category", category);

    return categoryIds
      ?.map((id) => category.find((cat) => cat?.id === id)?.category_name)
      .filter((name) => name)
      .join(", ");
  };

  // Helper function to get skills names from IDs

  const getSkillsNames = (skillsIds) => {
    return skillsIds
      ?.map((id) => skills?.find((skill) => skill?.id === id)?.skill_name)
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
            {permissions?.["coach"]?.includes("update_coach_profile_info") && (
              <span className="editIcon">
                <Pencil
                  className="iconSmall"
                  onClick={() => toggleUpdataInfo(formData)}
                />
              </span>
            )}
          </div>

          <div className="info-pair">
            <p className="info-item">
              <strong>First Name : </strong> {formData.first_name}
            </p>
            <p className="info-item">
              <strong>Last Name : </strong> {formData.last_name}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Gender : </strong> {getGenderLabel(formData.gender)}
            </p>
            <p className="info-item">
              <strong>Email : </strong> {formData.email_address}
            </p>
          </div>

          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Category : </strong>{" "}
              {getCategoryNames(formData?.categories)}
            </p>
            <p className="info-item">
              <strong> Skills : </strong>
              {getSkillsNames(formData.skills)}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Languages : </strong> {formData.languages.join(",")}
            </p>

            <p className="info-item">
              <strong>Date of Birth : </strong>{" "}
              {format(new Date(formData.date_of_birth), "dd MMMM yyyy")}
            </p>
          </div>
          <div className="dividerm"></div>

          <div className="info-pair">
            <p className="info-item">
              <strong>Address : </strong> {formData.address}
            </p>

            <p className="info-item">
              <strong>Country : </strong> {formData.country}
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
          onClose={toggleUpdataInfo}
          selectedData={selectedData}
        />
      )}
    </div>
  );
};

export default CoachInfo;
