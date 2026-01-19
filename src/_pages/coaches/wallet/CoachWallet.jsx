import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import DyCommonTable from "../../../_components/table/DyCommonTable";

import { WALLETCHARTCOLUMN } from "./coachWalletColumn";
import { useGetConsultantsWalletQuery } from "../../../_store/api";
import { useSelector } from "react-redux";
import { Atom } from "react-loading-indicators";
import { Info } from "lucide-react";
import Description from "../../users/subscription/Description";
import { useParams } from "react-router-dom";
import ListenerWalletTrans from "../../listeners/wallet/ListenerWalletTrans";

const CoachWallet = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dynamicPagination, setDynamicPagination] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [description, setDescription] = useState(false);

  const [addData, setAddData] = useState(false);

  // const consultantId = useSelector(
  //   (state) => state?.consultant?.consultantData
  // );

  const { consultantId } = useParams();

  const { data: fetchData, isLoading } = useGetConsultantsWalletQuery({
    consultantId,
    page,
    limit: pageSize,
  });
  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.rows || []);
    }
  }, [fetchData]);

  const toggleDescription = (row) => {
    setDescription(!description);
    setSelectedRow(row);
  };

  const toggleAddData = () => {
    setAddData(!addData);
  };

  const AddButton = () => {
    return (
      <button
        className="addButton"
        style={{
          position: "absolute",
          right: "20px",
          backgroundColor: "#18B164",
          padding: "6px",
        }}
        onClick={toggleAddData}
      >
        Add Wallet
      </button>
    );
  };

  const columns = useMemo(() => [
    ...WALLETCHARTCOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span
            title="view description"
            className="secondIcon"
            style={{ height: "35px", width: "35px" }}
          >
            <Info
              className="iconSmall"
              onClick={() => toggleDescription(row?.original)}
            />
          </span>
        </div>
      ),
    },
  ]);

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
      <div className=" profile-right-sub-container">
        <DyCommonTable
          columns={columns}
          data={data}
          tableTitle=" Wallet Chart"
          AddPackageButton={AddButton}
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
      {description && selectedRow && (
        <Description
          isOpen={description}
          onClose={toggleDescription}
          Descriptions={selectedRow?.description || ""}
        />
      )}

      {addData && (
        <ListenerWalletTrans
          isOpen={addData}
          onClose={toggleAddData}
          consultantId={consultantId}
        />
      )}
    </>
  );
};

export default CoachWallet;
