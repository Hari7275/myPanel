import React, { useState, useEffect } from "react";
import { useGetConsultantsServiceStatusQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import { getFetaureLabel } from "../../../_constants/consultantConstant";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ServiceStatusModal from "./ServiceStatusModal";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const availableStatus = {
  0: "Offline",
  1: "Available",
  2: "Busy",
  3: "Live",
};

const CoachStatus = () => {
  const [data, setData] = useState([]);
  const [alignment, setAlignment] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const permissions = usePermissions();

  const { data: fetchData } = useGetConsultantsServiceStatusQuery({
    id: consultantId,
  });

  useEffect(() => {
    if (fetchData?.data) {
      const fetchedData = fetchData.data;
      setData(fetchedData);

      const initialAlignment = {};

      fetchedData.forEach((item) => {
        initialAlignment[item.id] = item.display_status === 1 ? 1 : 0;
      });
      setAlignment(initialAlignment);
    }
  }, [fetchData]);

  const isLiveMode = data?.some(
    (item) => item?.type === 6 && item.status === 1
  );

  const getButtonClassName = (statusValue) => {
    const finalStatus = isLiveMode ? 3 : statusValue;
    switch (finalStatus) {
      case 3:
        return "status-btn live";
      case 0:
        return "status-btn offline";
      case 2:
        return "status-btn busy";
      case 1:
        return "status-btn available";
      default:
        return "status-btn unknown";
    }
  };

  const handleChange = (id, newValue, service) => {
    console.log("first", newValue);
    if (newValue === null) return;

    // Always open modal regardless of value
    setSelectedService({ ...service, newDisplayStatus: newValue });
  };

  const handleModalClose = () => {
    setSelectedService(null);
  };

  const canUpdateStatus = {
    astrologer: permissions?.["astrologer"]?.includes("update_astrologer_profile_service_status"),
    coach: permissions?.["coach"]?.includes("update_coach_profile_service_status"),
  }
  const hasEditPermission = Object.values(canUpdateStatus).some(Boolean);

  return (
    <div className="status-availability">
      <label className="sub-heading">STATUS (AVAILABILITY) :</label>
      <div className="dividerm"></div>

      <footer className="card-footer">
        {data?.map((status) => (
          <React.Fragment key={status.id}>
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

                <ToggleButtonGroup
                  color="primary"
                  value={alignment[status.id]}
                  onChange={(e, newVal) =>
                    handleChange(status.id, newVal, status)
                  }
                  exclusive
                  aria-label="Display Status"
                >
                  {hasEditPermission && (
                    <>
                      <ToggleButton
                        value={1}
                        sx={{
                          borderRadius: "10px",
                          padding: "4px 12px",
                          "&.Mui-selected": {
                            backgroundColor: "#696cff",
                            color: "white",
                          },
                        }}
                      >
                        Show
                      </ToggleButton>
                      <ToggleButton
                        value={0}
                        sx={{
                          borderRadius: "10px",
                          padding: "4px 12px",
                          "&.Mui-selected": {
                            backgroundColor: "#696cff",
                            color: "white",
                          },
                        }}
                      >
                        Hide
                      </ToggleButton>
                    </>
                  )}
                </ToggleButtonGroup>
              </div>
            </div>
            <div className="dividerm"></div>
          </React.Fragment>
        ))}
      </footer>

      {selectedService && (
        <ServiceStatusModal
          isOpen={!!selectedService}
          onClose={handleModalClose}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default CoachStatus;
