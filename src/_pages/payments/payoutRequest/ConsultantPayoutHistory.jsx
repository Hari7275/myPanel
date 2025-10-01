import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { PAYOUTCOLUMN } from "./payoutColumns";
import { Info, Pencil, Trash } from "lucide-react";
import { useGetPayoutListQuery } from "../../../_store/api";
import EditPayoutRequest from "./EditPayoutRequest";
// import UpdateSubscriptionPlan from "./UpdateSubscriptionPlan";

const ConsultantPayoutHistory = () => {
  const [data, setData] = useState([]);
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data: fetchData } = useGetPayoutListQuery();

  useEffect(() => {
    if (fetchData && fetchData.data) {
      // const result = fetchData?.data.filter((item) => item.status !== 1);
      const result = fetchData?.data;
      setData(result);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Memoized columns definition for the table
  // const columns = useMemo(() => [...PAYOUTCOLUMN], []);
  const toggleEditStatus = (row) => {
    setSelectedRow(row);
    setShowEditStatus(!showEditStatus);
  };
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
                onClick={() => toggleEditStatus(row.original.id)}
              />
            </span>
          </div>
        ),
      },
    ],
    [toggleEditStatus]
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Payout History"
        // AddPackageButton={AddPackageButton}
        showTableHeading={false}
      />

      {/* {showEditStatus && (
        <EditPayoutRequest
          isOpen={showEditStatus}
          onClose={toggleEditStatus}
          selectedRow={selectedRow}
        />
      )} */}

      {showEditStatus && (
        <EditPayoutRequest
          isOpen={showEditStatus}
          onClose={toggleEditStatus}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};
export default ConsultantPayoutHistory;
