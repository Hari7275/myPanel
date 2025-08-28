import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { COLUMNORDER } from "./orderColumn";
import { useGetOrderListQuery } from "../../../_store/api";
import { Atom } from "react-loading-indicators";
import { ArrowRight, Pencil } from "lucide-react";
import CompleteOrder from "./CompleteOrder";
import RefundBalance from "./RefundBalance";
const OrderLists = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjusted default page size
  const [dynamicPagination, setDynamicPagination] = useState(true); // Enable or disable dynamic pagination
  const [addOrder, setAddOrder] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [refundBalance, setRefundBalance] = useState(false);

  const {
    data: fetchData,
    isLoading,
    error,
  } = useGetOrderListQuery({
    page,
    size: pageSize,
  });

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
