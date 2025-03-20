import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import { EXECUTIVELISTCOLUMN } from "./executiveListColumn";
import AddExecutive from "./AddExecutive";
import UpdateExecutive from "./UpdateExecutive";
import DeleteComponent from "../../../payments/DeleteComponent";
import {
  useGetSupportExecutiveListQuery,
  useDeleteSupportExecutiveMutation,
} from "../../../../_store/api";

const ExecutiveList = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetSupportExecutiveListQuery();
  const [deleteData] = useDeleteSupportExecutiveMutation();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data?.rows);
    } else {
      setData([]);
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
    if (selectedRow && selectedRow?.id) {
      deleteData({ id: selectedRow?.id }).catch((error) => {
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
        Add Executive
      </button>
    );
  };

  const columns = useMemo(() => [
    ...EXECUTIVELISTCOLUMN,
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
        tableTitle="Executive List"
        AddPackageButton={AddButton}
      />
      {addData && <AddExecutive isOpen={addData} onClose={toggleAddData} />}
      {updateData && (
        <UpdateExecutive
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

export default ExecutiveList;
