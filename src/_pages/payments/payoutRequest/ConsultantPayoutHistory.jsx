import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { PAYOUTCOLUMN } from "./payoutColumns";
import { Info, Pencil, Trash } from "lucide-react";
import { useGetPayoutListQuery } from "../../../_store/api";
// import UpdateSubscriptionPlan from "./UpdateSubscriptionPlan";

const ConsultantPayoutHistory = () => {
  const [data, setData] = useState([]);

  const { data: fetchData } = useGetPayoutListQuery();

  useEffect(() => {
    if (fetchData && fetchData.data) {
      // const result = fetchData?.data.filter((item) => item.status !== 1);
      const result = fetchData?.data;
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
        showTableHeading={false}
      />
    </>
  );
};
export default ConsultantPayoutHistory;
