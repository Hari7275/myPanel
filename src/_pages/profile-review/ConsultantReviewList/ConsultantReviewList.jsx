import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { REVIEWLISTCOLUMN } from "./reviewListColumn";
import { ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom"; // Import useNavigate

import { useGetConsultantReviewQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";
import { setCurrentConsultant } from "../../../_store/slices/consultantSlice";

const ConsultantReviewList = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const navigate = useNavigate();

  const { data: fetchData, isLoading } = useGetConsultantReviewQuery({
    page,
    size: pageSize,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data) {
      const consultantData = fetchData?.data;
      setData(consultantData);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const totalPage = fetchData?.meta?.totalPages;

  const handleActionClick = (consultantId) => {
    dispatch(setCurrentConsultant(consultantId));
    navigate(`/profile-review/${consultantId}`);
  };

  const columns = useMemo(
    () => [
      ...REVIEWLISTCOLUMN,
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
            >
              <ArrowRight
                className="iconSmall"
                onClick={() => handleActionClick(row?.original?.id)}
              />
            </span>
          </div>
        ),
      },
    ],
    [handleActionClick]
  );

  if (isLoading) {
    return <span>Loading ... </span>;
  }
  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        tableTitle="Consultant Review List"
        includeActions={false}
        dynamicPagination={dynamicPagination}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
      {data?.length === 0 && (
        <div>
          <span className="no-data-new">No Review Avaliable</span>
        </div>
      )}
    </div>
  );
};

export default ConsultantReviewList;
