import React, { useMemo, useEffect, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { ORDERCHARTCOLUMN } from "./listenerOrderColumns";
import { useGetConsultantsOrderQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import AddListenerReview from "../reviews_notification/AddListenerReview";
import { Pencil } from "lucide-react";

const ListenerOrder = () => {
  const [data, setData] = useState([]);
  const consultantId = useSelector((state) => state.consultant.consultantData);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [addReview, setAddReview] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const { data: fetchData, isLoading } = useGetConsultantsOrderQuery({
    consultantId,
    page,
    pageSize,
  });
  useEffect(() => {
    if (fetchData && fetchData.data) {
      // Filter the data to only include items with order_type === 6
      const response = fetchData.data.filter(
        (result) => result.order_type !== 6
      );
      setData(response);
    } else {
      setData([]); // Set to empty if no data is fetched
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddReviews = (data) => {
    console.log("data", data);
    setSelectedRow(consultantId);
    setOrderData(data);
    setAddReview(!addReview);
  };

  const columns = useMemo(
    () => [
      ...ORDERCHARTCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) =>
          row.original.status == 4 ? (
            <div className="actions-cell">
              <span
                className="editIcon"
                onClick={() => toggleAddReviews(row.original)}
              >
                <Pencil className="iconSmall" />
              </span>
            </div>
          ) : null,
      },
    ],
    []
  );

  const totalPage = fetchData?.meta?.total_page;

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  return (
    <>
      {fetchData ? (
        <div className="ProfileData-container profile-right-sub-container">
          <DyCommonTable
            columns={columns}
            data={data}
            tableTitle="Order History"
            includeActions={false}
            includeCheckbox={false}
            dynamicPagination={dynamicPagination}
            totalPage={totalPage}
            currentPage={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            // showTableHeading={false}
          />
        </div>
      ) : (
        "No data avaliable"
      )}

      {addReview && (
        <AddListenerReview
          isOpen={addReview}
          onClose={toggleAddReviews}
          coachId={selectedRow}
          listenerOrderData={orderData}
        />
      )}
    </>
  );
};

export default ListenerOrder;
