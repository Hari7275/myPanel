import React, { useMemo, useState, useEffect } from "react";
import ReactModal from "react-modal";
// import AddChildFeature from "./AddChildFeature";
import UpdateSupportRequest from "./UpdateSupportRequest";
import DeleteComponent from "../../../payments/DeleteComponent";
import { Pencil, Trash } from "lucide-react";
import { formatDateTime } from "../../../../_constants/formatedDate";

import CommonTable from "../../../../_components/table/CommonTable";
import { useDeleteSupportResponseListMutation } from "../../../../_store/api";
import { useGetUserSupportResponseListQuery } from "../../../../_store/api";

const SupportResponseList = ({ isOpen, onClose, selectedData }) => {
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  //   console.log("selectedData", selectedData?.id);

  const [deleteSupportResponse] = useDeleteSupportResponseListMutation();

  // Fetching API data for listing reviews
  const { data: fetchData, isLoading } = useGetUserSupportResponseListQuery({
    user_ticket_id: selectedData?.id,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data?.rows);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Toggle function for updating a review
  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdateData(!updateData);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteSupportResponse({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },

      // {
      //   Header: "Meta Key",
      //   accessor: "meta_key",
      // },

      {
        Header: "Support Executive",
        accessor: "support_executive_id",
      },
      {
        Header: "Message",
        accessor: "response_message",
      },
      {
        Header: "Time",
        accessor: "createdAt",
        Cell: ({ value }) => formatDateTime(value),
      },

      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              className="deleteIcon"
              onClick={() => toggleDeleteComponent(row.original)}
            >
              <Trash className="iconSmall" />
            </span>
            <span
              className="editIcon"
              onClick={() => toggleUpdateData(row.original)}
            >
              <Pencil className="iconSmall" />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        <CommonTable
          columns={columns}
          data={data}
          tableTitle="Support Response List"
          includeActions={false}
          includeCheckbox={false}
        />
      </ReactModal>

      {/* {addData && (
        <AddChildFeature
          isOpen={addData}
          onClose={toggleAddData}
          meta_key={response}
        />
      )} */}
      {updateData && (
        <UpdateSupportRequest
          isOpen={updateData}
          onClose={toggleUpdateData}
          selectedRow={selectedRow}
          isUpdate={true}
        />
      )}
      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={toggleDeleteComponent}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default SupportResponseList;
