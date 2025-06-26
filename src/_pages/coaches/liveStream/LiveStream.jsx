import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { ArrowRight, Pencil } from "lucide-react";
import { LIVESTREAMCOLUMN } from "./liveStreamColumn";
import LiveStreamUserListing from "./liveStreamDetails/LiveStreamUserListing";
import { useSelector } from "react-redux";
import { useGetLiveStreamListQuery } from "../../../_store/api";
import EditLiveStreamStatus from "../../../_components/reuseComponents/EditLiveStreamStatus";

const LiveStream = () => {
  const [data, setData] = useState([]);
  const [openStremListing, setOpenStreamListing] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const { data: fetchData } = useGetLiveStreamListQuery(consultantId);

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleLiveStreamUserListing = () => {
    setOpenStreamListing(!openStremListing);
  };

  //   open  component to update status

  const toggleUpdateStatus = (row) => {
    setSelectedRow(row?.id);
    setUpdateStatus(!updateStatus);
  };

  const columns = useMemo(
    () => [
      ...LIVESTREAMCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view details"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <ArrowRight
                className="iconSmall"
                onClick={() => toggleLiveStreamUserListing()}
              />
            </span>

            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdateStatus(row.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="ProfileData-container profile-right-sub-container">
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Live Stream"
      />

      {openStremListing && (
        <LiveStreamUserListing
          isOpen={openStremListing}
          onClose={toggleLiveStreamUserListing}
        />
      )}

      {updateStatus && (
        <EditLiveStreamStatus
          isOpen={updateStatus}
          onClose={toggleUpdateStatus}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};

export default LiveStream;
