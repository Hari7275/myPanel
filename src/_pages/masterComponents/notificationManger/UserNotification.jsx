import React, { useMemo, useState } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { Info, ArrowRight } from "lucide-react";
import DatingDescription from "../../payments/datingProducts/DatingDescription";
import { USERNOTIFICATIONCOLUMN } from "./userNotificationColumn";
import { useGetUserNotificationListQuery } from "../../../_store/api";
import AllSendedNotifyUserList from "./AllSendedNotifyUserList";

const UserNotification = () => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showUserNotificationModal, setShowUserNotificationModal] =
    useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // Adjusted default page size
  const [dynamicPagination] = useState(true); // Enable or disable dynamic pagination

  // Fetching Dating products  data using RTK Query.
  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetUserNotificationListQuery({
    page: page,
    size: pageSize,
  });

  const result = useMemo(() => fetchData?.data?.records || [], [fetchData]);

  // handeling function description

  const toggleDescriptionModal = (row) => {
    setSelectedRow(row?.message);
    setShowDescriptionModal(!showDescriptionModal);
  };

  const handleViewDetails = (Id) => {
    setSelectedRow(Id?.id);
    setShowUserNotificationModal(!showUserNotificationModal);
  };

  // Memoized columns definition for the table

  const columns = useMemo(
    () => [
      ...USERNOTIFICATIONCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span className="editIcon">
              <ArrowRight
                className="iconSmall"
                onClick={() => handleViewDetails(row.original)}
              />
            </span>
            <span
              title="view description"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <Info
                className="iconSmall"
                onClick={() => toggleDescriptionModal(row.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const totalPage = fetchData?.data?.pagination?.totalPages || 1;

  return (
    <>
      <DyCommonTable
        columns={columns}
        data={result}
        includeActions={false}
        tableTitle="User Notifications"
        // AddPackageButton={AddPackageButton}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        showTableHeading={false}
      />

      {showDescriptionModal && (
        <DatingDescription
          isOpen={showDescriptionModal}
          onClose={toggleDescriptionModal}
          Description={selectedRow}
        />
      )}

      {showUserNotificationModal && (
        <AllSendedNotifyUserList
          isOpen={showUserNotificationModal}
          onClose={handleViewDetails}
          data={selectedRow}
        />
      )}
    </>
  );
};

export default UserNotification;
