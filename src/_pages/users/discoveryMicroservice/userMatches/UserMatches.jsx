import React from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { USERMATCHCOLUMN } from "./userMatchesColumn";
import { useGetUsermatchListQuery } from "../../../../_store/api";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";

const UserMatches = () => {
  const userId = useSelector((state) => state.user.userData);

  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetUsermatchListQuery(userId);

  // Derive result directly from fetchData
  const result = fetchData?.data?.records || [];

  // Use USERMATCHCOLUMN directly
  const columns = USERMATCHCOLUMN;

  // Handle loading state
  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching data.</div>;
  }

  // Handle no data state
  if (result.length === 0) {
    return <div>No matches available.</div>;
  }

  return (
    <>
      
      <CommonTable
        columns={columns}
        data={result}
        includeActions={false}
        tableTitle="User's Match"
      />
    </>
  );
};

export default UserMatches;
