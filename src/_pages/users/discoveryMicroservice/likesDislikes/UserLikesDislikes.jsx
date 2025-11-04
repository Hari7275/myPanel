import React from "react";
import CommonTable from "../../../../_components/table/CommonTable";

import { USERLIKESCOLUMN } from "./userLikesDislikesColumn";
import { useGetUserswipingListQuery } from "../../../../_store/api";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { useParams } from "react-router-dom";

const UserLikesDislikes = () => {
  // const userId = useSelector((state) => state.user.userData);
  const { userId } = useParams();

  const { data: fetchData, isLoading } = useGetUserswipingListQuery(userId);

  const result = fetchData?.data?.records || [];

  const columns = USERLIKESCOLUMN;
  // Handle loading state
  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <>
      {result.length ? (
        <CommonTable
          columns={columns}
          data={result}
          includeActions={false}
          tableTitle="User's Swiping"
        />
      ) : (
        "No data avaliable"
      )}
    </>
  );
};

export default UserLikesDislikes;
