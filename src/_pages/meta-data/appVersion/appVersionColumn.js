import { formatDateTime } from "../../../_constants/formatedDate";

export const APPVERSIONCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
    // Cell: ({ row }) => row.index + 1,
  },
  {
    Header: "Device Info",
    accessor: "key",
    Cell: ({ value }) => (value == 1 ? "Android" : "iOS"),
  },
  {
    Header: "App Type",
    accessor: "type",
    Cell: ({ value }) => (value == 1 ? "User app" : "Consutlant App"),
  },
  {
    Header: "Version",
    accessor: "version",
  },
  {
    Header: "Force Update",
    accessor: "force_update",
    Cell: ({ value }) => (value == true ? "True" : "False"),
  },

  {
    Header: "Date",
    accessor: "created_at",
    Cell: ({ value }) => formatDateTime(value),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (value == 1 ? "Active" : "Inactive"),
  },
];
