import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash, ArrowRight } from "lucide-react";

import { adminPermissionGroupListColumn } from "../adminListingColumn";

import AddAdminPermission from "./AddAdminPermission";

import UpdateAdminPermission from "./UpdateAdminPermission";
import DeleteComponent from "../../payments/DeleteComponent";
import { useParams } from "react-router-dom";
import { Atom } from "react-loading-indicators";

import {
  useGetPermissionListQuery,
  useDeletePermissionMutation,
} from "../../../_store/api";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const AdminPermission = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const permissions = usePermissions();

  const { id } = useParams();

  // Fetching API data for listing reviews
  const { data: fetchData, isLoading } = useGetPermissionListQuery({
    group_id: id,
  });
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
      permissions?.["admin"]?.includes("create_admin_permission") && (
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
          Create Permission
        </button>
      )
    );
  };

  const columns = useMemo(() => [
    ...adminPermissionGroupListColumn,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          {permissions?.["admin"]?.includes("delete_admin_permission") && (
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
              />
            </span>
          )}

          {permissions?.["admin"]?.includes("update_admin_permission") && (
            <span className="editIcon" aria-label=" button for update ">
              <Pencil
                aria-label="cancel button"
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
        tableTitle="Permission List"
        AddPackageButton={AddButton}
        showTableHeading={false}
        includeCheckbox={false}
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
