import moment from "moment"; // Make sure moment is installed and imported

export const DETAILSCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Listener Id",
    accessor: "listener_id",
  },
  {
    Header: "Start Time",
    accessor: "joined_at",
    Cell: ({ value }) => moment(value).format("MM-DD hh:mm:ss A"),
  },
  {
    Header: "End Time",
    accessor: "left_at",
    Cell: ({ value }) => moment(value).format("MM-DD hh:mm:ss A"),
  },
  {
    Header: "Duration",
    accessor: "duration",
    Cell: ({ row }) => {
      const start = moment(row.original.joined_at);
      const end = moment(row.original.left_at);
      const duration = moment.duration(end.diff(start));

      const minutes = duration.minutes();
      const seconds = duration.seconds();
      const formatted = `${minutes}m ${seconds}s`;

      return formatted;
    },
  },
];
