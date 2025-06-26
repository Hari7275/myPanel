import React, { useMemo, useEffect, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { ORDERCHARTCOLUMN } from "./coachOrderColumns";
import { useGetConsultantsOrderQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

const CoachOrder = () => {
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const {
    data: fetchData,
    isFetching,
    isLoading,
    error,
  } = useGetConsultantsOrderQuery(consultantId);

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      const response = fetchData.data.filter(
        (result) => result?.order_type !== 6
      );
      setData(response);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => ORDERCHARTCOLUMN, []);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong while fetching data.</div>;
  }

  return (
    <div className="ProfileData-container profile-right-sub-container">
      {data.length > 0 ? (
        <CommonTable
          columns={columns}
          data={data}
          includeActions={false}
          tableTitle="Orders Chart"
        />
      ) : (
        <div>No orders available.</div>
      )}
    </div>
  );
};

export default CoachOrder;
