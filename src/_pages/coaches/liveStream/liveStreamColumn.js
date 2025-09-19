import { OrderType, OrderStatus } from "../../../_constants/consultantConstant";
import { formatDateTime } from "../../../_constants/formatedDate";

export const LIVESTREAMCOLUMN = [
  {
    Header: "Live Stream Id",
    accessor: "id",
  },

  {
    Header: "Time",
    accessor: "createdAt",

    Cell: ({ value }) => formatDateTime(value),
  },

  {
    Header: "Duration (min)",
    accessor: "duration",
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const statusMap = {
        1: { text: "Pending", color: "#FFA500" },
        2: { text: "Running", color: "#8A8CD9" },
        3: { text: "Completed", color: "#008000" },
        4: { text: "Cancelled", color: "#ED0C0C" },
      };

      const status = statusMap[value] || { text: "", color: "black" };

      return (
        <span style={{ color: status.color, fontWeight: 500 }}>
          {status.text}
        </span>
      );
    },
  },
];
