import React, { useEffect, useMemo, useState } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { PAYABLECOLUMN } from "../payoutRequest/payoutColumns";
import { Info, Pencil, Trash } from "lucide-react";
import { useGetPayableListQuery } from "../../../_store/api";
// import UpdateSubscriptionPlan from "./UpdateSubscriptionPlan";

const PayableAmountHistory = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const { data: fetchData } = useGetPayableListQuery({
    page,
    size: pageSize,
    // end_date: appliedFilters.endDate,
    // start_date: appliedFilters.startDate,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.data) {
      const result = fetchData?.data?.data?.filter((item) => item.status !== 1);
      setData(result);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Memoized columns definition for the table
  const columns = useMemo(() => [...PAYABLECOLUMN], []);
  // const totalPage = fetchData?.meta?.total_page || 1;

  // const totalPage = fetchData?.meta?.total_page || 1;
  const totalPage = fetchData?.data?.total
    ? Math.ceil(fetchData.data.total / pageSize)
    : 1;

  return (
    <>
      {/* <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payable Amount History"
        // AddPackageButton={AddPackageButton}
        showTableHeading={false}
      /> */}
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payable Log"
        dynamicPagination={dynamicPagination}
        // customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />
    </>
  );
};
export default PayableAmountHistory;
