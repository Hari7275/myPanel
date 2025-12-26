import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateCmsBlogListMutation } from "../../../_store/api";
import UseImageModal from "../../../_components/table/CommonImageModal";
import ReactModal from "react-modal";
import TruncateText from "../../../_components/table/TruncateText";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.is_published);
  const [updateStatus, { isLoading }] = useUpdateCmsBlogListMutation();

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
const NameCell = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="column_container">
      <div className="card-img" style={{ width: "100px" }}>
        <img
          src={row?.original?.webFeaturedImage?.url || "avatar11.png"}
          alt={row?.original?.webFeaturedImage?.alt}
          title={row?.original?.webFeaturedImage?.title}
          width="80"
          height="40"
          onClick={handleImageClick}
        />
      </div>
      <span className="column_container_name"></span>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="imageModal"
        overlayClassName="overlay"
      >
        <img
          src={row?.original?.webFeaturedImage?.url || "avatar11.png"}
          alt={row?.original?.webFeaturedImage?.alt}
          width="100%"
          height="600px"
        />
      </ReactModal>
    </div>
  );
};
export const CMSBLOGCOLUMN = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Title",
    accessor: "title",
  },

  {
    Header: "Web Image",
    Cell: NameCell,
  },
  {
    Header: "Slug",
    accessor: "slug.current",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },

  {
    Header: "Author",
    accessor: "author.name",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },

  {
    Header: "Published",
    accessor: "is_published",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
