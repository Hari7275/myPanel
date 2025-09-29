import React, { useEffect, useState } from "react";
import { useGetConsultantsDetailsQuery } from "../../../_store/api";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useGetCoachSkillsListQuery } from "../../../_store/api";

const InfoItem = ({ label, value, color }) => (
  <div className="card-footer-content">
    <div className="info-pair">
      <p className="info-item">
        <strong style={{ color: color }}>{label}: </strong>
        <span>{value}</span>
      </p>
    </div>
  </div>
);

// Helper function to capitalize the first letter of each word
export const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const AstrologerOverview = () => {
  const [skills, setSkills] = useState([]);
  const [data, setData] = useState([]);

  const consultantId = useSelector((state) => state.consultant.consultantData);
  const { data: constantSkills } = useGetCoachSkillsListQuery();

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetConsultantsDetailsQuery(consultantId);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  // api to get skills
  useEffect(() => {
    if (constantSkills) {
      setSkills(constantSkills?.data);
    }
  }, [constantSkills]);

  // Helper function to get skills names from IDs

  const getSkillsNames = (skillsIds) => {
    return skillsIds
      .map((id) => skills.find((skill) => skill.id === id)?.skill_name)
      .filter((name) => name)
      .join(", ");
  };

  // const dateFormat =(date)=>{
  //      return format(new Date(date), "MMMM dd, yyyy");
  // }

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "N/A";
    }
    return format(new Date(date), "PPpp");
  };

  return (
    <div>
      <div className="userProfile-container profile-right-sub-container">
        <div className="userProfile-card">
          <footer className="userProfile-footer">
            <div className="userProfile-footer-content">
              <InfoItem
                label="Mobile Number"
                value={`${data?.phone_code} ${data?.phoneNumber}`}
              />
              <InfoItem
                label="Language"
                value={(data?.languages || [])
                  .map((language) => capitalizeFirstLetter(language))
                  .join(",")}
              />
              <div className="line"></div>

              <InfoItem label="Services" value={data?.services} />
              <div className="line"></div>

              <InfoItem
                label="Skill"
                value={getSkillsNames(data?.skills || [])}
              />
              <div className="line"></div>

              <InfoItem label="Country" value={data?.country} />
              <div className="line"></div>

              <InfoItem label="Address" value={data?.address} />
              <div className="line"></div>

              <InfoItem
                label="Lifetime Earning"
                value={`INR ${data?.lifetime_earning}`}
                color="#2196F3" // Blue - represents cumulative/total value
              />
              <div className="line"></div>

              <InfoItem
                label="Current Balance "
                value={`INR ${data?.wallet_balance}`}
                color="#4CAF50" // Green - represents available funds/positive balance
              />
              <div className="line"></div>

              <InfoItem
                label="Applied Date "
                value={formatDate(data?.created_at)}
              />

              <div className="line"></div>

              <InfoItem
                label="Last Update"
                value={formatDate(data?.updated_at)}
              />

              {/* <InfoItem
                label="Last Active"
                value={dateFormat(data.updated_at)}
              /> */}
              <div className="line"></div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AstrologerOverview;
