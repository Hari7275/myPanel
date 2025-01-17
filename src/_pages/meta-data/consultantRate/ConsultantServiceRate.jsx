import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { PRICECHARTCOLUMN } from "./serviceRateColumn";
import { Pencil, Trash } from "lucide-react";
import AddServiceRate from "./AddServiceRate";
import DeleteComponent from "../../payments/DeleteComponent";
import UpdateServiceRate from "./UpdateServiceRate";
import {
  useGetServiceRateListQuery,
  useDeleteServiceRateMutation,
} from "../../../_store/api";

const ConsultantServiceRate = () => {
  const [addService, setAddService] = useState(false);
  const [updateService, setUpdateService] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // calling api for listing data and deleting data

  const { data: fetchData } = useGetServiceRateListQuery();
  const [deleteService] = useDeleteServiceRateMutation();

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
        add Service
      </button>
    );
  };

  // Memoized columns definition for the table
  const columns = useMemo(
    () => [
      ...PRICECHARTCOLUMN,
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
        <AddServiceRate isOpen={addService} onClose={toggleAddService} />
      )}

      {updateService && (
        <UpdateServiceRate
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

export default ConsultantServiceRate;
