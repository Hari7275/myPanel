import React, { useMemo, useState, useEffect } from "react";

import DyCommonTable from "../../_components/table/DyCommonTable";
import { BLOCKEDUSERCOLUMN } from "../../_pages/listeners/followers/listenersFollowersColumn";
import { useGetConsultantBlockedListQuery } from "../../_store/api";
import { useParams } from "react-router-dom";

const ConsultantBlockedUser = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const { consultantId } = useParams();

  const { data: fetchData } = useGetConsultantBlockedListQuery({
    consultantId,
    page,
    size: pageSize,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.record) {
      setData(fetchData?.data?.record);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => BLOCKEDUSERCOLUMN, []);
  const totalPage = fetchData?.meta?.total_page || 1;

  return (
    <div className="ProfileData-container profile-right-sub-container">
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Blocked User List"
        dynamicPagination={dynamicPagination}
        // customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        // showTableHeading={false}
      />
    </div>
  );
};

export default ConsultantBlockedUser;
