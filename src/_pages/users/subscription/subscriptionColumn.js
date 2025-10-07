export const SUBSCRIPTIONCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Package Name",
    accessor: "feature_name",
  },
  {
    Header: "Type",
    accessor: "type",
  },

  {
    Header: "Likes",
    accessor: "like_count",
    Cell: ({ value }) => (value == -1 ? "∞" : value),
  },
  {
    Header: "Good Vibes",
    accessor: "good_vibe_count",
  },
  {
    Header: "Spolight",
    accessor: "spotlight_count",
  },

  {
    Header: "Compliment",
    accessor: "compliment_count",
    Cell: ({ value }) => (value == -1 ? "∞" : value),
  },
  {
    Header: "Rewind Count",
    accessor: "rewind_count",
    Cell: ({ value }) => (value == -1 ? "∞" : value),
  },
];
