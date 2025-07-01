import React, { useState, useMemo, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { LANGUAGECATEGORYCOLUMN } from "./languageColumn";
import { Pencil, Trash } from "lucide-react";
import EditLanguage from "./EditLanguage";
import AddLanguage from "./AddLanguage";
import DeleteComponent from "../../payments/DeleteComponent";
import {
  useGetLanguagesListQuery,
  useDeleteLanguageMutation,
} from "../../../_store/api";
import AddLanguage_New from "./AddLanguage_New";

const LanguageTable = () => {
  const [addLanguage, setAddLanguage] = useState(false);
  const [updateLanguage, setUpdateLanguage] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  const { data: fetchData } = useGetLanguagesListQuery();

  const [deleteLanguage] = useDeleteLanguageMutation();

  useEffect(() => {
    if (fetchData && fetchData?.data) {
      setData(fetchData?.data);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddLanguage = () => {
    setAddLanguage(!addLanguage);
  };

  // Toggle function for updating a review
  const toggleUpdateLanguage = (row) => {
    setSelectedRow(row);
    setUpdateLanguage(!updateLanguage);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  // Handle delete operation and refetch data after successful deletion
  const handleDelete = async () => {
    if (selectedRow && selectedRow.id) {
      try {
        await deleteLanguage({ id: selectedRow.id }).unwrap();
      } catch (error) {
        console.error("Failed to delete the language:", error);
      }
    }
  };

  const columns = useMemo(
    () => [
      ...LANGUAGECATEGORYCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              className="deleteIcon"
              onClick={() => toggleDeleteComponent(row.original)}
            >
              <Trash className="iconSmall" />
            </span>
            <span
              className="editIcon"
              onClick={() => toggleUpdateLanguage(row.original)}
            >
              <Pencil className="iconSmall" />
            </span>
          </div>
        ),
      },
    ],
    [toggleUpdateLanguage, toggleDeleteComponent]
  );

  const AddButton = () => (
    <button
      className="addButton"
      style={{
        position: "absolute",
        right: "20px",
        backgroundColor: "#18B164",
        padding: "6px",
      }}
      onClick={toggleAddLanguage}
    >
      Add language
    </button>
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        includeActions={false}
        tableTitle="Meta Language"
        AddPackageButton={AddButton}
        showTableHeading={false}
      />

      {addLanguage && (
        <AddLanguage_New isOpen={addLanguage} onClose={toggleAddLanguage} />
      )}
      {/* {addLanguage && (
        <AddLanguage isOpen={addLanguage} onClose={toggleAddLanguage} />
      )} */}
      {updateLanguage && (
        <EditLanguage
          isOpen={updateLanguage}
          onClose={toggleUpdateLanguage}
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

export default LanguageTable;
