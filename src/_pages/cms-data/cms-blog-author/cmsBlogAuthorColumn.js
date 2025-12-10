import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateCmsBlogAuthorMutation } from "../../../_store/api";
import UseImageModal from "../../../_components/table/CommonImageModal";
import ReactModal from "react-modal";
import TruncateText from "../../../_components/table/TruncateText";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.is_active);
  const [updateStatus, { isLoading }] = useUpdateCmsBlogAuthorMutation();

  const handleToggle = async () => {
    const newStatus = status == 1 ? 0 : 1;
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row.original.id,
        body: { is_active: newStatus },
      });
    } catch (error) {
      console.log("failed to upload status", error);
      setStatus(status);
    }
  };
  return (
    <Switch
      checked={status == 1}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};
export const CMSBLOGAUTHORCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Position",
    accessor: "position",
  },

  {
    Header: "Mobile Image",
    Cell: ({ row }) => {
      const { openImageModal, ImageModal } = UseImageModal();
      return (
        <>
          {/* <a href={row?.original?.icon?.url}> */}
          <img
            src={row?.original?.image?.url}
            alt={row?.original?.image?.alt}
            title={row?.original?.image?.title}
            width="40"
            height="40"
            style={{ cursor: "pointer" }}
            onClick={() => openImageModal(row?.original?.image?.url)}
          />
          <ImageModal />

          {/* </a> */}
        </>
      );
    },
  },

  // {
  //   Header: "Mobile Description",
  //   accessor: "icon.description",
  //   Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  // },

  {
    Header: "Active",
    accessor: "is_active",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
