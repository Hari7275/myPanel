export const REPORTEDUSERCOLUMN = [
  {
    Header: "Partner Id",
    accessor: "partner_id",
  },
  {
    Header: "First Name",
    accessor: "UserProfile.first_name",
  },
  {
    Header: "Gender",
    accessor: "UserProfile.gender",
  },
  {
    Header: "Age",
    accessor: (row) => {
      const birthDate = new Date(row.UserProfile.date_of_birth);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
  },
  {
    Header: "User Type",
    accessor: "type",
  },
];
