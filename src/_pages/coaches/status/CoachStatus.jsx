import React, { useState, useEffect } from "react";
import { useGetConsultantsServiceStatusQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import { getFetaureLabel } from "../../../_constants/consultantConstant";

const availableStatus = {
  0: "Offline",
  1: "Available",
  2: "Busy",
  3: "Live",
};

const CoachStatus = () => {
  const [data, setData] = useState();
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchData, isLoading } = useGetConsultantsServiceStatusQuery({
    id: consultantId,
  });

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data);
    }
  }, [fetchData]);
  console.log("data......", data);
  // console.log("consultantId", consultantId);

  // Check if type 6 has status 1
  const isLiveMode = data?.some(
    (item) => item?.type === 6 && item.status === 1
  );

  const getButtonClassName = (statusValue) => {
    const finalStatus = isLiveMode ? 3 : statusValue;
    switch (finalStatus) {
      case 3:
        return "status-btn live"; // yellow (Live mode)
      case 0:
        return "status-btn offline"; // Gray
      case 2:
        return "status-btn busy"; // Orange
      case 1:
        return "status-btn available"; // Red
      default:
        return "status-btn unknown";
    }
  };

  return (
    <div className="card">
      <label className="sub-heading">STATUS(AVAILABILITY) :</label>
      <div className="dividerm"></div>

      <footer className="card-foote">
        {data?.map((status) => (
          <>
            <div className="card-footer-content">
              <div className="info-pair">
                <p className="info-item">
                  <strong>{getFetaureLabel(status?.type)}</strong>
                </p>
                <p className="info-item">
                  <button className={getButtonClassName(status.status)}>
                    {isLiveMode
                      ? "Live"
                      : availableStatus[status.status] || "Unknown"}
                  </button>
                </p>
              </div>
            </div>
            <div className="dividerm"></div>
          </>
        ))}
      </footer>
    </div>
  );
};

export default CoachStatus;
