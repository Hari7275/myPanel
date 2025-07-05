import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";

import { adminUserListColumn } from "../adminListingColumn";
import AddAdminUser from "./AddAdminUser";
import UpdateAdminUser from "./UpdateAdminUser";

import DeleteComponent from "../../payments/DeleteComponent";
import { Atom } from "react-loading-indicators";
import usePermissions from "../_components/reuseComponents/permission/EmpPermission";

import {
  useGetAdminUserListQuery,
  useDeleteAdminUserMutation,
} from "../../../_store/api";

const AdminUser = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const permissions = usePermissions();

  // Fetching API data for listing reviews
  const { data: fetchData, isLoading } = useGetAdminUserListQuery();
  const [deleteData] = useDeleteAdminUserMutation();

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
      permissions?.["admin"]?.includes("create_admin_user") && (
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
          Add new User
        </button>
      )
    );
  };

  const columns = useMemo(() => [
    ...adminUserListColumn,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          {permissions?.["admin"]?.includes("delete_admin_user") && (
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
              />
            </span>
          )}
          {permissions?.["admin"]?.includes("update_admin_user") && (
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateData(row.original)}
              />
            </span>
          )}
        </div>
      ),
    },
  ]);

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Admin Users"
        AddPackageButton={AddButton}
        showTableHeading={false}
        includeCheckbox={false}
      />
      {addData && <AddAdminUser isOpen={addData} onClose={toggleAddData} />}
      {updateData && (
        <UpdateAdminUser
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

export default AdminUser;
