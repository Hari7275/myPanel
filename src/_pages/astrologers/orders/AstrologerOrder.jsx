import React, { useMemo, useEffect, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";
import { ORDERCHARTCOLUMN } from "./astrologerColumn";
import { useGetConsultantsOrderQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { debounce } from "lodash";
import { useLocation, useParams } from "react-router-dom";

const AstrologerOrder = () => {
  const [data, setData] = useState([]);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);

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

  const columns = useMemo(() => ORDERCHARTCOLUMN, []);

  const totalPage = fetchData?.meta?.total_page;
  // ? Math.ceil(fetchData.data.total_records / pageSize)
  // : 1;

  // if (isLoading) {
  //   return <span>Loading ...</span>;
  // }

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
    </>
  );
};

export default AstrologerOrder;
