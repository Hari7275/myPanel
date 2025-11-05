import React, { useMemo, useState, useEffect } from "react";

import DyCommonTable from "../../../_components/table/DyCommonTable";

import { ArrowRight, Pencil } from "lucide-react";
import { LIVESTREAMCOLUMN } from "./liveStreamColumn";
import LiveStreamUserListing from "./liveStreamDetails/LiveStreamUserListing";
import { useSelector } from "react-redux";
import { useGetLiveStreamListQuery } from "../../../_store/api";
import EditLiveStreamStatus from "../../../_components/reuseComponents/EditLiveStreamStatus";
import usePermissions from "../../../_components/reuseComponents/permission/EmpPermission";
import { Atom } from "react-loading-indicators";
import { useLocation, useParams } from "react-router-dom";

const LiveStream = () => {
  const [data, setData] = useState([]);
  const [openStremListing, setOpenStreamListing] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetLiveStreamListQuery({
    id: consultantId,
    page,
    size: pageSize,
  });
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
        Cell: ({ row }) =>
          permissions?.["astrologer"]?.includes(
            "update_astrologer_profile_livestream"
          ) && (
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

              {permissions?.["coach"]?.includes(
                "update_coach_profile_livestream"
              ) && (
                <span className="editIcon">
                  <Pencil
                    className="iconSmall"
                    onClick={() => toggleUpdateStatus(row.original)}
                  />
                </span>
              )}
            </div>
          ),
      },
    ],
    []
  );

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
    <div className="ProfileData-container profile-right-sub-container">
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Live Streams"
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
