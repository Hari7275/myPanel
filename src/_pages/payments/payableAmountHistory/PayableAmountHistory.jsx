import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { PAYABLECOLUMN } from "../payoutRequest/payoutColumns";
import { Info, Pencil, Trash } from "lucide-react";
import { useGetPayableListQuery } from "../../../_store/api";
// import UpdateSubscriptionPlan from "./UpdateSubscriptionPlan";

const PayableAmountHistory = () => {
  const [data, setData] = useState([]);

  const { data: fetchData } = useGetPayableListQuery();

  useEffect(() => {
    if (fetchData && fetchData.data) {
      const result = fetchData?.data.filter((item) => item.status !== 1);
      setData(result);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Memoized columns definition for the table
  const columns = useMemo(() => [...PAYABLECOLUMN], []);

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payable Amount History"
        // AddPackageButton={AddPackageButton}
        showTableHeading={false}
      />
    </>
  );
};
export default PayableAmountHistory;
