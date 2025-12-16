import React, { useMemo, useState, useEffect } from "react";

import DyCommonTable from "../../../_components/table/DyCommonTable";

import DeleteComponent from "../../payments/DeleteComponent";
import Discriptions from "./Discriptions";

import { useGetGiftOrderHistoryListQuery } from "../../../_store/api";

import { useLocation, useParams } from "react-router-dom";

import { PARTICULARGIFTORDERHISTORYCOLUMN } from "../../astrologers/Gifts/giftsColumn";

const CoachGifts = () => {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  // const consultantId = useSelector((state) => state.consultant.consultantData);
  const { consultantId } = useParams();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);

  const { data: fetchData } = useGetGiftOrderHistoryListQuery({
    consultant_id: consultantId,
    page,
    size: pageSize,
  });

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.order) {
      setData(fetchData?.data?.order);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleDescriptionModal = () => {
    setShowDescriptionModal(!showDescriptionModal);
  };

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    const updateReasult = data.filter((record) => record.id !== selectedRow.id);
  };

  const columns = useMemo(() => [...PARTICULARGIFTORDERHISTORYCOLUMN], []);

  const totalPage = fetchData?.meta?.total_page;

  return (
    <div className="">
      <DyCommonTable
        columns={columns}
        data={data}
        tableTitle="Gifts"
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

      {showDescriptionModal && (
        <Discriptions
          isOpen={showDescriptionModal}
          onClose={toggleDescriptionModal}
        />
      )}
      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={toggleDeleteComponent}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CoachGifts;
