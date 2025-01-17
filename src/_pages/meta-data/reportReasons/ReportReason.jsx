import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import { REPORTREASONCOLUMN } from "./reportReasonColumn";
import AddReportReason from "./AddReportReason";
import UpdateReportReason from "./UpdateReportReason";
import DeleteComponent from "../../payments/DeleteComponent";
import {
  useGetReportReasonListQuery,
  useDeleteReportReasonMutation,
} from "../../../_store/api";

const ReportReason = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetReportReasonListQuery();
  const [deleteData] = useDeleteReportReasonMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddData = () => {
    setAddData(!addData);
  };

  // Toggle function for updating a review
  const toggleUpdateData = (row) => {
    setSelectedRow(row);
    setUpdateData(!updateData);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteData({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
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
        Add Report Reason
      </button>
    );
  };

  const columns = useMemo(() => [
    ...REPORTREASONCOLUMN,
    {
      Header: () => <div className="actions-header">Actions</div>,
      id: "actions",
      Cell: ({ row }) => (
        <div className="actions-cell">
          <span className="deleteIcon">
            <Trash
              className="iconSmall"
              onClick={() => toggleDeleteComponent(row.original)}
            />
          </span>
          <span className="editIcon">
            <Pencil
              className="iconSmall"
              onClick={() => toggleUpdateData(row.original)}
            />
          </span>
        </div>
      ),
    },
  ]);

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Report Reason"
        AddPackageButton={AddButton}
      />
      {addData && <AddReportReason isOpen={addData} onClose={toggleAddData} />}
      {updateData && (
        <UpdateReportReason
          isOpen={updateData}
          onClose={toggleUpdateData}
          selectedRow={selectedRow}
        />
      )}

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

export default ReportReason;
