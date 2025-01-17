import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateDashboardBannerMutation } from "../../../_store/api";
import UseImageModal from "../../../_components/table/CommonImageModal";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.status);
  const [updateStatus, { isLoading }] = useUpdateDashboardBannerMutation();

  const handleToggle = async () => {
    const newStatus = status == "active" ? "inactive" : "active";
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row.original.id,
        body: { status: newStatus },
      });
    } catch (error) {
      console.log("failed to upload status", error);
      setStatus(status);
    }
  };
  return (
    <Switch
      checked={status === "active"}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

export const DASHBOARDBANNERCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "display order",
    accessor: "display_order",
  },
  // {
  //   Header: "Image",
  //   Cell: ({ row }) => {
  //     return (
  //       <img
  //         src={row?.original.banner_image}
  //         alt="Avatar"
  //         width="80"
  //         height="80"
  //       />
  //     );
  //   },
  // },

  {
    Header: "Image",
    Cell: ({ row }) => {
      const { openImageModal, ImageModal } = UseImageModal();

      return (
        <>
          <img
            src={row?.original.banner_image}
            alt="Avatar"
            width="80"
            height="80"
            style={{ cursor: "pointer" }}
            onClick={() => openImageModal(row?.original.banner_image)}
          />
          <ImageModal />
        </>
      );
    },
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
