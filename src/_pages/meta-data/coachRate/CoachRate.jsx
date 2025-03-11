import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { COACHRATECOLUMN } from "./coachRateColumn";
import { Pencil, Trash } from "lucide-react";
import AddCoachRate from "./AddCoachRate";
import DeleteComponent from "../../payments/DeleteComponent";
import UpdateCoachRate from "./UpdateCoachRate";
import {
  useGetCoachRateListQuery,
  useDeleteCoachRateMutation,
} from "../../../_store/api";

const CoachRate = () => {
  const [addService, setAddService] = useState(false);
  const [updateService, setUpdateService] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // calling api for listing data and deleting data

  const { data: fetchData } = useGetCoachRateListQuery();
  const [deleteService] = useDeleteCoachRateMutation();

  // fetching api

  useEffect(() => {
    if (fetchData) {
      setData(fetchData?.data?.records);
    }
  }, [fetchData]);

  //  add service
  const toggleAddService = () => {
    setAddService(!addService);
  };

  // Update service

  const toggleUpdateService = (row) => {
    setSelectedRow(row);
    setUpdateService(!updateService);
  };

  // function for delete row

  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteService({ id: selectedRow.id }).catch((error) => {
        console.error("Failed to delete the service:", error);
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
        onClick={() => toggleAddService()}
      >
        Add Rate
      </button>
    );
  };

  // Memoized columns definition for the table
  const columns = useMemo(
    () => [
      ...COACHRATECOLUMN,
      {
        Header: () => <div className="actions-header">Actions</div>,
        id: "actions",
        Cell: ({ row }) => (
          <div className="actions-cell">
            <span
              className="editIcon"
              onClick={() => toggleUpdateService(row.original)}
            >
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
        data={data}
        includeActions={false}
        tableTitle=" Consultant Service Rate"
        AddPackageButton={AddPackageButton}
      />
      {addService && (
        <AddCoachRate isOpen={addService} onClose={toggleAddService} />
      )}

      {updateService && (
        <UpdateCoachRate
          isOpen={updateService}
          onClose={toggleUpdateService}
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

export default CoachRate;
