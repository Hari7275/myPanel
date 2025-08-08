import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNORDER } from "./subscriptionColumn";
import { COLUMNSUBSCRIPTION } from "./subscriptionColumn";
import { useGetOrderListQuery } from "../../../_store/api";
import { useGetUserAllSubscriptionListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { ArrowRight } from "lucide-react";
import SubscriptionDetails from "./SubscriptionDetails";

const UserSubscriptionLists = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination

  const [showSubscriptionDetails, setShowSubscriptionDetails] = useState(false);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetUserAllSubscriptionListQuery({
    page,
    size: pageSize,
  });

  // const columns = useMemo(() => COLUMNSUBSCRIPTION, []);

  const handleSubscriptionDetails = () => {
    setShowSubscriptionDetails(!showSubscriptionDetails);
  };

  const columns = useMemo(
    () => [
      ...COLUMNSUBSCRIPTION,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view details"
              className="secondIcon"
              style={{
                display: "inline-block",
                height: "35px",
                width: "35px",
              }}
              // onClick={() => handleSubscriptionDetails(row.original.id)}
            >
              <ArrowRight className="iconSmall" />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.data || []);
    }
  }, [fetchData]);

  // const totalPage = fetchData?.meta?.total_page || 1;
  const totalPage = fetchData?.data?.totalRecords
    ? Math.ceil(fetchData.data.totalRecords / pageSize)
    : 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (error) return <p>Error fetching data: {error?.data?.message}</p>;

  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Users Subscription List"
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />

      {/* {showEditUserType && (
        <EditUserType
          isOpen={showEditUserType}
          onClose={toggleEditUserType}
          selectedRow={selectedRow}
        />
      )} */}
    </div>
  );
};

export default UserSubscriptionLists;
