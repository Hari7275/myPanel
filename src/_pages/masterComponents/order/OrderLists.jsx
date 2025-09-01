import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNORDER } from "./orderColumn";
import { useGetOrderListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { ArrowRight, Pencil } from "lucide-react";
import CompleteOrder from "./CompleteOrder";
import RefundBalance from "./RefundBalance";
import { debounce } from "lodash";

const OrderLists = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination
  const [addOrder, setAddOrder] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [refundBalance, setRefundBalance] = useState(false);
  const [userId, setUserId] = useState(null);
  const [consultantId, setConsultantId] = useState(null);

  // Only include user_id if it has a truthy value (not null, undefined, or empty string)
  const queryParams = {
    page,
    size: pageSize,
    ...(userId && userId.trim() !== "" ? { user_id: userId } : {}),
    ...(consultantId && consultantId.trim() !== ""
      ? { consultant_id: consultantId }
      : {}),
  };

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetOrderListQuery(queryParams);

  const toggleCompleteOrder = (value) => {
    console.log("first...", value);
    setSelectedRow(value);
    setAddOrder(!addOrder);
  };

  const toggleRefundBalance = (value) => {
    setSelectedRow(value);
    setRefundBalance(!refundBalance);
  };
  // const columns = useMemo(() => COLUMNORDER, []);

  const columns = useMemo(
    () => [
      ...COLUMNORDER,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <>
            <div className="actions-cell">
              {row.original.status == 3 && (
                <span
                  title="view details"
                  className="secondIcon"
                  style={{ height: "35px", width: "35px" }}
                >
                  <Pencil
                    className="iconSmall"
                    onClick={() => toggleCompleteOrder(row.original)}
                  />
                </span>
              )}

              {row.original.status == 4 && (
                <span className="editIcon">
                  <ArrowRight
                    className="iconSmall"
                    onClick={() => toggleRefundBalance(row.original)}
                  />
                </span>
              )}
            </div>
          </>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data || []);
    }
  }, [fetchData]);

  const debouncedSearchUserId = debounce((value) => setUserId(value), 500);
  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );
  const handleUserIdSearch = (e) => {
    setPage(1);
    debouncedSearchUserId(e?.target?.value);
  };
  const handleConsultantIdSearch = (e) => {
    setPage(1);
    debouncedSearchConsultantId(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by user id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleUserIdSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by consultant id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleConsultantIdSearch}
      />
      {/* <input
        className="inputBox"
        placeholder="Search by Name"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleNameSearch}
      />
      <input
        className="inputBox"
        placeholder="Search by Phone Number"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleUserPhoneNumberSearch}
      /> */}
    </div>
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
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Order List"
        dynamicPagination={dynamicPagination}
        customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
        showTableHeading={false}
      />
      {addOrder && (
        <CompleteOrder
          isOpen={addOrder}
          onClose={toggleCompleteOrder}
          selectedRow={selectedRow}
        />
      )}
      {refundBalance && (
        <RefundBalance
          isOpen={refundBalance}
          onClose={toggleRefundBalance}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};

export default OrderLists;
