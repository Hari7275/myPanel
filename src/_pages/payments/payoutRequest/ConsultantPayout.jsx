import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { PAYOUTCOLUMN } from "./payoutColumns";
import { Info, Pencil, Trash } from "lucide-react";
import { useGetPayoutListQuery } from "../../../_store/api";

import EditPayoutRequest from "./EditPayoutRequest";

const ConsultantPayout = () => {
  const [showPlanUpdate, setShowPlanUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  const { data: fetchData } = useGetPayoutListQuery({ status: 1 });

  useEffect(() => {
    if (fetchData && fetchData.data) {
      const result = fetchData?.data.filter((item) => item.status == 1);
      setData(result);
    } else {
      setData([]);
    }
  }, [fetchData]);

  const toggleUpdatePlans = (row) => {
    setSelectedRow(row);
    setShowPlanUpdate(!showPlanUpdate);
  };

  // Memoized columns definition for the table
  const columns = useMemo(
    () => [
      ...PAYOUTCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span className="editIcon">
              <Pencil
                className="iconSmall"
                onClick={() => toggleUpdatePlans(row.original)}
              />
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payout Request"
        // AddPackageButton={AddPackageButton}
      />

      {showPlanUpdate && (
        <EditPayoutRequest
          isOpen={showPlanUpdate}
          onClose={toggleUpdatePlans}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};
export default ConsultantPayout;
