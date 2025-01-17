import React, { useMemo, useState, useEffect } from "react";
import ReactModal from "react-modal";
import AddChildFeature from "./AddChildFeature";
import UpdateChildFeature from "./UpdateChildFeature";
import DeleteComponent from "../../../payments/DeleteComponent";
import { Pencil, Trash } from "lucide-react";

import CommonTable from "../../../../_components/table/CommonTable";
import { useDeleteInterestMutation } from "../../../../_store/api/masterComponentsApi/userInterest";

const ChildFeature = ({ isOpen, onClose, data, optionFeature }) => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [deleteInterest] = useDeleteInterestMutation();

  //  response meta_key

  const response = optionFeature;

  // Toggle function for adding a review
  const toggleAddData = () => {
    setAddData(!addData);
  };

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
      deleteInterest({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Id",
        accessor: "id",
      },

      // {
      //   Header: "Meta Key",
      //   accessor: "meta_key",
      // },

      {
        Header: "Meta State",
        accessor: "meta_state",
      },
      {
        Header: "Image",
        accessor: "meta_image",
        Cell: ({ row }) => (
          <div className="card-img">
            <img
              src={row.original.meta_image || "snake.jpg"}
              alt="Card Image"
              width="40"
              height="40"
            />
          </div>
        ),
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

  const AddButton = () => (
    <button
      className="addButton"
      style={{
        position: "absolute",
        right: "20px",
        backgroundColor: "#18B164",
        padding: "6px",
      }}
      onClick={toggleAddData}
    >
      Add child
    </button>
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
          tableTitle=" Child Profile Options"
          includeActions={false}
          includeCheckbox={false}
          AddPackageButton={AddButton}
        />
      </ReactModal>

      {addData && (
        <AddChildFeature
          isOpen={addData}
          onClose={toggleAddData}
          meta_key={response}
        />
      )}
      {updateData && (
        <UpdateChildFeature
          isOpen={updateData}
          onClose={toggleUpdateData}
          selectedRow={selectedRow}
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

export default ChildFeature;
