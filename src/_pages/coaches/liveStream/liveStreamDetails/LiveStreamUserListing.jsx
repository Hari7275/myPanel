import React, { useState, useEffect, useMemo } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import ReactModal from "react-modal";
import { DETAILSCOLUMN } from "./DetailsColumn";
import { useSelector } from "react-redux";

import { useGetLiveStreamListQuery } from "../../../../_store/api";

const LiveStreamUserListing = ({ isOpen, onClose }) => {
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const { data: fetchData } = useGetLiveStreamListQuery(consultantId);

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data);
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
