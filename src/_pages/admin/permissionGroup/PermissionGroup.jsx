import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash, ArrowRight } from "lucide-react";

import { adminPermissionListColumn } from "../adminListingColumn";
import AddPermissionGroup from "./AddPermissionGroup";

import UpdatePermissionGroup from "./UpdatePermissionGroup";
import DeleteComponent from "../../payments/DeleteComponent";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

import {
  useGetAdminPermissionGroupListQuery,
  useDeleteAdminPermissionGroupMutation,
} from "../../../_store/api";
import { useNavigate } from "react-router-dom";
import { Atom } from "react-loading-indicators";

const PermissionGroup = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const permissions = usePermissions();

  // Fetching API data for listing reviews
  const { data: fetchData, isLoading } = useGetAdminPermissionGroupListQuery();
  const [deleteData] = useDeleteAdminPermissionGroupMutation();

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
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

  const handleActionClick = (data) => {
    setTimeout(() => {
      navigate(`/admin-permission/${data.id}`);
    }, 0);
  };

  const AddButton = () => {
    return (
      permissions?.["admin"]?.includes("create_admin_permission_group") && (
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
          Add Permission Group
        </button>
      )
    );
  };

  const columns = useMemo(() => [
    ...adminPermissionListColumn,
    {
      Header: () => <div className="actions-header">Actions</div>,

      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          {permissions?.["admin"]?.includes("view_admin_permission_group") && (
            <span
              title="view details"
              className="secondIcon"
              style={{
                display: "inline-block",
                height: "35px",
                width: "35px",
              }}
              onClick={() => handleActionClick(row.original)}
            >
              <ArrowRight className="iconSmall" />
            </span>
          )}

          {permissions?.["admin"]?.includes(
            "delete_admin_permission_group"
          ) && (
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
              />
            </span>
          )}

          {permissions?.["admin"]?.includes(
            "update_admin_permission_group"
          ) && (
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
        tableTitle="Permission Group"
        AddPackageButton={AddButton}
        showTableHeading={false}
        includeCheckbox={false}
      />
      {addData && (
        <AddPermissionGroup isOpen={addData} onClose={toggleAddData} />
      )}
      {updateData && (
        <UpdatePermissionGroup
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

export default PermissionGroup;
