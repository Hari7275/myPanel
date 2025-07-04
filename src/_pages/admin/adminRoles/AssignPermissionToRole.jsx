import React, { useState, useEffect } from "react";
import {
  useGetAdminAssignPermissionListQuery,
  useCreateAdminRolePermissionMutation,
  useGetAdminselectedPermissionListQuery,
} from "../../../_store/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const AssignPermissionToRole = () => {
  const { id } = useParams(); // Assuming route has role_id as a param
  const { data: fetchData } = useGetAdminAssignPermissionListQuery();
  const { data: selectedPermission } = useGetAdminselectedPermissionListQuery(
    parseInt(id)
  );
  const [updateData, { isLoading: isUpdating }] =
    useCreateAdminRolePermissionMutation();

  const [data, setData] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState({});

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
          <div className="divider"></div>
          <button type="submit" className="fifthButton" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Permissions"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignPermissionToRole;
