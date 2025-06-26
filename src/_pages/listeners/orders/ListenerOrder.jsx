import React, { useMemo, useEffect, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { ORDERCHARTCOLUMN } from "./listenerOrderColumns";
import { useGetConsultantsOrderQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

const ListenerOrder = () => {
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchData, isLoading } =
    useGetConsultantsOrderQuery(consultantId);

  useEffect(() => {
    if (fetchData && fetchData.data) {
      // Filter the data to only include items with order_type === 6
      const response = fetchData.data.filter(
        (result) => result.order_type !== 6
      );
      setData(response);
    } else {
      setData([]); // Set to empty if no data is fetched
    }
  }, [fetchData]);
  const columns = useMemo(() => ORDERCHARTCOLUMN, []);

  if (isLoading) {
    return <span>Lodaing ...</span>;
  }
  return (
    <>
      {fetchData ? (
        <div className="ProfileData-container profile-right-sub-container">
          <CommonTable
            columns={columns}
            data={data}
            includeActions={false}
            tableTitle=" Orders Chart"
            includeCheckbox={false}
          />
        </div>
      ) : (
        "No data avaliable"
      )}
    </>
  );
};

export default ListenerOrder;
