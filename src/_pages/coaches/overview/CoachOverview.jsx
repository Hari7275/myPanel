import React, { useState, useEffect } from "react";
import "../../../cssfolder/UserProfile.css";

import { useGetConsultantsDetailsQuery } from "../../../_store/api";
import { format } from "date-fns";
import { useSelector } from "react-redux";

import { useGetCoachSkillsListQuery } from "../../../_store/api";

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

const CoachOverview = () => {
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

  // Helper function to capitalize the first letter of each word
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };



  return (
    <div>
      <div className="userProfile-containr profile-right-sub-container">
        <div className="userProfile-card">
          <footer className="userProfile-footer">
            <div className="userProfile-footer-content">
              <InfoItem
                label="Coach Language"
                value={(data?.languages || [])
                  .map((language) => capitalizeFirstLetter(language))
                  .join(",")}
              />
              <div className="line"></div>

              <InfoItem label="Coach Services" value={data?.services} />
              <div className="line"></div>

              <InfoItem
                label="Coach Skill"
                value={getSkillsNames(data?.skills || [])}
              />
              <div className="line"></div>

              <InfoItem label="Coach Country" value={data?.country} />
              <div className="line"></div>

              <InfoItem label="Coach Address" value={data?.address} />
              <div className="line"></div>

              <InfoItem
                label="Lifetime Earning"
                value={`INR ${data?.lifetime_earning}`}
              />
              <div className="line"></div>

              <InfoItem
                label="Current Balance "
                value={`INR ${data?.wallet_balance}`}
              />
              <div className="line"></div>

              {/* <InfoItem
                label="Last Active"
                value={dateFormat(data.updated_at)}
              /> */}
              <div className="line"></div>
            </div>
          </footer>
        </div>
      </div>
      {/* kahcajkshdkasjdkjasd */}
    </div>
  );
};

export default CoachOverview;
