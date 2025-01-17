import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextSetting } from "../ui/inputForm";
import { useGetConsultantsSettingsQuery } from "../../_store/api";

const Settings = () => {
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchData, isLoading } = useGetConsultantsSettingsQuery({
    consultantId,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    }
  }, [fetchData]);

  if (isLoading) {
    return <p>Loading...</p>;
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
