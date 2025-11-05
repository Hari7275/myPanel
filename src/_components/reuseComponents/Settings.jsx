import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextSetting } from "../ui/inputForm";
import { useGetConsultantsSettingsQuery } from "../../_store/api";
import { Atom } from "react-loading-indicators";
import { useLocation, useParams } from "react-router-dom";

const Settings = () => {
  const [data, setData] = useState([]);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const { data: fetchData, isLoading } = useGetConsultantsSettingsQuery({
    consultantId,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    }
  }, [fetchData]);

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <footer className="userProfile-footer profile-mainContain ">
      {data.length > 0 ? (
        data.map((result) => (
          <div>
            <TextSetting
              key={result.id}
              text={result.setting_key || "No Data"}
              value={result.setting_value || "No Data"}
            />
            <div className="line"></div>
          </div>
        ))
      ) : (
        <p>No settings data available</p>
      )}
    </footer>
  );
};

export default Settings;
