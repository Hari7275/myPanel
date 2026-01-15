import TruncateText from "../../../_components/table/TruncateText";

export const CMSCONSULTANTPHOTOGUIDELINES = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Slug",
    accessor: "slug",
  },

  {
    Header: "Title",
    accessor: "title",
    Cell: ({ value }) => <TruncateText text={value} wordLimit={5} />,
  },
];
