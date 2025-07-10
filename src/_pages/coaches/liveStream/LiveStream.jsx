import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { ArrowRight, Pencil } from "lucide-react";
import { LIVESTREAMCOLUMN } from "./liveStreamColumn";
import LiveStreamUserListing from "./liveStreamDetails/LiveStreamUserListing";
import { useSelector } from "react-redux";
import { useGetLiveStreamListQuery } from "../../../_store/api";
import EditLiveStreamStatus from "../../../_components/reuseComponents/EditLiveStreamStatus";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";

const LiveStream = () => {
  const [data, setData] = useState([]);
  const [openStremListing, setOpenStreamListing] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const { data: fetchData } = useGetLiveStreamListQuery(consultantId);
  const permissions = usePermissions();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleLiveStreamUserListing = (row) => {
    setSelectedRow(row);

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
          permissions?.["astrologer"]?.includes("update_astrologer_profile_livestream") && (
            <div className="actions-cell">
              {permissions?.["coach"]?.includes("view_coach_profile") && (
                <span
                  title="view details"
                  className="secondIcon"
                  style={{ height: "35px", width: "35px" }}
                >
                  <ArrowRight
                    className="iconSmall"
                    onClick={() => toggleLiveStreamUserListing(row.original)}
                  />
                </span>
              )}

              {permissions?.["coach"]?.includes("update_coach_profile_livestream") && (
                <span className="editIcon">
                  <Pencil
                    className="iconSmall"
                    onClick={() => toggleUpdateStatus(row.original)}
                  />
                </span>
              )}
            </div>
          )
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
        tableTitle="Live Streams"
      />

      {openStremListing && (
        <LiveStreamUserListing
          isOpen={openStremListing}
          onClose={toggleLiveStreamUserListing}
          selectedId={selectedRow.id}
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
