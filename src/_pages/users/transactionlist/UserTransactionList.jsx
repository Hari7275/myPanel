import React, { useMemo, useEffect, useState } from "react";

import DyCommonTable from "../../../_components/table/DyCommonTable";
import { USERTRANSACTIONCOLUMN } from "./userTransactionsColumn";
import { useGetUserTransactionsListQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import AddRechargePlan from "./AddRechargePlan";
import { Atom } from "react-loading-indicators";

const UserTransactionList = () => {
  const [addData, setAddData] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination] = useState(true); // Enable or disable dynamic pagination
  const userId = useSelector((state) => state.user.userData);

  const [result, setResult] = useState([]);
  const columns = useMemo(() => USERTRANSACTIONCOLUMN, []);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetUserTransactionsListQuery({ userId, page: page, limit: pageSize });

  useEffect(() => {
    if (fetchData) {
      setResult(fetchData.data.transactions);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddData = () => {
    setAddData(!addData);
  };

  const AddButton = () => {
    return (
      <button
        className="addButton"
        style={{
          position: "absolute",
          right: "20px",
          backgroundColor: "#18B164",
          padding: "6px",
        }}
        onClick={toggleAddData}
      >
        Add Balance
      </button>
    );
  };

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (error) return <div>Error fetching data</div>;

  const totalPage = fetchData?.data?.totalPages || 1;

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={result}
        tableTitle="User Transaction List"
        includeActions={false}
        AddPackageButton={AddButton}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        
      />
      {addData && (
        <AddRechargePlan
          isOpen={addData}
          onClose={toggleAddData}
          userId={userId}
        />
      )}
    </>
  );
};

export default UserTransactionList;
