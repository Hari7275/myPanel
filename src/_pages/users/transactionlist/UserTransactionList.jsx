import React, { useMemo, useEffect, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { USERTRANSACTIONCOLUMN } from "./userTransactionsColumn";
import { useGetUserTransactionsListQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import AddRechargePlan from "./AddRechargePlan";

const UserTransactionList = () => {
  const [addData, setAddData] = useState(false);
  const userId = useSelector((state) => state.user.userData);

  const [result, setResult] = useState([]);
  const columns = useMemo(() => USERTRANSACTIONCOLUMN, []);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetUserTransactionsListQuery(userId);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      <CommonTable
        columns={columns}
        data={result}
        includeActions={false}
        AddPackageButton={AddButton}
        tableTitle="User Transaction List"
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
