import React, { useState, useEffect, useMemo } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import ReactModal from "react-modal";
import { DETAILSCOLUMN } from "./DetailsColumn";
import { useSelector } from "react-redux";

import { useGetLiveStreamConnectedUserListQuery } from "../../../../_store/api";

const LiveStreamUserListing = ({ isOpen, onClose, selectedId }) => {
  console.log("selectedId", selectedId);
  const [data, setData] = useState([]);

  const { data: fetchData } = useGetLiveStreamConnectedUserListQuery(
    {
      id: selectedId,
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

  return (
    <ReactModal
      className="modal"
      overlayClassName="overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Live Stream User List "
      />
    </ReactModal>
  );
};

export default LiveStreamUserListing;
