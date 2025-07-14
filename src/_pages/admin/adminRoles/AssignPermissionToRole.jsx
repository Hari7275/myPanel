import React, { useState, useEffect } from "react";
import {
  useGetAdminAssignPermissionListQuery,
  useCreateAdminRolePermissionMutation,
  useGetAdminselectedPermissionListQuery,
} from "../../../_store/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Atom } from "react-loading-indicators";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const AssignPermissionToRole = () => {
  const { id } = useParams(); // Assuming route has role_id as a param
  const { data: fetchData, isLoading } = useGetAdminAssignPermissionListQuery();
  const { data: selectedPermission, isLoading: isGetting } =
    useGetAdminselectedPermissionListQuery(parseInt(id));
  const [updateData, { isLoading: isUpdating }] =
    useCreateAdminRolePermissionMutation();

  const [data, setData] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const permissions = usePermissions();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);

  useEffect(() => {
    if (selectedPermission?.data?.records) {
      const mappedPermissions = {};

      selectedPermission.data.records.forEach((group) => {
        if (group.permissions && group.permissions.length > 0) {
          mappedPermissions[group.id] = group.permissions.map((p) => p.id);
        }
      });

      setSelectedPermissions(mappedPermissions);
    }
  }, [selectedPermission]);

  const handleCheckboxChange = (groupId, permissionId) => {
    setSelectedPermissions((prev) => {
      const groupPermissions = new Set(prev[groupId] || []);
      if (groupPermissions.has(permissionId)) {
        groupPermissions.delete(permissionId);
      } else {
        groupPermissions.add(permissionId);
      }
      return {
        ...prev,
        [groupId]: [...groupPermissions],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      role_id: parseInt(id),
      permission_ids: selectedPermissions,
    };

    try {
      const response = await updateData({ body: payload }).unwrap();

      if (response?.status) {
        toast.success(response?.message || "Group updated successfully!");
      } else {
        toast.error(
          response?.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("Error updating permissions:", err);
      toast.error(err?.data?.message || "An unexpected error occurred.");
    }
  };

  if (isLoading && isGetting) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <div
      className="ProfileData-card"
      style={{
        overflow: "scroll",
        height: "calc(-67px + 100vh)",
      }}
    >
      {/* <h2 className="tableHeadingDiv" style={{ padding: "20px 40px" }}>
        Assign Permissions
      </h2> */}
      <form onSubmit={handleSubmit}>
        <div className="row-inside" style={{ margin: "20px 60px" }}>
          {permissions?.["admin"]?.includes("assign_role_permissions") && (
            <button type="submit" className="role-fifthButton" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Permissions"}
            </button>
          )}
          <div className="divider"></div>
          <div className="col-12">
            {data?.map((group, groupIndex) => (
              <div key={groupIndex} style={{ marginBottom: "10px" }}>
                <strong>{group.name}</strong>
                <div className="ProfileData-checklist">
                  {group.permissions.map((permission) => (
                    <div key={permission.id}>
                      <label className="input-group-options">
                        <input
                          className="input-group-radio"
                          type="checkbox"
                          checked={
                            selectedPermissions[group.id]?.includes(
                              permission.id
                            ) || false
                          }
                          onChange={() =>
                            handleCheckboxChange(group.id, permission.id)
                          }
                        />
                        <span>{permission.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </form>
    </div>
  );
};

export default AssignPermissionToRole;
