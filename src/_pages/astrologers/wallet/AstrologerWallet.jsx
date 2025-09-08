import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { WALLETCHARTCOLUMN } from "./astrologerWalletColumn";
import { useGetConsultantsWalletQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";

const AstrologerWallet = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const consultantId = useSelector(
    (state) => state?.consultant?.consultantData
  );

  const { data: fetchData, isLoading } = useGetConsultantsWalletQuery({
    consultantId,
    page,
    limit: pageSize,
  });
  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.rows || []);
    }
  }, [fetchData]);

  const columns = useMemo(() => WALLETCHARTCOLUMN, []);

  const totalPage = fetchData?.meta?.total_page;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <>
      <div className=" profile-right-sub-container">
        <DyCommonTable
          columns={columns}
          data={data}
          tableTitle=" Wallet Chart"
          includeActions={false}
          includeCheckbox={false}
          dynamicPagination={dynamicPagination}
          totalPage={totalPage}
          currentPage={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          // showTableHeading={false}
        />
      </div>
    </>
  );
};

export default AstrologerWallet;
