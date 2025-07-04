import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import xyz from "../datingProducts/MOCK_DATA(1).json";
import { PAYMENTTRANSACTIONSCOLUMN } from "./paymentTransactionsColumn";
import { ArrowRight, Pencil, Trash } from "lucide-react";
import DeleteComponent from "../DeleteComponent";
import { useGetPaymentListQuery } from "../../../_store/api";

const PaymentTransactionsList = () => {
  const [result, setResult] = useState([]);

  const { data: fetchdata } = useGetPaymentListQuery();

  useEffect(() => {
    if (fetchdata) {
      setResult(fetchdata?.data || []);
    }
  }, [fetchdata]);

  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    const updatedResult = result.filter(
      (record) => record.id !== selectedRow.id
    );
    console.log("Record deleted:", selectedRow);
  };

  // Button component to add package
  const AddPackageButton = () => {
    return (
      <button
        className="addButton"
        style={{
          position: "absolute",
          right: "20px",
          backgroundColor: "#18B164",
          padding: "6px",
        }}
      >
        Add plan
      </button>
    );
  };

  // Memoized columns definition for the table

  const columns = useMemo(
    () => [
      ...PAYMENTTRANSACTIONSCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view details"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <ArrowRight className="iconSmall" />
            </span>
            <span className="editIcon">
              <Pencil className="iconSmall" />
            </span>
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row.original)}
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
        data={result}
        includeActions={false}
        tableTitle="Payment Transaction"
        AddPackageButton={AddPackageButton}
        showTableHeading={false}
        includeCheckbox={false}
      />

      {showDeleteComponent && (
        <DeleteComponent
          isOpen={showDeleteComponent}
          onClose={toggleDeleteComponent}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default PaymentTransactionsList;
