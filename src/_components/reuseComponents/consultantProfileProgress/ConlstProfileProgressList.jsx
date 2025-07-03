import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../table/CommonTable";
import { Pencil } from "lucide-react";
import { PROGRESSCOLUMN } from "./ProfileProgressColumn";
import { useGetConsultantProfileProgressListQuery } from "../../../_store/api";
import { useSelector } from "react-redux";

import UpdateProgressLevel from "./UpdateProgressLevel";
import { Atom } from "react-loading-indicators";

const ConlstProfileProgressList = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showConsultantEditPrice, setShowConsultantPrice] = useState(false);

  const consultantId = useSelector(
    (state) => state?.consultant?.consultantData
  );
  const {
    data: fetchData,
    isLoading,
    isError,
  } = useGetConsultantProfileProgressListQuery(consultantId);
  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data || []);
    } else setData([]);
  }, [fetchData]);

  const toggleUpdateConsultantPrice = (row) => {
    setSelectedRow(row);
    setShowConsultantPrice(!showConsultantEditPrice);
  };

  const columns = useMemo(() => [
    ...PROGRESSCOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          {row.original.status !== "completed" && (
            <span
              className="editIcon"
              onClick={() => toggleUpdateConsultantPrice(row?.original)}
            >
              <Pencil className="iconSmall" />
            </span>
          )}
        </div>
      ),
    },
  ]);

  if (isLoading) {
    return (
      <span className="loadPage">
        <Atom color="#1c2434" size="medium" text="" textColor="" />
      </span>
    );
  }
  if (isError) return <div>Error loading data.</div>;

  return (
    <div className="ProfileData-container profile-right-sub-container">
      <CommonTable
        columns={columns}
        data={data}
        includeCheckbox={false}
        tableTitle="Onboarding Progress"
      />

      {showConsultantEditPrice && (
        <UpdateProgressLevel
          isOpen={showConsultantEditPrice}
          onClose={toggleUpdateConsultantPrice}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};

export default ConlstProfileProgressList;
