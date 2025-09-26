import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { FOLLOWERSCOLUMN } from "./listenersFollowersColumn";
import { useGetListenerFavouriteListQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

const ListenerFollowers = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const consultantId = useSelector((state) => state.consultant.consultantData);

  const { data: fetchData } = useGetListenerFavouriteListQuery({
    consultantId,
    page,
    size: pageSize,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => FOLLOWERSCOLUMN, []);
  const totalPage = fetchData?.meta?.total_page || 1;

  return (
    <div className="ProfileData-container profile-right-sub-container">
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Favourit List"
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

export default ListenerFollowers;
