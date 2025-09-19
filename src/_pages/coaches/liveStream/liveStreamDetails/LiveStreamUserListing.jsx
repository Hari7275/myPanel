import React, { useState, useEffect, useMemo } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import DyCommonTable from "../../../../_components/table/DyCommonTable";

import ReactModal from "react-modal";
import { DETAILSCOLUMN } from "./DetailsColumn";
import { useSelector } from "react-redux";

import { useGetLiveStreamConnectedUserListQuery } from "../../../../_store/api";
import { Atom } from "react-loading-indicators";

const LiveStreamUserListing = ({ isOpen, onClose, selectedId }) => {
  console.log("selectedId", selectedId);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [data, setData] = useState([]);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetLiveStreamConnectedUserListQuery(
    {
      id: selectedId,
      page,
      size: pageSize,
    },
    { skip: !selectedId }
  );

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => [...DETAILSCOLUMN], []);

  const totalPage = fetchData?.meta?.total_page || 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (error) return <p>Error fetching data: {error?.data?.message}</p>;

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Live Stream User Lists "
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
    </ReactModal>
  );
};

export default LiveStreamUserListing;
