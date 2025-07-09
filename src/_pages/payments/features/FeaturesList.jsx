import React, { useMemo, useState } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { FEATURESLISTCOLUMN } from "./featuresColumns";
import { Pencil, Trash, Info } from "lucide-react";
import AddFeature from "./AddFeature";
import FeaturesUpdate from "./FeaturesUpdate";
import DeleteComponent from "../DeleteComponent";
import FeatureDescription from "./FeatureDescription";
import {
  useGetFeaturesListQuery,
  useDeleteFeaturesMutation,
} from "../../../_store/api";

const FeaturesList = () => {
  // const result = useMemo(() => xyz?.data.records, []);

  const [showFeaturesDescription, setShowFeaturesDescription] = useState(false);
  const [addFeatures, setAddFeatues] = useState(false);
  const [showFeaturesUpdate, setShowFeaturesUpdate] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetching Features plans data using RTK Query.
  const { data: fetchData, isLoading, error } = useGetFeaturesListQuery();

  const [deleteFeature] = useDeleteFeaturesMutation();

  const result = useMemo(() => fetchData?.data || [], [fetchData]);

  // const Description = result.map((response)=>response.description);
  // console.log("description" , Description)

  const toggleFeaturesModal = (row) => {
    setSelectedRow(row);
    setShowFeaturesUpdate(!showFeaturesUpdate);
  };

  const toggleFeaturesDescription = (row) => {
    setShowFeaturesDescription(!showFeaturesDescription);
    setSelectedRow(row);
  };

  const toggleAddFeature = () => {
    setAddFeatues(!addFeatures);
  };

  // Function to toggle the delete component and set the selected row

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow?.id) {
      deleteFeature({ id: selectedRow?.id }).then(() => {
        setShowDeleteComponent(false);
      });
    }
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
        onClick={toggleAddFeature}
      >
        Add Feature
      </button>
    );
  };

  // Memoized columns definition for the table
  const columns = useMemo(
    () => [
      ...FEATURESLISTCOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              title="view Description"
              className="secondIcon"
              style={{ height: "35px", width: "35px" }}
            >
              <Info
                className="iconSmall"
                onClick={() => toggleFeaturesDescription(row?.original)}
              />
            </span>
            <span
              className="editIcon"
              onClick={() => toggleFeaturesModal(row?.original)}
            >
              <Pencil className="iconSmall" />
            </span>
            <span className="deleteIcon">
              <Trash
                className="iconSmall"
                onClick={() => toggleDeleteComponent(row?.original)}
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
        tableTitle="Features List"
        AddPackageButton={AddPackageButton}
        showTableHeading={false}
      />

      {showFeaturesUpdate && (
        <FeaturesUpdate
          isOpen={showFeaturesUpdate}
          onClose={toggleFeaturesModal}
          selectedRow={selectedRow}
        />
      )}

      {showFeaturesDescription && (
        <FeatureDescription
          isOpen={showFeaturesDescription}
          onClose={toggleFeaturesDescription}
          Description={selectedRow.description}
        />
      )}

      {addFeatures && (
        <AddFeature isOpen={addFeatures} onClose={toggleAddFeature} />
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

export default FeaturesList;
