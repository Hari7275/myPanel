// import "../../../cssfolder/column.css";

const CustomUserType = ({ value }) => {
  return (
    <span className="orderId-color">{value == 1 ? "Android" : "IOS"}</span>
  );
};

export const CONSULTANT_DEVICE_INFO = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Consultant id",
    accessor: "consultant_id",
  },

  //   {
  //     Header: "Device id",
  //     accessor: "device_id",
  //   },
  {
    Header: "Device name",
    accessor: "device_name",
  },
  {
    Header: "Device model",
    accessor: "device_model",
  },
  {
    Header: "Device brand",
    accessor: "device_brand",
  },

  {
    Header: "Platform",
    accessor: "platform",
    Cell: CustomUserType,
  },
  {
    Header: "Os version",
    accessor: "os_version",
  },
  {
    Header: "App version",
    accessor: "app_version",
  },
  {
    Header: "Is Primary",
    accessor: "is_primary",
  },
  {
    Header: "Is active",
    accessor: "is_active",
    Cell: ({ value }) => {
      return value == 1 ? "Active" : "Inactive";
    },
  },
  {
    Header: "Login count",
    accessor: "login_count",
  },
  {
    Header: "Deactivated",
    accessor: "deactivated_at",
    Cell: ({ value }) => {
      if (!value) return "N/A";

      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },

  {
    Header: "Last Modified",
    accessor: "created_at",
    Cell: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    },
  },
];
