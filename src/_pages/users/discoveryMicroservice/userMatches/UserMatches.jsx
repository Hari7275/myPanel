import React from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { USERMATCHCOLUMN } from "./userMatchesColumn";
import { useGetUsermatchListQuery } from "../../../../_store/api";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";

const UserMatches = () => {
  // const userId = useSelector((state) => state.user.userData);
  const { userId } = useParams();

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
        <Atom color="#3a3a3a" size="medium" text="" textColor="" />
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
