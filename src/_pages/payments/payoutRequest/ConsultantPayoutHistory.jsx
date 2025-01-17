import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { PAYOUTCOLUMN } from "./payoutColumns";
import { Info, Pencil, Trash } from "lucide-react";
import { useGetPayoutListQuery } from "../../../_store/api";
// import UpdateSubscriptionPlan from "./UpdateSubscriptionPlan";

const ConsultantPayoutHistory = () => {
 
  const [data, setData] = useState([]);

  const { data: fetchData } = useGetPayoutListQuery({ status: 1 });

  useEffect(() => {
    if (fetchData && fetchData.data) {
      const result = fetchData?.data.filter((item) => item.status !== 1);
      setData(result);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Memoized columns definition for the table
  const columns = useMemo(() => [...PAYOUTCOLUMN], []);

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payout History"
        // AddPackageButton={AddPackageButton}
      />

    
    </>
  );
};
export default ConsultantPayoutHistory;
