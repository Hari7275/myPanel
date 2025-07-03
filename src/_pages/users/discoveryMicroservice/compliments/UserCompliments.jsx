import React, { useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { COMPLIMENTSCOLUMN } from "./userComplimentsColumn";
import { useSelector } from "react-redux";
import { useGetUserComplimentListQuery } from "../../../../_store/api/user/discovery";
import { Atom } from "react-loading-indicators";

const UserCompliments = () => {
  const userId = useSelector((state) => state.user.userData);

  const [data, setData] = useState([]);
  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetUserComplimentListQuery(userId);

  useEffect(() => {
    if (fetchData?.data) {
      setData(fetchData.data);
    } else {
      setData([]); 
    }
  }, [fetchData]);

  const columns = COMPLIMENTSCOLUMN;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  return (
    <>
      {data.length > 0 ? (
        <CommonTable
          columns={columns}
          data={data}
          includeActions={false}
          tableTitle="User's Compliments"
        />
      ) : (
        <div>No Data available.</div>
      )}
    </>
  );
};

export default UserCompliments;
