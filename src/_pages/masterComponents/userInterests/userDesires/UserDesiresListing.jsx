import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import AddUserDesire from "./AddUserDesire";
import UpdateUserDesire from "./UpdateUserDesire";
import DeleteComponent from "../../../payments/DeleteComponent";
import {
  useGetUserDesireListQuery,
  useDeleteInterestMutation,
} from "../../../../_store/api/masterComponentsApi/userInterest";

const UserDesiresListing = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  const { data: fetchData } = useGetUserDesireListQuery();
  const [deleteInterest] = useDeleteInterestMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data);
    }
  }, [fetchData]);

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

  const COLUMNSProfileOptions = [
    {
      Header: "SR. No.",
      accessor: "id",
    },
    {
      Header: "Title",
      accessor: "passion",
    },

    {
      Header: "Image",
      accessor: "image",
      Cell: ({ row }) => (
        <div className="card-img">
          <img
            src={row.original.image || "snake.jpg"}
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
  ];

  const columns = useMemo(() => COLUMNSProfileOptions, []);

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
      Add Desire
    </button>
  );
  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        tableTitle="User Desires"
        includeActions={false}
        includeCheckbox={false}
        AddPackageButton={AddButton}
      />
      {addData && <AddUserDesire isOpen={addData} onClose={toggleAddData} />}

      {updateData && (
        <UpdateUserDesire
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

export default UserDesiresListing;
