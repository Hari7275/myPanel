import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import { SUPPORTQUESTIONCOLUMN } from "./supportQuestionColumn";
import AddSupportQuestion from "./AddSupportQuestion";
import UpdateSupportQuestion from "./UpdateSupportQuestion";
import DeleteComponent from "../../../payments/DeleteComponent";
import {
  useGetSupportQuestionListQuery,
  useDeleteSupportQuestionMutation,
} from "../../../../_store/api";

const SupportQuestion = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetSupportQuestionListQuery();
  const [deleteData] = useDeleteSupportQuestionMutation();

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
        Add Support Question
      </button>
    );
  };

  const columns = useMemo(() => [
    ...SUPPORTQUESTIONCOLUMN,
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
        tableTitle="Support Question"
        AddPackageButton={AddButton}
      />
      {addData && (
        <AddSupportQuestion isOpen={addData} onClose={toggleAddData} />
      )}
      {updateData && (
        <UpdateSupportQuestion
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

export default SupportQuestion;
