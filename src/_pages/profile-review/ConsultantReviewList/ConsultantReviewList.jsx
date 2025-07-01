import React, { useMemo, useState, useEffect } from "react";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { REVIEWLISTCOLUMN } from "./reviewListColumn";
import { ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom"; // Import useNavigate

import { useGetConsultantReviewQuery } from "../../../_store/api";
import { useDispatch } from "react-redux";
import { setCurrentConsultant } from "../../../_store/slices/consultantSlice";
import { Atom } from "react-loading-indicators";
import { debounce } from "lodash";

const ConsultantReviewList = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const navigate = useNavigate();
  const [consultantId, setConsultantId] = useState("");

  const { data: fetchData, isLoading } = useGetConsultantReviewQuery({
    page,
    size: pageSize,
    consultant_id: consultantId,
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

  const debouncedSearchConsultantId = debounce(
    (value) => setConsultantId(value),
    500
  );

  const handleConsultantIdSearch = (e) => {
    debouncedSearchConsultantId(e?.target?.value);
  };

  const customFilterComponent = () => (
    <div style={{ width: "100%", height: "35px" }}>
      <input
        className="inputBox"
        placeholder="Search by consultant Id"
        style={{
          marginLeft: "25px",
          height: "-webkit-fill-available",
          width: "20%",
        }}
        onChange={handleConsultantIdSearch}
      />
    </div>
  );

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  return (
    <div>
      <DyCommonTable
        columns={columns}
        data={data}
        tableTitle="Consultant Review List"
        includeActions={false}
        dynamicPagination={dynamicPagination}
        customFilterComponent={customFilterComponent}
        totalPage={totalPage}
        currentPage={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        showTableHeading={false}
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
