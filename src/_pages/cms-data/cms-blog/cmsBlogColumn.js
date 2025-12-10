import React, { useState } from "react";
import { Switch } from "@mui/material";
import { useUpdateCmsDashboardBannerMutation } from "../../../_store/api";
import UseImageModal from "../../../_components/table/CommonImageModal";
import ReactModal from "react-modal";
import TruncateText from "../../../_components/table/TruncateText";

const StatusSwitch = ({ row }) => {
  const [status, setStatus] = useState(row.original.is_published);
  const [updateStatus, { isLoading }] = useUpdateCmsDashboardBannerMutation();

  const handleToggle = async () => {
    const newStatus = status == true ? false : true;
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
      checked={status == true}
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
      <div className="card-img" style={{width:"100px"}}>
        <img
          src={row?.original.web_view_image.url || "avatar11.png"}
          alt={row?.original.web_view_image.alt}
          title={row?.original.web_view_image.title}
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
          src={row?.original.web_view_image.url || "avatar11.png"}
          alt={row?.original.web_view_image.alt}
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
    accessor: "id",
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
    Header: "Web Description",
    accessor: "web_view_image.description",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },
  {
    Header: "Mobile Image",
    Cell: ({ row }) => {
      const { openImageModal, ImageModal } = UseImageModal();

      return (
        <>
          <img
            src={row?.original?.mobile_view_image?.url}
            alt={row?.original?.mobile_view_image?.url}
            title={row?.original.mobile_view_image.title}
            width="40"
            height="40"
            style={{ cursor: "pointer" }}
            onClick={() =>
              openImageModal(row?.original?.mobile_view_image?.url)
            }
          />
          <ImageModal />
        </>
      );
    },
  },

  {
    Header: "Mobile Description",
    accessor: "mobile_view_image.description",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },

  {
    Header: "Published",
    accessor: "is_published",
    Cell: ({ row }) => <StatusSwitch row={row} />,
  },
];
