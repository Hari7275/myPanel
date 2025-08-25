import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../../_components/table/CommonTable";
import { USERINTERESTCOLUMN } from "./profileOptionColumn";
import ChildFeature from "./ChildFeature";
import AddFeature from "./AddFeature";
import UpdateFeature from "./UpdateFeature";
import { ArrowRight, Trash, Pencil } from "lucide-react";
import DeleteComponent from "../../../payments/DeleteComponent";
import {
  useGetProfileFeatureListQuery,
  useDeleteInterestMutation,
} from "../../../../_store/api";

const UserProfileOptions = () => {
  const [addData, setAddData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState([]);
  const [showOptionFeature,setShowOptionFeature]= useState(false)
  const [optionFeature , setOptionFeature] = useState(null)

  const { data: fetchData } = useGetProfileFeatureListQuery();
  const [deleteInterest] = useDeleteInterestMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data);
    }
  }, [fetchData]);

  const toggleFeature = (row) => {
    setOptionFeature(row)
    setSelectedOptions(row.options);
    setShowOptionFeature(!showOptionFeature);
  };

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
      deleteInterest({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
      });
    }
  };
  const columns = useMemo(
    () => [
      ...USERINTERESTCOLUMN,
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
              <ArrowRight
                className="iconSmall"
                onClick={() => toggleFeature(row.original)}
              />
            </span>

            <span
              className="deleteIcon"
              onClick={() => toggleDeleteComponent(row.original)}
            >
              <Trash className="iconSmall" />
            </span>
            <span
              className="editIcon"
              onClick={() => toggleUpdateData(row.original)}
            >
              <Pencil className="iconSmall" />
            </span>
          </div>
        ),
      },
    ],
    []
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
      onClick={toggleAddData}
    >
      Add Feature
    </button>
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={data}
        tableTitle="Profile Options"
        includeActions={false}
        showTableHeading={false}
        includeCheckbox={false}
        AddPackageButton={AddButton}


      />

      {showOptionFeature && (
        <ChildFeature
          isOpen={showOptionFeature}
          onClose={() => setShowOptionFeature(false)}
          data={selectedOptions}
          optionFeature={optionFeature}
        />
      )}

      {addData && <AddFeature isOpen={addData} onClose={toggleAddData} />}
      {updateData && (
        <UpdateFeature
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

export default UserProfileOptions;
