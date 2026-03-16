import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../table/DyCommonTable";
import { useGetPayoutHistoryQuery } from "../../_store/api";
import { useParams } from "react-router-dom";
import { Atom } from "react-loading-indicators";

const PAYOUT_STATUS = {
  1: { label: "Pending", color: "#f59e0b", bg: "#fef3c7" },
  2: { label: "Approved", color: "#10b981", bg: "#d1fae5" },
  3: { label: "Rejected", color: "#ef4444", bg: "#fee2e2" },
};

const PAYOUT_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Total Amount",
    accessor: "amount",
    Cell: ({ value }) => `₹${value || 0}`,
  },
  {
    Header: "P.G Amount",
    accessor: "tax_details",
    Cell: ({ value }) => `₹${value?.pg_amount || 0}`,
  },
  {
    Header: "Amount (After Tax)",
    accessor: "amount_after_tax",
    Cell: ({ value }) => `₹${value || 0}`,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      const status = PAYOUT_STATUS[value] || { label: "Unknown", color: "#6b7280", bg: "#f3f4f6" };
      return (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "600",
            color: status.color,
            backgroundColor: status.bg,
          }}
        >
          {status.label}
        </span>
      );
    },
  },
  {
    Header: "Created Date",
    accessor: "createdAt",
    Cell: ({ value }) => {
      if (!value) return "-";
      const date = new Date(value);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
];

const PayoutHistory = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const { consultantId } = useParams();

  const {
    data: fetchData,
    isLoading,
  } = useGetPayoutHistoryQuery({ consultant_id: consultantId });

  useEffect(() => {
    if (fetchData?.data) {
      setData(fetchData.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const columns = useMemo(() => PAYOUT_COLUMNS, []);
  const totalPage = fetchData?.meta?.total_page || 1;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }

  return (
    <div className="ProfileData-container profile-right-sub-container">
      <DyCommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payout History"
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        includeCheckbox={false}
      />
    </div>
  );
};

export default PayoutHistory;
