import React, { useMemo, useState } from "react";
import ReactModal from "react-modal";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { Info, ArrowRight } from "lucide-react";

import { ALLSENDEDUSERNOTIFICATIONCOLUMN } from "./userNotificationColumn";
import { useGetAllSendedUserNotificationListQuery } from "../../../_store/api";

const AllSendedNotifyUserList = ({ isOpen, onClose, data }) => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showUserNotificationModal, setShowUserNotificationModal] =
    useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15); // Adjusted default page size
  const [dynamicPagination] = useState(true); // Enable or disable dynamic pagination

  // Fetching Dating products  data using RTK Query.
  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetAllSendedUserNotificationListQuery({
    id: data,
    page: page,
    size: pageSize,
  });

  const result = useMemo(() => fetchData?.data?.records || [], [fetchData]);

  // Memoized columns definition for the table

  const columns = useMemo(() => [...ALLSENDEDUSERNOTIFICATIONCOLUMN], []);

  const totalPage = fetchData?.data?.pagination?.totalPages || 1;

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        <DyCommonTable
          columns={columns}
          data={result}
          includeActions={false}
          tableTitle="All User Notifications "
          // AddPackageButton={AddPackageButton}
          dynamicPagination={dynamicPagination}
          totalPage={totalPage}
          currentPage={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          // showTableHeading={false}
        />
      </ReactModal>
    </>
  );
};

export default AllSendedNotifyUserList;
