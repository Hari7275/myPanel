import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateCmsBlogCategoriesMutation } from "../../../_store/api";
import TruncateText from "../../../_components/table/TruncateText";
import UseImageModal from "../../../_components/table/CommonImageModal";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.is_published);
  const [updateStatus, { isLoading }] = useUpdateCmsBlogCategoriesMutation();

  const handleToggle = async () => {
    const newStatus = status == 1 ? 0 : 1;
    setStatus(newStatus);

    try {
      await updateStatus({
        id: row.original.id,
        body: { is_published: newStatus },
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
export const CMSBLOGCATEGORIESCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Display Order",
    accessor: "display_order",
  },
  {
    Header: "Title",
    accessor: "title",
  },

  {
    Header: "Mobile Image",
    Cell: ({ row }) => {
      const { openImageModal, ImageModal } = UseImageModal();
      return (
        <>
          {/* <a href={row?.original?.icon?.url}> */}
          <img
            src={row?.original?.image_url}
            alt={row?.original?.image_meta?.alt}
            title={row?.original?.icon?.title}
            width="40"
            height="40"
            style={{ cursor: "pointer" }}
            onClick={() => openImageModal(row?.original?.image_url)}
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
    Header: "Published",
    accessor: "is_published",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
