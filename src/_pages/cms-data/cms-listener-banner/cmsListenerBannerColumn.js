import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useUpdateCmsListenerBannerMutation } from "../../../_store/api";
import UseImageModal from "../../../_components/table/CommonImageModal";
import TruncateText from "../../../_components/table/TruncateText";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.is_published);
  const [updateStatus, { isLoading }] = useUpdateCmsListenerBannerMutation();

  // Sync state with prop when data refetches
  useEffect(() => {
    setStatus(row.original.is_published);
  }, [row.original.is_published]);

  const handleToggle = async () => {
    const newStatus = !status;
    setStatus(newStatus);

    try {
      const response = await updateStatus({
        id: row.original._id,
        body: { is_published: newStatus ? 1 : 0 },
      }).unwrap();

      if (!response.status) {
        setStatus(status);
      }
    } catch (error) {
      console.log("failed to update status", error);
      setStatus(status);
    }
  };

  return (
    <Switch
      checked={status == true}
      onChange={handleToggle}
      disabled={isLoading}
    />
  );
};

export const CMSLISTENERBANNERCOLUMN = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Image",
    Cell: ({ row }) => {
      const { openImageModal, ImageModal } = UseImageModal();

      return (
        <>
          <img
            src={row?.original?.image?.url}
            alt={row?.original?.image?.alt}
            title={row?.original?.image?.title}
            width="80"
            height="40"
            style={{ cursor: "pointer" }}
            onClick={() => openImageModal(row?.original?.image?.url)}
          />
          <ImageModal />
        </>
      );
    },
  },
  {
    Header: "Description",
    accessor: "image.description",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },
  {
    Header: "Published",
    accessor: "is_published",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
