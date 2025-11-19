// ***************************************adminUserListColumn************************************************

export const adminUserListColumn = [
  {
    Header: " Id",
    accessor: "id",
  },

  {
    Header: "User Name",
    accessor: "name",
  },
  {
    Header: "Email Name",
    accessor: "email",
  },
  // {
  //   Header: "Password",
  //   accessor: "password",
  // },
  {
    Header: "Role",
    accessor: "roleName",
  },
  {
    Header: "Roll Id",
    accessor: "role_id",
  },

  {
    Header: "Status",
    accessor: "status",
  },
];

export const adminRoleListColumn = [
  {
    Header: " Id",
    accessor: "id",
  },
  {
    Header: "Role",
    accessor: "name",
  },

  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "updatedAt",
    accessor: "updatedAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];

// ***************************************superAdminListColumn************************************************
export const superAdminListColumn = [
  {
    Header: " Id",
    accessor: "id",
  },
  {
    Header: "Role",
    accessor: "role",
  },

  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "updatedAt",
    accessor: "updated_at",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];

// ***************************************adminPermissionListColumn************************************************

export const adminPermissionListColumn = [
  {
    Header: " Id",
    accessor: "id",
  },

  {
    Header: "Group Name",
    accessor: "name",
  },

  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "updatedAt",
    accessor: "updatedAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];

// ***************************************adminPermissionGroupListColumn************************************************

export const adminPermissionGroupListColumn = [
  {
    Header: " Id",
    accessor: "id",
  },
  {
    Header: " group_id",
    accessor: "group_id",
  },

  {
    Header: "Group Name",
    accessor: "name",
  },

  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "updatedAt",
    accessor: "updatedAt",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];
