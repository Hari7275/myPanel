import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { QDTRIPSCOLUMN } from "./qdColumn";
import { useGetQDTripsEventsListQuery } from "../../../_store/api";

const QdList = () => {
  const { data: fetchData, isLoading } = useGetQDTripsEventsListQuery({
    limit: 1000,
    page: 1,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.results) {
      setData(fetchData?.data?.results);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Memoized columns definition for the table
  const columns = useMemo(() => [...QDTRIPSCOLUMN], []);

  // at the time of loading page (data)
  if (isLoading) {
    return <span className="loadPage">Data Loading...</span>;
  }

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Quick Date Trips"
      />
    </>
  );
};

export default QdList;
