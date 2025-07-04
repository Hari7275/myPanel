import React, { useMemo, useState, useEffect } from "react";
import CommonTable from "../../../_components/table/CommonTable";
import { Pencil, Trash } from "lucide-react";
import { QDLOACTIONCOLUMN } from "./qdColumn";
import UpdateQdLoaction from "./UpdateQdLoaction";
import AddQdLoaction from "./AddQdLoaction";
import DeleteComponent from "../../payments/DeleteComponent";

import {
  useGetqdLoactionListQuery,
  useDeleteqdLoactionListMutation,
} from "../../../_store/api";

const QDLoaction = () => {
  const [addLocation, setAddLocation] = useState(false);
  const [UpdateLocation, setUpdateLocation] = useState(false);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  // Fetching API data for listing reviews
  const { data: fetchData } = useGetqdLoactionListQuery();
  const [deleteLoaction] = useDeleteqdLoactionListMutation();

  useEffect(() => {
    if (fetchData && fetchData?.data && fetchData?.data?.records) {
      setData(fetchData?.data?.records);
    } else {
      setData([]);
    }
  }, [fetchData]);

  // Toggle function for adding a review
  const toggleAddLocation = () => {
    setAddLocation(!addLocation);
  };

  // Toggle function for updating a review
  const toggleUpdateLocation = (row) => {
    setSelectedRow(row);
    setUpdateLocation(!UpdateLocation);
  };

  // Toggle function for deleting a review
  const toggleDeleteComponent = (row) => {
    setSelectedRow(row);
    setShowDeleteComponent(!showDeleteComponent);
  };

  const handleDelete = () => {
    if (selectedRow && selectedRow.id) {
      deleteLoaction({ id: selectedRow.id }).catch((error) => {
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
        onClick={toggleAddLocation}
      >
        Add city
      </button>
    );
  };

  const columns = useMemo(() => [
    ...QDLOACTIONCOLUMN(),
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
          <span
            className="editIcon"
            onClick={() => toggleUpdateLocation(row.original)}
          >
            <Pencil className="iconSmall" />
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
        tableTitle="QD Trips Location"
        AddPackageButton={AddButton}
        showTableHeading={false}
        includeCheckbox={false}
      />

      {addLocation && (
        <AddQdLoaction isOpen={addLocation} onClose={toggleAddLocation} />
      )}

      {UpdateLocation && (
        <UpdateQdLoaction
          isOpen={UpdateLocation}
          onClose={toggleUpdateLocation}
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

export default QDLoaction;
