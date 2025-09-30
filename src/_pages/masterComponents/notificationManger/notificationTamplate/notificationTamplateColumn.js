import UseImageModal from "../../../../_constants/UseImageModal";
import { formatDateTime } from "../../../../_constants/formatedDate";

export const NOTIFICATIONTAMPLATECOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },

  {
    Header: "Title ",
    accessor: "title",
  },
  {
    Header: "Message ",
    accessor: "message",
  },

  {
    Header: "Image",
    Cell: ({ row }) => {
      const { openImageModal, ImageModal } = UseImageModal();

      return (
        <>
          <img
            src={row?.original.image_url}
            alt="Avatar"
            width="80"
            height="80"
            style={{ cursor: "pointer" }}
            onClick={() => openImageModal(row?.original.image_url)}
          />
          <ImageModal />
        </>
      );
    },
  },

  {
    Header: "Date",
    accessor: "created_at",
    Cell: ({ value }) => formatDateTime(value),
  },
];
