import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash, ArrowRight } from "lucide-react";

import { adminPermissionGroupListColumn } from "../adminListingColumn";

import AddAdminPermission from "./AddAdminPermission";

import UpdateAdminPermission from "./UpdateAdminPermission";
import DeleteComponent from "../../payments/DeleteComponent";
import { useParams } from "react-router-dom";

import {
  useGetPermissionListQuery,
  useDeletePermissionMutation,
} from "../../../_store/api";

const AdminPermission = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  const { id } = useParams();

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetPermissionListQuery({ group_id: id });
  const [deleteData] = useDeletePermissionMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.records);
    } else setData([]);
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
      deleteData({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };

  const AddButton = () => {
    return (
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
        create group to permission
      </button>
    );
  };

  const columns = useMemo(() => [
    ...adminPermissionGroupListColumn,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span className="deleteIcon">
            <Trash
              className="iconSmall"
              onClick={() => toggleDeleteComponent(row.original)}
            />
          </span>
          <span className="editIcon" aria-label=" button for update ">
            <Pencil
              aria-label="cancel button"
              className="iconSmall"
              onClick={() => toggleUpdateData(row.original)}
            />
          </span>
        </div>
      ),
    },
  ]);

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Allow Permission to Group"
        AddPackageButton={AddButton}
      />
      {addData && (
        <AddAdminPermission
          isOpen={addData}
          onClose={toggleAddData}
          group_id={id}
        />
      )}
      {updateData && (
        <UpdateAdminPermission
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

export default AdminPermission;
