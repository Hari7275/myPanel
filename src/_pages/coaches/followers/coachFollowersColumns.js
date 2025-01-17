import { ArrowRight } from "lucide-react";
export const FOLLOWERSCOLUMN = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Image",
    Cell: ({ row }) => (
      <img src={row.original.img} alt="Avatar" width="80" height="80" />
    ),
  },
  {
    Header: "Action",
    Cell: ({ row }) => (
      <div className="secondIcon">
        <ArrowRight />
      </div>
    ),
  },
];
