import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash, ArrowRight } from "lucide-react";

import { adminRoleListColumn } from "../adminListingColumn";
import UpdateAdminRole from "./UpdateAdminRole";
import AddAdminRole from "./AddAdminRole";

import DeleteComponent from "../../payments/DeleteComponent";
import { useNavigate } from "react-router-dom";

import {
  useGetAdminRoleListQuery,
  useDeleteAdminRoleMutation,
} from "../../../_store/api";

const AdminRole = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetAdminRoleListQuery();
  const [deleteData] = useDeleteAdminRoleMutation();

  const navigate = useNavigate();

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

  const handleActionClick = (data) => {
    setTimeout(() => {
      navigate(`/role-permission/${data.id}`);
    }, 0);
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
        Add new roles
      </button>
    );
  };

  const columns = useMemo(() => [
    ...adminRoleListColumn,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span
            title="view details"
            className="secondIcon"
            style={{
              display: "inline-block",
              height: "35px",
              width: "35px",
            }}
            onClick={() => handleActionClick(row.original)}
            // onClick={() => handleViewDetails(row.original.id)}
          >
            <ArrowRight className="iconSmall" />
          </span>
          <span className="deleteIcon">
            <Trash
              className="iconSmall"
              onClick={() => toggleDeleteComponent(row.original)}
            />
          </span>
          <span className="editIcon">
            <Pencil
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
        tableTitle="Admin Roles"
        AddPackageButton={AddButton}
      />
      {addData && <AddAdminRole isOpen={addData} onClose={toggleAddData} />}
      {updateData && (
        <UpdateAdminRole
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

export default AdminRole;
