// import React, { useState, useEffect } from "react";
// import { useGetConsultantsServiceStatusQuery } from "../../../../_store/api";
// import { useSelector } from "react-redux";
// import { getServiceStatusLabel } from "../../../../_constants/consultantConstant";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// import usePermissions from "../../../../_components/reuseComponents/permission/EmpPermission";
// import CoachServiceStatusModal from "./CoachServiceStatusModal";
// import { Switch } from "@mui/material";
// import { useUpdateConsultantServiceStatusMutation } from "../../../../_store/api";
// import toast from "react-hot-toast";

// const availableStatus = {
//   0: "Offline",
//   1: "Available",
//   2: "Busy",
//   3: "Live",
// };

// const CoachServiceStatus = () => {
//   const [data, setData] = useState([]);
//   const [alignment, setAlignment] = useState({});
//   const [selectedService, setSelectedService] = useState(null);
//   const consultantId = useSelector((state) => state.consultant.consultantData);
//   const permissions = usePermissions();
//   const [updateDisplayStatus] = useUpdateConsultantServiceStatusMutation();
//   const [loading, setLoading] = useState(false);

//   const { data: fetchData } = useGetConsultantsServiceStatusQuery({
//     id: consultantId,
//   });

//   useEffect(() => {
//     if (fetchData?.data) {
//       const fetchedData = fetchData.data;
//       setData(fetchedData);

//       const initialAlignment = {};

//       fetchedData.forEach((item) => {
//         initialAlignment[item.id] = item?.status === 1 ? 1 : 0;
//       });
//       setAlignment(initialAlignment);
//     }
//   }, [fetchData]);

//   const isLiveMode = data?.some(
//     (item) => item?.type === 6 && item.status === 1
//   );

//   const getButtonClassName = (statusValue) => {
//     const finalStatus = isLiveMode ? 3 : statusValue;
//     switch (finalStatus) {
//       case 3:
//         return "status-btn live";
//       case 0:
//         return "status-btn offline";
//       case 2:
//         return "status-btn busy";
//       case 1:
//         return "status-btn available";
//       default:
//         return "status-btn unknown";
//     }
//   };

//   const handleChange = (id, newValue, service) => {
//     console.log("first", newValue);
//     if (newValue === null) return;

//     // Always open modal regardless of value
//     setSelectedService({ ...service, newDisplayStatus: newValue });
//   };

//   const handleSwitchChange = (id, checked, service) => {
//     const newValue = checked ? 1 : 0;
//     setAlignment((prev) => ({ ...prev, [id]: newValue }));
//     // setSelectedService({ ...service, newDisplayStatus: newValue });
//   };

//   const handleModalClose = () => {
//     setSelectedService(null);
//   };

//   const canUpdateStatus = {
//     astrologer: permissions?.["astrologer"]?.includes(
//       "update_astrologer_profile_service_status"
//     ),
//     coach: permissions?.["coach"]?.includes(
//       "update_coach_profile_service_status"
//     ),
//     listrner: permissions?.["listener"]?.includes(
//       "update_listener_profile_service_status"
//     ),
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const body = {
//         id: service.id,
//         body: {
//           status: statusValue,
//         },
//       };

//       const response = await updateDisplayStatus(body).unwrap();

//       if (response?.status) {
//         toast.success(
//           response.message ||
//             `Service ${actionText.toLowerCase()}n successfully!`
//         );
//         // onSuccess(service.id, statusValue);

//       } else {
//         toast.error(response.message || "Something went wrong.");
//       }
//     } catch (error) {
//       console.error("Failed to update status", error);
//       toast.error(error?.data?.message || "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const hasEditPermission = Object.values(canUpdateStatus).some(Boolean);

//   return (
//     <div className="status-availability">
//       <footer className="card-footer">
//         {data?.map((status) => (
//           <React.Fragment key={status.id}>
//             <div className="card-footer-content">
//               <div className="info-pair">
//                 <p className="info-item">
//                   <strong>{getServiceStatusLabel(status?.type)}</strong>
//                 </p>
//                 <p className="info-item">
//                   <button className={getButtonClassName(status.status)}>
//                     {isLiveMode
//                       ? "Live"
//                       : availableStatus[status.status] || "Unknown"}
//                   </button>
//                 </p>

//                 <ToggleButtonGroup
//                   color="primary"
//                   value={alignment[status.id]}
//                   onChange={(e, newVal) =>
//                     handleChange(status.id, newVal, status)
//                   }
//                   exclusive
//                   aria-label="Display Status"
//                 >
//                   {hasEditPermission && (
//                     <>
//                       <ToggleButton
//                         value={1}
//                         sx={{
//                           borderRadius: "10px",
//                           padding: "4px 12px",
//                           "&.Mui-selected": {
//                             backgroundColor: "#696cff",
//                             color: "white",
//                           },
//                         }}
//                         disabled={status.display_status === 0}
//                       >
//                         Active
//                       </ToggleButton>
//                       <ToggleButton
//                         value={0}
//                         sx={{
//                           borderRadius: "10px",
//                           padding: "4px 12px",
//                           marginLeft: "10px",
//                           "&.Mui-selected": {
//                             backgroundColor: "#696cff",
//                             color: "white",
//                           },
//                         }}
//                         disabled={status.display_status === 0}
//                       >
//                         Inactive
//                       </ToggleButton>
//                     </>
//                   )}
//                 </ToggleButtonGroup>

//                 <Switch
//                   checked={alignment[status.id] === 1}
//                   onChange={(e) =>
//                     handleSwitchChange(status.id, e.target.checked, status)
//                   }
//                   disabled={status.display_status === 0}
//                   color="primary"
//                 />
//               </div>
//             </div>
//             <div className="dividerm"></div>
//           </React.Fragment>
//         ))}
//       </footer>

//       {selectedService && (
//         <CoachServiceStatusModal
//           isOpen={!!selectedService}
//           onClose={handleModalClose}
//           service={selectedService}
//         />
//       )}
//     </div>
//   );
// };

// export default CoachServiceStatus;

import React, { useState, useEffect } from "react";
import {
  useGetConsultantsServiceStatusQuery,
  useUpdateConsultantServiceStatusMutation,
} from "../../../../_store/api";
import { useSelector } from "react-redux";
import { getServiceStatusLabel } from "../../../../_constants/consultantConstant";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import usePermissions from "../../../../_components/reuseComponents/permission/EmpPermission";
import { Switch } from "@mui/material";
import toast from "react-hot-toast";

const availableStatus = {
  0: "Offline",
  1: "Available",
  2: "Busy",
  3: "Live",
};

const CoachServiceStatus = () => {
  const [data, setData] = useState([]);
  const [alignment, setAlignment] = useState({});
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const permissions = usePermissions();
  const [updateDisplayStatus] = useUpdateConsultantServiceStatusMutation();
  const [loading, setLoading] = useState(false);

  const { data: fetchData, refetch } = useGetConsultantsServiceStatusQuery({
    id: consultantId,
  });

  useEffect(() => {
    if (fetchData?.data) {
      const fetchedData = fetchData.data;
      setData(fetchedData);
      const initialAlignment = {};
      fetchedData.forEach((item) => {
        initialAlignment[item.id] = item?.status === 1 ? 1 : 0;
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

  // 🔘 Active / Inactive toggle buttons (still opens modal if needed)
  const handleChange = (id, newValue, service) => {
    if (newValue === null) return;
    toast("Use the switch to change status directly.", { icon: "ℹ️" });
  };

  // ✅ Direct API call on Switch toggle
  const handleSwitchChange = async (id, checked, service) => {
    const newValue = checked ? 1 : 0;
    setAlignment((prev) => ({ ...prev, [id]: newValue }));

    setLoading(true);
    try {
      const body = {
        id: service.id,
        body: { status: newValue },
      };

      const response = await updateDisplayStatus(body).unwrap();

      if (response?.status) {
        toast.success(
          response.message ||
            `Service ${
              newValue === 1 ? "activated" : "deactivated"
            } successfully!`
        );
        // Refetch data to sync latest state
        refetch();
      } else {
        toast.error(response.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error(error?.data?.message || "An unexpected error occurred.");
      // Roll back UI if API fails
      setAlignment((prev) => ({ ...prev, [id]: service.status }));
    } finally {
      setLoading(false);
    }
  };

  const canUpdateStatus = {
    astrologer: permissions?.["astrologer"]?.includes(
      "update_astrologer_profile_service_status"
    ),
    coach: permissions?.["coach"]?.includes(
      "update_coach_profile_service_status"
    ),
    listener: permissions?.["listener"]?.includes(
      "update_listener_profile_service_status"
    ),
  };
  const hasEditPermission = Object.values(canUpdateStatus).some(Boolean);

  return (
    <div className="status-availability">
      <footer className="card-footer">
        {data?.map((status) => (
          <React.Fragment key={status.id}>
            <div className="card-footer-content">
              <div className="info-pair flex items-center gap-4">
                <p className="info-item">
                  <strong>{getServiceStatusLabel(status?.type)}</strong>
                </p>
                <p className="info-item">
                  <button className={getButtonClassName(status.status)}>
                    {isLiveMode
                      ? "Live"
                      : availableStatus[status.status] || "Unknown"}
                  </button>
                </p>

                {hasEditPermission && (
                  <div className="flex items-center gap-3">
                    {/* Keep Active/Inactive buttons for reference */}
                    {/* <ToggleButtonGroup
                      color="primary"
                      value={alignment[status.id]}
                      onChange={(e, newVal) =>
                        handleChange(status.id, newVal, status)
                      }
                      exclusive
                      aria-label="Display Status"
                    >
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
                        disabled={status.display_status === 0 || loading}
                      >
                        Active
                      </ToggleButton>
                      <ToggleButton
                        value={0}
                        sx={{
                          borderRadius: "10px",
                          padding: "4px 12px",
                          marginLeft: "10px",
                          "&.Mui-selected": {
                            backgroundColor: "#696cff",
                            color: "white",
                          },
                        }}
                        disabled={status.display_status === 0 || loading}
                      >
                        Inactive
                      </ToggleButton>
                    </ToggleButtonGroup> */}

                    {/* ✅ Direct Switch for API call */}
                    <Switch
                      checked={alignment[status.id] === 1}
                      onChange={(e) =>
                        handleSwitchChange(status.id, e.target.checked, status)
                      }
                      disabled={status.display_status === 0 || loading}
                      color="primary"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="dividerm"></div>
          </React.Fragment>
        ))}
      </footer>
    </div>
  );
};

export default CoachServiceStatus;
