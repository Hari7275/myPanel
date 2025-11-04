import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextSetting } from "../../../../_components/ui/inputForm";
import { useGetUserdescoverysettingsListQuery } from "../../../../_store/api";
import { useParams } from "react-router-dom";

const DiscoverySettings = () => {
  // const userId = useSelector((state) => state.user.userData);
  const { userId } = useParams();

  const { data: fetchData } = useGetUserdescoverysettingsListQuery(userId);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (fetchData) {
      setResult(fetchData?.data);
    }
  }, [fetchData]);

  if (!result) {
    return <div>No data to display</div>;
  }

  return (
    <>
      <footer className="userProfile-footer">
        <div className="userProfile-footer-content">
          <TextSetting
            text="Gender Preference "
            value={result?.gender_preference || "No Data"}
          />

          <div className="line"></div>

          <TextSetting
            text=" Min Age "
            value={result?.min_age_preference || "No Data"}
          />

          <div className="line"></div>

          <TextSetting
            text=" Max Age "
            value={result?.max_age_preference || "No Data"}
          />

          <div className="line"></div>

          <TextSetting
            text=" Distance Preference "
            value={`${result?.distance_preference || "No Data"} ${
              result?.distance_type_preference || "No Data"
            } `}
          />

          <div className="line"></div>

          <TextSetting
            text=" Global "
            value={result?.is_global ? "Yes" : "No" || "No Data"}
          />
        </div>
      </footer>
    </>
  );
};

export default DiscoverySettings;
